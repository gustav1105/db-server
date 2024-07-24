// Original file: proto/products.proto


export interface ListProductsRequest {
  'search'?: (string);
  'limit'?: (number);
  'offset'?: (number);
}

export interface ListProductsRequest__Output {
  'search': (string);
  'limit': (number);
  'offset': (number);
}
