import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfile } from './entities/user-profile.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)

    private readonly userProfileRepository: Repository<UserProfile>
   
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    console.log("DTO received:", createUserProfileDto);
    
    const userProfile = this.userProfileRepository.create(createUserProfileDto);
    console.log("User profile created:", userProfile);
  
    try {
      const savedProfile = await this.userProfileRepository.save(userProfile);
      console.log("User profile saved:", savedProfile);
      return savedProfile;
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new HttpException('Failed to create user profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOneBy({id});
    if (!userProfile) {
      throw new NotFoundException(`UserProfile #${id} not found`);
    }
    return userProfile;
  }

  async update(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    await this.userProfileRepository.update(id, updateUserProfileDto);
    const updatedUserProfile = await this.userProfileRepository.findOneBy({id});
    if (!updatedUserProfile) {
      throw new NotFoundException(`UserProfile #${id} not found`);
    }
    return updatedUserProfile;
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.userProfileRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`UserProfile #${id} not found`);
    }
  }
}
