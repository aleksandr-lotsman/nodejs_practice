import * as uuid from "uuid";
import * as cartRepository from "../dao/cart.repository";
import Order, {OrderEntity} from "../schemas/order.entity";

export const createOrderForUser = async (userId: string): Promise<OrderEntity> => {
    let cart = await cartRepository.findByUserId(userId);
    let cartTotal = cart.items.map(cartItem => cartItem.product.price * cartItem.count)
        .reduce((sum, totalByProduct) => sum + totalByProduct, 0)
    let order: OrderEntity = {
        id: uuid.v4(),
        userId: userId,
        cartId: cart.id,
        items: cart.items,
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
    return Order.create(order);
}
