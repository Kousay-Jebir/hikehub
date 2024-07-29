import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/users/users.service';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';

@Injectable()
export class UserInfoInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UsersService,
    private readonly userSettingsService: UserSettingsService,
    private readonly profileService: UserProfilesService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const authenticatedUserId = req.user?.sub; // ID of the authenticated user
    const requestUserId = +req.params.id; // ID from the URL

    // Retrieve the user profile using the provided ID
    const requestUser = await this.userService.findById(requestUserId);
    if (!requestUser) {
      throw new NotFoundException('User profile not found');
    }

    // Retrieve the roles of the user whose ID is in the URL
    const userRoles = requestUser.roles; // Adjust if necessary based on your data structure

    // If the user's role includes 'organizer', no further checks are needed
    if (userRoles?.includes('organizer')) {
      return next.handle();
    }

    // If the user's role includes 'hiker'
    if (userRoles?.includes('hiker')) {
      // Allow the request to proceed if the authenticated user is the same as the requested user
      if (authenticatedUserId === requestUserId) {
        return next.handle();
      }

      // Retrieve the settings of the user with the ID from the URL
      const userProfileId = await this.profileService.findUserProfileByUserId(requestUserId)
      const userSettings = await this.userSettingsService.findOne(userProfileId);
      if (!userSettings) {
        throw new NotFoundException('User settings not found');
      }

      // Modify the response based on user settings
      return next.handle().pipe(map(data => {
        // Filter private data based on user settings
        if (!userSettings.isEmailExposed) {
          data.email = null;
        }
        if(userSettings.birthdayPrivacy){
          data.birthday = null;
        }
        if(userSettings.phoneNumberPrivacy){
          data.phoneNumber = null;
        }
        // Add additional checks for other private fields if needed
        return data;
      }));
    }

    // If none of the above conditions are met, deny access
    throw new ForbiddenException('Access denied');
  }
}
