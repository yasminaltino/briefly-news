import { Repository } from 'typeorm';
import { Summary } from './summary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsService } from '../news/news.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private readonly summaryRepository: Repository<Summary>,
    private readonly newsService: NewsService,
    private readonly userService: UserService,
  ) {}

  async findOrCreate(userId: number, newsId: number): Promise<Summary> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingSummary = await this.summaryRepository.findOne({
      where: {
        user: { id: userId },
        news: { id: newsId },
      },
    });

    if (existingSummary) return existingSummary;

    const news = await this.newsService.findById(newsId);
    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    const summaryContent = await this.generateSummary(
      `${news.title}.  ${news.content}`,
    );

    const summary = this.summaryRepository.create({
      user,
      news,
      content: summaryContent,
    });
    return await this.summaryRepository.save(summary);
  }

  async generateSummary(text: string): Promise<string> {
    const ollamaUrl = process.env.OLLAMA_URL;

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2:1b',
          prompt: `Resuma esta notícia em no máximo 2 frases curtas em português: ${text}`,
          stream: false,
          options: {
            temperature: 0.3,
            max_tokens: 100,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
      }

      const data = await response.json();
      return data.response?.trim() || text.substring(0, 100) + '...';
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      return text.substring(0, 100) + '...';
    }
  }
}
