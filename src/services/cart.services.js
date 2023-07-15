
const models = require('../../models/index');
const Cart = models.cart;
const Product = models.product;

const cartServices = {
    getCartByUserId: async (id) => {
        try {
            const cart = await Cart.findAll({
                where: {
                    user_id: id,
                },
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['product_id', 'product_name', 'product_price','product_discount', 'flash_sale','category_id'],
                    },
                ],
            });
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addCart: async (product_id, quantity, user_id) => {
        try {

            const checkProduct = await Cart.findOne({
                where: {
                    product_id: product_id,
                    user_id: user_id,
                },
            });
            if (checkProduct) {
                const cart = await Cart.update(
                    {
                        quantity: checkProduct.quantity + quantity,
                    },
                    {
                        where: {
                            product_id: product_id,
                            user_id: user_id,
                        },
                    }
                );
                return cart[0];
            }    

            const cart = await Cart.create({
                product_id,
                quantity,
                user_id,
            });
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    updateCart: async (id, quantity) => {
        try {
            const cart = await Cart.update(
                {
                    quantity,
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return cart[0];

        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteCart: async (id) => {
        try {
            const cart = await Cart.destroy({
                where: {
                    id,
                },
            });
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getCartByProductID : async (product_id,user_id) => {
        try {
            const data = await Cart.findAll({
                where: {
                    product_id: product_id,
                    user_id: user_id,
                }
            });
            return data;
        } catch (error) {
            return error.parent;    
        }
    },
    
};

module.exports = cartServices;

