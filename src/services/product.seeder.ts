import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { promises as fs } from 'fs';
import * as path from 'path';
import axios, { AxiosInstance } from 'axios';
import {
  productDetailProperties,
  ProductDetails,
} from '@/interfaces/product-details.interface';

@Injectable()
export class ProductSeedService implements OnModuleInit {
  private readonly axiosInstance: AxiosInstance;

  constructor(private readonly prisma: PrismaService) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.openai.com/v1/',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

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

        for (const filename of productFiles) {
          const filePath = path.join(categoryPath, filename); // Full path to the file

          // Read the file content as a string
          const fileContent = await fs.readFile(filePath, 'utf-8');

          // Check if a product with the same filename already exists
          const existingProduct = await this.prisma.productDetails.findUnique({
            where: {
              filename: filename,
            },
          });

          // If the product does not exist, parse the product details
          if (!existingProduct) {
            try {
              const parsedDetails = await this.parseProductDetails(fileContent);

              if (parsedDetails.choices[0].message.content) {
                const productDetails: ProductDetails = JSON.parse(
                  parsedDetails.choices[0].message.content,
                );
                productDetails.category = category;

                await this.prisma.productDetails.create({
                  data: {
                    details: JSON.stringify(productDetails),
                    filename: filename, // Save filename to the database
                  },
                });
                console.log(`Successfully inserted product: ${filename}`);
              } else {
                console.error(
                  `No details returned from OpenAI for file: ${filename}`,
                );
              }
            } catch (parseError) {
              console.error(
                `Failed to parse product details for file ${filename}:`,
                parseError,
              );
            }
          } else {
            console.log(
              `Product with filename ${filename} already exists, skipping...`,
            );
          }
        }
      } catch (err) {
        console.error(
          `Error reading files in category ${category}:`,
          JSON.stringify(err, null, 2),
        );
      }
    }
  }

  private async parseProductDetails(text: string): Promise<any> {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: this.inputPromptText(text) }],
    };

    try {
      const response = await this.axiosInstance.post(
        'chat/completions',
        payload,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.message ||
        'An error occurred';
      throw new Error(`OpenAI API call failed: ${errorMessage}`);
    }
  }

  private inputPromptText(input: string): string {
    const properties = productDetailProperties.join(', ');

    return `I would like to populate the following ${properties} based on the next raw data i could find about it. the following rules should be applied. specifications are a list use numbers if able to find, launch date if it can be found, category can be left blank. please output only the properties in JSON string. Here after the raw information about it ${input}`;
  }
}
