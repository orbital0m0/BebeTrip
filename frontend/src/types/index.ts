// User types
export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  provider: 'kakao' | 'naver';
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

// Accommodation types
export interface Accommodation {
  id: number;
  name: string;
  description: string;
  address: string;
  region: string;
  thumbnailImage?: string;
  totalRooms: number;
  averageRating?: number;
  minPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccommodationImage {
  id: number;
  accommodationId: number;
  imageUrl: string;
  isMain: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface RoomType {
  id: number;
  accommodationId: number;
  name: string;
  description?: string;
  maxOccupancy: number;
  pricePerNight: number;
  createdAt: string;
  updatedAt: string;
}

// Amenity types
export interface AgeMonth {
  id: number;
  monthFrom: number;
  monthTo: number;
  label: string;
  description?: string;
}

export interface AmenityCategory {
  id: number;
  name: string;
  description?: string;
}

export interface Amenity {
  id: number;
  categoryId: number;
  name: string;
  icon?: string;
  ageMonthFrom?: number;
  ageMonthTo?: number;
}

export interface AccommodationAmenity {
  id: number;
  accommodationId: number;
  amenityId: number;
  isAvailable: boolean;
  notes?: string;
  amenity?: Amenity;
}

// Review types
export interface Review {
  id: number;
  userId: number;
  accommodationId: number;
  roomType: string;
  childAgeMonths: number;
  totalPeople: number;
  rating?: number;
  content?: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
  pros?: ReviewPro[];
  cons?: ReviewCon[];
  images?: ReviewImage[];
}

export interface ReviewPro {
  id: number;
  name: string;
  category: string;
}

export interface ReviewCon {
  id: number;
  name: string;
  category: string;
}

export interface ReviewImage {
  id: number;
  reviewId: number;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
}

// Wishlist types
export interface Wishlist {
  id: number;
  userId: number;
  accommodationId: number;
  createdAt: string;
  accommodation?: Accommodation;
}

// Search & Filter types
export interface SearchFilters {
  region?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
  ageMonths?: number[];
  amenities?: number[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
