import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { STATUS } from '@app/common';
import { FindTodoDto } from './dto/find-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly enityManager: EntityManager,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const new_todo = new Todo({
      date: new Date(),
      status: createTodoDto.status,
      title: createTodoDto.title,
      description: createTodoDto.description,
    });
    return this.enityManager.save<Todo>(new_todo);
  }

  async findOne(id: string) {
    return this.todoRepository.findOneBy({
      id: id,
    });
  }

  async findMany(findTodoDto: FindTodoDto) {
    return this.todoRepository.find({
      where: findTodoDto,
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update(id, new Todo(updateTodoDto));
  }

  async delete(id: string) {
    return await this.todoRepository.delete(id);
  }
}
