import { SearchStrategy } from '../search-strategy.interface';
import { SearchQuery } from '../search-query.interface';
import { User } from 'src/users/user.entity';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';

export class OrganizationSearchStrategy implements SearchStrategy<User> {
  apply(queryBuilder: any, searchParams: SearchQuery): void {
    const { query } = searchParams;

    // Apply role-based filtering
    queryBuilder
      .leftJoinAndSelect('user.organizationProfile', 'organization_profile')
      .where('user.roles = :role', { role: 'organizer' }) // Ensure only organizations are included
      .andWhere('user.userName LIKE :query', { query: `%${query}%` })
      .orWhere('organization_profile.name LIKE :query', { query: `%${query}%` })
      .orWhere('organization_profile.description LIKE :query', { query: `%${query}%` });
      
    queryBuilder.select(['user.userName']);
  }
}
