import { Request, Response } from 'express';
import MasterDataModel from '../models/MasterData';

export const getAgeMonths = async (_req: Request, res: Response): Promise<void> => {
  try {
    const ageMonths = await MasterDataModel.getAgeMonths();

    res.json(
      ageMonths.map(am => ({
        id: am.id,
        monthFrom: am.month_from,
        monthTo: am.month_to,
        label: am.label,
        description: am.description,
      }))
    );
  } catch (error) {
    console.error('Get age months error:', error);
    res.status(500).json({ error: 'Failed to get age months' });
  }
};

export const getAmenityCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await MasterDataModel.getAmenityCategories();

    res.json(
      categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
      }))
    );
  } catch (error) {
    console.error('Get amenity categories error:', error);
    res.status(500).json({ error: 'Failed to get amenity categories' });
  }
};

export const getAmenities = async (_req: Request, res: Response): Promise<void> => {
  try {
    const amenities = await MasterDataModel.getAmenities();

    res.json(
      amenities.map(am => ({
        id: am.id,
        categoryId: am.category_id,
        categoryName: am.category_name,
        name: am.name,
        icon: am.icon,
        ageMonthFrom: am.age_month_from,
        ageMonthTo: am.age_month_to,
      }))
    );
  } catch (error) {
    console.error('Get amenities error:', error);
    res.status(500).json({ error: 'Failed to get amenities' });
  }
};

export const getReviewPros = async (_req: Request, res: Response): Promise<void> => {
  try {
    const pros = await MasterDataModel.getReviewPros();

    res.json(
      pros.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
      }))
    );
  } catch (error) {
    console.error('Get review pros error:', error);
    res.status(500).json({ error: 'Failed to get review pros' });
  }
};

export const getReviewCons = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cons = await MasterDataModel.getReviewCons();

    res.json(
      cons.map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
      }))
    );
  } catch (error) {
    console.error('Get review cons error:', error);
    res.status(500).json({ error: 'Failed to get review cons' });
  }
};
