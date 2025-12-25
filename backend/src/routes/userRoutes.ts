import express from 'express';
import { getMyInfo, updateMyInfo } from '../controllers/userController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Get my info
router.get('/me', authenticate, getMyInfo);

// Update my info
router.put('/me', authenticate, updateMyInfo);

export default router;
