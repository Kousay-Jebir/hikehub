import { SearchQuery } from "./search-query.interface";

export interface SearchStrategy<T> {
    apply(queryBuilder: any, searchParams: SearchQuery): void;
  }
  