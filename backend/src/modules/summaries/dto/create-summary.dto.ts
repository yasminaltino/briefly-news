import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSummaryDto {
  @IsNumber()
  @Type(() => Number)
  newsId: number;
}
