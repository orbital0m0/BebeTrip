import { Request, Response } from 'express';
import AccommodationModel, { SearchFilters } from '../models/Accommodation';

export const getAccommodations = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: SearchFilters = {
      region: req.query.region as string,
      checkIn: req.query.checkIn as string,
      checkOut: req.query.checkOut as string,
      adults: req.query.adults ? parseInt(req.query.adults as string) : undefined,
      children: req.query.children ? parseInt(req.query.children as string) : undefined,
      infants: req.query.infants ? parseInt(req.query.infants as string) : undefined,
      ageMonths: req.query.ageMonths ? (req.query.ageMonths as string).split(',').map(Number) : undefined,
      amenities: req.query.amenities ? (req.query.amenities as string).split(',').map(Number) : undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
      minRating: req.query.minRating ? parseFloat(req.query.minRating as string) : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 12,
      sortBy: req.query.sortBy as string,
      sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'desc',
    };

    const result = await AccommodationModel.findAll(filters);

    res.json({
      data: result.data.map(acc => ({
        id: acc.id,
        name: acc.name,
        description: acc.description,
        address: acc.address,
        region: acc.region,
        thumbnailImage: acc.thumbnail_image,
        totalRooms: acc.total_rooms,
        averageRating: parseFloat(acc.average_rating?.toString() || '0'),
        reviewCount: parseInt(acc.review_count?.toString() || '0'),
        minPrice: acc.min_price ? parseFloat(acc.min_price.toString()) : null,
        createdAt: acc.created_at,
        updatedAt: acc.updated_at,
      })),
      pagination: {
        total: result.total,
        page: filters.page,
        limit: filters.limit,
        totalPages: Math.ceil(result.total / (filters.limit || 12)),
      },
    });
  } catch (error) {
    console.error('Get accommodations error:', error);
    res.status(500).json({ error: 'Failed to get accommodations' });
  }
};

export const getAccommodationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    const accommodation = await AccommodationModel.findById(id);

    if (!accommodation) {
      res.status(404).json({ error: 'Accommodation not found' });
      return;
    }

    const images = await AccommodationModel.getImages(id);
    const roomTypes = await AccommodationModel.getRoomTypes(id);
    const stats = await AccommodationModel.getStats(id);
    const amenitiesData = await AccommodationModel.getAmenities(id);
    const reviewsData = await AccommodationModel.getReviews(id);

    // Group amenities by category
    const amenities = amenitiesData.reduce((acc, amenity) => {
      const category = amenity.category_name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: amenity.amenity_id,
        name: amenity.name,
        icon: amenity.icon,
        isAvailable: amenity.is_available,
        notes: amenity.notes,
        ageMonthFrom: amenity.age_month_from,
        ageMonthTo: amenity.age_month_to,
      });
      return acc;
    }, {} as Record<string, any[]>);

    res.json({
      id: accommodation.id,
      name: accommodation.name,
      description: accommodation.description,
      address: accommodation.address,
      region: accommodation.region,
      thumbnailImage: accommodation.thumbnail_image,
      totalRooms: accommodation.total_rooms,
      averageRating: parseFloat(stats.average_rating || '0'),
      reviewCount: parseInt(stats.review_count || '0'),
      images: images.map(img => ({
        id: img.id,
        imageUrl: img.image_url,
        isMain: img.is_main,
        sortOrder: img.sort_order,
      })),
      roomTypes: roomTypes.map(rt => ({
        id: rt.id,
        name: rt.name,
        description: rt.description,
        maxOccupancy: rt.max_occupancy,
        pricePerNight: parseFloat(rt.price_per_night),
      })),
      amenities,
      reviews: reviewsData.map(review => ({
        id: review.id,
        rating: parseFloat(review.rating?.toString() || '0'),
        content: review.content,
        childAgeMonths: review.child_age_months,
        totalPeople: review.total_people,
        roomType: review.room_type,
        createdAt: review.created_at,
        user: {
          id: review.user_id,
          name: review.user_name,
          profileImage: review.user_profile_image,
        },
        pros: review.pros || [],
        cons: review.cons || [],
        images: review.images || [],
      })),
      createdAt: accommodation.created_at,
      updatedAt: accommodation.updated_at,
    });
  } catch (error) {
    console.error('Get accommodation by id error:', error);
    res.status(500).json({ error: 'Failed to get accommodation' });
  }
};

export const getAccommodationAmenities = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const ageMonthFilter = req.query.ageMonth ? parseInt(req.query.ageMonth as string) : undefined;

    const amenities = await AccommodationModel.getAmenities(id, ageMonthFilter);

    // Group by category
    const grouped = amenities.reduce((acc, amenity) => {
      const category = amenity.category_name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        id: amenity.amenity_id,
        name: amenity.name,
        icon: amenity.icon,
        isAvailable: amenity.is_available,
        notes: amenity.notes,
        ageMonthFrom: amenity.age_month_from,
        ageMonthTo: amenity.age_month_to,
      });
      return acc;
    }, {} as Record<string, any[]>);

    res.json(grouped);
  } catch (error) {
    console.error('Get accommodation amenities error:', error);
    res.status(500).json({ error: 'Failed to get amenities' });
  }
};
