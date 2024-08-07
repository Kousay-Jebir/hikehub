// src/search/search.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from '../users/user.entity';
import { OrganizationProfile } from '../organization-profiles/entities/organization-profile.entity';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('hikers')
  async searchHikers(
    @Query('q') query: string,
    @Query('nationality') nationality?: string,
  ): Promise<User[]> {
    const searchParams = {
      query,
      filters: { nationality },
    };
    return this.searchService.search<User>('hiker', searchParams);
  }

  @Get('organizations')
  async searchOrganizations(
    @Query('q') query: string,
  ): Promise<(User | OrganizationProfile)[]> {
    const searchParams = {
      query,
    };
    return this.searchService.search<OrganizationProfile>('organization', searchParams);
  }
}
