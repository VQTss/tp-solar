const { BadRequestError } = require('../core/error.response');
const { SuccessResponse } = require('../core/success.response');
const productServices = require('../services/products.services');

const productController = {
    getProducts: async (req, res, next) => {
        const data = await productServices.getProducts();
        new SuccessResponse
            (
                {
                    message: "Get products successfully",
                    metadata: data,
                }

            ).send(res);
    },
    getProductById: async (req, res, next) => {
        const { product_id } = req.body;
        if (!product_id) {
            return res.status(400).json({
                "message": "Product id is not in body "
            });
        }
        const data = await productServices.getProductById(product_id);
        new SuccessResponse
            (
                {
                    message: "Get product by id successfully",
                    metadata: data,
                }

            ).send(res);
    },
    getProductByCategory: async (req, res, next) => {
        const { category_id } = req.body;
        if (!category_id) {
            return res.status(400).json({
                "message": "Category id is not in body "
            });
        }
        const data = await productServices.getProductByCategory(category_id);
        new SuccessResponse
            (
                {
                    message: "Get product by category successfully",
                    metadata: data,
                }

            ).send(res);
    },
    createProduct: async (req, res, next) => {
        const { product_id, product_name, product_price, product_discount, flash_sale, category_id } = req.body;
        if (!product_id) {
            return res.status(400).json({
                "message": "Product id is not in body "
            })
        }
        if (!product_name) {
            return res.status(400).json({
                "message": "Product name is not in body "
            });
        }
        if (!product_price) {
            return res.status(400).json({
                "message": "Product price is not in body "
            });
        }
        if (product_discount < 0) {
            return res.status(400).json({
                "message": "Product discount is cannot be negative "
            });
        }
        if (flash_sale == null) {
            return res.status(400).json({
                "message": "Flash sale is not in body "
            });
        }
        if (!category_id) {
            return res.status(400).json({
                "message": "Category id is not in body "
            });
        }
        const data = await productServices.createProduct(product_id, product_name, product_price, product_discount, flash_sale, category_id);

        new SuccessResponse
            (
                {
                    message: "Create product successfully",
                    metadata: data,
                }

            ).send(res);
    },
    updateProduct: async (req, res, next) => {
        const { product_id, product_name, product_price, product_discount, flash_sale, category_id } = req.body;
        if (!product_id) {
            return res.status(400).json({
                "message": "Product id is not in body "
            });
        }
        if (!product_name) {
            return res.status(400).json({
                "message": "Product name is not in body "
            });
        }
        if (!product_price) {
            return res.status(400).json({
                "message": "Product price is not in body "
            });
        }
        if (product_discount < 0) {
            return res.status(400).json({
                "message": "Product discount is not in body "
            });
        }
        if (flash_sale == null) {
            return res.status(400).json({
                "message": "Flash sale is not in body "
            });
        }
        if (!category_id) {
            return res.status(400).json({
                "message": "Category id is not in body "
            });
        }
        const data = await productServices.updateProduct(product_id, product_name, product_price, product_discount, flash_sale, category_id);

        new SuccessResponse
            (
                {
                    message: "Update product successfully",
                    metadata: data,
                }

            ).send(res);
    },
    deleteProduct: async (req, res, next) => {
        const { product_id } = req.body;
        if (!product_id) {
            return res.status(400).json({
                "message": "Product id is not in body "
            });
        }
        const data = await productServices.deleteProduct(product_id);
        new SuccessResponse
            (
                {
                    message: "Delete product successfully",
                    metadata: data,
                }

            ).send(res);
    },

}

module.exports = productController;