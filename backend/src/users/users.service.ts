import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.usersRepository.findOne({ where: { id }});
  }

  async createUser(username: string,email:string, password: string, roles: string): Promise<User> {
    const user = this.usersRepository.create({ userName:username, password, roles ,email});
    return this.usersRepository.save(user);
  }

  async getInfo(id: number): Promise<any | undefined> {
    // Fetch the user with their role
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'userName', 'email', 'roles'] // Fetch only necessary fields
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Determine which profile to fetch based on the user's role
    const profileRelation = user.roles.includes('organizer') ? 'organizationProfile' : 'userProfile';

    // Fetch the user with the appropriate profile relation
    const userWithProfile = await this.usersRepository.findOne({
      where: { id },
      relations: [profileRelation]
    });

    if (!userWithProfile) {
      throw new NotFoundException('User with profile not found');
    }

    // Extract profile information based on the determined profile type
    const profile = userWithProfile[profileRelation];

    // Construct the response object
    const info = {
      userName: userWithProfile.userName,
      email: userWithProfile.email,
      ...profile
    };

    return info;
  }
  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
