import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getTopNews() {
    try {
      return this.newsService.getTopNews();
    } catch (err: any) {
      console.error('Error fetching news:', err);
    }
  }

  @Get('stored')
  async findStoredNews() {
    return this.newsService.findStoredNews();
  }
}
