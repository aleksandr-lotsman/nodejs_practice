import * as cartRepository from "../dao/cart.repository";
import * as orderRepository from "../dao/order.repository";
import {CartEntity} from "../schemas/cart.entity";
import {CartItemEntity} from "../schemas/cartItem.entity";
import {OrderEntity} from "../schemas/order.entity";

export const getUserCartOrCreateNew = async (userId: string): Promise<CartEntity> => {
    let cart = await cartRepository.findByUserId(userId);
    return cart ? cart : cartRepository.createEmpty(userId);
}
export const getUserCart = async (userId: string): Promise<CartEntity> => {
    return await cartRepository.findByUserId(userId);
}

export const updateUserCart = async (userId: string, newCartItem: CartItemEntity): Promise<CartEntity> => {
    return await cartRepository.updateCart(userId, newCartItem);
}

export const cleanUpUserCart = async (userId: string): Promise<boolean> => {
    return await cartRepository.cleanUpUserCart(userId);
}

export const checkOut = async (userId: string): Promise<OrderEntity> => {
    return await orderRepository.createOrderForUser(userId);
}