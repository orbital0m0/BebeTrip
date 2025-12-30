import express, { Request, Response, NextFunction } from 'express';
import passport from '../config/passport';
import { kakaoCallback, naverCallback, getMe, logout, unlink } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Check if strategy is configured
const checkStrategy = (strategyName: string) => {
  return (_req: Request, res: Response, next: NextFunction): void => {
    // @ts-ignore
    if (!passport._strategy(strategyName)) {
      res.status(503).json({
        error: 'Service Unavailable',
        message: `${strategyName} OAuth is not configured. Please set up OAuth credentials in .env file.`
      });
      return;
    }
    next();
  };
};

// Kakao OAuth
router.get('/kakao', checkStrategy('kakao'), passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  checkStrategy('kakao'),
  passport.authenticate('kakao', { failureRedirect: '/login' }),
  kakaoCallback
);

// Naver OAuth
router.get('/naver', checkStrategy('naver'), passport.authenticate('naver'));
router.get(
  '/naver/callback',
  checkStrategy('naver'),
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
