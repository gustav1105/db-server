import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcOptions: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_SERVER || 'localhost:50051',
    package: 'products',
    protoPath: join(__dirname, '../proto/products.proto'),
  },
};
