import {connect} from 'mongoose';
import Cart, {CartEntity} from '../schemas/cart.entity';
import Product, {ProductEntity} from "../schemas/product.entity";
import CartItem, {CartItemEntity} from "../schemas/cartItem.entity";
import User, {UserEntity} from "../schemas/user.entity";


const user: UserEntity = {
    id: '1fe36d16-49bc-4aab-a227-f84df899a6cb'
}

const product: ProductEntity = {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
}

const product1: ProductEntity = {
    id: '915b2f40-9fd9-47f2-9b51-628f3dc69aac',
    title: 'Laptop',
    description: 'A very interesting laptop',
    price: 300
}

const cartItem: CartItemEntity = {
    product: product,
    count: 2,
}
export const cart: CartEntity = {
    id: '1434fec6-cd85-420d-95c0-eee2301a971d',
    userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
    isDeleted: false,
    items: [cartItem],
}

export const dbinit = async () => {
    await connect('mongodb://127.0.0.1:27017/', {user: "root", pass: "nodegmp"}).then(() => {
        console.log("Successfully connected to MongoDB");
    }).catch((error: Error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });

    Cart.create(cart)
        .then((createdCarts) => {
            console.log('Cart created:', createdCarts);
        })
        .catch((error) => {
            console.error('Error creating Cart:', error);
        });
    Product.create([product, product1])
        .then((createdProducts) => {
            console.log('Products created:', createdProducts);
        })
        .catch((error) => {
            console.error('Error creating products:', error);
        });
    CartItem.create(cartItem)
        .then((createdCartItems) => {
            console.log('Cart items created:', createdCartItems);
        })
        .catch((error) => {
            console.error('Error creating cart items:', error);
        });
    User.create(user)
        .then((createdUsers) => {
            console.log('Users created:', createdUsers);
        })
        .catch((error) => {
            console.error('Error creating users:', error);
        });
}


