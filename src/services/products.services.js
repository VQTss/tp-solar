

const { BadRequestError } = require('../core/error.response')
const models = require('../../models');
const { getInforData } = require('../utils');
const Products = models.product;
const Cart = models.cart;
const description = models.desc_product;
const order_detail = models.order_details;
const image = models.image_product;

const productServices = {
    getProducts: async () => {
        try {
            const data =  await Products.findAll({});
            return data;
        } catch (error) {
           throw new BadRequestError(error.message);
        }
    },  
    getProductById: async (id) => {
        try {
            const data = await Products.findOne({
                where: {
                    product_id: id
                }
            });
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    getProductByCategory : async (category_id) => {
        try {
            const data = await Products.findAll({
                where: {
                    category_id: category_id
                }
            });
            return data;
        } catch (error) {
            return error.parent;    
        }
    },
    createProduct : async (product_id, product_name, product_price, product_discount, flash_sale ,category_id, specifications) => {
        try {
            const data = await Products.create({
                product_id: product_id,
                product_name: product_name,
                product_price: product_price,
                product_discount: product_discount,
                flash_sale: flash_sale,
                category_id: category_id,
                specifications: specifications
            });
            return data;
        } catch (error) {
            return error.parent;    
        }
    },
    updateProduct : async (product_id, product_name, product_price, product_discount, flash_sale ,category_id,specifications) => {
        try {
            const data = await Products.update({
                product_name: product_name,
                product_price: product_price,
                product_discount: product_discount,
                flash_sale: flash_sale,
                category_id: category_id,
                specifications: specifications
            },{
                where: {
                    product_id: product_id
                }
            });
            if (data[0] === 1) {
                return "Success"
            } else if (data[0] === 0) {
                return "Fail"
            }
        } catch (error) {
            return error.parent;    
        }
    },
    deleteProduct : async (product_id) => {
        try {

            const delelteImage = await image.destroy({
                where: {
                    product_id: product_id
                }
            });
            const deleteDescription = await description.destroy({
                where: {
                    product_id: product_id
                }
            });
            const deleteCart = await Cart.destroy({
                where: {
                    product_id: product_id
                }   
            });

            const data = await Products.destroy({
                where: {
                    product_id: product_id
                }
            });
            return data;
        } catch (error) {
            return error.parent;    
        }
    }

}

module.exports = productServices