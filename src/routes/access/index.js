

const express = require('express');
const router = express.Router();
const AccessController = require('../../controllers/access.controller');
const middlewareControllers =  require('../../auth/auth.util');

router.post('/register',AccessController.register);
router.post('/login',AccessController.login);
router.post('/refreshToken',AccessController.refreshToken);
// middleware

router.use(middlewareControllers.verifyToken);

// end middleware


router.get('/logout',AccessController.logout);

module.exports = router;
