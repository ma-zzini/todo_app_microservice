import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FindTodoDto } from './dto/find-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FilterPipe } from '@app/common/pipes/filter.pipe';

@ApiTags('todo')
@ApiTags('Protected')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'create a new todo' })
  @ApiBody({
    type: CreateTodoDto,
    description: 'Json structure for todo object',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'find a todo' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID univoco',
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
  })
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'find todos' })
  @ApiBody({
    type: FindTodoDto,
    description: 'Json structure for todo object',
  })
  @UsePipes(new FilterPipe(['title', 'date', 'status', 'description']))
  async findMany(
    @Body(ValidationPipe) findTodoDto: FindTodoDto,
  ): Promise<Todo[]> {
    return this.todoService.findMany(findTodoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'patch todo' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID univoco',
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: 'Json structure for todo object',
  })
  @UsePipes(new FilterPipe(['title', 'status', 'description']))
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete todo' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID univoco',
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
  })
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.delete(id);
  }
}
