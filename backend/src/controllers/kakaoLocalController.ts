import { Request, Response } from 'express';
import kakaoLocalService from '../services/kakaoLocalService';

/**
 * 근처 병원 검색
 */
export const searchNearbyHospitals = async (req: Request, res: Response): Promise<void> => {
  try {
    const { x, y, radius = '3000', size = '10' } = req.query;

    if (!x || !y) {
      res.status(400).json({
        success: false,
        error: 'x and y coordinates are required parameters',
      });
      return;
    }

    const result = await kakaoLocalService.searchNearbyHospitals(
      parseFloat(x as string),
      parseFloat(y as string),
      parseInt(radius as string),
      parseInt(size as string)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in searchNearbyHospitals:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby hospitals',
    });
  }
};

/**
 * 근처 약국 검색
 */
export const searchNearbyPharmacies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { x, y, radius = '3000', size = '10' } = req.query;

    if (!x || !y) {
      res.status(400).json({
        success: false,
        error: 'x and y coordinates are required parameters',
      });
      return;
    }

    const result = await kakaoLocalService.searchNearbyPharmacies(
      parseFloat(x as string),
      parseFloat(y as string),
      parseInt(radius as string),
      parseInt(size as string)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in searchNearbyPharmacies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby pharmacies',
    });
  }
};

/**
 * 근처 병원과 약국 한번에 조회
 */
export const searchNearbyMedical = async (req: Request, res: Response): Promise<void> => {
  try {
    const { x, y, radius = '3000' } = req.query;

    if (!x || !y) {
      res.status(400).json({
        success: false,
        error: 'x and y coordinates are required parameters',
      });
      return;
    }

    const result = await kakaoLocalService.searchNearbyMedical(
      parseFloat(x as string),
      parseFloat(y as string),
      parseInt(radius as string)
    );

    res.json(result);
  } catch (error) {
    console.error('Error in searchNearbyMedical:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby medical facilities',
    });
  }
};
