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

  async findOne(id: number): Promise<any> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { id },
      relations: ['user'], // This assumes there is a relation set up between UserProfile and User
    });

    if (!userProfile) {
      throw new NotFoundException(`UserProfile #${id} not found`);
    }

    const userName = userProfile.user.userName; // Adjust the field name according to your User entity
    return { ...userProfile, userName };
  }
  async findUserProfileByUserId(id:number): Promise<number> {
    const profileId = (await this.userProfileRepository.findOneBy({userId:id})).id;
    return profileId
  }

  async update(userId: number, updateUserProfileDto: UpdateUserProfileDto): Promise<UserProfile> {
    // Find the UserProfile by userId
    const userProfile = await this.userProfileRepository.findOneBy({ userId });
  
    // If UserProfile not found, throw NotFoundException
    if (!userProfile) {
      throw new NotFoundException(`UserProfile with userId #${userId} not found`);
    }
  
    // Update the UserProfile
    await this.userProfileRepository.update({ userId }, updateUserProfileDto);
  
    // Fetch the updated UserProfile
    const updatedUserProfile = await this.userProfileRepository.findOneBy({ userId });
  
    // Return the updated UserProfile
    return updatedUserProfile;
  }
  
  async remove(id: number): Promise<void> {
    const deleteResult = await this.userProfileRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`UserProfile #${id} not found`);
    }
  }

  async getUserNameByUserProfileId(id: number): Promise<string | null> {
    const profile =  await this.userProfileRepository.findOne({where:{id},relations:['user']})
    return profile.user.userName
}



}
