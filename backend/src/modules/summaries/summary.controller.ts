import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SummaryService } from './summary.service';
import { CreateNewsDto } from '../news/dto/create-news.dto';

@Controller('summaries')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async findOrCreate(@Req() req, @Body() createSummaryDto: CreateNewsDto) {
    const userId = req.user.id;
    return await this.summaryService.findOrCreate(userId, createSummaryDto);
  }

  @Get()
  async getUserSummaries(@Req() req) {
    const userId = req.user.id;
    return await this.summaryService.getUserSummaries(userId);
  }
}
