import { EntityRepository, Repository } from 'typeorm';
import { Feed } from '../Entities/feed.entity';

@EntityRepository(Feed)
export class FeedRepository extends Repository<Feed> {}
    