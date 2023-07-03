const express = require('express');
const router = express.Router();
const authMiddleware = require('../../auth/auth.util');
const CartController = require('../../controllers/cart.controller');
const asynHandler = require('../../helpers/asyncHandler');



router.use(authMiddleware.verifyToken);

router.post('/', asynHandler(CartController.getCartByUserId));
router.post('/create-cart', asynHandler(CartController.addCart));
router.put('/update-cart', asynHandler(CartController.updateCart));
router.delete('/delete-cart', asynHandler(CartController.deleteCart));









module.exports = router;