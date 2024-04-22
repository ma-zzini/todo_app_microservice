import { NestFactory } from '@nestjs/core';
import { TodoModule } from './todo.module';
import { LoggingInterceptor } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(TodoModule);
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Todo API')
    .setVersion('1.0')
    .addTag('todo')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  app.useGlobalInterceptors(new LoggingInterceptor());
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: { port: 3001 },
  // });

  // await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
