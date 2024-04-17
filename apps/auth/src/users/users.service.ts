import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entitis/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUser: CreateUserDto) {
    const newUser = new User({
      email: createUser.email,
      password: createUser.password,
    });

    return await this.entityManager.save<User>(newUser);
  }

  async find(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
