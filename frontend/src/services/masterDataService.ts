import api from './api';
import { mockAgeMonths, mockAmenities } from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

const mockReviewPros = [
  { id: 1, name: '청결도 우수', category: '시설' },
  { id: 2, name: '아기용품 완비', category: '편의성' },
  { id: 3, name: '위치 좋음', category: '위치' },
  { id: 4, name: '친절한 서비스', category: '서비스' },
  { id: 5, name: '조용한 환경', category: '환경' },
];

const mockReviewCons = [
  { id: 1, name: '주차 불편', category: '시설' },
  { id: 2, name: '소음', category: '환경' },
  { id: 3, name: '가격 비쌈', category: '기타' },
];

export const masterDataService = {
  async getAgeMonths() {
    if (USE_MOCK) {
      return mockAgeMonths;
    }
    const response = await api.get('/age-months');
    return response.data;
  },

  async getAmenityCategories() {
    if (USE_MOCK) {
      return [
        { id: 1, name: '침구', description: '침구 관련 용품' },
        { id: 2, name: '수유용품', description: '수유 관련 용품' },
        { id: 3, name: '위생용품', description: '위생 관련 용품' },
        { id: 4, name: '목욕용품', description: '목욕 관련 용품' },
        { id: 5, name: '가구', description: '가구' },
        { id: 6, name: '놀이용품', description: '놀이 관련 용품' },
      ];
    }
    const response = await api.get('/amenity-categories');
    return response.data;
  },

  async getAmenities() {
    if (USE_MOCK) {
      return mockAmenities;
    }
    const response = await api.get('/amenities');
    return response.data;
  },

  async getReviewPros() {
    if (USE_MOCK) {
      return mockReviewPros;
    }
    const response = await api.get('/review-pros');
    return response.data;
  },

  async getReviewCons() {
    if (USE_MOCK) {
      return mockReviewCons;
    }
    const response = await api.get('/review-cons');
    return response.data;
  },
};
