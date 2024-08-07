import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { OrganizationProfile } from '../organization-profiles/entities/organization-profile.entity';
import { Event } from 'src/events/entities/event.entity';
import { SearchStrategy } from './search-strategy.interface';
import { SearchQuery } from './search-query.interface';
import { HikerSearchStrategy } from './account-search/hiker-search.strategy';
import { OrganizationSearchStrategy } from './account-search/organization-search.strategy';
import { EventSearchStrategy } from './event-search/event-search.strategy';

@Injectable()
export class SearchService {
  private strategies: { [key: string]: SearchStrategy<any> } = {};

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(OrganizationProfile) private organizationProfileRepository: Repository<OrganizationProfile>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    private hikerSearchStrategy: HikerSearchStrategy,
    private organizationSearchStrategy: OrganizationSearchStrategy,
    private eventSearchStrategy: EventSearchStrategy
  ) {
    this.registerStrategy('hiker', this.hikerSearchStrategy);
    this.registerStrategy('organization', this.organizationSearchStrategy);
    this.registerStrategy('event', this.eventSearchStrategy);
  }

  registerStrategy(type: string, strategy: SearchStrategy<any>) {
    this.strategies[type] = strategy;
  }

  async search<T>(type: string, searchParams: SearchQuery): Promise<T[]> {
    const strategy = this.strategies[type];
    if (!strategy) {
      throw new Error(`No strategy found for type ${type}`);
    }

    let queryBuilder;
    if (type === 'hiker') {
      queryBuilder = this.userRepository.createQueryBuilder('user');
    } else if (type === 'organization') {
      queryBuilder = this.userRepository.createQueryBuilder('user'); // Adjust for organizations if needed
    } else if (type === 'event') {
      queryBuilder = this.eventRepository.createQueryBuilder('event');
    } else {
      throw new Error(`Unsupported search type ${type}`);
    }

    strategy.apply(queryBuilder, searchParams);

    return queryBuilder.getMany();
  }
}
