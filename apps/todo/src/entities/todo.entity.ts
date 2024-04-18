import { AbstractEntity, STATUS, User } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('todos')
export class Todo extends AbstractEntity<Todo> {
  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.Todo })
  status: STATUS;

  @Column()
  date: Date;

  @Column({ nullable: false })
  userid: string;
}
