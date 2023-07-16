


// crud payment

const PaymentServices = require("../services/payment.services");
const {SuccessResponse} = require("../core/success.response");

const PaymentController = {
    // create payment
    createPayment: async (req, res, next) => {
        const { payment_method, payment_status, order_id, user_id } = req.body;
        if (!payment_method) {
            return   res.status(400).json({
                message: "Payment method cannot be exist",
            });
        }
        if (payment_status == null) {
            return    res.status(400).json({
                message: "Payment status cannot be exist",
            });
        }
        if (!order_id) {
            return     res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        if (!user_id) {
            return      res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        const payment = await PaymentServices.addPayment(payment_method, payment_status, order_id , user_id);
        new SuccessResponse({
            metadata: payment,
            message: "Create payment successfully",
        }).send(res);
    },

    // get all payments
    getAllPayments: async (req, res, next) => {
        const payments = await PaymentServices.getAllPayments();
        new SuccessResponse({
            metadata: payments,
            message: "Get all payments successfully",
        }).send(res);
    },

    // get payment by user id
    getPaymentByUserID: async (req, res, next) => {
        const { user_id } = req.body;
        if (!user_id) {
            return   res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        const payments = await PaymentServices.getPaymentByUserID(user_id);
        new SuccessResponse({
            metadata: payments,
            message: "Get payment by user id successfully",
        }).send(res);
    },
    // get payment by update status
    getPaymentByUpdateStatus: async (req, res, next) => {
        const  {payment_id,payment_status, order_id, user_id} = req.body;
        if (!payment_id) {
            return   res.status(400).json({
                message: "Payment id cannot be exist",
            });
        }
        if (payment_status == null || payment_status == "") {
            return    res.status(400).json({
                message: "Payment status cannot be exist",
            });
        }
        if (!order_id) {
            return     res.status(400).json({
                message: "Order id cannot be exist",
            });
        }
        if (!user_id) {
            return      res.status(400).json({
                message: "User id cannot be exist",
            });
        }
        const payments = await PaymentServices.paymentUpdateStatus(payment_id,payment_status, order_id, user_id);
        new SuccessResponse({
            metadata: payments,
            message: "Get payment by update status successfully",
        }).send(res);
    },
};
module.exports = PaymentController;