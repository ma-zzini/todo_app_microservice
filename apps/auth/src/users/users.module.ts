import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { User } from './entitis/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'EMAIL_SENDER',
        transport: Transport.TCP,
        options: { host: 'ermes', port: 4000 },
      },
    ]),
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
