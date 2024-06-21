import {CartItemEntity} from "./cart.entity";
import {OrderEntity} from "./order.entity";

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
