import { IsString, IsOptional, IsJSON, IsInt, IsObject } from 'class-validator';

export class CreateOrganizationProfileDto {
  @IsInt()
  userId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  contact?: object;

  @IsOptional()
  @IsObject()
  social?: object;

  @IsString()
  @IsOptional()
  name?: string;
}
