# 베베트립 (BeBe Trip) - 영유아 숙소 특화 플랫폼

## 프로젝트 개요

### 목적
영유아를 동반한 가족들이 안전하고 편리한 숙소를 쉽게 찾을 수 있도록 돕는 특화 플랫폼

### 기술 스택
**Frontend**
- React 18+
- TypeScript
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express
- TypeScript
- PostgreSQL
- Passport.js (소셜 로그인)
- Kakao/Naver OAuth 2.0

## 주요 기능

### 1. 회원 관리

#### 1.1 소셜 로그인 회원가입
- 카카오 소셜 로그인
- 네이버 소셜 로그인
- OAuth 2.0 인증 프로세스
- 소셜 계정에서 기본 정보 자동 수집 (이메일, 이름, 프로필 이미지)
- 추가 정보 입력 (선택: 전화번호)

#### 1.2 로그인/로그아웃
- 카카오 계정으로 로그인
- 네이버 계정으로 로그인
- JWT 토큰 발급 및 관리
- 로그인 상태 유지
- 로그아웃 처리
- 소셜 계정 연동 해제

### 2. 숙소 검색 및 필터링

#### 2.1 검색 조건
- **지역**: 서울, 부산, 제주 등 지역별 검색
- **날짜**: 체크인/체크아웃 날짜 (UI만 제공, 예약 기능 없음)
- **인원수**: 성인, 어린이, 영유아 수
- **영유아 월령**: 0-6개월, 7-12개월, 13-24개월, 25-36개월, 37-48개월, 49-60개월, 61-72개월

#### 2.2 필터링 옵션
- 월령별 맞춤 필터
- 편의용품 카테고리별 필터
  - 안전용품 (모서리 보호대, 콘센트 안전커버, 계단 안전문, 침대 안전가드)
  - 위생용품 (젖병 소독기, 아기 욕조, 기저귀 교환대, 아기 전용 세탁기)
  - 편의용품 (유아용 침대, 유아용 의자, 놀이방/놀이매트, 아기 모니터, 전자레인지, 냉장고)
- 가격대별 필터
- 평점별 필터

#### 2.3 검색 결과 표시
- 숙소 목록 카드 뷰
- 썸네일 이미지
- 숙소 이름, 지역, 간략 설명
- 제공 편의용품 아이콘 표시
- 평균 평점 표시
- 1박 기준 최저가 표시

### 3. 숙소 상세 정보

#### 3.1 기본 정보
- 숙소 이름
- 주소 및 위치 정보
- 숙소 설명
- 이미지 갤러리

#### 3.2 편의용품 체크리스트
- 카테고리별 구분 (안전용품, 위생용품, 편의용품)
- 각 용품별 제공 여부 체크 표시
- 월령별 필터링 가능
- 아이콘과 함께 시각적 표시

#### 3.3 방 타입 정보
- 방 이름 및 설명
- 최대 수용 인원
- 1박 기준 가격
- 여러 방 타입이 있는 경우 리스트 표시

#### 3.4 리뷰 섹션
- 평균 평점 및 총 리뷰 수
- 최신 리뷰 목록
- 리뷰 필터링 (월령별, 평점별)
- 리뷰 상세 보기

### 4. 리뷰 시스템

#### 4.1 리뷰 작성
**필수 정보**
- 아이 월령 (0-72개월)
- 동반 인원 수 (성인, 어린이, 영유아)
- 방 타입 선택

**선택 정보**
- 평점 (1-5점, 0.5점 단위)
- 리뷰 내용 (텍스트)
- 장점 체크리스트 (복수 선택 가능)
  - 청결도 우수
  - 아이 안전시설 완비
  - 조용하고 편안함
  - 위치 좋음
  - 주차 편리
  - 친절한 호스트
  - 넓은 공간
  - 주방 시설 완비
  - 주변 놀이터/공원 가까움
  - 슈퍼/편의점 가까움
