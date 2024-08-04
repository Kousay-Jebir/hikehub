import { Controller, Post, Get, Param, Body, Put, Delete, NotFoundException, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Participation } from 'src/participations/entities/participation.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Organizer)
  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }



  @Get('organizer/:id')
  async findAllByOrganizer(@Param('id',ParseIntPipe) id: number): Promise<Event[]> {
    return this.eventsService.findAllByOrganizer(id);
  }

  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<Event> {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventsService.update(id, updateEventDto);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number): Promise<void> {
    await this.eventsService.remove(id);
  }

  @Get('participations/:id')
  async getEventParticipations(@Param('id',ParseIntPipe) id: number): Promise<Participation[]> {
    return this.eventsService.getParticipations(id);
  }
}
