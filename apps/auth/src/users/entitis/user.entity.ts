import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column({ default: '' })
  username: string;

  @Column()
  password: string;
}
