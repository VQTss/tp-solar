const OrderServices = require("../services/order.services");

const { SuccessResponse } = require("../core/success.response");

const OrderController = {
    addOrder: (req, res, next) => {
        const { user_id, order_total, order_status, product_id, quantity, phone, email, address } = req.body;
        if (!user_id) {
            return res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        if (!order_total) {
            return res.status(400).json({
                message: "Order total cannot be exist",
            });
        }
        if (order_status == null) {
            return res.status(400).json({
                message: "Order status cannot be exist",
            });
        }
        if (!product_id) {
            return res.status(400).json({
                message: "Product id cannot be exist",
            });
        }
        if (!quantity) {
            return res.status(400).json({
                message: "Quantity cannot be exist",
            });
        }
        if (!phone) {
            return res.status(400).json({
                message: "Phone cannot be exist",
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email cannot be exist",
            });
        }
        if (!address) {
            return res.status(400).json({
                message: "Address cannot be exist",
            });
        }
        const order = OrderServices.addOrder(user_id, order_total, order_status, product_id, quantity, phone, email, address);
        new SuccessResponse({
            metadata: order,
            message: "Add order successfully",
        }).send(res);
    },
    updateOrder: (req, res, next) => {
        const { order_id, order_total, order_status, product_id, quantity, phone, email, address } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        if (!order_total) {
            return res.status(400).json({
                message: "Order total cannot be exist",
            });
        }
        if (order_status == null) {
            return res.status(400).json({
                message: "Order status cannot be exist",
            });
        }
        if (!product_id) {
            return res.status(400).json({
                message: "Product id cannot be exist",
            });
        }
        if (!quantity) {
            return res.status(400).json({
                message: "Quantity cannot be exist",
            });
        }
        if (!phone) {
            return res.status(400).json({
                message: "Phone cannot be exist",
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email cannot be exist",
            });
        }
        if (!address) {
            return res.status(400).json({
                message: "Address cannot be exist",
            });
        }

        const order = OrderServices.updateOrder(order_id, order_total, order_status, product_id, quantity, phone, email,);
        new SuccessResponse({
            metadata: order,
            message: "Update order successfully",
        }).send(res);
    },
    deleteOrder: (req, res, next) => {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        const order = OrderServices.deleteOrder(order_id);
        new SuccessResponse({
            metadata: order,
            message: "Delete order successfully",
        }).send(res);
    },
    getOrder: (req, res, next) => {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        const order = OrderServices.getOrder(order_id);
        new SuccessResponse({
            message: "Get order successfully",
            metadata: order
        }).send(res);
    },
    getOrderAndUserID: (req, res, next) => {
        const { order_id, user_id } = req.body;

        if (!order_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        if (!user_id) {
            return res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        const order = OrderServices.getOrderAndUserID(order_id, user_id);
        new SuccessResponse({
            message: "Get order and user id successfully",
            metadata: order
        }).send(res);
    },
    getOrderDetails: (req, res, next) => {
        const { order_details_id } = req.body;
        if (!order_details_id) {
            return res.status(400).json({
                message: "Order details id cannot be exist",
            });
        }
        const order = OrderServices.getOrderDetails(order_details_id);
        new SuccessResponse({
            message: "Get order details successfully",
            metadata: order
        }).send(res);
    },

    getOrderByUserId: async (req, res, next) => {
        const { user_id } = req.body;
        if (!user_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        const order = await OrderServices.getOrderByUserId(user_id);
        new SuccessResponse({
            message: "Get order details successfully",
            metadata: order
        }).send(res);
    },
    getAllOrder: async (req, res, next) => {
        const order = await OrderServices.getAllOrder();
        new SuccessResponse({
            message: "Get all order successfully",
            metadata: order
        }).send(res);
    },
};

module.exports = OrderController;

