import { Injectable } from '@nestjs/common';
import { CreateOrganizationProfileDto } from './dto/create-organization-profile.dto';
import { UpdateOrganizationProfileDto } from './dto/update-organization-profile.dto';

@Injectable()
export class OrganizationProfilesService {
  create(createOrganizationProfileDto: CreateOrganizationProfileDto) {
    return 'This action adds a new organizationProfile';
  }

  findAll() {
    return `This action returns all organizationProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationProfile`;
  }

  update(id: number, updateOrganizationProfileDto: UpdateOrganizationProfileDto) {
    return `This action updates a #${id} organizationProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationProfile`;
  }
}
