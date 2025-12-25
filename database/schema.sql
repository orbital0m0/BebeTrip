-- 베베트립 데이터베이스 스키마

-- 데이터베이스 생성
-- CREATE DATABASE bebetrip;

-- 사용자 테이블
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(500),
    provider VARCHAR(20) NOT NULL CHECK (provider IN ('kakao', 'naver')),
    provider_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_id)
);

-- 월령 마스터 테이블 (0-72개월)
CREATE TABLE age_months (
    id SERIAL PRIMARY KEY,
    month_from INT NOT NULL,
    month_to INT NOT NULL,
    label VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

-- 숙소 테이블
CREATE TABLE accommodations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(500) NOT NULL,
    region VARCHAR(100) NOT NULL,
    thumbnail_image VARCHAR(500),
    total_rooms INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 숙소 이미지 테이블
CREATE TABLE accommodation_images (
    id SERIAL PRIMARY KEY,
    accommodation_id INT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_main BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 방 타입 테이블
CREATE TABLE room_types (
    id SERIAL PRIMARY KEY,
    accommodation_id INT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    max_occupancy INT NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 편의용품 카테고리
CREATE TABLE amenity_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

-- 편의용품 마스터 테이블
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES amenity_categories(id),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    age_month_from INT,
    age_month_to INT
);

-- 숙소별 제공 편의용품
CREATE TABLE accommodation_amenities (
    id SERIAL PRIMARY KEY,
    accommodation_id INT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    amenity_id INT NOT NULL REFERENCES amenities(id),
    is_available BOOLEAN DEFAULT TRUE,
    notes VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(accommodation_id, amenity_id)
);

-- 리뷰 테이블
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    accommodation_id INT NOT NULL REFERENCES accommodations(id),
    room_type VARCHAR(100) NOT NULL,
    child_age_months INT NOT NULL,
    total_people INT NOT NULL,
    rating DECIMAL(2, 1) CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 리뷰 장점 체크리스트
CREATE TABLE review_pros (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50)
);

-- 리뷰 단점 체크리스트
CREATE TABLE review_cons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50)
);

-- 리뷰-장점 매핑 테이블
CREATE TABLE review_pros_mapping (
    id SERIAL PRIMARY KEY,
    review_id INT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    pro_id INT NOT NULL REFERENCES review_pros(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, pro_id)
);

-- 리뷰-단점 매핑 테이블
CREATE TABLE review_cons_mapping (
    id SERIAL PRIMARY KEY,
    review_id INT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    con_id INT NOT NULL REFERENCES review_cons(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, con_id)
);

-- 리뷰 이미지 테이블
CREATE TABLE review_images (
    id SERIAL PRIMARY KEY,
    review_id INT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 위시리스트 테이블
CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    accommodation_id INT NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, accommodation_id)
);

-- 인덱스 생성
CREATE INDEX idx_accommodations_region ON accommodations(region);
CREATE INDEX idx_reviews_accommodation ON reviews(accommodation_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_accommodation_amenities_accommodation ON accommodation_amenities(accommodation_id);
CREATE INDEX idx_users_provider ON users(provider, provider_id);

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodations_updated_at BEFORE UPDATE ON accommodations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_room_types_updated_at BEFORE UPDATE ON room_types
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
