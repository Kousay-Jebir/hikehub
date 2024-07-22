// src/common/interceptors/role-based-profile.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Role } from 'src/enums/role.enum'; // Import your role enum
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { OrganizationProfilesService } from 'src/organization-profiles/organization-profiles.service';
import { CreateUserProfileDto } from 'src/user-profiles/dto/create-user-profile.dto';
import { CreateOrganizationProfileDto } from 'src/organization-profiles/dto/create-organization-profile.dto';

@Injectable()
export class RoleBasedProfileInterceptor implements NestInterceptor {
  constructor(
    private readonly userProfilesService: UserProfilesService,
    private readonly organizationProfilesService: OrganizationProfilesService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.body && request.body.roles) {
      // Convert the roles string into an array of role strings
      console.log(typeof(request.body.roles))
      const roles = request.body.roles.split(',').map(role => role.trim().toLowerCase());

      // Intercept the response and create profiles after the user is created
      return next.handle().pipe(
        tap(async (data) => {
          if (data && roles) {
            if (roles.includes(Role.Hiker.toLowerCase())) {
              const userProfileDto: CreateUserProfileDto = {
                userId: data.id, // Assuming data.id is the newly created user ID
                firstName: '',
                lastName: '',
                bio: '',
                birthday: null,
                nationality: '',
                phoneNumber: '',
                genderCode: '',
              };
              await this.userProfilesService.create(userProfileDto);
            }

            if (roles.includes(Role.Organizer.toLowerCase())) {
              const organizationProfileDto: CreateOrganizationProfileDto = {
                userId: data.id, // Assuming data.id is the newly created user ID
                description: '',
                contact: {},
                social: {},
              };
              await this.organizationProfilesService.create(organizationProfileDto);
            }
          }
        }),
      );
    } else {
      // If no roles are provided, just continue with the handler
      return next.handle();
    }
  }
}
