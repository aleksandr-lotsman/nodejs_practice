import {Product} from "../schemas/product.entity";
import {DI} from "../server";

export const find = async (productId: string): Promise<Product> => {
    return await DI.products.findOne({id: productId})
}

export const findAll = async (): Promise<Product[]> => {
    return await DI.products.findAll()
};
