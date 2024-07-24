import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly organizationProfileService:OrganizationProfilesService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { organizerId, ...eventData } = createEventDto;

    // Find the organizer by ID
    const organizer = await this.organizationProfileService.findOne(organizerId);

    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
    }

    const event = this.eventRepository.create({ ...eventData, organizer });

    return this.eventRepository.save(event);
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

  async findAllByOrganizerId(id:number):Promise<Event[]>{
    return this.eventRepository.find({where:{organizerId:id}})
  }


  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    const { organizerId, ...eventData } = updateEventDto;

    if (organizerId) {
      const organizer = await this.organizationProfileService.findOne(organizerId);

      if (!organizer) {
        throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
      }

      event.organizer = organizer;
    }

    Object.assign(event, eventData);

    return this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.eventRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }

}
