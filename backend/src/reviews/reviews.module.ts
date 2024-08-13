import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
@Module({
  imports: [TypeOrmModule.forFeature([Review]),EventsModule,UserProfilesModule,NotificationsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
