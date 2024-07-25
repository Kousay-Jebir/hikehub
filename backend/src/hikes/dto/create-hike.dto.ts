// create-hike.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateHikeDto {
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;

  @IsOptional()
  @IsString()
  location?: string;
}
