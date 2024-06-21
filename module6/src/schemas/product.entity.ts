import {CartEntity} from "./cart.entity";

export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export interface Products {
  [id: string]: ProductEntity
}

export const product: ProductEntity = {
  id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
  title: 'Book',
  description: 'A very interesting book',
  price: 100
}

export const product1: ProductEntity = {
  id: '915b2f40-9fd9-47f2-9b51-628f3dc69aac',
  title: 'Laptop',
  description: 'A very interesting laptop',
  price: 300
}