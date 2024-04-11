import { AbstractEntity, STATUS } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('todos')
export class Todo extends AbstractEntity<Todo> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: STATUS })
  status: STATUS;

  @Column()
  date: Date;
}
