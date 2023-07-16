const asynHandler = require('../../helpers/asyncHandler');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../auth/auth.util');

const PaymentController = require('../../controllers/payment.controller');
// middleware 


// admin 
router.use(authMiddleware.verifyToken);
// end middleware 

router.post('/create-payments', asynHandler(PaymentController.createPayment));

router.get('/get-payment-by-user-id', asynHandler(PaymentController.getPaymentByUserID));

// for admin

router.use(authMiddleware.verifyTokenAndAdminAuth);

router.get('/get-all-payments', asynHandler(PaymentController.getAllPayments));
router.post('/update-payment-status', asynHandler(PaymentController.getPaymentByUpdateStatus));

module.exports = router;