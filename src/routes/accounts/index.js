const asynHandler = require('../../helpers/asyncHandler');
const express = require('express');
const router = express.Router();
const middlewareControllers = require('../../auth/auth.util');
const AccountController = require('../../controllers/account.controller');



// middleware

router.use(middlewareControllers.verifyToken);

router.post('/get-account-by-id', asynHandler(AccountController.getAccountsById));


router.use(middlewareControllers.verifyTokenAndAdminAuth);
// end middleware
router.get('/get-all', asynHandler(AccountController.getAccounts));
router.delete('/delete', asynHandler(AccountController.deleteAccount));



module.exports = router;