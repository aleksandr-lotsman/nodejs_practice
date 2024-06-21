import * as cartRepo from "../dao/cart.repository"
import * as orderRepo from "../dao/order.repository"
import {CartEntity, CartItemEntity} from "../schemas/cart.entity";
import {OrderEntity} from "../schemas/order.entity";

export const getUserCartOrCreateNew = async (userId: string): Promise<CartEntity> => {
    let cart = await cartRepo.findByUserId(userId);
    return cart ? cart : cartRepo.createEmpty(userId);
}
export const getUserCart = async (userId: string): Promise<CartEntity> => {
    return await cartRepo.findByUserId(userId);
}

export const updateUserCart = async (userId: string, newCartItem: CartItemEntity): Promise<CartEntity> => {
    return await cartRepo.updateCart(userId, newCartItem);
}

export const cleanUpUserCart = async (userId: string): Promise<boolean> => {
    return await cartRepo.cleanUpUserCart(userId);
}

export const checkOut = async (userId: string): Promise<OrderEntity> => {
    return await orderRepo.createOrderForUser(userId);
}