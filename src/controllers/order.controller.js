const OrderServices = require("../services/order.services");

const { SuccessResponse } = require("../core/success.response");

const OrderController = {
    addOrder: (req, res, next) => {
        const { user_id, order_total, order_status, product_id, quantity, phone, email, address } = req.body;
        console.log("req.body", req.body);
        const order = OrderServices.addOrder(user_id, order_total, order_status, product_id, quantity, phone, email, address);
        new SuccessResponse({
            order: order,
            message: "Add order successfully",
        }).send(res);
    },
    updateOrder: (req, res, next) => {
        const { order_id, order_total, order_status, product_id, quantity, phone, email, address } = req.body;
        const order = OrderServices.updateOrder(order_id, order_total, order_status, product_id, quantity, phone, email, address);
        new SuccessResponse({
            order: order,
            message: "Update order successfully",
        }).send(res);
    },
    deleteOrder: (req, res, next) => {
        const { order_id } = req.body;
        const order = OrderServices.deleteOrder(order_id);
        new SuccessResponse({
            order: order,
            message: "Delete order successfully",
        }).send(res);
    },
    getOrder: (req, res, next) => {
        const { order_id } = req.body;
        const order = OrderServices.getOrder(order_id);
        new SuccessResponse({
            message: "Get order successfully",
            metadata: order
        }).send(res);
    },
    getOrderAndUserID: (req, res, next) => {
        const { order_id, user_id } = req.body;
        const order = OrderServices.getOrderAndUserID(order_id, user_id);
        new SuccessResponse({
            message: "Get order and user id successfully",
            metadata: order
        }).send(res);
    },
    getOrderDetails: (req, res, next) => {
        const { order_details_id } = req.body;
        const order = OrderServices.getOrderDetails(order_details_id);
        new SuccessResponse({
            message: "Get order details successfully",
            metadata: order
        }).send(res);
    },

    getOrderByUserId: async (req, res, next) => {
        const { user_id } = req.body;
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

