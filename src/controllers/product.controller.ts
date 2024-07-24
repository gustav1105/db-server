import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from '@/services/product.service';
import { GetProductByIdRequest } from '@/grpc/products/GetProductByIdRequest';
import { ListProductsRequest } from '@/grpc/products/ListProductsRequest';
import { ProductResponse } from '@/grpc/products/ProductResponse';
import { ListProductsResponse } from '@/grpc/products/ListProductsResponse';
import { Observable } from 'rxjs';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProductById')
  getProductById(data: GetProductByIdRequest): Observable<ProductResponse> {
    return this.productService.getProductById(data);
  }

  @GrpcMethod('ProductService', 'ListProducts')
  listProducts(data: ListProductsRequest): Observable<ListProductsResponse> {
    return this.productService.listProducts(data);
  }
}
