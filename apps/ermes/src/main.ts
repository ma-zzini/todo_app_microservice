import { NestFactory } from '@nestjs/core';
import { ErmesModule } from './ermes.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggingInterceptor } from '@app/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ErmesModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 4000,
      },
    },
  );

  await app.listen();
}
bootstrap();
