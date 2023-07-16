
const models = require('../../models/index');
const Order = models.order;
const OrderDetails = models.order_details;
const Product = models.product;
const { BadRequestError } = require('../core/error.response');
const db = require("../../models/index");
const { or } = require('sequelize');


const OrderServices = {
    addOrder: async (user_id, order_total, order_status, product_id, quantity, phone, email, address) => {
        try {
            const order = await Order.create({
                user_id: user_id,
                order_total: order_total,
                order_status: order_status,
            });
            if (!order) {
                return new BadRequestError('Cannot create order');
            } else {
                console.log("======== order ======== :" ,order);
                const order_details = await OrderDetails.create({
                    order_id: order.order_id,
                    product_id,
                    quantity,
                    phone,
                    email,
                    address,
                });
                // console.log("======== order_details ======== :" ,order_details);
                await order_details.save();
                if (!order_details) {
                    return new BadRequestError('Cannot create order details');
                } else {
                    return order_details;
                }
            }
        } catch (error) {
            return new BadRequestError(error.message);
        }
    },
    updateOrder: async (order_details_id, order_total, order_status, product_id, quantity, phone, email, address) => {

        try {
            const order_details = await OrderDetails.findOne({
                where: {
                    order_details_id: order_details_id,
                },
            })
            if (!order_details) {
                throw new Error('Cannot find order details');
            } else {
                const order = await Order.update({
                    order_total: order_total,
                    order_status: order_status,
                    // order_date : order_date,
                }, {
                    where: {
                        order_id: order_details.order_id,
                    },
                });
                if (!order) {
                    throw new Error('Cannot update order');
                } else {
                    const order_details = await OrderDetails.update({
                        product_id,
                        quantity,
                        phone,
                        email,
                        address,
                    }, {
                        where: {
                            order_details_id: order_details_id,
                        },
                    });
                    if (!order_details) {
                        throw new Error('Cannot update order details');
                    } else {
                        return order_details;
                    }
                }
            }
        } catch (error) {
            throw new BadRequestError(error.message);
        }

    },

    deleteOrder: async (order_id) => {
        try {
            const order_details = await OrderDetails.destroy({
                where: {
                    order_id: order_id,
                },
            })
            if (!order_details) {
                throw new Error('Cannot delete order details');
            } else {
                const order = await Order.destroy({
                    where: {
                        order_id: order_id,
                    },
                });
                if (!order) {
                    throw new Error('Cannot delete order');
                } else {
                    return order;
                }
            }

        } catch (error) {
            throw new BadRequestError(error.message);
        }
    },

    getOrder: async (order_id) => {
        const data = await Order.findAll({
            where: {
                order_id: order_id,
            },
        });
        return data;
    },

    getAllOrder: async () => {
        try {
            // const data = await Order.findAll({
            //     include: [
            //         {
            //             model: OrderDetails,
            //             as: 'order_details',
            //             attributes: ['order_details_id', 'product_id', 'quantity', 'phone', 'email', 'address'],
            //             // include: [
            //             //     {
            //             //         model: Product,
            //             //         as: 'product',
            //             //         attributes: ['product_name', 'product_price', 'product_image'],
            //             //     }
            //             // ]
            //         },

            //     ],
            //     attributes: ['order_id', 'order_total', 'order_status', 'order_date', 'user_id'],
            // });
            const data = db.sequelize.query('SELECT * FROM orders LEFT JOIN order_details ON order_details.order_id = orders.order_id LEFT JOIN products ON products.product_id = order_details.product_id')
            return data;
        } catch (error) {
            return error;
        }
    },
    getOrderByUserId: async (user_id) => {
        // const data = await Order.findAll({
        //     where: {
        //         user_id: user_id,
        //     },
        //     include: [
        //         {
        //             model: OrderDetails,
        //             as: 'order_details',
        //             attributes: ['order_details_id', 'product_id', 'quantity', 'phone', 'email', 'address'],
        //         }
        //     ],
        //     attributes: ['order_id', 'order_total', 'order_status', 'order_date', 'user_id'],
        // });
        const data = db.sequelize.query('SELECT * FROM orders LEFT JOIN order_details ON order_details.order_id = orders.order_id LEFT JOIN products ON products.product_id = order_details.product_id WHERE orders.user_id = ' + user_id)
        return data;
    },
    getOrderDetails: async (order_details_id) => {
        const data = await OrderDetails.findAll({
            where: {
                order_id: order_details_id,
            },
        });
        return data;
    },
    getOrderAndUserID: async (order_id, user_id) => {
        try {
            // const data = await Order.findAll({
            //     where: {
            //         order_id: order_id,
            //         user_id: user_id,
            //     },
            // });
            const data = db.sequelize.query('SELECT * FROM orders LEFT JOIN order_details ON order_details.order_id = orders.order_id LEFT JOIN products ON products.product_id = order_details.product_id WHERE orders.user_id = ' + user_id + ' AND orders.order_id = ' + order_id)
            return data;
        } catch (error) {
            throw new BadRequestError(error.message);
        }
    }
};


module.exports = OrderServices;