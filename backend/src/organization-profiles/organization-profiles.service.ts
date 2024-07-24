import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationProfile } from './entities/organization-profile.entity';
import { CreateOrganizationProfileDto } from './dto/create-organization-profile.dto';
import { UpdateOrganizationProfileDto } from './dto/update-organization-profile.dto';

@Injectable()
export class OrganizationProfilesService {
  constructor(
    @InjectRepository(OrganizationProfile)
    private readonly organizationProfileRepository: Repository<OrganizationProfile>,
  ) {}

  async create(createOrganizationProfileDto: CreateOrganizationProfileDto): Promise<OrganizationProfile> {
    const organizationProfile = this.organizationProfileRepository.create(createOrganizationProfileDto);
    return await this.organizationProfileRepository.save(organizationProfile);
  }

  async findAll(): Promise<OrganizationProfile[]> {
    return await this.organizationProfileRepository.find();
  }

  async findOne(id: number): Promise<OrganizationProfile> {
    const organizationProfile = await this.organizationProfileRepository.findOneBy({id});
    if (!organizationProfile) {
      throw new Error(`OrganizationProfile with ID ${id} not found`);
    }
    return organizationProfile;
  }

  /* async update(id: number, updateOrganizationProfileDto: UpdateOrganizationProfileDto): Promise<OrganizationProfile> {
    try {
      // Load existing profile
      const existingProfile = await this.organizationProfileRepository.findOneBy({id});
      if (!existingProfile) {
        throw new NotFoundException(`OrganizationProfile with ID ${id} not found`);
      }

      // Update with new data
      const updatedProfile = { ...existingProfile, ...updateOrganizationProfileDto };

      // Save updated profile
      return await this.organizationProfileRepository.save(updatedProfile);
    } catch (error) {
      console.error('Error updating organization profile:', error);
      throw new InternalServerErrorException('Failed to update organization profile');
    }
  } */

  async update(userId: number,updateOrganizationProfileDto: UpdateOrganizationProfileDto): Promise<OrganizationProfile> {
    
    const organizationProfile = await this.organizationProfileRepository.findOneBy({userId});
    if(!organizationProfile) {
      throw new NotFoundException(`Organization profile with userId#${userId} not found`);
    }
    await this.organizationProfileRepository.update({userId},updateOrganizationProfileDto);
    const updatedOrganizationProfile = await this.organizationProfileRepository.findOneBy({userId});
    return updatedOrganizationProfile
  }

  async remove(id: number): Promise<void> {
    const result = await this.organizationProfileRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`OrganizationProfile with ID ${id} not found`);
    }
  }

  async findOrganizationProfileByUserId(id:number): Promise<number> {
    const profileId = (await this.organizationProfileRepository.findOneBy({userId:id})).id;
    console.log(profileId);
    return profileId
  }
}
