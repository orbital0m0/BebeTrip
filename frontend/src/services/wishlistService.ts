import api from './api';

export const wishlistService = {
  async getWishlists() {
    const response = await api.get('/wishlists');
    return response.data;
  },

  async addToWishlist(accommodationId: number) {
    const response = await api.post('/wishlists', { accommodationId });
    return response.data;
  },

  async removeFromWishlist(accommodationId: number) {
    const response = await api.delete(`/wishlists/${accommodationId}`);
    return response.data;
  },

  async checkWishlist(accommodationId: number) {
    const response = await api.get(`/wishlists/check/${accommodationId}`);
    return response.data;
  },
};
