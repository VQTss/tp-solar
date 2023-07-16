
const models = require('../../models/index');
const { BadRequestError } = require('../core/error.response');
const Payment = models.Payment;
const Cart = models.cart;
const Order = models.order;
const PaymentServices = {
    addPayment: async (payment_method, payment_status, order_id, user_id) => {
        try {
            const order = await Order.update({
                order_status: 'done',
            }).where({
                order_id: order_id,
            }).save();
            if (!order) {
                return new BadRequestError('Cannot update order');
            }else{
                const payment = await Payment.create({
                    payment_method,
                    payment_status,
                    order_id,
                    user_id,
                });
                return payment;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAllPayments: async () => {
        const payments = await Payment.findAll({
            attributes: ['payment_id', 'payment_method', 'payment_status', 'payment_date', 'order_id', 'user_id'],
            include: [{
                model: models.order,
                as: 'order',
                attributes: ['order_id', 'order_total', 'order_status', 'order_date', 'user_id'],
            }],
            include: [{
                model: models.user,
                as: 'user',
            }],
        });
        if (!payments) {
            return new Error('Cannot get all payments');
        } else {
            return payments;
        }
    },
    getPaymentByUserID: async (user_id) => {
        try {
            const payments = await Payment.findAll({
                where: {
                    user_id: user_id,
                },
                attributes: ['payment_id', 'payment_method', 'payment_status', 'payment_date', 'order_id', 'user_id'],
                include: [{
                    model: models.order,
                    as: 'order',
                    attributes: ['order_id', 'order_total', 'order_status', 'order_date', 'user_id'],
                }],
                include: [{
                    model: models.user,
                    as: 'user',
                }],
            });
            if (!payments) {
                return new Error('Cannot get payment by user id');
            } else {
                return payments;
            }
        } catch (error) {
            return new Error(error.message);
        }
    },
    paymentUpdateStatus : async (payment_id,payment_status, order_id, user_id) => {
        try {
            const payment = await Payment.update({
                payment_status: payment_status,
            }).where({
                payment_id: payment_id,
                order_id: order_id,
                user_id: user_id,
            }).save();
            return payment[0];
        } catch (error) {
            return new Error(error.message);
        }
    }
};

module.exports = PaymentServices;