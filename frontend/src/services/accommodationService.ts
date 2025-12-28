import api from './api';
import type { Accommodation, SearchFilters, PaginationParams } from '../types';
import { mockAccommodations, mockAccommodationDetail } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const accommodationService = {
  async getAccommodations(filters: SearchFilters & PaginationParams) {
    if (USE_MOCK) {
      // Mock 데이터 필터링
      let filtered = [...mockAccommodations];

      if (filters.region) {
        filtered = filtered.filter(acc => acc.region === filters.region);
      }
      if (filters.minRating) {
        filtered = filtered.filter(acc => (acc.averageRating || 0) >= filters.minRating!);
      }
      if (filters.minPrice) {
        filtered = filtered.filter(acc => (acc.minPrice || 0) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(acc => (acc.minPrice || 999999) <= filters.maxPrice!);
      }

      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        data: filtered.slice(start, end),
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit),
        },
      };
    }

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
    if (USE_MOCK) {
      return mockAccommodationDetail;
    }

    const response = await api.get(`/accommodations/${id}`);
    return response.data;
  },

  async getAccommodationAmenities(id: number, ageMonth?: number) {
    if (USE_MOCK) {
      return mockAccommodationDetail.amenities;
    }

    const params = ageMonth ? `?ageMonth=${ageMonth}` : '';
    const response = await api.get(`/accommodations/${id}/amenities${params}`);
    return response.data;
  },
};
