import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participation } from './entities/participation.entity';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ParticipationsService {
  constructor(
    @InjectRepository(Participation)
    private participationRepository: Repository<Participation>,
    private readonly userProfilesService: UserProfilesService,
    private readonly eventsService: EventsService,
  ) {}

  async create(createParticipationDto: CreateParticipationDto): Promise<Participation> {
    const { eventId, userId } = createParticipationDto;

    const userProfile = await this.userProfilesService.findOne(userId);
    if (!userProfile) {
      throw new NotFoundException('User profile not found');
    }

    const event = await this.eventsService.findOne(eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const participation = this.participationRepository.create({
      eventId,
      userId,
      userProfile,
      event,
    });

    return this.participationRepository.save(participation);
  }

  async findAll(): Promise<Participation[]> {
    return this.participationRepository.find({ relations: ['userProfile', 'event'] });
  }

  async findOne(id: number): Promise<Participation[]> {
    const participation = await this.participationRepository.find({ where:{id},relations: ['userProfile', 'event'] });
    if (!participation) {
      throw new NotFoundException('Participation not found');
    }
    return participation;
  }

  async update(id: number, updateParticipationDto: UpdateParticipationDto): Promise<Participation> {
    const participation = await this.participationRepository.findOne({where:{id}});
    if (!participation) {
      throw new NotFoundException('Participation not found');
    }

    if (updateParticipationDto.userId) {
      const userProfile = await this.userProfilesService.findOne(updateParticipationDto.userId);
      if (!userProfile) {
        throw new NotFoundException('User profile not found');
      }
      participation.userProfile = userProfile;
    }

    if (updateParticipationDto.eventId) {
      const event = await this.eventsService.findOne(updateParticipationDto.eventId);
      if (!event) {
        throw new NotFoundException('Event not found');
      }
      participation.event = event;
    }

    participation.didAttend = updateParticipationDto.didAttend ?? participation.didAttend;

    return this.participationRepository.save(participation);
  }

  async remove(id: number): Promise<void> {
    const participation = await this.participationRepository.findOne({where:{id}});
    if (!participation) {
      throw new NotFoundException('Participation not found');
    }
    await this.participationRepository.remove(participation);
  }
}
