import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { HikesService } from './hikes.service';
import { CreateHikeDto } from './dto/create-hike.dto';
import { UpdateHikeDto } from './dto/update-hike.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('hikes')
@UseGuards(AuthGuard)
export class HikesController {
  constructor(private readonly hikesService: HikesService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
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

  /* @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateHikeDto: UpdateHikeDto) {
    return this.hikesService.update(id, updateHikeDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.hikesService.remove(id);
  } */
}
