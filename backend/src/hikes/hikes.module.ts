import { Module } from '@nestjs/common';
import { HikesService } from './hikes.service';
import { HikesController } from './hikes.controller';
import { Hike } from './entities/hike.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hike])],
  controllers: [HikesController],
  providers: [HikesService],
})
export class HikesModule {}
