const { BadRequestError } = require("../core/error.response");
const cartServices = require("../services/cart.services");
const { SuccessResponse } = require('../core/success.response');

const CartController = {

    // [GET] /cart
    getCartByUserId: async (req, res, next) => {
        try {
            const { id } = req.body;
            if (!id) {
              return  res.status(400).json({
                    "message": "id is not in body"
                });
            } else {
                const data = await cartServices.getCartByUserId(id);
                new SuccessResponse({
                    message: "Get cart by user id successfully",
                    metadata: data
                }).send(res);
            }
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },
    // [POST] /cart

    addCart: async (req, res, next) => {
        const { product_id, quantity, user_id } = req.body;
        if (!product_id) {
            return res.status(400).json({
                "message": "Product id is not in body"
            });
        }
        if (!quantity) {
            return res.status(400).json({
                "message": "Quantity is not in body"
            });
        }
        if (!user_id) {
            return res.status(400).json({
                "message": "User id is not in body"
            });
        }
        try {
            const data = await cartServices.addCart(product_id, quantity, user_id);
            new SuccessResponse({
                message: "Add cart successfully",
                metadata: data
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

    // [PUT] 
    updateCart: async (req, res, next) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                "message": "id is not in body"
            });
        }
        const { quantity } = req.body;
        if (!quantity) {
            return res.status(400).json({
                "message": "Quantity is not in body"
            });
        }
        try {
            const data = await cartServices.updateCart(id, quantity);
            new SuccessResponse({
                message: "Update cart successfully",
                metadata: data
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

    // [DELETE]

    deleteCart: async (req, res, next) => {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                "message": "id is not in body"
            });
        }
        try {
            const data = await cartServices.deleteCart(id);
            new SuccessResponse({
                message: "Delete cart successfully",
                metadata: data
            }).send(res);
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

};

module.exports = CartController;
