import express from 'express';
import {
  getAgeMonths,
  getAmenityCategories,
  getAmenities,
  getReviewPros,
  getReviewCons,
} from '../controllers/masterDataController';

const router = express.Router();

// Get age months
router.get('/age-months', getAgeMonths);

// Get amenity categories
router.get('/amenity-categories', getAmenityCategories);

// Get amenities
router.get('/amenities', getAmenities);

// Get review pros
router.get('/review-pros', getReviewPros);

// Get review cons
router.get('/review-cons', getReviewCons);

export default router;
