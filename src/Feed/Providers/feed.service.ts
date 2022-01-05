import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserDto } from 'src/auth/DTO/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateFeedPostDto } from '../DTO/create-feed.dto';
import { Feed } from '../Entities/feed.entity';
import { FeedRepository } from '../Repositories/feed.repository';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedRepository) private feedRepository: FeedRepository,
  ) {}

  create(user: UserDto, body: CreateFeedPostDto): Observable<Feed> {
    body.author = user;
    return from(this.feedRepository.save(body));
  }
  updatePostById(
    user: UserDto,
    id: number,
    body: CreateFeedPostDto,
  ): Observable<UpdateResult> {
    return from(this.feedRepository.update(id, body));
  }
  findAllPosts(): Observable<Feed[]> {
    return from(this.feedRepository.find());
  }
  findPosts(take: number = 10, skip: number = 0): Observable<Feed[]> {
    return from(
      this.feedRepository.findAndCount({ take, skip }).then(([posts]) => {
        //findAndCount paginates our data using oprions object with {take , skip } numeric keys
        return <Feed[]>posts;
      }),
    );
  }
  findPostById(id: number): Observable<Feed> {
    return from(this.feedRepository.findOne(id, { relations: ['author'] }));
  }
  deletePostById(id: number): Observable<DeleteResult> {
    return from(this.feedRepository.delete(id));
  }
}
