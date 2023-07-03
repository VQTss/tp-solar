const asynHandler = require('../../helpers/asyncHandler');
const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categories.controller');
const middlewareControllers = require('../../auth/auth.util');

router.get('/', asynHandler(categoryController.getCategories));

// Authenticated routes

router.use(middlewareControllers.verifyToken);
router.use(middlewareControllers.verifyTokenAndAdminAuth);
// End authenticated routes

router.post('/create', asynHandler(categoryController.createCategory));
router.put('/update', asynHandler(categoryController.updateCategories));
router.delete('/delete', asynHandler(categoryController.deleteCategories));



module.exports = router;