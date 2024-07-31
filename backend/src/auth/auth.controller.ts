import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RoleBasedProfileInterceptor } from 'src/common/interceptors/role-based-profile.interceptor';
import { SignUpDto } from './dto/signup.dto';
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
  async signUp(@Body(new ValidationPipe({ transform: true })) signUpDto: SignUpDto) {
    try {
      return await this.authService.signUp(signUpDto.userName, signUpDto.email, signUpDto.password, signUpDto.roles);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
