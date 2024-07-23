// src/user-settings/user-settings.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserSettingDto } from './dto/create-user-setting.dto';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { UserSetting } from './entities/user-setting.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingsRepository: Repository<UserSetting>,
  ) {}

  async create(createUserSettingDto: CreateUserSettingDto): Promise<UserSetting> {
    console.log("DTO received:", createUserSettingDto);
    
    const userSetting = this.userSettingsRepository.create(createUserSettingDto);
    console.log("User setting created:", userSetting);
  
    try {
      const savedSetting = await this.userSettingsRepository.save(userSetting);
      console.log("User setting saved:", savedSetting);
      return savedSetting;
    } catch (error) {
      console.error("Error saving user setting:", error);
      throw new HttpException('Failed to create user setting', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<UserSetting[]> {
    return this.userSettingsRepository.find();
  }

  async findOne(id: number): Promise<UserSetting> {
    const userSetting = await this.userSettingsRepository.findOneBy({ id });
    if (!userSetting) {
      throw new NotFoundException(`UserSetting #${id} not found`);
    }
    return userSetting;
  }

  async update(userProfileId: number, updateUserSettingDto: UpdateUserSettingDto): Promise<UserSetting> {
    const userSetting = await this.userSettingsRepository.findOneBy({ userProfileId });
    if (!userSetting) {
      throw new NotFoundException(`UserSetting #${userProfileId} not found`);
    }
    await this.userSettingsRepository.update({ userProfileId }, updateUserSettingDto);
    const updatedUserSetting = await this.userSettingsRepository.findOneBy({ userProfileId });
    return updatedUserSetting;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.userSettingsRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`UserSetting #${id} not found`);
    }
  }
}
