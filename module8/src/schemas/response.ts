import {OrderEntity} from "./order.entity";
import {CartItemEntity} from "./cartItem.entity";

export interface ApiResponse<T> {
    data?: T
    error?: {
        message: string
    }
}

export interface CartResponse extends ApiResponse<{ cart: { id: string, items: Array<CartItemEntity> }, total: number }> {
}

export interface CheckoutResponse extends ApiResponse<{ order: OrderEntity }> {
}
