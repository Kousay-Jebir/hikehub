import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSetting } from './entities/user-setting.entity';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserSetting]),UserProfilesModule],
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
  exports:[UserSettingsService]
})
export class UserSettingsModule {
  
}
