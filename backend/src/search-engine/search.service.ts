// src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { OrganizationProfile } from '../organization-profiles/entities/organization-profile.entity';
import { SearchStrategy } from './search-strategy.interface';
import { SearchQuery } from './search-query.interface';
import { HikerSearchStrategy } from './account-search/hiker-search.strategy';
import { OrganizationSearchStrategy } from './account-search/organization-search.strategy';

@Injectable()
export class SearchService {
  private strategies: { [key: string]: SearchStrategy<any> } = {};

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(OrganizationProfile) private organizationProfileRepository: Repository<OrganizationProfile>,
    private hikerSearchStrategy: HikerSearchStrategy,
    private organizationSearchStrategy: OrganizationSearchStrategy
  ) {
    this.registerStrategy('hiker', this.hikerSearchStrategy);
    this.registerStrategy('organization', this.organizationSearchStrategy);
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
      queryBuilder = this.userRepository.createQueryBuilder('user')
    }

    strategy.apply(queryBuilder, searchParams);

    return queryBuilder.getMany();
  }
}
