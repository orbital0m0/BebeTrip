import api from './api';

export interface CreateReviewData {
  accommodationId: number;
  roomType: string;
  childAgeMonths: number;
  totalPeople: number;
  rating: number;
  content?: string;
  pros?: number[];
  cons?: number[];
}

export interface UpdateReviewData {
  roomType?: string;
  childAgeMonths?: number;
  totalPeople?: number;
  rating?: number;
  content?: string;
  pros?: number[];
  cons?: number[];
}

export const reviewService = {
  async createReview(data: CreateReviewData) {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  async getReviewById(id: number) {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  async updateReview(id: number, data: UpdateReviewData) {
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  async deleteReview(id: number) {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  async getMyReviews(page = 1, limit = 10) {
    const response = await api.get(`/reviews/my?page=${page}&limit=${limit}`);
    return response.data;
  },

  async uploadReviewImages(reviewId: number, images: File[]) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await api.post(`/reviews/${reviewId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteReviewImage(reviewId: number, imageId: number) {
    const response = await api.delete(`/reviews/${reviewId}/images/${imageId}`);
    return response.data;
  },
};
