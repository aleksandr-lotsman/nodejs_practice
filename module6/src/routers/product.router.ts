import express, {Request, Response} from "express";
import * as productService from "../services/product.service"
import {StatusCodes} from "http-status-codes";
import {ERROR_MESSAGE} from "../constants/api.error.messages";
import {API} from "../constants/endpoints";


export const productRouter = express.Router();

productRouter.get('/', async (req: Request, res: Response) => {
    try {
        const products = await productService.findAll();
        res.status(StatusCodes.OK).json({data: products})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
    }
});

productRouter.get(API.PRODUCT.WITH_ID(':id'), async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await productService.find(id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({error: {message: ERROR_MESSAGE.PRODUCT_NOT_FOUND}})
        }
        res.status(StatusCodes.OK).json({data: product})
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR}})
    }
});