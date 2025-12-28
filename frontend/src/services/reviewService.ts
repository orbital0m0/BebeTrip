import api from './api';
import { mockReviews } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Mock 상태 관리
let mockReviewsState = [...mockReviews];

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
    if (USE_MOCK) {
      const newReview = {
        id: mockReviewsState.length + 1,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pros: [],
        cons: [],
        images: [],
      };
      mockReviewsState.push(newReview);
      return newReview;
    }
    const response = await api.post('/reviews', data);
    return response.data;
  },

  async getReviewById(id: number) {
    if (USE_MOCK) {
      return mockReviewsState.find(r => r.id === id);
    }
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  async updateReview(id: number, data: UpdateReviewData) {
    if (USE_MOCK) {
      const index = mockReviewsState.findIndex(r => r.id === id);
      if (index !== -1) {
        mockReviewsState[index] = {
          ...mockReviewsState[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        return mockReviewsState[index];
      }
      throw new Error('Review not found');
    }
    const response = await api.put(`/reviews/${id}`, data);
    return response.data;
  },

  async deleteReview(id: number) {
    if (USE_MOCK) {
      mockReviewsState = mockReviewsState.filter(r => r.id !== id);
      return { message: 'Review deleted' };
    }
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },

  async getMyReviews(page = 1, limit = 10) {
    if (USE_MOCK) {
      const start = (page - 1) * limit;
      const end = start + limit;
      return {
        data: mockReviewsState.slice(start, end),
        pagination: {
          total: mockReviewsState.length,
          page,
          limit,
          totalPages: Math.ceil(mockReviewsState.length / limit),
        },
      };
    }
    const response = await api.get(`/reviews/my?page=${page}&limit=${limit}`);
    return response.data;
  },

  async uploadReviewImages(reviewId: number, images: File[]) {
    if (USE_MOCK) {
      // Mock에서는 이미지 업로드를 시뮬레이션만 함
      return { message: 'Images uploaded (mock)' };
    }
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
    if (USE_MOCK) {
      return { message: 'Image deleted (mock)' };
    }
    const response = await api.delete(`/reviews/${reviewId}/images/${imageId}`);
    return response.data;
  },
};
