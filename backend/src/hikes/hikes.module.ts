import { Module } from '@nestjs/common';
import { HikesService } from './hikes.service';
import { HikesController } from './hikes.controller';
import { Hike } from './entities/hike.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from 'src/locations/locations.service';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hike]),LocationsModule],
  controllers: [HikesController],
  providers: [HikesService],
  exports:[HikesService]
})
export class HikesModule {}
