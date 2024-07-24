import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ProductSeedService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  private async seedProducts() {
    const productsPath = path.join(__dirname, '../../files/products');
    const categories = ['keyboards', 'keycaps', 'switches'];

    for (const category of categories) {
      const categoryPath = path.join(productsPath, category);
      try {
        const productFiles = await fs.readdir(categoryPath);

        for (const file of productFiles) {
          const productData = {
            summary: {
              launchedAt: new Date(),
              title: 'n/a',
              description: 'n/a',
              specifications: ['n/a'],
              manufacturer: 'n/a',
              websites: ['n/a'],
            },
            filename: file, // Add filename to details
          };

          // Check if a product with the same filename already exists
          const existingProduct = await this.prisma.productDetails.findUnique({
            where: {
              filename: file,
            },
          });

          if (!existingProduct) {
            await this.prisma.productDetails.create({
              data: {
                details: JSON.stringify(productData),
                filename: productData.filename, // Save filename to the database
              },
            });
          }
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    }
  }
}
