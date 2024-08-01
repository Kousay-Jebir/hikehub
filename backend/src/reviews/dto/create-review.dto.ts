import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, IsInt } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  eventId: number;

  @IsNotEmpty()
  @IsNumber()
  userProfileId: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  stars: number;
}

