import { UserDto } from 'src/auth/DTO/user.dto';

export interface CreateFeedPostDto {
  id?: number;
  body?: string;
  createdAt?: Date;
  author?: UserDto;
}
