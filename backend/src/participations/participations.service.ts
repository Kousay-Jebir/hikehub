import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
    const event = await this.eventsService.findOne(eventId);
    if (!event) {
        throw new Error('Event not found');
    }

    const userProfile = await this.userProfilesService.findOne(userProfileId);
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

    // Check if the event's start date is in the future
    const now = new Date();
    const eventStartDate = new Date(event.startDate); // Assuming event.startDate is in a format parseable by Date

    if (now > eventStartDate) {
        throw new Error('The event has already started');
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
    throw new NotFoundException('Participation record not found');
  }

  const event = await this.eventsService.findOne(participation.eventId);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const eventEndDate = new Date(event.endDate);
    const currentDate = new Date();
    console.log(eventEndDate + "/" + currentDate);
    if (currentDate <= eventEndDate) {
      throw new ForbiddenException('Cannot update participation before the event ends');
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

async getEventParticipants (eventId:number){
  // Fetch all reviews for the event
  const participations = await this.participationRepository.find({ where: { eventId} });
  
  // Use Promise.all to handle asynchronous userName fetching
  const participationsWithUserName = await Promise.all(
      participations.map(async (participation) => {
          // Fetch userName for each review's userProfileId
          const userName = await this.userProfilesService.getUserNameByUserProfileId(participation.userProfileId);
          const userId = await this.userProfilesService.getUserIdByUserProfileID(participation.userProfileId);
          return {
              ...participation, 
              userName,
              userId
          };
      })
  );
  
  return participationsWithUserName;
  }

}
