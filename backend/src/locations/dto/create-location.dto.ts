import { IsString, IsObject, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsNumber()
  hikeId?: number;

  @IsString()
  label: string;

  @IsObject()
  coordinates: object;
}
