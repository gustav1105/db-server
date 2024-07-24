import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { GetProductByIdRequest } from '@/grpc/products/GetProductByIdRequest';
import { ListProductsRequest } from '@/grpc/products/ListProductsRequest';
import { ProductResponse } from '@/grpc/products/ProductResponse';
import { ListProductsResponse } from '@/grpc/products/ListProductsResponse';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getProductById(data: GetProductByIdRequest): Observable<ProductResponse> {
    const productPromise = this.prisma.productDetails.findUnique({
      where: { id: data.id },
    });

    return from(productPromise).pipe(
      catchError(() => throwError(() => new Error('Error fetching product'))),
      map((product) => {
        if (!product) {
          throw new Error('Product not found');
        }
        return { id: product.id, details: product.details };
      }),
    );
  }

  listProducts(data: ListProductsRequest): Observable<ListProductsResponse> {
    const { search, limit = 0, offset = 0 } = data;

    const productsPromise = this.prisma.productDetails.findMany({
      
    });

    return from(productsPromise).pipe(
      catchError(() => throwError(() => new Error('Error fetching products'))),
      map((products) => ({
        products: products.map((product) => ({
          id: product.id,
          details: product.details,
        })),
      })),
    );
  }
}
