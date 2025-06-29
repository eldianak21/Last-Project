const pool = require('../config/db');
const twilioService = require('../services/twilioService');
const bcrypt = require('bcryptjs');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // 1. Validate user exists
    const [users] = await pool.query(
      'SELECT UserID, Phone FROM Users WHERE Email = ?', 
      [email]
    );
    
    if (!users.length) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    const user = users[0];
    
    // 2. Generate and store OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    await pool.query(
      'UPDATE Users SET ResetOTP = ?, ResetOTPExpires = ? WHERE UserID = ?',
      [otp, expiresAt, user.UserID]
    );

    // 3. Send OTP via Twilio
    await twilioService.sendOTP(user.Phone, otp);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined // Dev only
    });

  } catch (error) {
    console.error('PasswordResetController Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process OTP request'
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const [users] = await pool.query(
      `SELECT ResetOTP, ResetOTPExpires 
       FROM Users 
       WHERE Email = ? AND ResetOTPExpires > NOW()`,
      [email]
    );

    if (!users.length || users[0].ResetOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    // 1. Verify OTP first
    const [users] = await pool.query(
      `SELECT UserID FROM Users 
       WHERE Email = ? AND ResetOTP = ? AND ResetOTPExpires > NOW()`,
      [email, otp]
    );

    if (!users.length) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // 2. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // 3. Update password and clear OTP
    await pool.query(
      `UPDATE Users 
       SET PasswordHash = ?, ResetOTP = NULL, ResetOTPExpires = NULL 
       WHERE UserID = ?`,
      [hashedPassword, users[0].UserID]
    );

    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
};

module.exports = {
  requestOTP,
  verifyOTP,
  resetPassword
};