import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './summary.entity';
import { SummaryService } from './summary.service';
import { NewsModule } from '../news/news.module';
import { UserModule } from '../users/user.module';
import { SummaryController } from './summary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Summary]), NewsModule, UserModule],
  providers: [SummaryService],
  exports: [SummaryService],
  controllers: [SummaryController],
})
export class SummaryModule {}
