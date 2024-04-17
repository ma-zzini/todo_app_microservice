import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userDto } from './user.dto';

export class CreateUserDto extends PartialType(userDto) {
  @ApiProperty({
    example: 'sas@sas.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'passverysecure',
    required: true,
  })
  @IsString()
  password: string;
}
