import { User } from 'src/auth/Entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feed-post')
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // OR
  @CreateDateColumn()
  createdAt: Date;
  
  @ManyToOne(() => User, (user) => user.feedPosts)
  author: User;
}
