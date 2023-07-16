const OrderServices = require("../services/order.services");

const { SuccessResponse } = require("../core/success.response");

const OrderController = {
    addOrder: async (req, res, next) => {
        const { user_id, order_total, order_status, products, name, phone, email, address } = req.body;
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
        if (!products) {
            return res.status(400).json({
                message: "Product id cannot be exist",
            });
        }
        if (!name) {
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
        const order = await OrderServices.addOrder(user_id, order_total, order_status, products, name, phone, email, address);
        new SuccessResponse({
            metadata: order,
            message: "Add order successfully",
        }).send(res);
    },
    updateOrder: async (req, res, next) => {
        const { order_id, order_total, order_status, products, name, phone, email, address } = req.body;

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
        if (!products) {
            return res.status(400).json({
                message: "Product id cannot be exist",
            });
        }
        if (!name) {
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

        const order = await OrderServices.updateOrder(order_id, order_total, order_status, products, name, phone, email,);
        new SuccessResponse({
            metadata: order,
            message: "Update order successfully",
        }).send(res);
    },
    deleteOrder: async (req, res, next) => {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        const order = await OrderServices.deleteOrder(order_id);
        new SuccessResponse({
            metadata: order,
            message: "Delete order successfully",
        }).send(res);
    },
    getOrder: async (req, res, next) => {
        const { order_id } = req.body;
        if (!order_id) {
            return res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        const order = await OrderServices.getOrder(order_id);
        new SuccessResponse({
            message: "Get order successfully",
            metadata: order
        }).send(res);
    },
    getOrderAndUserID: async (req, res, next) => {
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
        const order = await OrderServices.getOrderAndUserID(order_id, user_id);
        new SuccessResponse({
            message: "Get order and user id successfully",
            metadata: order
        }).send(res);
    },
    getOrderDetails: async (req, res, next) => {
        const { order_details_id } = req.body;
        if (!order_details_id) {
            return res.status(400).json({
                message: "Order details id cannot be exist",
            });
        }
        const order = await OrderServices.getOrderDetails(order_details_id);
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

