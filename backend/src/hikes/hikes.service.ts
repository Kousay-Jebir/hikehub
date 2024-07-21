import { Injectable } from '@nestjs/common';
import { CreateHikeDto } from './dto/create-hike.dto';
import { UpdateHikeDto } from './dto/update-hike.dto';

@Injectable()
export class HikesService {
  create(createHikeDto: CreateHikeDto) {
    return 'This action adds a new hike';
  }

  findAll() {
    return `This action returns all hikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hike`;
  }

  update(id: number, updateHikeDto: UpdateHikeDto) {
    return `This action updates a #${id} hike`;
  }

  remove(id: number) {
    return `This action removes a #${id} hike`;
  }
}
