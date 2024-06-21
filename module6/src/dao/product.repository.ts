import {product, product1, ProductEntity, Products} from "../schemas/product.entity";
import {cart} from "../schemas/cart.entity";

const products: Products = {
    [product.id]: product,
    [product1.id]: product1
};

export const findAll = async (): Promise<ProductEntity[]> => {
    return Object.values(products);
}

export const findById = async (productId: string): Promise<ProductEntity> => {
    return Object.values(products).find(product => product.id === productId);
}