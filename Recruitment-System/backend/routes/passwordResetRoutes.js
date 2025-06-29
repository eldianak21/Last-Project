const express = require('express');
const router = express.Router();
const {
  requestOTP,
  verifyOTP,
  resetPassword
} = require('../controllers/passwordResetController');

router.post('/request-password-reset', requestOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

module.exports = router;