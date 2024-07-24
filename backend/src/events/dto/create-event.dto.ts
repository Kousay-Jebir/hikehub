import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsString()
  @IsOptional()
  location?: string;

  @IsNumber()
  organizerId: number;
}
