import axios from 'axios';

const API_KEY = process.env.PUBLIC_DATA_API_KEY;
const BASE_URL = process.env.PUBLIC_DATA_API_BASE_URL || 'https://apis.data.go.kr';

// 한국관광공사 API 엔드포인트
const TOUR_API_BASE = `${BASE_URL}/B551011/KorService2`;

interface TourAPIParams {
  serviceKey: string;
  numOfRows?: number;
  pageNo?: number;
  MobileOS?: string;
  MobileApp?: string;
  _type?: string;
  listYN?: string;
  arrange?: string;
}

interface AccommodationSearchParams extends TourAPIParams {
  areaCode?: string;
  sigunguCode?: string;
  keyword?: string;
}

interface LocationBasedParams extends TourAPIParams {
  mapX: number;
  mapY: number;
  radius?: number;
  contentTypeId?: string;
}

/**
 * 공공데이터 API 서비스
 */
class PublicDataService {
  /**
   * 숙박 정보 검색
   * @param areaCode 지역코드 (예: 1=서울, 6=부산, 39=제주)
   * @param sigunguCode 시군구코드
   * @param keyword 검색 키워드
   * @param pageNo 페이지 번호
   * @param numOfRows 한 페이지 결과 수
   */
  async searchAccommodations(
    areaCode?: string,
    sigunguCode?: string,
    keyword?: string,
    pageNo: number = 1,
    numOfRows: number = 10
  ) {
    try {
      if (!API_KEY) {
        throw new Error('PUBLIC_DATA_API_KEY is not configured');
      }

      const params: AccommodationSearchParams = {
        serviceKey: API_KEY,
        numOfRows,
        pageNo,
        MobileOS: 'ETC',
        MobileApp: 'BebeTrip',
        _type: 'json',
        listYN: 'Y',
        arrange: 'A', // 제목순
      };

      if (areaCode) params.areaCode = areaCode;
      if (sigunguCode) params.sigunguCode = sigunguCode;
      if (keyword) params.keyword = keyword;

      // 숙박 정보 검색 API (contentTypeId: 32=숙박)
      const response = await axios.get(`${TOUR_API_BASE}/searchStay1`, {
        params: {
          ...params,
          contentTypeId: '32',
        },
      });

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('Error fetching accommodation data:', error);
      throw error;
    }
  }

  /**
   * 위치기반 관광정보 조회
   * @param mapX 경도 (GPS X좌표)
   * @param mapY 위도 (GPS Y좌표)
   * @param radius 반경 (미터 단위, 기본 5000m)
   * @param contentTypeId 관광타입 (12=관광지, 14=문화시설, 15=축제/공연, 28=레포츠, 38=쇼핑, 39=음식점)
   * @param pageNo 페이지 번호
   * @param numOfRows 한 페이지 결과 수
   */
  async searchNearbyTourism(
    mapX: number,
    mapY: number,
    radius: number = 5000,
    contentTypeId?: string,
    pageNo: number = 1,
    numOfRows: number = 10
  ) {
    try {
      if (!API_KEY) {
        throw new Error('PUBLIC_DATA_API_KEY is not configured');
      }

      const params: LocationBasedParams = {
        serviceKey: API_KEY,
        mapX,
        mapY,
        radius,
        numOfRows,
        pageNo,
        MobileOS: 'ETC',
        MobileApp: 'BebeTrip',
        _type: 'json',
        listYN: 'Y',
        arrange: 'E', // 거리순
      };

      if (contentTypeId) params.contentTypeId = contentTypeId;

      const response = await axios.get(`${TOUR_API_BASE}/locationBasedList1`, {
        params,
      });

      console.log('Public Data API Response:', JSON.stringify(response.data, null, 2));
      return this.parseResponse(response.data);
    } catch (error: any) {
      console.error('Error fetching nearby tourism data:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw error;
    }
  }

  /**
   * 관광정보 상세 조회
   * @param contentId 콘텐츠 ID
   * @param contentTypeId 콘텐츠 타입 ID
   */
  async getDetailInfo(contentId: string, contentTypeId: string) {
    try {
      if (!API_KEY) {
        throw new Error('PUBLIC_DATA_API_KEY is not configured');
      }

      const params: TourAPIParams = {
        serviceKey: API_KEY,
        MobileOS: 'ETC',
        MobileApp: 'BebeTrip',
        _type: 'json',
      };

      const response = await axios.get(`${TOUR_API_BASE}/detailCommon1`, {
        params: {
          ...params,
          contentId,
          contentTypeId,
          defaultYN: 'Y',
          firstImageYN: 'Y',
          areacodeYN: 'Y',
          catcodeYN: 'Y',
          addrinfoYN: 'Y',
          mapinfoYN: 'Y',
          overviewYN: 'Y',
        },
      });

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('Error fetching detail info:', error);
      throw error;
    }
  }

  /**
   * 지역코드 조회
   * @param areaCode 상위 지역코드 (없으면 전체)
   */
  async getAreaCodes(areaCode?: string) {
    try {
      if (!API_KEY) {
        throw new Error('PUBLIC_DATA_API_KEY is not configured');
      }

      const params: TourAPIParams = {
        serviceKey: API_KEY,
        numOfRows: 100,
        pageNo: 1,
        MobileOS: 'ETC',
        MobileApp: 'BebeTrip',
        _type: 'json',
      };

      if (areaCode) {
        (params as any).areaCode = areaCode;
      }

      const response = await axios.get(`${TOUR_API_BASE}/areaCode1`, {
        params,
      });

      return this.parseResponse(response.data);
    } catch (error) {
      console.error('Error fetching area codes:', error);
      throw error;
    }
  }

  /**
   * API 응답 파싱
   */
  private parseResponse(data: any) {
    if (data.response?.header?.resultCode === '0000') {
      const body = data.response.body;
      return {
        success: true,
        totalCount: body.totalCount || 0,
        pageNo: body.pageNo || 1,
        numOfRows: body.numOfRows || 0,
        items: body.items?.item || [],
      };
    } else {
      return {
        success: false,
        error: data.response?.header?.resultMsg || 'Unknown error',
        items: [],
      };
    }
  }
}

export default new PublicDataService();
