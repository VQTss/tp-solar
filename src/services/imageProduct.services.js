
const e = require('express');
const model = require('../../models/index');
const { BadRequestError } = require('../core/error.response');
const image_product = model.image_product;


const imageProductServices = {
    getImageProduct: async (product_id) => {
        try {
            const data = await image_product.findAll({
                where: {
                    product_id: product_id
                }
            });
            return data;
        } catch (error) {
            return error;
        }
    },
    createImageProduct: async (product_id, image_base64, image_name) => {
        try {
            const data = await image_product.create({
                product_id: product_id,
                image_base64: image_base64,
                image_name: image_name
            });
            return data;
        } catch (error) {
            return error;
        }
    },
    updateImageProduct: async (product_id, image_base64, image_name) => {
        try {
            const data = await image_product.update({
                image_base64: image_base64,
                image_name: image_name
            }, {
                where: {
                    product_id: product_id
                }
            });
            return data;
        } catch (error) {
            return error;
        }
    },
    deleteImageProduct: async (product_id) => {
        try {
            const data = await image_product.destroy({
                where: {
                    product_id: product_id
                }
            });
            return data;
        } catch (error) {
            return error;
        }
    },
};


module.exports = imageProductServices;