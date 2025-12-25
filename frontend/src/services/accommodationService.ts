import api from './api';
import type { Accommodation, SearchFilters, PaginationParams } from '../types';

export const accommodationService = {
  async getAccommodations(filters: SearchFilters & PaginationParams) {
    const params = new URLSearchParams();

    if (filters.region) params.append('region', filters.region);
    if (filters.checkIn) params.append('checkIn', filters.checkIn);
    if (filters.checkOut) params.append('checkOut', filters.checkOut);
    if (filters.adults) params.append('adults', filters.adults.toString());
    if (filters.children) params.append('children', filters.children.toString());
    if (filters.infants) params.append('infants', filters.infants.toString());
    if (filters.ageMonths && filters.ageMonths.length > 0) {
      params.append('ageMonths', filters.ageMonths.join(','));
    }
    if (filters.amenities && filters.amenities.length > 0) {
      params.append('amenities', filters.amenities.join(','));
    }
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get(`/accommodations?${params.toString()}`);
    return response.data;
  },

  async getAccommodationById(id: number) {
    const response = await api.get(`/accommodations/${id}`);
    return response.data;
  },

  async getAccommodationAmenities(id: number, ageMonth?: number) {
    const params = ageMonth ? `?ageMonth=${ageMonth}` : '';
    const response = await api.get(`/accommodations/${id}/amenities${params}`);
    return response.data;
  },
};
