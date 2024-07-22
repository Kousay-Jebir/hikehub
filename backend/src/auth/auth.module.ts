
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { OrganizationProfilesModule } from 'src/organization-profiles/organization-profiles.module';


@Module({
  imports: [
    UsersModule,
    UserProfilesModule,
    OrganizationProfilesModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET || jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

