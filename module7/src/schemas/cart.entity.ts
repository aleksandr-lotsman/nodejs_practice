import { Product} from './product.entity'
import {Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import * as uuid from 'uuid';
import {User} from "./user.entity";


@Entity()
export class CartItem {

  @PrimaryKey({type: 'uuid'})
  id = uuid.v4()

  @ManyToOne(() => Product)
  product!: Product;

  @Property()
  count!: number;

  @ManyToMany(() => Cart, cart => cart.items)
  carts: Collection<Cart> = new Collection<Cart>(this);

}

@Entity()
export class Cart {

  @PrimaryKey()
  id!: string; // uuid

  @OneToOne(() => User)
  user!: User;

  @Property()
  isDeleted: boolean;


  @ManyToMany(() => CartItem, cartItem => cartItem.carts, {owner: true})
  items: Collection<CartItem> = new Collection<CartItem>(this);
}

// export interface Carts {
//   [id: string]: Cart
// }

// const cartItem: CartItemEntity = {
//   product: bookProduct,
//   count: 2,
// }
//
// export const cart: Cart = {
//   id: '1434fec6-cd85-420d-95c0-eee2301a971d',
//   userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//   isDeleted: false,
//   items: [cartItem],
// }