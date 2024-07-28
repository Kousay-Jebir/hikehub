import { IsString, IsObject, IsNumber } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  hikeId: number;

  @IsString()
  label: string;

  @IsObject()
  coordinates: object;
}
