// src/participations/dto/create-participation.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateParticipationDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @IsNotEmpty()
  userProfileId: number;

  @IsOptional()
  @IsBoolean()
  didAttend: boolean;
}
