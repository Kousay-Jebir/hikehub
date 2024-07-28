import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHikeDto } from './dto/create-hike.dto';
import { UpdateHikeDto } from './dto/update-hike.dto';
import { Hike } from './entities/hike.entity';
import { LocationsService } from 'src/locations/locations.service';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

@Injectable()
export class HikesService {
  constructor(
    @InjectRepository(Hike)
    private readonly hikeRepository: Repository<Hike>,
    private readonly locationsService: LocationsService,
  ) {}

  async create(createHikeDto: CreateHikeDto): Promise<Hike> {
    const { eventId, locations: locationDtos, ...hikeData } = createHikeDto;

    // Create and save the hike entity
    const hike = this.hikeRepository.create({ ...hikeData, eventId });
    await this.hikeRepository.save(hike);

    if (locationDtos && locationDtos.length > 0) {
      // Create and save each location entity
      const locations = await Promise.all(
        locationDtos.map(locationDto => {
          const locationWithHikeId = { ...locationDto, hikeId: hike.id };
          return this.locationsService.create(locationWithHikeId);
        })
      );

      hike.locations = locations;
      await this.hikeRepository.save(hike);
    }

    return this.findOne(hike.id);
  }

  async findAll(): Promise<Hike[]> {
    return this.hikeRepository.find({ relations: ['locations'] });
  }

  async findOne(id: number): Promise<Hike> {
    const hike = await this.hikeRepository.findOne({ where: { id }, relations: ['locations'] });

    if (!hike) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }

    return hike;
  }

  async update(id: number, updateHikeDto: UpdateHikeDto): Promise<Hike> {
    const hike = await this.hikeRepository.findOne({ where: { id }, relations: ['locations'] });

    if (!hike) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }

    const { locations: locationDtos, ...hikeData } = updateHikeDto;
    Object.assign(hike, hikeData);

    if (locationDtos) {
      // Create and save each location entity
      const locations = await Promise.all(
        locationDtos.map(locationDto => {
          const locationWithHikeId = { ...locationDto, hikeId: hike.id };
          return this.locationsService.create(locationWithHikeId);
        })
      );

      hike.locations = locations;
    }

    return this.hikeRepository.save(hike);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.hikeRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Hike with ID ${id} not found`);
    }
  }
}
