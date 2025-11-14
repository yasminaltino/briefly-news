import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { News } from 'src/modules/news/news.entity';
import { User } from 'src/modules/users/user.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => News, (news) => news.favorites, { onDelete: 'CASCADE' })
  news: News;

  @CreateDateColumn()
  createdAt: Date;
}
