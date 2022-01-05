import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable, map, switchMap } from 'rxjs';
import { Roles } from 'src/auth/DTO/Role.enum';
import { UserDto } from 'src/auth/DTO/user.dto';
import { UserService } from 'src/auth/Providers/user.service';
import { CreateFeedPostDto } from '../DTO/create-feed.dto';
import { FeedService } from '../Providers/feed.service';

@Injectable()
export class IsCreatorGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly feedService: FeedService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, params }: { user: UserDto; params: { id: number } } = request;
    if (!user || !params) return false;
    if (user.role === Roles.ADMIN) return true;
    const userId = user.id;
    const feedId = params.id;
    return this.userService.getUserById(userId).pipe(
      switchMap((user: UserDto) => {
        return this.feedService.findPostById(feedId).pipe(
          map((feed: CreateFeedPostDto) => {
            return user.id === feed.author.id;
          }),
        );
      }),
    );
  }
}
