import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middlewares/auth';

export const kakaoCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as any;

    if (!user) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Kakao callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

export const naverCallback = (req: Request, res: Response): void => {
  try {
    const user = req.user as any;

    if (!user) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error('Naver callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { id, email, name, phone, profile_image, provider, created_at, updated_at } = user;

    res.json({
      id,
      email,
      name,
      phone,
      profileImage: profile_image,
      provider,
      createdAt: created_at,
      updatedAt: updated_at,
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};

export const logout = (req: Request, res: Response): void => {
  try {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Logout failed' });
        return;
      }
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

export const unlink = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // TODO: 소셜 계정 연동 해제 API 호출 (카카오/네이버)
    // 실제 구현 시 각 플랫폼의 연동 해제 API를 호출해야 합니다

    res.json({ message: 'Account unlinked successfully' });
  } catch (error) {
    console.error('Unlink error:', error);
    res.status(500).json({ error: 'Failed to unlink account' });
  }
};
