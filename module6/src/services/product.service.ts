import * as productRepo from "../dao/product.repository"
import {ProductEntity} from "../schemas/product.entity";

export const find = async (productId: string): Promise<ProductEntity> => {
    return await productRepo.findById(productId)
}

export const findAll = async (): Promise<ProductEntity[]> => {
    return await productRepo.findAll()
};
