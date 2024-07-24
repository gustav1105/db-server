// Original file: proto/products.proto

import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProductByIdRequest as _products_GetProductByIdRequest, GetProductByIdRequest__Output as _products_GetProductByIdRequest__Output } from '../products/GetProductByIdRequest';
import type { ListProductsRequest as _products_ListProductsRequest, ListProductsRequest__Output as _products_ListProductsRequest__Output } from '../products/ListProductsRequest';
import type { ListProductsResponse as _products_ListProductsResponse, ListProductsResponse__Output as _products_ListProductsResponse__Output } from '../products/ListProductsResponse';
import type { ProductResponse as _products_ProductResponse, ProductResponse__Output as _products_ProductResponse__Output } from '../products/ProductResponse';

export interface ProductServiceDefinition {
  GetProductById: MethodDefinition<_products_GetProductByIdRequest, _products_ProductResponse, _products_GetProductByIdRequest__Output, _products_ProductResponse__Output>
  ListProducts: MethodDefinition<_products_ListProductsRequest, _products_ListProductsResponse, _products_ListProductsRequest__Output, _products_ListProductsResponse__Output>
}
