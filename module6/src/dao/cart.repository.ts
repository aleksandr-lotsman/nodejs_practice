import {cart, CartEntity, CartItemEntity, Carts} from "../schemas/cart.entity";
import * as uuid from 'uuid';

const carts: Carts = {[cart.id]: cart};

export const findByUserId = async (userId: string): Promise<CartEntity> => {
    return Object.values(carts).find(cart => cart.userId === userId && !cart.isDeleted);
}

export const createEmpty = (userId: string): CartEntity => {
    let emptyCart: CartEntity = {id: uuid.v4(), userId: userId, isDeleted: false, items: []}
    save(emptyCart);
    return emptyCart;
}

export const updateCart = async (userId: string, newCartItem: CartItemEntity): Promise<CartEntity | null> => {
    let currentCart = await findByUserId(userId);
    if (!currentCart && cart.isDeleted) {
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
    carts[currentCart.id] = currentCart;
    return carts[currentCart.id];
}

export const cleanUpUserCart = async (userId: string): Promise<boolean> => {
    let cartToClean = await findByUserId(userId);
    if (cartToClean) {
        cartToClean.items = []
        cartToClean.isDeleted = true;
        carts[cartToClean.id] = cartToClean;
        return true
    }
    return false;
}

const save = (cart: CartEntity) => {
    carts[cart.id] = cart;
}