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

  async createParticipation(createParticipationDto: CreateParticipationDto): Promise<Participation> {
    const { eventId, userProfileId } = createParticipationDto;

    // Use services to fetch the Event and UserProfile
    const event = await this.eventsService.findOne(eventId)
    if (!event) {
      throw new Error('Event not found');
    }

    const userProfile = await this.userProfilesService.findOne(userProfileId)
    if (!userProfile) {
      throw new Error('UserProfile not found');
    }

    // Check if the UserProfile is already participating in this Event
    const existingParticipation = await this.participationRepository.findOne({
      where: { eventId, userProfileId }
    });

    if (existingParticipation) {
      throw new Error('UserProfile has already participated in this Event');
    }

    // Create a new Participation
    const participation = this.participationRepository.create({
      eventId,
      userProfileId,
      event,
      userProfile
    });

    // Save the Participation to the database
    return await this.participationRepository.save(participation);
  }

async findOne(eventId: number, userProfileId: number): Promise<Participation> {
  const participation = await this.participationRepository.findOne({
    where: { eventId, userProfileId }
  });
  
  if (!participation) {
    throw new NotFoundException('Participation not found');
  }

  return participation;
}
async findAll(): Promise<Participation[]> {
  return this.participationRepository.find();
}

async updateParticipation(eventId: number, userProfileId: number, updateDto: UpdateParticipationDto): Promise<Participation> {
  const participation = await this.participationRepository.findOne({
    where: { eventId, userProfileId }
  });

  if (!participation) {
    throw new NotFoundException('Participation not found');
  }

  // Update the participation with the new values
  Object.assign(participation, updateDto);

  return this.participationRepository.save(participation);
}

async removeParticipation(eventId: number, userProfileId: number): Promise<void> {
  const result = await this.participationRepository.delete({ eventId, userProfileId });

  if (result.affected === 0) {
    throw new NotFoundException('Participation not found');
  }
}
}
