import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHikeDto } from './dto/create-hike.dto';
import { UpdateHikeDto } from './dto/update-hike.dto';
import { Hike } from './entities/hike.entity';

@Injectable()
export class HikesService {
  constructor(
    @InjectRepository(Hike)
    private readonly hikeRepository: Repository<Hike>,
  ) {}

  async create(createHikeDto: CreateHikeDto): Promise<Hike> {
    const hike = this.hikeRepository.create(createHikeDto);
    return await this.hikeRepository.save(hike);
  }

  async findAll(): Promise<Hike[]> {
    return await this.hikeRepository.find();
  }

  async findOne(id: number): Promise<Hike> {
    const hike = await this.hikeRepository.findOne({where:{id}});
    if (!hike) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }
    return hike;
  }

  async update(id: number, updateHikeDto: UpdateHikeDto): Promise<Hike> {
    await this.hikeRepository.update(id, updateHikeDto);
    const updatedHike = await this.hikeRepository.findOne({where:{id}});
    if (!updatedHike) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }
    return updatedHike;
  }

  async remove(id: number): Promise<void> {
    const result = await this.hikeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }
  }
}
