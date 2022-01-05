import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/Decorators/role.decorator';
import { JwtGuard } from 'src/auth/Guards/auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateFeedPostDto } from '../DTO/create-feed.dto';
import { Feed } from '../Entities/feed.entity';
import { FeedService } from '../Providers/feed.service';
import { Roles as Role } from '../../auth/DTO/Role.enum';
import { RoleGuard } from 'src/auth/Guards/role.guard';
import { IsCreatorGuard } from '../Guards/is-creator.guard';
@Controller('/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Put('/:id')
  @UsePipes(ValidationPipe)
  getAllFeeds(
    @Body() payload: CreateFeedPostDto,
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Observable<UpdateResult> {
    return this.feedService.updatePostById(req.user, id, payload);
  }
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RoleGuard)
  @Post('/')
  create(@Body() post: CreateFeedPostDto, @Request() req): Observable<Feed> {
    return this.feedService.create(req.user, post);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  findPostById(@Param('id', ParseIntPipe) id: number): Observable<Feed> {
    return this.feedService.findPostById(id);
  }
  @Get('/')
  @UsePipes(ValidationPipe)
  findPosts(
    @Query('take', ParseIntPipe) take: number = 1,
    @Query('skip', ParseIntPipe) skip: number = 1,
  ): Observable<Feed[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }
  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete('/:id')
  @UsePipes(ValidationPipe)
  deletePostById(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<DeleteResult> {
    return this.feedService.deletePostById(id);
  }
}
