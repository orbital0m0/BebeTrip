import express from 'express';
import {
  searchNearbyHospitals,
  searchNearbyPharmacies,
  searchNearbyMedical,
} from '../controllers/kakaoLocalController';

const router = express.Router();

// 근처 병원 검색
router.get('/hospitals', searchNearbyHospitals);

// 근처 약국 검색
router.get('/pharmacies', searchNearbyPharmacies);

// 근처 병원과 약국 한번에 조회
router.get('/medical', searchNearbyMedical);

export default router;