- 단점 체크리스트 (복수 선택 가능)
  - 청결도 불만
  - 소음 문제
  - 안전시설 부족
  - 위치 불편
  - 주차 불편
  - 좁은 공간
  - 시설 노후
  - 난방/냉방 불량
  - 와이파이 불안정
  - 호스트 불친절
- 사진 업로드 (최대 10장)

#### 4.2 리뷰 조회
- 숙소별 리뷰 목록
- 월령별 필터링
- 평점별 정렬
- 최신순/평점순 정렬
- 리뷰 상세 보기 (텍스트, 체크리스트, 이미지)

#### 4.3 내 리뷰 관리
- 작성한 리뷰 목록 조회
- 리뷰 수정
- 리뷰 삭제

### 5. 위시리스트

#### 5.1 위시리스트 추가/제거
- 숙소 상세 페이지에서 하트 아이콘 클릭으로 추가/제거
- 로그인 필수
- 중복 추가 방지

#### 5.2 위시리스트 조회
- 마이페이지에서 저장한 숙소 목록 확인
- 썸네일, 이름, 지역, 평점 표시
- 위시리스트에서 직접 제거 가능
- 숙소 상세 페이지로 이동 가능

### 6. 마이페이지

#### 6.1 내 정보 관리
- 회원 정보 조회
- 회원 정보 수정 (이름, 전화번호)
- 프로필 이미지 표시
- 연동된 소셜 계정 정보 표시

#### 6.2 내 리뷰 관리
- 작성한 리뷰 목록
- 리뷰 수정/삭제

#### 6.3 위시리스트
- 저장한 숙소 목록
- 위시리스트 관리

## 데이터 모델

### Users (사용자)
```
- id: 고유 ID
- email: 이메일 (unique)
- name: 이름
- phone: 전화번호
- profile_image: 프로필 이미지 URL
- provider: 소셜 로그인 제공자 (kakao, naver)
- provider_id: 소셜 로그인 제공자 고유 ID
- created_at: 가입일
- updated_at: 수정일
```

### Accommodations (숙소)
```
- id: 고유 ID
- name: 숙소 이름
- description: 설명
- address: 주소
- region: 지역
- thumbnail_image: 썸네일 이미지 URL
- total_rooms: 총 방 개수
- created_at: 등록일
- updated_at: 수정일
```

### AccommodationImages (숙소 이미지)
```
- id: 고유 ID
- accommodation_id: 숙소 ID (FK)
- image_url: 이미지 URL
- is_main: 메인 이미지 여부
- sort_order: 정렬 순서
- created_at: 등록일
```

### RoomTypes (방 타입)
```
- id: 고유 ID
- accommodation_id: 숙소 ID (FK)
- name: 방 이름
- description: 설명
- max_occupancy: 최대 수용 인원
- price_per_night: 1박 가격
- created_at: 등록일
- updated_at: 수정일
```

### AgeMonths (월령 마스터)
```
- id: 고유 ID
- month_from: 시작 월령
- month_to: 종료 월령
- label: 레이블 (예: "0-6개월")
- description: 설명
```

### AmenityCategories (편의용품 카테고리)
```
- id: 고유 ID
- name: 카테고리 이름 (안전용품, 위생용품, 편의용품)
- description: 설명
```

### Amenities (편의용품)
```
- id: 고유 ID
- category_id: 카테고리 ID (FK)
- name: 용품 이름
- icon: 아이콘
- age_month_from: 적용 최소 월령
- age_month_to: 적용 최대 월령
```

### AccommodationAmenities (숙소 편의용품)
```
- id: 고유 ID
- accommodation_id: 숙소 ID (FK)
- amenity_id: 편의용품 ID (FK)
- is_available: 제공 여부
- notes: 비고
- created_at: 등록일
```

### Reviews (리뷰)
```
- id: 고유 ID
- user_id: 사용자 ID (FK)
- accommodation_id: 숙소 ID (FK)
- room_type: 방 타입 (필수)
- child_age_months: 아이 월령 (필수)
- total_people: 동반 인원 (필수)
- rating: 평점 (1-5)
- content: 리뷰 내용
- created_at: 작성일
- updated_at: 수정일
```

