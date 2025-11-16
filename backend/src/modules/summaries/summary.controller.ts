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
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('summaries')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async findOrCreate(@Req() req, @Body() createSummaryDto: CreateSummaryDto) {
    const userId = req.user.id;
    return await this.summaryService.findOrCreate(
      userId,
      createSummaryDto.newsUrl,
    );
  }

  @Get()
  async getUserSummaries(@Req() req) {
    const userId = req.user.id;
    return await this.summaryService.getUserSummaries(userId);
  }
}
