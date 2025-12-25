import api from './api';

export const masterDataService = {
  async getAgeMonths() {
    const response = await api.get('/age-months');
    return response.data;
  },

  async getAmenityCategories() {
    const response = await api.get('/amenity-categories');
    return response.data;
  },

  async getAmenities() {
    const response = await api.get('/amenities');
    return response.data;
  },

  async getReviewPros() {
    const response = await api.get('/review-pros');
    return response.data;
  },

  async getReviewCons() {
    const response = await api.get('/review-cons');
    return response.data;
  },
};