### ReviewPros (리뷰 장점)
```
- id: 고유 ID
- name: 장점 항목
- category: 카테고리
```

### ReviewCons (리뷰 단점)
```
- id: 고유 ID
- name: 단점 항목
- category: 카테고리
```

### ReviewProsMapping (리뷰-장점 매핑)
```
- id: 고유 ID
- review_id: 리뷰 ID (FK)
- pro_id: 장점 ID (FK)
- created_at: 등록일
```

### ReviewConsMapping (리뷰-단점 매핑)
```
- id: 고유 ID
- review_id: 리뷰 ID (FK)
- con_id: 단점 ID (FK)
- created_at: 등록일
```

### ReviewImages (리뷰 이미지)
```
- id: 고유 ID
- review_id: 리뷰 ID (FK)
- image_url: 이미지 URL
- sort_order: 정렬 순서
- created_at: 등록일
```

### Wishlists (위시리스트)
```
- id: 고유 ID
- user_id: 사용자 ID (FK)
- accommodation_id: 숙소 ID (FK)
- created_at: 추가일
```

## API 엔드포인트 (예상)

### 인증
- `GET /api/auth/kakao` - 카카오 로그인 시작
- `GET /api/auth/kakao/callback` - 카카오 로그인 콜백
- `GET /api/auth/naver` - 네이버 로그인 시작
- `GET /api/auth/naver/callback` - 네이버 로그인 콜백
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보
- `DELETE /api/auth/unlink` - 소셜 계정 연동 해제

### 사용자
- `GET /api/users/me` - 내 정보 조회
- `PUT /api/users/me` - 내 정보 수정 (이름, 전화번호)

### 숙소
- `GET /api/accommodations` - 숙소 목록 조회 (검색/필터링)
- `GET /api/accommodations/:id` - 숙소 상세 조회
- `GET /api/accommodations/:id/amenities` - 숙소 편의용품 조회

### 리뷰
- `GET /api/accommodations/:id/reviews` - 숙소 리뷰 목록
- `POST /api/reviews` - 리뷰 작성
- `PUT /api/reviews/:id` - 리뷰 수정
- `DELETE /api/reviews/:id` - 리뷰 삭제
- `GET /api/users/me/reviews` - 내 리뷰 목록
- `POST /api/reviews/:id/images` - 리뷰 이미지 업로드

### 위시리스트
- `GET /api/wishlists` - 내 위시리스트 조회
- `POST /api/wishlists` - 위시리스트 추가
- `DELETE /api/wishlists/:accommodationId` - 위시리스트 제거

### 마스터 데이터
- `GET /api/age-months` - 월령 목록
- `GET /api/amenities` - 편의용품 목록
- `GET /api/amenity-categories` - 편의용품 카테고리 목록
- `GET /api/review-pros` - 리뷰 장점 체크리스트
- `GET /api/review-cons` - 리뷰 단점 체크리스트

## 프로젝트 구조

```
bebe-trip/
├── frontend/           # React 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
│
├── backend/            # Express 백엔드
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   └── package.json
│
├── database/           # 데이터베이스 스키마
│   └── schema.sql
│
└── docs/               # 문서
    └── PRD.md
```

## 개발 우선순위

### Phase 1: 기본 인프라
1. 프로젝트 초기 설정
2. 데이터베이스 스키마 구축
3. 회원가입/로그인 기능

### Phase 2: 핵심 기능
4. 숙소 목록 조회 및 검색
5. 숙소 상세 페이지
6. 편의용품 체크리스트 표시

### Phase 3: 리뷰 시스템
7. 리뷰 작성 기능
8. 리뷰 조회 및 필터링
9. 내 리뷰 관리

### Phase 4: 부가 기능
10. 위시리스트 기능
11. 마이페이지

## 제외된 기능
- 예약 기능 (체크인/체크아웃 날짜는 UI에만 표시)
- 결제 기능
- 호스트 등록 기능
- 실시간 채팅
