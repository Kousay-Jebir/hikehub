// src/search/search.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { User } from '../users/user.entity';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { OrganizationProfile } from '../organization-profiles/entities/organization-profile.entity';
import { HikerSearchStrategy } from './account-search/hiker-search.strategy';
import { OrganizationSearchStrategy } from './account-search/organization-search.strategy';
import { EventSearchStrategy } from './event-search/event-search.strategy';
import { Event } from 'src/events/entities/event.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, OrganizationProfile,Event]),
  ],
  providers: [SearchService, HikerSearchStrategy, OrganizationSearchStrategy,EventSearchStrategy],
  controllers: [SearchController],
  exports: [SearchService],  // Export the service if other modules need it
})
export class SearchModule {}
