import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('summaries')
@UseGuards(JwtAuthGuard)
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  async findOrCreate(@Req() req, @Body() createSummaryDto: CreateSummaryDto) {
    const userId = req.user.id;
    return await this.summaryService.findOrCreate(
      userId,
      createSummaryDto.newsId,
    );
  }
}
