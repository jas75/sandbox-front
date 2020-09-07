const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth-controller');

// @route   POST /api/user
// @des     Register/Create a user
// @access  Public
router.post('/user', authController.registerUser);

// @route   POST /api/login
// @des     Login user
// @access  Public
router.post('/login', authController.loginUser);

module.exports = router;
