import { SearchStrategy } from '../search-strategy.interface';
import { SearchQuery } from '../search-query.interface';
import { User } from 'src/users/user.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

export class HikerSearchStrategy implements SearchStrategy<User> {
  apply(queryBuilder: any, searchParams: SearchQuery): void {
    const { query, filters } = searchParams;

    // Apply role-based filtering
    queryBuilder
      .leftJoinAndSelect('user.userProfile', 'user_profile')
      .where('user.roles = :role', { role: 'hiker' }) // Ensure only hikers are included
      .andWhere('user.userName LIKE :query', { query: `%${query}%` })
      .orWhere('user_profile.firstName LIKE :query', { query: `%${query}%` })
      .orWhere('user_profile.lastName LIKE :query', { query: `%${query}%` });

    if (filters?.nationality) {
      queryBuilder
        .andWhere('user_profile.nationality = :nationality', { nationality: filters.nationality });
    }
    
    queryBuilder.select(['user.userName']);
  }
}
