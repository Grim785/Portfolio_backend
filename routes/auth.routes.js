const express = require('express');
const router = express.Router();

const { loginAdmin } = require('../controllers/auth.controller');

// Route: POST /api/login
router.post('/', loginAdmin);

module.exports = router;