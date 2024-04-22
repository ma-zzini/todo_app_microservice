import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { User } from './users/entitis/user.entity';

@Module({
  imports: [
    UsersModule,
    JwtAuthModule,
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'EMAIL_SENDER',
        transport: Transport.TCP,
        options: { host: 'ermes', port: 4000 },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
