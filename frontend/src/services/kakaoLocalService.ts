import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface MedicalPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string; // 미터 단위
}

interface NearbyMedicalResponse {
  success: boolean;
  data: {
    hospitals: MedicalPlace[];
    pharmacies: MedicalPlace[];
  };
  error?: string;
}

/**
 * 카카오 로컬 API 서비스
 */
class KakaoLocalService {
  /**
   * 근처 병원 조회
   */
  async getNearbyHospitals(
    x: number,
    y: number,
    radius: number = 3000
  ): Promise<{ success: boolean; items: MedicalPlace[]; error?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/kakao-local/hospitals`, {
        params: { x, y, radius },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby hospitals:', error);
      return {
        success: false,
        items: [],
        error: 'Failed to fetch nearby hospitals',
      };
    }
  }

  /**
   * 근처 약국 조회
   */
  async getNearbyPharmacies(
    x: number,
    y: number,
    radius: number = 3000
  ): Promise<{ success: boolean; items: MedicalPlace[]; error?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/kakao-local/pharmacies`, {
        params: { x, y, radius },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby pharmacies:', error);
      return {
        success: false,
        items: [],
        error: 'Failed to fetch nearby pharmacies',
      };
    }
  }

  /**
   * 근처 병원과 약국 한번에 조회
   */
  async getNearbyMedical(
    x: number,
    y: number,
    radius: number = 3000
  ): Promise<NearbyMedicalResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/kakao-local/medical`, {
        params: { x, y, radius },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby medical facilities:', error);
      return {
        success: false,
        data: {
          hospitals: [],
          pharmacies: [],
        },
        error: 'Failed to fetch nearby medical facilities',
      };
    }
  }
}

export const kakaoLocalService = new KakaoLocalService();
export type { MedicalPlace, NearbyMedicalResponse };
