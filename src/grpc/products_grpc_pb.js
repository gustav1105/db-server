// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var products_pb = require('./products_pb.js');

function serialize_products_GetProductByIdRequest(arg) {
  if (!(arg instanceof products_pb.GetProductByIdRequest)) {
    throw new Error('Expected argument of type products.GetProductByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_products_GetProductByIdRequest(buffer_arg) {
  return products_pb.GetProductByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_products_ListProductsRequest(arg) {
  if (!(arg instanceof products_pb.ListProductsRequest)) {
    throw new Error('Expected argument of type products.ListProductsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_products_ListProductsRequest(buffer_arg) {
  return products_pb.ListProductsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_products_ListProductsResponse(arg) {
  if (!(arg instanceof products_pb.ListProductsResponse)) {
    throw new Error('Expected argument of type products.ListProductsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_products_ListProductsResponse(buffer_arg) {
  return products_pb.ListProductsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_products_ProductResponse(arg) {
  if (!(arg instanceof products_pb.ProductResponse)) {
    throw new Error('Expected argument of type products.ProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_products_ProductResponse(buffer_arg) {
  return products_pb.ProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductServiceService = exports.ProductServiceService = {
  getProductById: {
    path: '/products.ProductService/GetProductById',
    requestStream: false,
    responseStream: false,
    requestType: products_pb.GetProductByIdRequest,
    responseType: products_pb.ProductResponse,
    requestSerialize: serialize_products_GetProductByIdRequest,
    requestDeserialize: deserialize_products_GetProductByIdRequest,
    responseSerialize: serialize_products_ProductResponse,
    responseDeserialize: deserialize_products_ProductResponse,
  },
  listProducts: {
    path: '/products.ProductService/ListProducts',
    requestStream: false,
    responseStream: false,
    requestType: products_pb.ListProductsRequest,
    responseType: products_pb.ListProductsResponse,
    requestSerialize: serialize_products_ListProductsRequest,
    requestDeserialize: deserialize_products_ListProductsRequest,
    responseSerialize: serialize_products_ListProductsResponse,
    responseDeserialize: deserialize_products_ListProductsResponse,
  },
};

exports.ProductServiceClient = grpc.makeGenericClientConstructor(ProductServiceService);
