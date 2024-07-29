import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RoleBasedProfileInterceptor } from 'src/common/interceptors/role-based-profile.interceptor';
import { Request } from 'express';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UseInterceptors(RoleBasedProfileInterceptor)
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto.userName,signUpDto.email, signUpDto.password, signUpDto.roles);
  }

}
