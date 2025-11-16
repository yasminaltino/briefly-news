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

  async findOrCreate(userId: number, newsUrl: string): Promise<Summary> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingSummary = await this.summaryRepository.findOne({
      where: {
        user: { id: userId },
        news: { url: newsUrl },
      },
    });

    if (existingSummary) return existingSummary;

    const news = await this.newsService.findByUrl(newsUrl);
    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    const summaryContent = await this.generateSummary(
      `${news.title}. ${news.description || ''}. ${news.content || ''}`,
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
    console.log('Texto para resumir:', text.substring(0, 200) + '...');

    try {
      const prompt = `
        Resuma a notícia a seguir de forma ANALÍTICA, detalhada e em português:

        "${text}"

        Regras:
        - 150 a 220 palavras
        - Explique contexto, fatos principais e impacto
        - Utilize dados relevantes (números, locais, datas)
        - Não copie frases diretamente
        - Não repita informações
        - Estrutura sugerida:
          1) Contexto geral
          2) O que aconteceu
          3) Dados importantes
          4) Impacto imediato
          5) Consequências prováveis

          Não esqueça de resumir em português!
        `;

      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemma2:2b',
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.3,
            max_tokens: 600,
            top_p: 0.8,
            num_predict: 500,
            repeat_penalty: 1.1,
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

  async getUserSummaries(userId: number): Promise<Summary[]> {
    return await this.summaryRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['news'],
      order: { createdAt: 'DESC' },
    });
  }
}
