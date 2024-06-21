import {CartItem} from "./cart.entity";
import {Order} from "./order.entity";

export interface ApiResponse<T> {
    data?: T
    error?: {
        message: string
    }
}

export interface CartResponse extends ApiResponse<{ cart: { id: string, items: Array<CartItem> }, total: number }> {
}

export interface CheckoutResponse extends ApiResponse<{ order: Order }> {
}
