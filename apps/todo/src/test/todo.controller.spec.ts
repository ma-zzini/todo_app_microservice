import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from '../todo.controller';
import { TodoService } from '../todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { todoStub } from './stubs/todo.stub';
import { Todo } from '../entities/todo.entity';
import { FindTodoDto } from '../dto/find-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

jest.mock('../todo.service');

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = app.get<TodoController>(TodoController);
    todoService = app.get<TodoService>(TodoService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    let todo: Todo;

    beforeEach(async () => {
      todo = await todoController.create(todoStub());
    });

    describe('when create is called', () => {
      test('then it should call todoService', () => {
        expect(todoService.create).toHaveBeenCalledWith(todoStub());
      });
      test('then it should return todo', () => {
        expect(todo).toEqual(todoStub());
      });
    });
  });

  describe('findOne', () => {
    let todo: Todo;
    let id: string = todoStub().id;

    beforeEach(async () => {
      todo = await todoController.findOne(id);
    });

    describe('when create is called', () => {
      test('then it should call todoService', () => {
        expect(todoService.findOne).toHaveBeenCalledWith(id);
      });
      test('then it should return todo', () => {
        expect(todo).toEqual(todoStub());
      });
    });
  });

  describe('findMany', () => {
    let todos: Todo[];
    let findTodo: FindTodoDto = {
      title: todoStub().title,
    };

    beforeEach(async () => {
      todos = await todoController.findMany(findTodo);
    });

    describe('when create is called', () => {
      test('then it should call todoService', () => {
        expect(todoService.findMany).toHaveBeenCalledWith(findTodo);
      });

      test('then it should return todo', () => {
        expect(todos).toEqual([todoStub()]);
      });
    });
  });

  describe('update', () => {
    let updatedTodo: UpdateResult;
    let id: string = todoStub().id;
    let updateTodo: UpdateTodoDto = {
      title: 'new_title',
      description: 'sas',
    };

    beforeEach(async () => {
      updatedTodo = await todoController.update(id, updateTodo);
    });

    describe('when create is called', () => {
      test('then it should call todoService', () => {
        expect(todoService.update).toHaveBeenCalledWith(id, updateTodo);
      });
      test('then it should return todo', () => {
        expect(updatedTodo).toEqual({
          raw: [],
          affected: 1,
        });
      });
    });
  });

  describe('delete', () => {
    let deletedTodo: DeleteResult;
    let id: string = todoStub().id;

    beforeEach(async () => {
      deletedTodo = await todoController.delete(id);
    });

    describe('when create is called', () => {
      test('then it should call todoService', () => {
        expect(todoService.delete).toHaveBeenCalledWith(id);
      });
      test('then it should return todo', () => {
        expect(deletedTodo).toEqual({
          raw: [],
          affected: 1,
        });
      });
    });
  });
});
