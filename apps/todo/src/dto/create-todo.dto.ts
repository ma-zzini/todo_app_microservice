import { STATUS } from '@app/common';
import { PartialType } from '@nestjs/mapped-types';
import { TodoDto } from './todo.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto extends PartialType(TodoDto) {
  @ApiProperty({
    example: 'todo title',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'todo description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: STATUS.Todo,
    required: false,
  })
  @IsOptional()
  @IsEnum(STATUS)
  status: STATUS;
}
