import { STATUS } from '@app/common';
import { Todo } from '../../entities/todo.entity';

export const todoStub = (): Todo => {
  return new Todo({
    title: 'pizza Margheirta',
    description: 'sas',
    date: new Date('2024-04-05T15:27:39.792Z'),
    status: STATUS.Todo,
  });
};
