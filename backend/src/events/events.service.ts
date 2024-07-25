import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';
import { HikesService } from 'src/hikes/hikes.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly organizationProfileService:OrganizationProfilesService,
    private readonly hikesService: HikesService
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const { organizerId, hikes: hikeDtos, ...eventData } = createEventDto;

    // Find the organizer by ID
    const organizer = await this.organizationProfileService.findOne(organizerId);

    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
    }

    // Create the event
    const event = this.eventRepository.create({ ...eventData, organizer });
    await this.eventRepository.save(event);

    // Create and associate hikes
    if (hikeDtos && hikeDtos.length > 0) {
      const hikes = await Promise.all(
        hikeDtos.map(hikeDto => {
          // Add the eventId to each hike DTO
          const hikeWithEventId = { ...hikeDto, eventId: event.id };
          return this.hikesService.create(hikeWithEventId);
        })
      );

      event.hikes = hikes; // Associate the hikes with the event
      await this.eventRepository.save(event); // Save the event with its hikes
    }

    return this.findOne(event.id); // Fetch the event with relations
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
