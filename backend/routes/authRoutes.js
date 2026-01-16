import express from 'express';
import { register, verifyOTP, login, resendOTP, forgotPassword, resetPassword, deleteAccount } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOTP);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/resend-otp
router.post('/resend-otp', resendOTP);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPassword);

// DELETE /api/auth/delete-account (protected)
router.delete('/delete-account', authMiddleware, deleteAccount);

export default router;

