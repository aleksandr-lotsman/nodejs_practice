import express, {Request, Response} from "express";
import {API} from "../constants/endpoints";
import {ERROR_MESSAGE} from "../constants/api.error.messages";
import * as cartService from "../services/cart.service";
import * as productService from "../services/product.service";
import {StatusCodes} from "http-status-codes";
import {CartResponse, CheckoutResponse} from "../schemas/response";
import {CartEntity} from "../schemas/cart.entity";

export const cartRouter = express.Router();
const X_USER_ID_HEADER = 'x-user-id';

const prepareCartResponse= (cart: CartEntity, total: number) => {
    const cartResponse: CartResponse = {
        data: {
            cart: {
                id: cart.id,
                items: cart.items
            },
            total: total
        }
    }
    return cartResponse;
}

const calculateCartTotal = (cart: CartEntity) => {
    return cart.items.map(cartItem => cartItem.product.price * cartItem.count)
        .reduce((sum, totalByProduct) => sum + totalByProduct, 0);
}

cartRouter.get('/', async (req: Request, res: Response<CartResponse>) => {
        const userId = req.header(X_USER_ID_HEADER);
        try {
            const cart = await cartService.getUserCartOrCreateNew(userId);
            const total = calculateCartTotal(cart)
            const cartResponse = prepareCartResponse(cart, total);
            res.status(StatusCodes.OK).json(cartResponse)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
        }
    }
);

cartRouter.put('/', async (req: Request, res: Response<CartResponse>)=> {
    const userId = req.header(X_USER_ID_HEADER);
    try {
        const {productId, count} = req.body;
        const productToUpdate = await productService.find(productId);
        if (!productToUpdate) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: {message: ERROR_MESSAGE.PRODUCTS_NOT_VALID}});
        }
        const cart = await cartService.getUserCart(userId);
        if (!cart) {
            return res.status(StatusCodes.NOT_FOUND).json({error: {message: ERROR_MESSAGE.CART_NOT_FOUND}});
        }
        const updatedCart = await cartService.updateUserCart(userId,
            {product: productToUpdate, count: count});
        const total = calculateCartTotal(updatedCart)
        const cartResponse = prepareCartResponse(updatedCart, total);
        res.status(StatusCodes.OK).json(cartResponse);


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
    }
});

cartRouter.delete('/', async (req: Request, res: Response)=> {
    const userId = req.header(X_USER_ID_HEADER);
    try {
        const result = await cartService.cleanUpUserCart(userId);
        res.status(StatusCodes.OK).json({data: {success: result}, error: null});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
    }
});

cartRouter.post(API.CART.CHECKOUT, async (req: Request, res: Response<CheckoutResponse>)=> {
    const userId = req.header(X_USER_ID_HEADER);
    try {
        const order = await cartService.checkOut(userId);
        res.status(StatusCodes.OK).json({data: {order: order}})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
    }
});

