const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', aboutController.getAbout);
router.put('/update', authMiddleware, aboutController.updateAbout);

module.exports = router;
