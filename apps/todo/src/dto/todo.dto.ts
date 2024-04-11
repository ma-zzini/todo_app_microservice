import { STATUS } from '@app/common';

export class TodoDto {
  id: string;
  title: string;
  description: string;
  status: STATUS;
  date: Date;
}
