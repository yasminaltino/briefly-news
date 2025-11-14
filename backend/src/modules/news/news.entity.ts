import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Favorite } from 'src/modules/favorites/favorite.entity';
import { Summary } from 'src/modules/summaries/summary.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  sourceUrl: string;

  @Column({ nullable: true })
  publishedAt: string;

  @OneToMany(() => Favorite, (favorite) => favorite.news)
  favorites: Favorite[];

  @OneToMany(() => Summary, (summary) => summary.news)
  summaries: Summary[];
}
