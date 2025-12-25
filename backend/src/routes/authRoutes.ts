import express from 'express';
import passport from '../config/passport';
import { kakaoCallback, naverCallback, getMe, logout, unlink } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Kakao OAuth
router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: '/login' }),
  kakaoCallback
);

// Naver OAuth
router.get('/naver', passport.authenticate('naver'));
router.get(
  '/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/login' }),
  naverCallback
);

// Get current user
router.get('/me', authenticate, getMe);

// Logout
router.post('/logout', logout);

// Unlink social account
router.delete('/unlink', authenticate, unlink);

export default router;
