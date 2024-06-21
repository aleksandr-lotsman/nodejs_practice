import express, {Request, Response, NextFunction} from "express";
import http from 'http';
import {cartRouter} from "./routers/cart.router";
import {API} from "./constants/endpoints";
import {productRouter} from "./routers/product.router";
import {StatusCodes} from "http-status-codes";
import * as userService from "./services/user.service"
import {EntityManager, EntityRepository, MikroORM} from "@mikro-orm/core";
import {Cart, CartItem} from "./schemas/cart.entity";
import {User} from "./schemas/user.entity";
import {Order} from "./schemas/order.entity";
import {Product} from "./schemas/product.entity";

const app = express();

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.header('x-user-id');
    if (!userId) {
        res
            .status(StatusCodes.FORBIDDEN)
            .send({
                error: "x-user-id header's value needs to be specified",
            })
        return
    }

    if (!await userService.findByID(userId)) {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .send({
                error: `User is not found with ID ${userId}`,
            })
        return
    }
    next()
}

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    carts: EntityRepository<Cart>,
    cartItems: EntityRepository<CartItem>,
    users: EntityRepository<User>,
    orders: EntityRepository<Order>,
    products: EntityRepository<Product>,
};

app.use(authentication);
app.use(express.json())
app.use(API.CART.BASE, cartRouter)
app.use(API.PRODUCT.BASE, productRouter)

app.listen(3000, () => {
    console.log('Server is started');
})
