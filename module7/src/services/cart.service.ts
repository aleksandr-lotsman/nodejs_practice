import {Cart, CartItem} from "../schemas/cart.entity";
import {Order} from "../schemas/order.entity";
import {DI} from "../server";
import {Product} from "../schemas/product.entity";

export const getUserCartOrCreateNew = async (userId: string): Promise<Cart> => {
    let cart = await DI.carts.findOne({user: userId, isDeleted: false});
    return cart ? cart : DI.carts.create({user: userId, isDeleted: false, items: []});
}
export const getUserCart = async (userId: string): Promise<Cart> => {
    return await DI.carts.findOne({user: userId});
}

export const updateUserCart = async (userId: string, productToUpdate: Product, count: number) => {
    const cart = await DI.carts.findOneOrFail({user: userId, isDeleted: false});
    const existingCartItem = cart.items.getItems().find(item => item.product.id === productToUpdate.id);

    if (count === 0) {
        // If count is zero, remove the item if it exists
        if (existingCartItem) {
            cart.items.remove(existingCartItem);
            await DI.em.persistAndFlush(cart);
            await DI.em.removeAndFlush(existingCartItem);
        }
    } else {
        // If count is greater than zero
        if (existingCartItem) {
            // Update the existing item's count
            existingCartItem.count = count;
        } else {
            // Add the new item to the cart
            const newCartItem = DI.cartItems.create({product: productToUpdate, count: count})
            cart.items.add(newCartItem);
        }
        await DI.em.persistAndFlush(cart);
    }
    return cart;
}

export const cleanUpUserCart = async (userId: string) => {
    const cart = await DI.carts.findOne({user: userId});
    if (cart) {
        cart.items.removeAll();
        cart.isDeleted = true;
        await DI.em.persistAndFlush(cart);
        return true;
    }
    return false;
}

export const checkOut = async (userId: string) => {
    const user = await DI.users.findOneOrFail({id: userId})
    const cart  = await DI.carts.findOneOrFail({user: user});
    const cartTotal = cart.items.map(cartItem => cartItem.product.price * cartItem.count)
        .reduce((sum, totalByProduct) => sum + totalByProduct, 0)

    const order: Order = {
        id: "",
        user: user,
        cart: cart,
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
        total: cartTotal

    }
    const created = DI.em.create(Order, order);
    await DI.em.flush();
    return created;
}