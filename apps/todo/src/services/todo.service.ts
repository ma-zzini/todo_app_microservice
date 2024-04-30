import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { EntityManager, Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { FindTodoDto } from '../dto/find-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  private readonly logger: Logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly enityManager: EntityManager,
  ) {}

  async create(userid: string, createTodoDto: CreateTodoDto) {
    const new_todo = new Todo({
      date: new Date(),
      status: createTodoDto.status,
      title: createTodoDto.title,
      description: createTodoDto.description,
      userid: userid,
    });
    return this.enityManager.save<Todo>(new_todo);
  }

  async findOne(userid: string, id: string) {
    return this.todoRepository.findOneBy({
      id: id,
      userid: userid,
    });
  }

  // TODO: separare in file differenti in serivices
  async findMany(userid: string, findTodoDto: FindTodoDto) {
    return this.todoRepository.find({
      where: {
        ...findTodoDto,
        userid,
      },
    });
  }

  async update(userid: string, id: string, updateTodoDto: UpdateTodoDto) {
    // this.logger.debug(userid);
    // this.logger.debug(id);
    // this.logger.debug(updateTodoDto);
    return await this.todoRepository.update(
      { id, userid },
      { ...updateTodoDto },
    );
  }

  async delete(userid: string, id: string) {
    // this.logger.debug(userid);
    // this.logger.debug(id);
    return await this.todoRepository.delete({ id, userid });
  }
}
