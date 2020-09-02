const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth-controller');

// @route   POST /api/user
// @des     Register/Create a user
// @access  Public
router.post(
  '/user',
  passport.authenticate('jwt', { session: false }),
  authController.registerUser
);

router.get('/test', authController.test);

module.exports = router;
