import * as uuid from 'uuid';
import Cart, {CartEntity} from '../schemas/cart.entity';
import {CartItemEntity} from "../schemas/cartItem.entity";


export const findByUserId = async (userId: string): Promise<CartEntity> => {
    return Cart.findOne({userId: userId, isDeleted: false});
}

export const createEmpty = async (userId: string): Promise<CartEntity> => {
    let emptyCart: CartEntity = {id: uuid.v4(), userId: userId, isDeleted: false, items: []}
    return await save(emptyCart);
}

export const updateCart = async (userId: string, newCartItem: CartItemEntity): Promise<CartEntity | null> => {
    let currentCart = await findByUserId(userId);
    if (!currentCart && currentCart.isDeleted) {
        return null;
    }
    const cartItemExist = !!currentCart.items.find(item => item.product.id === newCartItem.product.id);
    if (!cartItemExist) {
        currentCart.items = [...currentCart.items, newCartItem]
    }
    if (newCartItem.count > 0) {
        currentCart.items = currentCart.items.map(cartItem =>
            cartItem.product.id === newCartItem.product.id
                ? {...cartItem, count: newCartItem.count}
                : cartItem
        )
    } else {
        currentCart.items = currentCart.items.filter(item => item.product.id !== newCartItem.product.id)
    }
    Cart.updateOne(currentCart);
    return currentCart;
}

export const cleanUpUserCart = async (userId: string): Promise<boolean> => {
    let cartToClean = await findByUserId(userId);
    if (cartToClean) {
        cartToClean.items = []
        cartToClean.isDeleted = true;
        Cart.updateOne(cartToClean);
        return true
    }
    return false;
}

const save = (cart: CartEntity): Promise<CartEntity> => {
    return Cart.create(cart);
}