import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { PrismaService } from './services/prisma.service';
import { ProductSeedService } from '@/services/product.seeder';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_SERVER || 'localhost:50051',
          package: 'products',
          protoPath: join(__dirname, '../proto/products.proto'),
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductSeedService],
})
export class AppModule {}
