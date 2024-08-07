import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { User } from '../users/user.entity';
import { OrganizationProfile } from '../organization-profiles/entities/organization-profile.entity';
import { Event } from 'src/events/entities/event.entity';

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
  ): Promise<User[]> {
    const searchParams = {
      query,
    };
    return this.searchService.search<User>('organization', searchParams);
  }

  @Get('events')
  async searchEvents(
    @Query('q') query: string,
    @Query('openForParticipation') openForParticipation?: boolean,

  ): Promise<Event[]> {
    const searchParams = {
      query,
      filters: { openForParticipation},
    };
    return this.searchService.search<Event>('event', searchParams);
  }
}
