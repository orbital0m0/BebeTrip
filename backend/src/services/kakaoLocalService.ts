import axios from 'axios';

const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const BASE_URL = 'https://dapi.kakao.com';

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  place_url: string;
  distance: string; // 미터 단위
}

interface KakaoLocalResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoPlace[];
}

/**
 * 카카오 로컬 API 서비스
 */
class KakaoLocalService {
  /**
   * 카테고리별 장소 검색
   * @param x 경도 (longitude)
   * @param y 위도 (latitude)
   * @param radius 반경 (미터, 최대 20000)
   * @param categoryGroupCode 카테고리 그룹 코드 (HP8: 병원, PM9: 약국)
   * @param size 결과 개수 (기본 15, 최대 15)
   */
  async searchByCategory(
    x: number,
    y: number,
    radius: number = 3000,
    categoryGroupCode: string,
    size: number = 15
  ) {
    try {
      if (!REST_API_KEY) {
        throw new Error('KAKAO_REST_API_KEY is not configured');
      }

      const response = await axios.get<KakaoLocalResponse>(
        `${BASE_URL}/v2/local/search/category.json`,
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
          },
          params: {
            category_group_code: categoryGroupCode,
            x,
            y,
            radius: Math.min(radius, 20000), // 최대 20km
            size: Math.min(size, 15), // 최대 15개
            sort: 'distance', // 거리순 정렬
          },
        }
      );

      return {
        success: true,
        totalCount: response.data.meta.total_count,
        isEnd: response.data.meta.is_end,
        items: response.data.documents,
      };
    } catch (error: any) {
      console.error('Error fetching Kakao Local data:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      return {
        success: false,
        totalCount: 0,
        isEnd: true,
        items: [],
        error: error.response?.data?.message || 'Failed to fetch data from Kakao Local API',
      };
    }
  }

  /**
   * 근처 병원 검색
   */
  async searchNearbyHospitals(x: number, y: number, radius: number = 3000, size: number = 10) {
    return this.searchByCategory(x, y, radius, 'HP8', size);
  }

  /**
   * 근처 약국 검색
   */
  async searchNearbyPharmacies(x: number, y: number, radius: number = 3000, size: number = 10) {
    return this.searchByCategory(x, y, radius, 'PM9', size);
  }

  /**
   * 병원과 약국을 한번에 조회
   */
  async searchNearbyMedical(x: number, y: number, radius: number = 3000) {
    try {
      const [hospitals, pharmacies] = await Promise.all([
        this.searchNearbyHospitals(x, y, radius, 10),
        this.searchNearbyPharmacies(x, y, radius, 10),
      ]);

      return {
        success: true,
        data: {
          hospitals: hospitals.items || [],
          pharmacies: pharmacies.items || [],
        },
      };
    } catch (error) {
      console.error('Error fetching nearby medical facilities:', error);
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

export default new KakaoLocalService();
export type { KakaoPlace, KakaoLocalResponse };
