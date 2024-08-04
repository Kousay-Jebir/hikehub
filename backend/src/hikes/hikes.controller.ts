import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HikesService } from './hikes.service';
import { CreateHikeDto } from './dto/create-hike.dto';
import { UpdateHikeDto } from './dto/update-hike.dto';

@Controller('hikes')
export class HikesController {
  constructor(private readonly hikesService: HikesService) {}

  @Post()
  create(@Body() createHikeDto: CreateHikeDto) {
    return this.hikesService.create(createHikeDto);
  }

  @Get()
  findAll() {
    return this.hikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.hikesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateHikeDto: UpdateHikeDto) {
    return this.hikesService.update(id, updateHikeDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.hikesService.remove(id);
  }
}
