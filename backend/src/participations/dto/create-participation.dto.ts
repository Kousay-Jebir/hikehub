// src/participations/dto/create-participation.dto.ts
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateParticipationDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @IsNotEmpty()
  userProfileId: number;
}
