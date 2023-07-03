
const models = require('../../models/index');
const Payment = models.Payment;


const PaymentServices = {
    addPayment: async (payment_method, payment_status, order_id , user_id) => {
        try {
            const payment = await Payment.create({
                payment_method,
                payment_status,
                order_id,
                user_id,
            });
            if (!payment) {
                throw new Error('Cannot create payment');
            } else {
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
            throw new Error('Cannot get all payments');
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
                throw new Error('Cannot get payment by user id');
            } else {
                return payments;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = PaymentServices;