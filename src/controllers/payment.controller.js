


// crud payment

const PaymentServices = require("../services/payment.services");
const {SuccessResponse} = require("../core/success.response");

const PaymentController = {
    // create payment
    createPayment: async (req, res, next) => {
        const { payment_method, payment_status, order_id, user_id } = req.body;
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
        const payments = await PaymentServices.getPaymentByUserID(user_id);
        new SuccessResponse({
            metadata: payments,
            message: "Get payment by user id successfully",
        }).send(res);
    },

};
module.exports = PaymentController;