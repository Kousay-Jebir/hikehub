import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { EventsModule } from './events/events.module';
import { HikesModule } from './hikes/hikes.module';
import { LocationsModule } from './locations/locations.module';
import { ParticipationsModule } from './participations/participations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrganizationProfilesModule } from './organization-profiles/organization-profiles.module';
import { User } from './users/user.entity';
import { UserProfile } from './user-profiles/entities/user-profile.entity';
import { OrganizationProfile } from './organization-profiles/entities/organization-profile.entity';
import { Hike } from './hikes/entities/hike.entity';
import { Event } from './events/entities/event.entity';
import { Participation } from './participations/entities/participation.entity';
import { Review } from './reviews/entities/review.entity';
import { Location } from './locations/entities/location.entity';
import { UserSetting } from './user-settings/entities/user-setting.entity';
import { SearchModule } from './search-engine/search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: '123456',
      database: 'hikehubdb',
      entities: [User,UserProfile,OrganizationProfile,Hike,Event,Participation,Review,Location,UserSetting,Notification],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    UserSettingsModule,
    EventsModule,
    HikesModule,
    LocationsModule,
    ParticipationsModule,
    ReviewsModule,
    OrganizationProfilesModule,
    SearchModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
