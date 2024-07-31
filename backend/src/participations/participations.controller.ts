import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';

@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post()
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.createParticipation(createParticipationDto);
  }

  @Get()
  findAll() {
    return this.participationsService.findAll();
  }

  @Get(':eventId/:userProfileId')
  async findOne(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number
  ) {
    return this.participationsService.findOne(eventId, userProfileId);
  }

  @Patch(':eventId/:userProfileId')
  async updateParticipation(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number,
    @Body() updateParticipationDto: UpdateParticipationDto
  ) {
    return this.participationsService.updateParticipation(eventId, userProfileId, updateParticipationDto);
  }

  @Delete(':eventId/:userProfileId')
  async removeParticipation(
    @Param('eventId') eventId: number,
    @Param('userProfileId') userProfileId: number
  ) {
    return this.participationsService.removeParticipation(eventId, userProfileId);
  }
}
