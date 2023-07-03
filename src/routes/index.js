const express = require('express');
const router = express.Router();
const {apiKey} = require('../auth/check.auth');
const productRoutes = require('./products/index');
const userRoutes = require('./users/index');
const categoryRoutes = require('./categories/index');
const paymentRoutes = require('./payments/index');
const accountRoutes = require('./accounts/index');
const websiteRoutes = require('./website/index');
const accessRoutes = require('./access/index');
const cartRoutes = require('./cart/index');
const ordersRoutes = require('./order/index');
// Middleware ======================
router.use(apiKey);


router.use('/v1/api/website',websiteRoutes);
router.use('/v1/api/categories', categoryRoutes);
router.use('/v1/api/products', productRoutes);
router.use('/v1/api/orders', ordersRoutes);
router.use('/v1/api', accessRoutes)
router.use('/v1/api/users', userRoutes);
router.use('/v1/api/payments', paymentRoutes);
router.use('/v1/api/carts', cartRoutes);
router.use('/v1/api/accounts', accountRoutes);



module.exports = router;