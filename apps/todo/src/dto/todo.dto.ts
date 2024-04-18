import { STATUS } from '@app/common';
import { UUID } from 'crypto';

export class TodoDto {
  id: string;
  title: string;
  description: string;
  status: STATUS;
  date: Date;
}
