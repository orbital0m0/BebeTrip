import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticate } from '../middlewares/auth';
import {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  getMyReviews,
  uploadReviewImages,
  deleteReviewImage,
} from '../controllers/reviewController';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/reviews/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Review CRUD
router.post('/', authenticate, createReview);
router.get('/my', authenticate, getMyReviews);
router.get('/:id', getReviewById);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);

// Review images
router.post('/:id/images', authenticate, upload.array('images', 10), uploadReviewImages);
router.delete('/:id/images/:imageId', authenticate, deleteReviewImage);

export default router;
