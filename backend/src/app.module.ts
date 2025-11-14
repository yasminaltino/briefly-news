import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/user.entity';
import { News } from './modules/news/news.entity';
import { Summary } from './modules/summaries/summary.entity';
import { Favorite } from './modules/favorites/favorite.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { NewsModule } from './modules/news/news.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { SummaryModule } from './modules/summaries/summary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, News, Summary, Favorite],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    NewsModule,
    FavoriteModule,
    SummaryModule,
  ],
})
export class AppModule {}
