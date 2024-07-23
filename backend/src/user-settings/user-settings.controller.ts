import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { CreateUserSettingDto } from './dto/create-user-setting.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Ownership } from 'src/role/ownership.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/roles.guard';


@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService,
    private readonly  userProfileService:UserProfilesService
  ) {}

  @Post()
  create(@Body() createUserSettingDto: CreateUserSettingDto) {
    return this.userSettingsService.create(createUserSettingDto);
  }

  @Get()
  findAll() {
    return this.userSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSettingsService.findOne(+id);
  }


  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard,RolesGuard)
  @Ownership()
  async update(@Param('id') id: string, @Body() updateUserSettingDto: UpdateUserSettingDto) {
    const userProfileId = await this.userProfileService.findUserProfileByUserId(+id)
    return this.userSettingsService.update(+id, updateUserSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSettingsService.remove(+id);
  }
}
