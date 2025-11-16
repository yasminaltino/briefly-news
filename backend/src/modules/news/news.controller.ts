import { Controller, Get, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get()
  async getAllNews() {
    try {
      return this.newsService.getAllNews();
    } catch (err: any) {
      console.error('Error fetching news:', err);
    }
  }

  @Get('stored')
  async findStoredNews() {
    return this.newsService.findStoredNews();
  }
}
