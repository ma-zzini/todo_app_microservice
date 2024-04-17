import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { AuthGuard, LoggingInterceptor } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Todo API')
    .setVersion('1.0')
    .addTag('todo')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalGuards();
  await app.listen(3000);
}
bootstrap();
