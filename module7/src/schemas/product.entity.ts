import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import * as uuid from 'uuid';

@Entity()
export class Product {
  @PrimaryKey({type: 'uuid'})
  id = uuid.v4()

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;
}

// export interface Products {
//   [id: string]: Product
// }
//
// export const product: Product = {
//   id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
//   title: 'Book',
//   description: 'A very interesting book',
//   price: 100
// }
//
// export const product1: Product = {
//   id: '915b2f40-9fd9-47f2-9b51-628f3dc69aac',
//   title: 'Laptop',
//   description: 'A very interesting laptop',
//   price: 300
// }