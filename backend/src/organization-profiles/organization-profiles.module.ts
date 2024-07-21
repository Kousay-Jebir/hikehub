import { Module } from '@nestjs/common';
import { OrganizationProfilesService } from './organization-profiles.service';
import { OrganizationProfilesController } from './organization-profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationProfile } from './entities/organization-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationProfile])],
  controllers: [OrganizationProfilesController],
  providers: [OrganizationProfilesService],
})
export class OrganizationProfilesModule {}
