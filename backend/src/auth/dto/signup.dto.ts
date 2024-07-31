import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Username is required' })
  userName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Role is required' })
  roles: string;  // Define roles as a string
}
