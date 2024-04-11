import { todoStub } from '../test/stubs/todo.stub';

export const TodoService = jest.fn().mockReturnValue({
  findOne: jest.fn().mockReturnValue(todoStub()),
  findMany: jest.fn().mockReturnValue([todoStub()]),
  create: jest.fn().mockReturnValue(todoStub()),
  delete: jest.fn().mockReturnValue({
    raw: [],
    affected: 1,
  }),
  update: jest.fn().mockReturnValue({
    raw: [],
    affected: 1,
  }),
});
