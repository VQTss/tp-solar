
const express = require('express');
const router = express.Router();
const mainPageControllers = require('../../controllers/mainPage.controller');





router.get('/',mainPageControllers.getImagesForSlider);

module.exports = router;