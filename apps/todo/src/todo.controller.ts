import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './services/todo.service';
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
import { STATUS } from '@app/common';

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
    @Req() request: Request,
  ): Promise<Todo> {
    const userid = request['userid'];
    return this.todoService.create(userid, createTodoDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'find a todo' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID univoco',
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
  })
  async findOne(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<Todo> {
    const userid = request['userid'];
    return this.todoService.findOne(userid, id);
  }

  @Get()
  @ApiOperation({ summary: 'find todos' })
  async findMany(
    @Req() request: Request,
    @Query(ValidationPipe) findTodoDto: FindTodoDto,
  ): Promise<Todo[]> {
    const userid = request['userid'];
    return this.todoService.findMany(userid, findTodoDto);
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
  update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body(new FilterPipe(['title', 'status', 'description']))
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    const userid = request['userid'];
    return this.todoService.update(userid, id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete todo' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID univoco',
    example: 'a2c62580-32e1-431a-8cc9-7bda679ad77e',
  })
  delete(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    const userid = request['userid'];
    return this.todoService.delete(userid, id);
  }
}
