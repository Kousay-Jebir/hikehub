import { Module } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { ParticipationsController } from './participations.controller';
import { Participation } from './entities/participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { EventsModule } from 'src/events/events.module';
import { OrganizationProfilesModule } from 'src/organization-profiles/organization-profiles.module';
@Module({
  imports: [TypeOrmModule.forFeature([Participation]),UserProfilesModule,EventsModule,OrganizationProfilesModule],
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
})
export class ParticipationsModule {}
