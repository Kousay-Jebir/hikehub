import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './role/roles.guard';
import { Roles } from './role/roles.decorator';
import { Role } from './enums/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Organizer)
  getAdminResource() {
    return 'This is an organizator resource';
  }

  @Get('user')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Hiker)
  getUserResource() {
    return 'This is a hiker resource';
  }



}
