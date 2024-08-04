import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/roles.guard';
import { Ownership } from 'src/role/ownership.decorator';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Post()
  create(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.userProfilesService.create(createUserProfileDto);
  }

  @Get()
  findAll() {
    return this.userProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.userProfilesService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard,RolesGuard)
  @Ownership()
  @Roles(Role.Hiker)
  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    console.log(id);
    return this.userProfilesService.update(id, updateUserProfileDto);

  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.userProfilesService.remove(id);
  }
}
