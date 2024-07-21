import { Test, TestingModule } from '@nestjs/testing';
import { HikesController } from './hikes.controller';
import { HikesService } from './hikes.service';

describe('HikesController', () => {
  let controller: HikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HikesController],
      providers: [HikesService],
    }).compile();

    controller = module.get<HikesController>(HikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
