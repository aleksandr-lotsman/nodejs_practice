import express, {Request, Response, NextFunction} from "express";
import http from 'http';
import {cartRouter} from "./routers/cart.router";
import {API} from "./constants/endpoints";
import {productRouter} from "./routers/product.router";
import {StatusCodes} from "http-status-codes";
import * as userService from "./services/user.service"
import {dbinit} from "./config/dbinit";

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

app.use(authentication);
app.use(express.json())
app.use(API.CART.BASE, cartRouter)
app.use(API.PRODUCT.BASE, productRouter)


dbinit().then(() =>
    app.listen(3000, () => {
        console.log('Server is started');
    })
)
