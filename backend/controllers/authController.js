import User from '../models/User.js';
import OTP from '../models/OTP.js';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../services/emailService.js';
import crypto from 'crypto';

// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Enhanced password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter'
            });
        }

        // Check for lowercase letter
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one lowercase letter'
            });
        }

        // Check for digit
        if (!/\d/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one digit'
            });
        }

        // Check for special character
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one special character'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'User already exists. Please login.'
            });
        }

        // If user exists but not verified, delete old user
        if (existingUser && !existingUser.isVerified) {
            await User.deleteOne({ email });
            await OTP.deleteMany({ email });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Generate and save OTP
        const otp = generateOTP();
        const otpDoc = new OTP({ email, otp });
        await otpDoc.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(201).json({
            success: true,
            message: 'Registration successful! OTP sent to your email.',
            email
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Validation
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'User already verified. Please login.'
            });
        }

        // Find OTP
        const otpDoc = await OTP.findOne({ email, otp }).sort({ createdAt: -1 });

        if (!otpDoc) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Verify user
        user.isVerified = true;
        await user.save();

        // Delete OTP
        await OTP.deleteMany({ email });

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully!',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed. Please try again.'
        });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Please verify your email first'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed. Please try again.'
        });
    }
};

// Resend OTP
export const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Validation
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'User already verified. Please login.'
            });
        }

        // Delete old OTPs
        await OTP.deleteMany({ email });

        // Generate and save new OTP
        const otp = generateOTP();
        const otpDoc = new OTP({ email, otp });
        await otpDoc.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(200).json({
            success: true,
            message: 'OTP resent successfully!'
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to resend OTP. Please try again.'
        });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email'
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Please verify your email first'
            });
        }

        // Generate reset token (6-digit code like OTP)
        const resetToken = generateOTP();

        // Hash token and save to user
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email with token
        await sendOTPEmail(email, resetToken);

        res.status(200).json({
            success: true,
            message: 'Password reset code sent to your email'
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process request. Please try again.'
        });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: 'Token and new password are required'
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter'
            });
        }

        if (!/[a-z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one lowercase letter'
            });
        }

        if (!/\d/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one digit'
            });
        }

        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one special character'
            });
        }

        // Hash the token from request
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset code'
            });
        }

        // Update password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successful! You can now login with your new password.'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to reset password. Please try again.'
        });
    }
};

// Delete Account
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware

        // Find and delete user
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete all tasks associated with this user
        const Task = (await import('../models/Task.js')).default;
        await Task.deleteMany({ user: userId });

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete account. Please try again.'
        });
    }
};