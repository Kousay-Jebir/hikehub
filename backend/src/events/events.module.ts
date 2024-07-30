import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { OrganizationProfilesModule } from 'src/organization-profiles/organization-profiles.module';
import { HikesModule } from 'src/hikes/hikes.module';
@Module({
  imports: [TypeOrmModule.forFeature([Event]),OrganizationProfilesModule,HikesModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports:[EventsService]
})
export class EventsModule {}
