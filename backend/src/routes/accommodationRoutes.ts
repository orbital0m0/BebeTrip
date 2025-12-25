import express from 'express';
import {
  getAccommodations,
  getAccommodationById,
  getAccommodationAmenities,
} from '../controllers/accommodationController';

const router = express.Router();

// Get all accommodations with filters
router.get('/', getAccommodations);

// Get accommodation by ID
router.get('/:id', getAccommodationById);

// Get accommodation amenities
router.get('/:id/amenities', getAccommodationAmenities);

export default router;
