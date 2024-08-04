import { Controller, Get, Post, Body, Param, Delete, NotFoundException, BadRequestException, UseInterceptors, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoInterceptor } from 'src/user-info/user-info.interceptor';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, roles } = createUserDto;
    if (!userName || !email || !password || !roles) {
      throw new BadRequestException('All fields are required');
    }
    return this.usersService.createUser(userName, email, password, roles);
  }

  @Get('info/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInfoInterceptor)
  async getInfo(@Param('id',ParseIntPipe) id: number): Promise<User> {
    const info = await this.usersService.getInfo(id);
    if (!info) {
      throw new NotFoundException(`Info with ID ${id} not found`);
    }
    return info;
  }

  @Get(':id')
  async findById(@Param('id',ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number): Promise<void> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersService.remove(id);
  }
}
