import express from 'express';
import {
  searchAccommodations,
  searchNearbyTourism,
  getDetailInfo,
  getAreaCodes,
  getAccommodationWithNearbyAttractions,
} from '../controllers/publicDataController';

const router = express.Router();

/**
 * @route GET /api/public-data/accommodations
 * @desc 숙박 정보 검색
 * @query areaCode - 지역코드 (선택)
 * @query sigunguCode - 시군구코드 (선택)
 * @query keyword - 검색 키워드 (선택)
 * @query pageNo - 페이지 번호 (기본: 1)
 * @query numOfRows - 한 페이지 결과 수 (기본: 10)
 */
router.get('/accommodations', searchAccommodations);

/**
 * @route GET /api/public-data/nearby-tourism
 * @desc 위치기반 관광정보 조회
 * @query mapX - 경도 (필수)
 * @query mapY - 위도 (필수)
 * @query radius - 반경(미터) (기본: 5000)
 * @query contentTypeId - 관광타입 (선택: 12=관광지, 14=문화시설, 15=축제, 28=레포츠, 38=쇼핑, 39=음식점)
 * @query pageNo - 페이지 번호 (기본: 1)
 * @query numOfRows - 한 페이지 결과 수 (기본: 10)
 */
router.get('/nearby-tourism', searchNearbyTourism);

/**
 * @route GET /api/public-data/detail
 * @desc 관광정보 상세 조회
 * @query contentId - 콘텐츠 ID (필수)
 * @query contentTypeId - 콘텐츠 타입 ID (필수)
 */
router.get('/detail', getDetailInfo);

/**
 * @route GET /api/public-data/area-codes
 * @desc 지역코드 조회
 * @query areaCode - 상위 지역코드 (선택)
 */
router.get('/area-codes', getAreaCodes);

/**
 * @route GET /api/public-data/nearby-all
 * @desc 숙소 근처 관광지, 문화시설, 음식점 한번에 조회
 * @query mapX - 경도 (필수)
 * @query mapY - 위도 (필수)
 * @query radius - 반경(미터) (기본: 5000)
 */
router.get('/nearby-all', getAccommodationWithNearbyAttractions);

export default router;
