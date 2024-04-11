import { PartialType } from '@nestjs/mapped-types';
import { STATUS } from '@app/common';
import { TodoDto } from './todo.dto';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindTodoDto extends PartialType(TodoDto) {
  @ApiProperty({
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  date?: Date;

  @ApiProperty({
    example: 'todo title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'todo description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: STATUS.Todo,
    required: false,
  })
  @IsOptional()
  @IsEnum(STATUS)
  status?: STATUS;
}
