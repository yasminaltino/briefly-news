import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { News } from 'src/modules/news/news.entity';
import { User } from 'src/modules/users/user.entity';

@Entity('summaries')
export class Summary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.summaries, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => News, (news) => news.summaries, { onDelete: 'CASCADE' })
  news: News;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
