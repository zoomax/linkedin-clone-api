import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/auth/Repositories/user.repository';
import { FeedController } from './Controllers/feed.controller';
import { IsCreatorGuard } from './Guards/is-creator.guard';
import { FeedService } from './Providers/feed.service';
import { FeedRepository } from './Repositories/feed.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([FeedRepository, UserRepository]),
  ],
  providers: [FeedService, IsCreatorGuard],
  controllers: [FeedController],
})
export class FeedModule {}
