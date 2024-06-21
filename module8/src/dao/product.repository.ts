import Product, {ProductEntity} from "../schemas/product.entity";

export const findAll = async (): Promise<ProductEntity[]> => {
    return Product.find({});
}

export const findById = async (productId: string): Promise<ProductEntity> => {
    return Product.findById(productId);
}