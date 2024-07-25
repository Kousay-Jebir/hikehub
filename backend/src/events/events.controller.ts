import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Ownership } from 'src/role/ownership.decorator';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService,
              private readonly organizationProfileService:OrganizationProfilesService
  ) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  @Roles(Role.Organizer)
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard,RolesGuard)
  @Get("organizer/:id")
  async findAllEvents(@Param('id') id: number){
    const organizerProfileId = await this.organizationProfileService.findOrganizationProfileByUserId(+id)
    const events =  await(this.eventsService.findAllByOrganizerId(organizerProfileId));
    console.log(events)
    return events;
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }


}
