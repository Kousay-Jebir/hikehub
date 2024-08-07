import { SearchStrategy } from '../search-strategy.interface';
import { SearchQuery } from '../search-query.interface';
import { User } from 'src/users/user.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

export class HikerSearchStrategy implements SearchStrategy<User> {
  apply(queryBuilder: any, searchParams: SearchQuery): void {
    const { query, filters } = searchParams;

    if (filters?.nationality) {
      queryBuilder
        .leftJoinAndSelect('user.userProfile', 'user_profile')
        .where('user_profile.nationality = :nationality', { nationality: filters.nationality });
    } else {
      queryBuilder
        .leftJoinAndSelect('user.userProfile', 'user_profile');
    }

    queryBuilder
      .where('user.username LIKE :query', { query: `%${query}%` })
      .orWhere('user_profile.firstName LIKE :query', { query: `%${query}%` })
      .orWhere('user_profile.lastName LIKE :query', { query: `%${query}%` });
  }
}
