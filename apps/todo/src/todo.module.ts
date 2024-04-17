import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule, JwtAuthGuard, JwtAuthModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Todo]), JwtAuthModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class TodoModule {}
