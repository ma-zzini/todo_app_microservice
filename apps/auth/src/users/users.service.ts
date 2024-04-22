import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entitis/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created-event';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject('EMAIL_SENDER') private client: ClientProxy,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUser: CreateUserDto) {
    const newUser = await this.entityManager.save<User>(
      new User({
        email: createUser.email,
        password: createUser.password,
      }),
    );

    const event = new UserCreatedEvent();
    event.email = newUser.email;
    event.id = newUser.id;
    this.client.emit('send_all', event);

    return newUser;
  }

  async find(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
