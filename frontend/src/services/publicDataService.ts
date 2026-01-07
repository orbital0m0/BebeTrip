import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface TourismItem {
  addr1: string;
  addr2?: string;
  areacode?: string;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid: string;
  contenttypeid: string;
  createdtime?: string;
  dist?: string;
  firstimage?: string;
  firstimage2?: string;
  mapx: string;
  mapy: string;
  mlevel?: string;
  modifiedtime?: string;
  readcount?: string;
  sigungucode?: string;
  tel?: string;
  title: string;
}

interface NearbyTourismResponse {
  success: boolean;
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  items: TourismItem[];
  error?: string;
}

interface NearbyAllResponse {
  success: boolean;
  data: {
    attractions: TourismItem[];
    culturalFacilities: TourismItem[];
    restaurants: TourismItem[];
    shopping: TourismItem[];
    events: TourismItem[];
  };
  error?: string;
}

/**
 * 공공데이터 API 서비스
 */
class PublicDataService {
  /**
   * 근처 관광지 조회
   */
  async getNearbyTourism(
    mapX: number,
    mapY: number,
    radius: number = 5000,
    contentTypeId?: string,
    numOfRows: number = 10
  ): Promise<NearbyTourismResponse> {
    try {
      const params: any = {
        mapX,
        mapY,
        radius,
        numOfRows,
      };

      if (contentTypeId) {
        params.contentTypeId = contentTypeId;
      }

      const response = await axios.get(`${API_BASE_URL}/public-data/nearby-tourism`, {
        params,
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby tourism:', error);
      return {
        success: false,
        totalCount: 0,
        pageNo: 1,
        numOfRows: 0,
        items: [],
        error: 'Failed to fetch nearby tourism data',
      };
    }
  }

  /**
   * 숙소 근처 모든 관광정보 한번에 조회
   */
  async getNearbyAll(
    mapX: number,
    mapY: number,
    radius: number = 5000
  ): Promise<NearbyAllResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/public-data/nearby-all`, {
        params: {
          mapX,
          mapY,
          radius,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch nearby attractions:', error);
      return {
        success: false,
        data: {
          attractions: [],
          culturalFacilities: [],
          restaurants: [],
          shopping: [],
          events: [],
        },
        error: 'Failed to fetch nearby attractions',
      };
    }
  }

  /**
   * 관광정보 상세 조회
   */
  async getDetailInfo(contentId: string, contentTypeId: string): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/public-data/detail`, {
        params: {
          contentId,
          contentTypeId,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Failed to fetch detail info:', error);
      return {
        success: false,
        error: 'Failed to fetch detail information',
      };
    }
  }
}

export const publicDataService = new PublicDataService();
export type { TourismItem, NearbyTourismResponse, NearbyAllResponse };
