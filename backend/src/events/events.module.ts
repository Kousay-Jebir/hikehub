import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { OrganizationProfilesModule } from 'src/organization-profiles/organization-profiles.module';
@Module({
  imports: [TypeOrmModule.forFeature([Event]),OrganizationProfilesModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
