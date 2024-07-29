
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { UserSettingsModule } from 'src/user-settings/user-settings.module';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),UserSettingsModule,UserProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
