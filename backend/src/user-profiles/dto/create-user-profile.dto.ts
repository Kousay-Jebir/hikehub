import { IsString, IsOptional, IsDate, IsISO8601, IsPhoneNumber, Length, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateUserProfileDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  birthday?: Date;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  @Length(1, 1)
  @IsString()
  genderCode?: string;
}
