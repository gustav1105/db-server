import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcOptions } from '../grpc.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(grpcOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
