import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(userName: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { userName } });
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async createUser(username: string,email:string, password: string, roles: string[]): Promise<User> {
    const user = this.usersRepository.create({ userName:username, password, roles ,email});
    return this.usersRepository.save(user);
  }
}
