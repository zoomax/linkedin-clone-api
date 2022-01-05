import { Feed } from 'src/Feed/Entities/feed.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../DTO/Role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;
  @Column({ nullable: true })
  imagePath: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Feed, (feed) => feed.author)
  feedPosts: Feed[];
}
