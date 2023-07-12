
const model = require('../../models/index');

const desc_products = model.desc_product;
const { BadRequestError } = require('../../src/core/error.response');

const descProductsServices = {
    getDescProductsByID: async (product_id) => {
        try {
            const descProducts = await desc_products.findAll({
                where: {
                    product_id: product_id,
                },
            });
            return descProducts;
        } catch (error) {
            throw new BadRequestError("Error: Get description product by id failed");
        }
    },
    createDescProduct: async (product_id, description) => {
        try {
            const descProduct = await desc_products.create({
                product_id: product_id,
                desc: description,
            });
            return descProduct;
        } catch (error) {
            return new BadRequestError("Error: Create description product failed : " + error);
        }
    },
    updateDescProduct: async (product_id, description) => {
        try {
            const descProduct = await desc_products.update({
                desc: description,
            }, {
                where: {
                    product_id: product_id,
                },
            });
            return descProduct;
        } catch (error) {
            throw new BadRequestError("Error: Update description product failed");
        }
    },
    deleteDescProduct: async (product_id) => {
        try {
            const descProduct = await desc_products.destroy({
                where: {
                    product_id: product_id,
                },
            });
            return descProduct;
        } catch (error) {
            throw new BadRequestError("Error: Delete description product failed");
        }
    },
};
module.exports = descProductsServices;