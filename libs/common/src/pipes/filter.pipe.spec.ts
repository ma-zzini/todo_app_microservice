import { FindTodoDto } from 'apps/todo/src/dto/find-todo.dto';
import { FilterPipe } from './filter.pipe';

describe('filterPipe', () => {
  let filterPipe: FilterPipe = new FilterPipe([
    'title',
    'description',
    'status',
    'date',
  ]);
  let value = {
    title: 'sas',
    sas: 2,
    status: 'TODO',
  };
  let filterdValue;

  beforeEach(async () => {
    filterdValue = await filterPipe.transform(value);
  });

  test('it should return filtered value', () => {
    expect(filterdValue).toEqual({
      title: 'sas',
      status: 'TODO',
    });
  });
});
