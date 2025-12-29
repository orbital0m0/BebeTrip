-- 테스트용 유저 및 리뷰 데이터

-- 테스트 유저 추가
INSERT INTO users (email, name, phone, profile_image, provider, provider_id) VALUES
('test1@kakao.com', '김민수', '010-1234-5678', 'https://i.pravatar.cc/150?img=1', 'kakao', 'kakao_12345'),
('test2@naver.com', '이지은', '010-2345-6789', 'https://i.pravatar.cc/150?img=5', 'naver', 'naver_23456'),
('test3@kakao.com', '박서준', '010-3456-7890', 'https://i.pravatar.cc/150?img=12', 'kakao', 'kakao_34567'),
('test4@naver.com', '최유진', '010-4567-8901', 'https://i.pravatar.cc/150?img=20', 'naver', 'naver_45678'),
('test5@kakao.com', '정도현', '010-5678-9012', 'https://i.pravatar.cc/150?img=33', 'kakao', 'kakao_56789');

-- 숙소 1 (해운대 베이비 호텔) 리뷰
INSERT INTO reviews (user_id, accommodation_id, room_type, child_age_months, total_people, rating, content) VALUES
(1, 1, '디럭스 패밀리', 8, 4, 5.0, '8개월 아기와 함께 방문했는데 정말 만족스러웠습니다. 아기 침대와 안전시설이 완벽하게 갖춰져 있어서 안심하고 지낼 수 있었어요. 특히 젖병 소독기와 전자레인지가 있어서 이유식 준비하기 좋았습니다. 직원분들도 아이에게 친절하셔서 감동받았어요!'),
(2, 1, '스탠다드 트윈', 14, 3, 4.5, '14개월 아기와 함께 다녀왔습니다. 객실은 깨끗하고 아기 용품도 잘 갖춰져 있었어요. 다만 주차장이 조금 협소해서 불편했습니다. 그래도 전반적으로 만족스러운 숙소였습니다.'),
(3, 1, '디럭스 패밀리', 24, 5, 4.8, '24개월 아이와 가족 여행으로 방문했어요. 넓은 객실에 놀이방도 있어서 아이가 정말 좋아했습니다. 청결도도 우수하고 위치도 해운대 해변과 가까워서 산책하기 좋았어요.');

-- 숙소 2 (제주 아일랜드 키즈 리조트) 리뷰
INSERT INTO reviews (user_id, accommodation_id, room_type, child_age_months, total_people, rating, content) VALUES
(4, 2, '키즈 테마룸', 18, 4, 5.0, '18개월 아기와 함께 제주 여행 왔는데 최고의 선택이었습니다! 키즈풀이 따로 있어서 안전하게 수영할 수 있었고, 객실도 아이 테마로 꾸며져 있어서 아이가 너무 좋아했어요. 키즈 메뉴도 다양하고 맛있었습니다.'),
(5, 2, '오션뷰 스위트', 10, 3, 4.7, '10개월 아기와 함께 갔는데 오션뷰가 정말 환상적이었어요. 객실이 넓고 깨끗했고, 아기 침대와 욕조도 완비되어 있었습니다. 다만 가격이 조금 비싼 편이라 아쉬웠어요.'),
(1, 2, '키즈 테마룸', 10, 4, 4.9, '두 번째 방문인데 역시 만족스럽습니다. 놀이방 시설이 정말 잘 되어 있고, 아이가 다른 친구들과 놀 수 있어서 좋았어요. 직원분들도 친절하시고 서비스가 훌륭했습니다.');

-- 숙소 3 (강릉 오션뷰 펜션) 리뷰
INSERT INTO reviews (user_id, accommodation_id, room_type, child_age_months, total_people, rating, content) VALUES
(2, 3, '오션뷰 펜션', 20, 4, 4.6, '20개월 아이와 함께 방문했습니다. 바다 뷰가 정말 예쁘고 펜션이 깨끗했어요. 주방이 있어서 직접 요리할 수 있어서 좋았습니다. 다만 주변에 편의시설이 조금 부족한 것 같아요.'),
(3, 3, '가든뷰 펜션', 30, 5, 4.4, '30개월 아이와 가족들과 함께 다녀왔어요. 정원이 넓어서 아이가 뛰어놀기 좋았습니다. 주방 시설도 완비되어 있어서 편리했어요. 조용한 환경이라 휴식하기 좋았습니다.');

-- 리뷰 1 (해운대 베이비 호텔 - 김민수) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(1, 1),  -- 청결도 우수
(1, 2),  -- 아이 안전시설 완비
(1, 6),  -- 친절한 호스트
(1, 14); -- 아이용품 다양함

INSERT INTO review_cons_mapping (review_id, con_id) VALUES
(1, 6);  -- 주차 불편

-- 리뷰 2 (해운대 베이비 호텔 - 이지은) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(2, 1),  -- 청결도 우수
(2, 14); -- 아이용품 다양함

INSERT INTO review_cons_mapping (review_id, con_id) VALUES
(2, 6);  -- 주차 불편

-- 리뷰 3 (해운대 베이비 호텔 - 박서준) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(3, 1),  -- 청결도 우수
(3, 4),  -- 위치 좋음
(3, 7),  -- 넓은 공간
(3, 9);  -- 주변 놀이터/공원 가까움

-- 리뷰 4 (제주 아일랜드 키즈 리조트 - 최유진) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(4, 1),  -- 청결도 우수
(4, 2),  -- 아이 안전시설 완비
(4, 7),  -- 넓은 공간
(4, 14); -- 아이용품 다양함

-- 리뷰 5 (제주 아일랜드 키즈 리조트 - 정도현) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(5, 1),  -- 청결도 우수
(5, 4),  -- 위치 좋음
(5, 7),  -- 넓은 공간
(5, 13); -- 욕실 넓고 깨끗함

-- 리뷰 5는 단점 없음

-- 리뷰 6 (제주 아일랜드 키즈 리조트 - 김민수) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(6, 1),  -- 청결도 우수
(6, 2),  -- 아이 안전시설 완비
(6, 6),  -- 친절한 호스트
(6, 14); -- 아이용품 다양함

-- 리뷰 7 (강릉 오션뷰 펜션 - 이지은) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(7, 1),  -- 청결도 우수
(7, 3),  -- 조용하고 편안함
(7, 8);  -- 주방 시설 완비

INSERT INTO review_cons_mapping (review_id, con_id) VALUES
(7, 4);  -- 위치 불편

-- 리뷰 8 (강릉 오션뷰 펜션 - 박서준) - 장점/단점 매핑
INSERT INTO review_pros_mapping (review_id, pro_id) VALUES
(8, 3),  -- 조용하고 편안함
(8, 7),  -- 넓은 공간
(8, 8),  -- 주방 시설 완비
(8, 15); -- 조용한 동네

-- 리뷰 이미지 추가 (선택한 리뷰에만)
INSERT INTO review_images (review_id, image_url, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', 1),
(1, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop', 2),
(4, 'https://images.unsplash.com/photo-1596902852634-f8e8370f5d15?w=800&h=600&fit=crop', 1),
(4, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop', 2),
(7, 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop', 1);
