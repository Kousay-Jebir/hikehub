import { Module } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { ParticipationsController } from './participations.controller';
import { Participation } from './entities/participation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { EventsModule } from 'src/events/events.module';
@Module({
  imports: [TypeOrmModule.forFeature([Participation]),UserProfilesModule,EventsModule],
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
})
export class ParticipationsModule {}
