import { PartialType } from '@nestjs/mapped-types';
import { CreateHikeDto } from './create-hike.dto';

export class UpdateHikeDto extends PartialType(CreateHikeDto) {}
