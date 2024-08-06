import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { HikesService } from 'src/hikes/hikes.service';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';
import { Participation } from 'src/participations/entities/participation.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly hikesService: HikesService,
    private readonly organizationProfileService: OrganizationProfilesService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { organizerId, hikes: hikeDtos, ...eventData } = createEventDto;

    const organizer = await this.organizationProfileService.findOne(organizerId);

    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
    }

    const event = this.eventRepository.create({ ...eventData, organizer });
    await this.eventRepository.save(event);

    if (hikeDtos && hikeDtos.length > 0) {
      const hikes = await Promise.all(
        hikeDtos.map(hikeDto => {
          const hikeWithEventId = { ...hikeDto, eventId: event.id };
          return this.hikesService.create(hikeWithEventId);
        })
      );

      event.hikes = hikes;
      await this.eventRepository.save(event);
    }

    return this.findOne(event.id);
  }

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find({ relations: ['organizer', 'hikes', 'participants', 'reviews'] });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['organizer', 'hikes', 'participants', 'reviews'] });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id }, relations: ['organizer', 'hikes'] });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const { hikes: hikeDtos, ...eventData } = updateEventDto;
    Object.assign(event, eventData);

    if (hikeDtos) {
      const hikes = await Promise.all(
        hikeDtos.map(hikeDto => {
          const hikeWithEventId = { ...hikeDto, eventId: event.id };
          return this.hikesService.create(hikeWithEventId);
        })
      );

      event.hikes = hikes;
    }

    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.eventRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

  async findAllByOrganizer(organizerId: number): Promise<Event[]> {
    return this.eventRepository.find({ where: { organizerId } ,relations:['hikes','hikes.locations']});
  }

  async getParticipations(eventId: number): Promise<Participation[]> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants','participants.'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event.participants;
  }
  
}


