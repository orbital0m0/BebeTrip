import { Request, Response } from 'express';
import publicDataService from '../services/publicDataService';

/**
 * 숙박 정보 검색
 */
export const searchAccommodations = async (req: Request, res: Response) => {
  try {
    const {
      areaCode,
      sigunguCode,
      keyword,
      pageNo = '1',
      numOfRows = '10',
    } = req.query;

    const result = await publicDataService.searchAccommodations(
      areaCode as string,
      sigunguCode as string,
      keyword as string,
      parseInt(pageNo as string),
      parseInt(numOfRows as string)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in searchAccommodations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch accommodation data',
    });
  }
};

/**
 * 근처 관광지 검색
 */
export const searchNearbyTourism = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      mapX,
      mapY,
      radius = '5000',
      contentTypeId,
      pageNo = '1',
      numOfRows = '10',
    } = req.query;

    if (!mapX || !mapY) {
      res.status(400).json({
        success: false,
        error: 'mapX and mapY are required parameters',
      });
      return;
    }

    const result = await publicDataService.searchNearbyTourism(
      parseFloat(mapX as string),
      parseFloat(mapY as string),
      parseInt(radius as string),
      contentTypeId as string,
      parseInt(pageNo as string),
      parseInt(numOfRows as string)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in searchNearbyTourism:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby tourism data',
    });
  }
};

/**
 * 관광정보 상세 조회
 */
export const getDetailInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contentId, contentTypeId } = req.query;

    if (!contentId || !contentTypeId) {
      res.status(400).json({
        success: false,
        error: 'contentId and contentTypeId are required parameters',
      });
      return;
    }

    const result = await publicDataService.getDetailInfo(
      contentId as string,
      contentTypeId as string
    );

    res.json(result);
  } catch (error) {
    console.error('Error in getDetailInfo:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch detail information',
    });
  }
};

/**
 * 지역코드 조회
 */
export const getAreaCodes = async (req: Request, res: Response) => {
  try {
    const { areaCode } = req.query;

    const result = await publicDataService.getAreaCodes(areaCode as string);

    res.json(result);
  } catch (error) {
    console.error('Error in getAreaCodes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch area codes',
    });
  }
};

/**
 * 숙소 근처 관광지 한번에 조회 (헬퍼 함수)
 */
export const getAccommodationWithNearbyAttractions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { mapX, mapY, radius = '5000' } = req.query;

    if (!mapX || !mapY) {
      res.status(400).json({
        success: false,
        error: 'mapX and mapY are required parameters',
      });
      return;
    }

    // 병렬로 여러 관광 타입 데이터 조회
    const [attractions, culturalFacilities, restaurants, shopping, events] = await Promise.all([
      // 관광지 (contentTypeId: 12)
      publicDataService.searchNearbyTourism(
        parseFloat(mapX as string),
        parseFloat(mapY as string),
        parseInt(radius as string),
        '12',
        1,
        5
      ),
      // 문화시설 (contentTypeId: 14)
      publicDataService.searchNearbyTourism(
        parseFloat(mapX as string),
        parseFloat(mapY as string),
        parseInt(radius as string),
        '14',
        1,
        5
      ),
      // 음식점 (contentTypeId: 39)
      publicDataService.searchNearbyTourism(
        parseFloat(mapX as string),
        parseFloat(mapY as string),
        parseInt(radius as string),
        '39',
        1,
        5
      ),
      // 쇼핑 (contentTypeId: 38)
      publicDataService.searchNearbyTourism(
        parseFloat(mapX as string),
        parseFloat(mapY as string),
        parseInt(radius as string),
        '38',
        1,
        5
      ),
      // 축제/행사 (contentTypeId: 15)
      publicDataService.searchNearbyTourism(
        parseFloat(mapX as string),
        parseFloat(mapY as string),
        parseInt(radius as string),
        '15',
        1,
        5
      ),
    ]);

    res.json({
      success: true,
      data: {
        attractions: attractions.items || [],
        culturalFacilities: culturalFacilities.items || [],
        restaurants: restaurants.items || [],
        shopping: shopping.items || [],
        events: events.items || [],
      },
    });
  } catch (error) {
    console.error('Error in getAccommodationWithNearbyAttractions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby attractions',
    });
  }
};
