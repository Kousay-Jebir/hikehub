import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ParticipationsService } from './participations.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';

@Controller('participations')
@UseGuards(AuthGuard)
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService
    , private readonly organizationProfileService:OrganizationProfilesService
  ) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Hiker)
  @Post()
  create(@Body() createParticipationDto: CreateParticipationDto) {
    return this.participationsService.createParticipation(createParticipationDto);
  }

  @Get()
  findAll() {
    return this.participationsService.findAll();
  }


  @Get("event/:eventId")
  async getParticipants(
    @Param('eventId',ParseIntPipe) eventId:number
  ){
    return this.participationsService.getEventParticipants(eventId);
  }

  @Get(':eventId/:userProfileId')
  async findOne(
    @Param('eventId',ParseIntPipe) eventId: number,
    @Param('userProfileId',ParseIntPipe) userProfileId: number
  ) {
    return this.participationsService.findOne(eventId, userProfileId);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.Organizer)
  @Patch(':eventId/:userProfileId')
  async updateParticipation(
    @Param('eventId',ParseIntPipe) eventId: number,
    @Param('userProfileId',ParseIntPipe) userProfileId: number,
    @Body() updateParticipationDto: UpdateParticipationDto,
    @CurrentUser()user:any
  ) {
    const event = await this.participationsService.getEvent(eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const id = await this.organizationProfileService.findOrganizationProfileByUserId(user.sub);
    console.log("THE ID IS"+id)
    if (event.organizerId !== id) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
    
    return this.participationsService.updateParticipation(eventId, userProfileId, updateParticipationDto);
  }

  /* @Delete(':eventId/:userProfileId')
  async removeParticipation(
    @Param('eventId',ParseIntPipe) eventId: number,
    @Param('userProfileId',ParseIntPipe) userProfileId: number
  ) {
    return this.participationsService.removeParticipation(eventId, userProfileId);
  } */
}
