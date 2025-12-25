import express from 'express';
import {
  getWishlists,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
} from '../controllers/wishlistController';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Get all wishlists
router.get('/', authenticate, getWishlists);

// Add to wishlist
router.post('/', authenticate, addToWishlist);

// Remove from wishlist
router.delete('/:accommodationId', authenticate, removeFromWishlist);

// Check if accommodation is in wishlist
router.get('/check/:accommodationId', authenticate, checkWishlist);

export default router;
