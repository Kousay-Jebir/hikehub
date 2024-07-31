import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  // Method to sign in a user
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ roles: string, id: number, access_token: string }> {
    // Fetch the user from the database
    const user = await this.usersService.findByEmail(email);

    // If user is not found or password is incorrect, throw unauthorized exception
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }

    // Generate JWT payload
    const payload = { username: user.userName, sub: user.id, roles: user.roles };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      id: user.id,
      roles: user.roles,
    };
  }

  // Method to sign up a new user
  async signUp(
    userName: string,
    email: string,
    pass: string,
    roles: string
  ): Promise<{ roles: string, id: number, access_token: string }> {
    // Hash the password before saving it
    const saltRounds = 10; // Adjust as needed
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // Create a new user with hashed password
    const user = await this.usersService.createUser(userName, email, hashedPassword, roles);
    
    // Generate JWT payload
    const payload = { username: user.userName, sub: user.id, roles: user.roles };
    
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload),
      roles: user.roles,
    };
  }
}
