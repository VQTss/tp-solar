
const { SuccessResponse } = require("../core/success.response");
const descProductsServices = require("../services/descProducts.services");

const descProductsController = {
    getDescProductsByID: async (req, res) => {
        const { product_id } = req.body;
        if (!product_id) {
            res.json({
                message: "Product id is not in body",
            });
        }
        const data = await descProductsServices.getDescProductsByID(product_id);
        new SuccessResponse({
            message: "Get description product by id successfully",
            metadata: data,
        }).send(res);
    },
    createDescProduct: async (req, res) => {
        const { product_id, description } = req.body;
        if (!product_id) {
            res.json({
                message: "Product id is not in body",
            });
        }
        if (!description) {
            res.json({
                message: "Description is not in body",
            });
        }
        const data = await descProductsServices.createDescProduct(product_id, description);
        new SuccessResponse({
            message: "Create description product successfully",
            metadata: data,
        }).send(res);
    },
    updateDescProduct: async (req, res) => {
        const { product_id, description } = req.body;
        if (!product_id) {
            res.json({
                message: "Product id is not in body",
            });
        }
        if (!description) {
            res.json({
                message: "Description is not in body",
            });
        }
        const data = await descProductsServices.updateDescProduct(product_id, description);
        new SuccessResponse({
            message: "Update description product successfully",
            metadata: data,
        }).send(res);
    },
    deleteDescProduct: async (req, res) => {
        const { product_id } = req.body;
        if (!product_id) {
            res.json({
                message: "Product id is not in body",
            });
        }
        const data = await descProductsServices.deleteDescProduct(product_id);
        new SuccessResponse({
            message: "Delete description product successfully",
            metadata: data,
        }).send(res);
    },

};

module.exports = descProductsController;

