import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Repository } from 'typeorm';
import { NewsService } from '../news/news.service';
import { UserService } from '../users/user.service';
import { CreateNewsDto } from '../news/dto/create-news.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly newsService: NewsService,
    private readonly userService: UserService,
  ) {}

  async addFavorite(
    userId: number,
    newsData: CreateNewsDto,
  ): Promise<Favorite> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const existingFavorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        news: { url: newsData.url },
      },
      relations: ['news'],
    });

    if (existingFavorite) {
      throw new ConflictException('Esta notícia já está nos favoritos');
    }

    const news = await this.newsService.findOrCreate(newsData);

    const newFavorite = this.favoriteRepository.create({
      user,
      news,
    });

    return this.favoriteRepository.save(newFavorite);
  }

  async getUserFavorites(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['news'],
      order: { createdAt: 'DESC' },
    });
  }

  async removeFavoriteByUrl(userId: number, newsUrl: string): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        news: { url: newsUrl },
      },
      relations: ['news'],
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado');
    }

    const newsId = favorite.news.id;

    await this.favoriteRepository.remove(favorite);

    const otherFavorites = await this.favoriteRepository.count({
      where: { news: { id: newsId } },
    });

    if (otherFavorites === 0) {
      await this.newsService.removeById(newsId);
    }
  }
}
