import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizationProfilesService } from './organization-profiles.service';
import { CreateOrganizationProfileDto } from './dto/create-organization-profile.dto';
import { UpdateOrganizationProfileDto } from './dto/update-organization-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Ownership } from 'src/role/ownership.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationProfilesService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Ownership()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationProfileDto: UpdateOrganizationProfileDto) {
    return this.organizationProfilesService.update(+id, updateOrganizationProfileDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationProfilesService.remove(+id);
  }
}
