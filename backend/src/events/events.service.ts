import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { organizerId, hikes: hikeDtos, startDate, endDate, ...eventData } = createEventDto;
  
    console.log('Received startDate:', startDate);
    console.log('Received endDate:', endDate);
  
    // Validate that endDate is later than startDate
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('End date must be later than start date');
    }
  
    const organizer = await this.organizationProfileService.findOne(organizerId);
  
    if (!organizer) {
      throw new NotFoundException(`Organizer with ID ${organizerId} not found`);
    }
  
    const event = this.eventRepository.create({ ...eventData, organizer, startDate, endDate });
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

  async findAllByHiker(userProfileId: number): Promise<Event[]> {
    if (typeof userProfileId !== 'number' || isNaN(userProfileId) || userProfileId <= 0) {
      throw new Error('Invalid userProfileId provided');
    }
  
    try {
      // Fetch events with their hikes and locations where the userProfileId has participations
      const events = await this.eventRepository
        .createQueryBuilder('event')
        .innerJoin('participation', 'participation', 'participation.eventId = event.id')
        .leftJoinAndSelect('event.hikes', 'hike')
        .leftJoinAndSelect('hike.locations', 'location')
        .where('participation.userProfileId = :userProfileId', { userProfileId })
        .getMany();
  
      return events;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error fetching events for hiker:', error);
      // Throw a user-friendly error message
      throw new Error('An error occurred while fetching events for the hiker');
    }
  }
  
  

  async getParticipations(eventId: number): Promise<Participation[]> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['participants','participants.userProfile'],
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event.participants;
  }
  
}


