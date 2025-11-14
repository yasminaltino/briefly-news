import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsUrl()
  urlToImage?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @IsOptional()
  @IsString()
  publishedAt?: string;
}
