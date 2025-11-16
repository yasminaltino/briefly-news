import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateNewsDto } from '../news/dto/create-news.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async addFavorite(@Req() req, @Body() createNewsDto: CreateNewsDto) {
    const userId = req.user.id;
    return this.favoriteService.addFavorite(userId, createNewsDto);
  }

  @Get()
  async getUserFavorites(@Req() req) {
    const userId = req.user.id;
    return this.favoriteService.getUserFavorites(userId);
  }

  @Delete()
  async removeFavoritByUrl(@Req() req, @Query('url') url: string) {
    const userId = req.user.id;
    return this.favoriteService.removeFavoriteByUrl(userId, url);
  }
}
