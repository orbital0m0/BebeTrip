-- 테스트용 숙소 데이터

-- 숙소 1: 해운대 베이비 호텔
INSERT INTO accommodations (name, description, address, region, thumbnail_image, total_rooms)
VALUES
('해운대 베이비 호텔', '아이와 함께하는 가족 여행에 최적화된 호텔입니다. 전 객실에 아기 침대와 안전시설이 완비되어 있으며, 키즈 전용 수영장과 놀이방을 운영하고 있습니다.', '부산광역시 해운대구 우동 1234', '부산', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', 20);

-- 숙소 2: 제주 아일랜드 키즈 리조트
INSERT INTO accommodations (name, description, address, region, thumbnail_image, total_rooms)
VALUES
('제주 아일랜드 키즈 리조트', '아이들을 위한 완벽한 휴양지입니다. 키즈풀, 놀이방, 키즈 메뉴 등 아이 친화적인 시설이 완비되어 있습니다.', '제주특별자치도 서귀포시 중문동 5678', '제주', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', 30);

-- 숙소 3: 강릉 오션뷰 펜션
INSERT INTO accommodations (name, description, address, region, thumbnail_image, total_rooms)
VALUES
('강릉 오션뷰 펜션', '바다가 보이는 아늑한 펜션입니다. 모든 객실에서 바다 전망을 즐길 수 있으며, 아기 용품이 완비되어 있습니다.', '강원도 강릉시 경포동 9012', '강원', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', 10);

-- 숙소 이미지 추가
INSERT INTO accommodation_images (accommodation_id, image_url, is_main, sort_order)
VALUES
(1, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', true, 1),
(1, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', false, 2),
(2, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', true, 1),
(2, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', false, 2),
(3, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop', true, 1),
(3, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop', false, 2);

-- 객실 타입 추가
INSERT INTO room_types (accommodation_id, name, description, max_occupancy, price_per_night)
VALUES
(1, '스탠다드 트윈', '아기 침대가 포함된 기본 객실', 4, 89000),
(1, '디럭스 패밀리', '넓은 공간과 아기용품이 완비된 객실', 5, 129000),
(2, '오션뷰 스위트', '바다 전망이 보이는 넓은 객실', 6, 159000),
(2, '키즈 테마룸', '아이들이 좋아하는 테마로 꾸민 객실', 4, 125000),
(3, '오션뷰 펜션', '바다가 보이는 독채 펜션', 6, 89000),
(3, '가든뷰 펜션', '정원이 보이는 독채 펜션', 5, 75000);

-- 편의시설 연결 (숙소 1)
INSERT INTO accommodation_amenities (accommodation_id, amenity_id, is_available, notes)
VALUES
(1, 1, true, '모든 객실 및 공용공간에 설치'),
(1, 2, true, '전 객실 설치'),
(1, 7, true, '1층 로비에 비치'),
(1, 8, true, '전 객실 비치'),
(1, 9, true, '전 객실 비치'),
(1, 13, true, '전 객실 비치'),
(1, 14, true, '1층 놀이방 운영');

-- 편의시설 연결 (숙소 2)
INSERT INTO accommodation_amenities (accommodation_id, amenity_id, is_available, notes)
VALUES
(2, 1, true, '전 객실 설치'),
(2, 2, true, '전 객실 설치'),
(2, 8, true, '전 객실 비치'),
(2, 9, true, '전 객실 비치'),
(2, 13, true, '전 객실 비치'),
(2, 14, true, '키즈풀 및 실내 놀이방'),
(2, 15, true, '전 객실 비치');

-- 편의시설 연결 (숙소 3)
INSERT INTO accommodation_amenities (accommodation_id, amenity_id, is_available, notes)
VALUES
(3, 1, true, '전 객실 설치'),
(3, 8, true, '전 객실 비치'),
(3, 9, true, '전 객실 비치'),
(3, 13, true, '전 객실 비치'),
(3, 16, true, '각 펜션 주방 완비'),
(3, 17, true, '각 펜션 냉장고 비치');
