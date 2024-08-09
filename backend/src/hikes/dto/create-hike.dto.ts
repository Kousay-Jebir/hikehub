import { IsString, IsOptional, IsDateString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class CreateHikeDto {

  @IsString()
  location: string;

  @IsOptional()
  @IsNumber()
  eventId?: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime?: string;



  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLocationDto)
  locations?: CreateLocationDto[];
}
