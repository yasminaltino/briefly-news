import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import newsConfig from './config/news.config';
import { CreateNewsDto } from './dto/create-news.dto';
import { Repository } from 'typeorm';
import { News } from './news.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
  constructor(
    @Inject(newsConfig.KEY)
    private readonly newsConfiguration: ConfigType<typeof newsConfig>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getAllNews() {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=technology&apiKey=${this.newsConfiguration.apiKey}`,
    );

    if (!response.ok) {
      throw new Error(
        `NewsAPI error: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  async getTopNews() {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.newsConfiguration.apiKey}`,
    );

    if (!response.ok) {
      throw new Error(
        `NewsAPI error: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  async findOrCreate(createNewsDto: CreateNewsDto) {
    const existingNews = await this.newsRepository.findOne({
      where: {
        url: createNewsDto.url,
      },
    });

    if (existingNews) return existingNews;

    const news = this.newsRepository.create(createNewsDto);

    return this.newsRepository.save(news);
  }

  async findByUrl(newsUrl: string): Promise<News> {
    const news = await this.newsRepository.findOne({
      where: { url: newsUrl },
    });

    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    return news;
  }

  async removeByUrl(newsUrl: string): Promise<void> {
    const news = await this.newsRepository.findOne({
      where: {
        url: newsUrl,
      },
    });

    if (!news) {
      throw new NotFoundException('Notícia não encontrada');
    }

    await this.newsRepository.remove(news);
  }

  async findStoredNews(): Promise<News[]> {
    return await this.newsRepository.find();
  }
}
