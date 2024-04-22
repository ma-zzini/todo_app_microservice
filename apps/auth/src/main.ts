import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { LoggingInterceptor } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setDescription('Auth API')
    .setVersion('1.0')
    .addTag('Auth')
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
