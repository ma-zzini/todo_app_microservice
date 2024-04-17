import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDto) {
    const { email, password } = createUser;
    const saltOrRounds = 10;
    const hashPass = await bcrypt.hash(password, saltOrRounds);

    if ((await this.userService.find(email)) != null) {
      return this.login(createUser);
    }

    const newUser = await this.userService.create({
      email,
      password: hashPass,
    });

    return {
      accessToken: await this.jwtService.signAsync({
        email: newUser.email,
        password: newUser.password,
      }),
    };
  }

  async login(createUser: CreateUserDto) {
    const { email, password } = createUser;
    const user = await this.userService.find(email);
    // this.logger.debug(user);

    if (user === null) {
      throw new UnauthorizedException('User not found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('password incorrect');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        email: user.email,
        password: user.password,
      }),
    };
  }
}
