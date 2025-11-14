import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { ConfigModule } from '@nestjs/config';
import newsConfig from './config/news.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';

@Module({
  imports: [
    ConfigModule.forFeature(newsConfig),
    TypeOrmModule.forFeature([News]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
