import { CreateFeedPostDto } from 'src/Feed/DTO/create-feed.dto';
import { Roles } from './Role.enum';

export interface UserDto {
  id?: number;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  role?: Roles;
  imagePath?: string;
  feedPosts: CreateFeedPostDto[];
}
