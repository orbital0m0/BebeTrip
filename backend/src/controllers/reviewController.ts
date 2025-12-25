import { Request, Response } from 'express';
import ReviewModel from '../models/Review';

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const {
      accommodationId,
      roomType,
      childAgeMonths,
      totalPeople,
      rating,
      content,
      pros,
      cons,
    } = req.body;

    // Validate required fields
    if (!accommodationId || !roomType || childAgeMonths === undefined || !totalPeople) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      res.status(400).json({ error: 'Rating must be between 0 and 5' });
      return;
    }

    const review = await ReviewModel.create({
      userId,
      accommodationId,
      roomType,
      childAgeMonths,
      totalPeople,
      rating: rating || 0,
      content,
      pros: pros || [],
      cons: cons || [],
    });

    const fullReview = await ReviewModel.findById(review.id);

    res.status(201).json(fullReview);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const review = await ReviewModel.findById(id);

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    res.json(review);
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({ error: 'Failed to get review' });
  }
};

export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const id = parseInt(req.params.id);

    // Check ownership
    const isOwner = await ReviewModel.checkOwnership(id, userId);
    if (!isOwner) {
      res.status(403).json({ error: 'Not authorized to update this review' });
      return;
    }

    const {
      roomType,
      childAgeMonths,
      totalPeople,
      rating,
      content,
      pros,
      cons,
    } = req.body;

    if (rating !== undefined && (rating < 0 || rating > 5)) {
      res.status(400).json({ error: 'Rating must be between 0 and 5' });
      return;
    }

    const review = await ReviewModel.update(id, {
      roomType,
      childAgeMonths,
      totalPeople,
      rating,
      content,
      pros,
      cons,
    });

    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    const fullReview = await ReviewModel.findById(id);

    res.json(fullReview);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const id = parseInt(req.params.id);

    // Check ownership
    const isOwner = await ReviewModel.checkOwnership(id, userId);
    if (!isOwner) {
      res.status(403).json({ error: 'Not authorized to delete this review' });
      return;
    }

    const success = await ReviewModel.delete(id);

    if (!success) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

export const getMyReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const result = await ReviewModel.findByUserId(userId, page, limit);

    res.json({
      data: result.data.map(review => ({
        id: review.id,
        accommodationId: review.accommodation_id,
        accommodationName: review.accommodation_name,
        accommodationThumbnail: review.accommodation_thumbnail,
        roomType: review.room_type,
        childAgeMonths: review.child_age_months,
        totalPeople: review.total_people,
        rating: parseFloat(review.rating?.toString() || '0'),
        content: review.content,
        createdAt: review.created_at,
        updatedAt: review.updated_at,
        pros: review.pros || [],
        cons: review.cons || [],
        images: review.images || [],
      })),
      pagination: {
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

export const uploadReviewImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const reviewId = parseInt(req.params.id);

    // Check ownership
    const isOwner = await ReviewModel.checkOwnership(reviewId, userId);
    if (!isOwner) {
      res.status(403).json({ error: 'Not authorized to upload images for this review' });
      return;
    }

    // Check existing images count
    const existingImages = await ReviewModel.getImagesByReviewId(reviewId);

    const files = (req as any).files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ error: 'No images provided' });
      return;
    }

    if (existingImages.length + files.length > 10) {
      res.status(400).json({ error: 'Maximum 10 images allowed per review' });
      return;
    }

    // Save image URLs (in production, upload to S3/Cloudinary first)
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const imageUrl = `/uploads/reviews/${files[i].filename}`;
      const sortOrder = existingImages.length + i + 1;
      const image = await ReviewModel.addImage(reviewId, imageUrl, sortOrder);
      images.push({
        id: image.id,
        imageUrl: image.image_url,
        sortOrder: image.sort_order,
      });
    }

    res.status(201).json(images);
  } catch (error) {
    console.error('Upload review images error:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

export const deleteReviewImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const reviewId = parseInt(req.params.id);
    const imageId = parseInt(req.params.imageId);

    // Check ownership
    const isOwner = await ReviewModel.checkOwnership(reviewId, userId);
    if (!isOwner) {
      res.status(403).json({ error: 'Not authorized to delete images for this review' });
      return;
    }

    const success = await ReviewModel.deleteImage(imageId);

    if (!success) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete review image error:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
