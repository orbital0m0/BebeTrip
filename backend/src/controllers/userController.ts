import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import UserModel, { UpdateUserData } from '../models/User';

export const getMyInfo = async (req: AuthRequest, res: Response): Promise<void> => {
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
    console.error('Get my info error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
};

export const updateMyInfo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { name, phone } = req.body;

    const updateData: UpdateUserData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (phone !== undefined) {
      updateData.phone = phone;
    }

    const updatedUser = await UserModel.update(user.id, updateData);

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone,
      profileImage: updatedUser.profile_image,
      provider: updatedUser.provider,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    });
  } catch (error) {
    console.error('Update my info error:', error);
    res.status(500).json({ error: 'Failed to update user info' });
  }
};
