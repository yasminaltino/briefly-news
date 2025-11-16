import { IsString } from 'class-validator';

export class CreateSummaryDto {
  @IsString()
  newsUrl: string;
}
