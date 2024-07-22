
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.userName, sub: user.id, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    userName:string,
    email: string,
    pass: string,
    roles:string
  ): Promise<{ id:number,access_token: string }> {
    const user = await this.usersService.createUser(userName,email,pass,roles);
    const payload = { username: user.userName, sub: user.id, roles: user.roles };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      id:user.id,
      access_token
    };
  }
}

