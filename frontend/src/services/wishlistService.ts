import api from './api';
import { mockWishlist } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Mock 상태 관리 (실제로는 localStorage 등을 사용할 수 있음)
let mockWishlistState = [...mockWishlist];

export const wishlistService = {
  async getWishlists() {
    if (USE_MOCK) {
      return mockWishlistState;
    }
    const response = await api.get('/wishlists');
    return response.data;
  },

  async addToWishlist(accommodationId: number) {
    if (USE_MOCK) {
      const { mockAccommodations } = await import('./mockData');
      const accommodation = mockAccommodations.find(a => a.id === accommodationId);
      if (accommodation) {
        const newItem = {
          id: mockWishlistState.length + 1,
          accommodationId,
          createdAt: new Date().toISOString(),
          accommodation,
        };
        mockWishlistState.push(newItem);
        return newItem;
      }
      throw new Error('Accommodation not found');
    }
    const response = await api.post('/wishlists', { accommodationId });
    return response.data;
  },

  async removeFromWishlist(accommodationId: number) {
    if (USE_MOCK) {
      mockWishlistState = mockWishlistState.filter(
        item => item.accommodationId !== accommodationId
      );
      return { message: 'Removed from wishlist' };
    }
    const response = await api.delete(`/wishlists/${accommodationId}`);
    return response.data;
  },

  async checkWishlist(accommodationId: number) {
    if (USE_MOCK) {
      return {
        isWishlisted: mockWishlistState.some(
          item => item.accommodationId === accommodationId
        ),
      };
    }
    const response = await api.get(`/wishlists/check/${accommodationId}`);
    return response.data;
  },
};
