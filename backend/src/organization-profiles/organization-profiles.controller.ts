import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrganizationProfilesService } from './organization-profiles.service';
import { CreateOrganizationProfileDto } from './dto/create-organization-profile.dto';
import { UpdateOrganizationProfileDto } from './dto/update-organization-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Ownership } from 'src/role/ownership.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('organization-profiles')
export class OrganizationProfilesController {
  constructor(private readonly organizationProfilesService: OrganizationProfilesService) {}

  @Post()
  create(@Body() createOrganizationProfileDto: CreateOrganizationProfileDto) {
    return this.organizationProfilesService.create(createOrganizationProfileDto);
  }

  @Get()
  findAll() {
    return this.organizationProfilesService.findAll();
  }

  @Get("user/:id")
  async getOrganizationProfileIdByUserId(@Param('id',ParseIntPipe) id: number){
    return await this.organizationProfilesService.findOrganizationProfileByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.organizationProfilesService.findOne(id);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Organizer)
  @ApiBearerAuth()
  @Ownership()
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateOrganizationProfileDto: UpdateOrganizationProfileDto) {
    return this.organizationProfilesService.update(id, updateOrganizationProfileDto);
  }
  

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.organizationProfilesService.remove(id);
  }

 
}
