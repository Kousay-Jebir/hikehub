import { SelectQueryBuilder } from 'typeorm';
import { SearchStrategy } from '../search-strategy.interface';
import { SearchQuery } from '../search-query.interface';
import { Event } from 'src/events/entities/event.entity';

export class EventSearchStrategy implements SearchStrategy<Event> {
  apply(queryBuilder: any, searchParams: SearchQuery): void {
    const { query, filters } = searchParams;

    // Apply text search
    if (query) {
      queryBuilder.andWhere('event.title LIKE :query OR event.description LIKE :query', { query: `%${query}%` });
    }

    // Apply dynamic filters
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (key === 'openForParticipation') {
          const comparisonOperator = filters[key] ? '>' : '<=';
          queryBuilder.andWhere('event.startDate ' + comparisonOperator + ' :currentDate', { currentDate: new Date() });
        } else {
          queryBuilder.andWhere(`event.start${key} = :${key}`, { [key]: filters[key] });
        }
      });
    }
  }
}
