export const API = {
    CART: {
        BASE: '/api/profile/cart',
        CHECKOUT: '/checkout'
    },
    PRODUCT: {
        BASE: '/api/products',
        WITH_ID: (id: string) => `/${id}`,
    },
};