import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { FilterPipe } from '@app/common/pipes/filter.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new FilterPipe(['email', 'password']))
  register(@Body(ValidationPipe) userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  @UsePipes(new FilterPipe(['email', 'password']))
  login(@Body(ValidationPipe) userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }
}
