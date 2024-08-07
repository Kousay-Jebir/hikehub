// organization-search.strategy.ts
import { SearchStrategy } from '../search-strategy.interface';
import { SearchQuery } from '../search-query.interface';
import { User } from 'src/users/user.entity';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';

export class OrganizationSearchStrategy implements SearchStrategy<User> {
    apply(queryBuilder: any, searchParams: SearchQuery): void {
      const { query } = searchParams;
  
      queryBuilder
        .leftJoinAndSelect('user.organizationProfile', 'organization_profile')
        .where('user.username LIKE :query', { query: `%${query}%` })
        .orWhere('organization_profile.name LIKE :query', { query: `%${query}%` })
        .orWhere('organization_profile.description LIKE :query', { query: `%${query}%` })
        queryBuilder.select('user.userName');
    }
  }