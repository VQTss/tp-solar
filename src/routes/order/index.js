

const express = require('express');
const router = express.Router();
const middlewareControllers = require('../../auth/auth.util');
const asynHandler = require('../../helpers/asyncHandler');
const orderController = require('../../controllers/order.controller');

// middleware
router.use(middlewareControllers.verifyToken);

router.post('/get-order-by-user-id', asynHandler(orderController.getOrderByUserId));
router.post('/create-order', asynHandler(orderController.addOrder));
router.put('/update-order', asynHandler(orderController.updateOrder));
router.delete('/delete-order', asynHandler(orderController.deleteOrder));
router.post('/get-order-user', asynHandler(orderController.getOrderAndUserID));
// for admin
router.use(middlewareControllers.verifyTokenAndAdminAuth);

// get all orders'

router.get('/get-all-orders', asynHandler(orderController.getAllOrder));
router.post('/get-order-by-id', asynHandler(orderController.getOrder));
router.post('/get-order-details-by-id', asynHandler(orderController.getOrderDetails));
module.exports = router;