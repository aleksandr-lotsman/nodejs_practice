import type {EntityManager} from '@mikro-orm/core';
import {Collection, wrap} from "@mikro-orm/core";
import {Seeder} from '@mikro-orm/seeder';
import {User} from "../schemas/user.entity";
import {Product} from "../schemas/product.entity";
import {Cart, CartItem} from "../schemas/cart.entity";
import {Order} from "../schemas/order.entity";

const user: User = {
    id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}

const product: Product = {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
}

const cartItem: CartItem = {
    id: '711bb33a-2866-41d6-afd0-3db5733d6b51',
    product: product,
    count: 2,
    carts: new Collection<Cart>(this!)
}

const cart: Cart = {
    id: '1434fec6-cd85-420d-95c0-eee2301a971d',
    user,
    items: new Collection<CartItem>(this!),
    isDeleted: false,
}

const order: Order = {
    id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
    user,
    cart,
    payment: {
        type: 'paypal',
        address: undefined,
        creditCard: undefined
    },
    delivery: {
        type: 'post',
        address: undefined
    },
    comments: '',
    status: 'created',
    total: 2
}

export class DBSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const firstOrder = em.create(Order, order);
        const firstCart = firstOrder.cart;

        const firstItem = em.create(CartItem, cartItem);
        wrap(firstCart).assign({items: [firstItem]}, {em})
        await em.flush()
    }
}
