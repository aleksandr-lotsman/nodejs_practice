import {Cart} from './cart.entity';
import {Entity, ManyToOne, OneToOne, PrimaryKey, Property} from "@mikro-orm/core";
import * as uuid from "uuid";
import {User} from "./user.entity";

type ORDER_STATUS = 'created' | 'completed';

@Entity()
export class Order {
  @PrimaryKey()
  id = uuid.v4(); // uuid

  @ManyToOne(() => User)
  user!: User;

  @OneToOne(() => Cart)
  cart!: Cart;

  // items: CartItem[] // products from CartEntity
  @Property()
  payment!: { type: string, address?: string, creditCard?: string };

  @Property()
  delivery!: { type: string, address: string };

  @Property()
  comments!: string;

  @Property()
  status: ORDER_STATUS;


  @Property()
  total!: number;
}

// export interface Orders {
//   [id: string]: Order
// }
//
// export const order: Order = {
//   id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
//   userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//   cartId: '',
//   items: cart.items,
//   payment: {
//     type: 'paypal',
//     address: undefined,
//     creditCard: undefined
//   },
//   delivery: {
//     type: 'post',
//     address: undefined
//   },
//   comments: '',
//   status: 'created',
//   total: 2,
// }