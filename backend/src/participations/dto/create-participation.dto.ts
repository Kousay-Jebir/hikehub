import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateParticipationDto {
  @IsInt()
  eventId: number;

  @IsInt()
  userId: number;

  @IsOptional()
  @IsBoolean()
  didAttend?: boolean;
}
