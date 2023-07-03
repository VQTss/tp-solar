const middlewareControllers = require('../../auth/auth.util');
const UserControllers = require('../../controllers/user.controller');
const asynHandler = require('../../helpers/asyncHandler');
const express = require('express');
const router = express.Router();



// middleware
router.use(middlewareControllers.verifyToken);
// end middleware

router.post('/get-user-by-id', asynHandler(UserControllers.getUserById));
router.post('/update-user', asynHandler(UserControllers.updateUser));

// admin middleware

router.use(middlewareControllers.verifyTokenAndAdminAuth);

// end admin middleware

router.get('/get-all-user', asynHandler(UserControllers.getAllUsers));


module.exports = router;