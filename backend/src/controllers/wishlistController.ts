import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import WishlistModel from '../models/Wishlist';

export const getWishlists = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const wishlists = await WishlistModel.findByUserId(user.id);

    res.json(
      wishlists.map(w => ({
        id: w.id,
        accommodationId: w.accommodation_id,
        accommodation: {
          id: w.accommodation_id,
          name: w.name,
          description: w.description,
          address: w.address,
          region: w.region,
          thumbnailImage: w.thumbnail_image,
          averageRating: parseFloat(w.average_rating || '0'),
          reviewCount: parseInt(w.review_count || '0'),
          minPrice: w.min_price ? parseFloat(w.min_price) : null,
        },
        createdAt: w.created_at,
      }))
    );
  } catch (error) {
    console.error('Get wishlists error:', error);
    res.status(500).json({ error: 'Failed to get wishlists' });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { accommodationId } = req.body;

    if (!accommodationId) {
      res.status(400).json({ error: 'Accommodation ID is required' });
      return;
    }

    // Check if already exists
    const existing = await WishlistModel.findByUserAndAccommodation(user.id, accommodationId);

    if (existing) {
      res.status(400).json({ error: 'Already in wishlist' });
      return;
    }

    const wishlist = await WishlistModel.create(user.id, accommodationId);

    res.status(201).json({
      id: wishlist.id,
      accommodationId: wishlist.accommodation_id,
      createdAt: wishlist.created_at,
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const accommodationId = parseInt(req.params.accommodationId);

    const deleted = await WishlistModel.delete(user.id, accommodationId);

    if (!deleted) {
      res.status(404).json({ error: 'Wishlist not found' });
      return;
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};

export const checkWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const accommodationId = parseInt(req.params.accommodationId);

    const isWishlisted = await WishlistModel.isWishlisted(user.id, accommodationId);

    res.json({ isWishlisted });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({ error: 'Failed to check wishlist' });
  }
};
