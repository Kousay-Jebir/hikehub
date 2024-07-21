import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationProfilesController } from './organization-profiles.controller';
import { OrganizationProfilesService } from './organization-profiles.service';

describe('OrganizationProfilesController', () => {
  let controller: OrganizationProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationProfilesController],
      providers: [OrganizationProfilesService],
    }).compile();

    controller = module.get<OrganizationProfilesController>(OrganizationProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
