// Generated by https://quicktype.io

export interface IProductResponse {
  ok: boolean;
  products: Array<IProduct>;
}

export interface IProduct {
  name: string;
  details: string;
  price: number;
  enable: boolean;
  uid: string;
  image: string;
  pathImage: string;
}

export interface IProductRequest {
  name: string;
  details: string;
  price: number;
}

export interface IUpdateProductRequest {
  name: string;
  details: string;
  price: number;
  enable: boolean;
  uid: string;
  image: string;
}