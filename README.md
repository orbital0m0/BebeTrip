# 베베트립 (BeBe Trip)

영유아와 함께하는 안전하고 편안한 여행을 위한 숙소 플랫폼

## 프로젝트 소개

베베트립은 영유아 가족을 위한 특화된 숙소 예약 플랫폼입니다. 아이의 월령에 맞는 편의용품이 구비된 숙소를 검색하고, 같은 월령 자녀를 둔 부모님들의 생생한 후기를 확인할 수 있습니다.

### 주요 기능

- **소셜 로그인**: 카카오, 네이버 간편 로그인
- **맞춤 검색**: 아이 월령별 편의용품 필터링
- **숙소 상세**: 이미지 갤러리, 편의용품 체크리스트, 방 타입 정보
- **리뷰 시스템**: 아이 월령, 동반 인원 정보 포함 상세 리뷰
- **위시리스트**: 마음에 드는 숙소 저장
- **마이페이지**: 사용자 정보 관리, 내 리뷰 관리

## 기술 스택

### Frontend
- **React 18** + TypeScript
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **React Router** - 라우팅
- **Axios** - HTTP 클라이언트
- **React Icons** - 아이콘

### Backend
- **Node.js** + Express + TypeScript
- **PostgreSQL** - 데이터베이스
- **Passport.js** - OAuth 인증 (카카오, 네이버)
- **JWT** - 토큰 기반 인증
- **Multer** - 이미지 업로드

## 프로젝트 구조

```
bebe-trip/
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── services/      # API 서비스
│   │   ├── context/       # Context API
│   │   ├── types/         # TypeScript 타입 정의
│   │   └── App.tsx
│   └── package.json
│
├── backend/               # Express 백엔드
│   ├── src/
│   │   ├── controllers/   # 컨트롤러
│   │   ├── models/        # 데이터베이스 모델
│   │   ├── routes/        # API 라우트
│   │   ├── middlewares/   # 미들웨어
│   │   ├── config/        # 설정 파일
│   │   └── server.ts
│   └── package.json
│
├── database/              # 데이터베이스 스키마
│   ├── schema.sql        # 테이블 정의
│   └── seed.sql          # 마스터 데이터
│
└── docs/                  # 문서
    ├── PRD.md            # 제품 요구사항 정의서
    └── plan.md           # 개발 계획 체크리스트
```

## 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- PostgreSQL 14.x 이상
- npm 또는 yarn

### 환경 변수 설정

#### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bebetrip

# JWT
JWT_SECRET=your_jwt_secret

# Session
SESSION_SECRET=your_session_secret

# Kakao OAuth
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CALLBACK_URL=http://localhost:5000/api/auth/kakao/callback

# Naver OAuth
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
NAVER_CALLBACK_URL=http://localhost:5000/api/auth/naver/callback
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### 데이터베이스 설정

1. PostgreSQL 데이터베이스 생성:
```bash
createdb bebetrip
```

2. 스키마 실행:
```bash
psql -d bebetrip -f database/schema.sql
```

3. 마스터 데이터 삽입:
```bash
psql -d bebetrip -f database/seed.sql
```

### 설치 및 실행

#### Backend
```bash
cd backend
npm install
npm run dev
```

서버가 http://localhost:5000 에서 실행됩니다.

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

클라이언트가 http://localhost:5173 에서 실행됩니다.

## API 엔드포인트

### 인증
- `GET /api/auth/kakao` - 카카오 로그인
- `GET /api/auth/naver` - 네이버 로그인
- `GET /api/auth/me` - 내 정보 조회
- `POST /api/auth/logout` - 로그아웃

### 사용자
- `GET /api/users/me` - 내 정보 조회
- `PUT /api/users/me` - 내 정보 수정

### 숙소
- `GET /api/accommodations` - 숙소 목록 (검색/필터)
- `GET /api/accommodations/:id` - 숙소 상세
- `GET /api/accommodations/:id/amenities` - 편의용품 조회

### 리뷰
- `POST /api/reviews` - 리뷰 작성
- `GET /api/reviews/:id` - 리뷰 조회
- `PUT /api/reviews/:id` - 리뷰 수정
- `DELETE /api/reviews/:id` - 리뷰 삭제
- `GET /api/reviews/my` - 내 리뷰 목록
- `POST /api/reviews/:id/images` - 리뷰 이미지 업로드

### 위시리스트
- `GET /api/wishlists` - 위시리스트 조회
- `POST /api/wishlists` - 위시리스트 추가
- `DELETE /api/wishlists/:accommodationId` - 위시리스트 삭제

### 마스터 데이터
- `GET /api/age-months` - 월령 그룹 목록
- `GET /api/amenities` - 편의용품 목록
- `GET /api/amenity-categories` - 편의용품 카테고리
- `GET /api/review-pros` - 리뷰 장점 목록
- `GET /api/review-cons` - 리뷰 단점 목록

## 주요 화면

### 홈페이지 (/)
- 서비스 소개
- 주요 기능 안내
- 숙소 검색 바로가기

### 숙소 목록 (/accommodations)
- 검색 및 필터링
- 무한 스크롤 또는 페이지네이션
- 카드 형식 목록

### 숙소 상세 (/accommodations/:id)
- 이미지 갤러리
- 편의용품 체크리스트
- 방 타입 및 가격 정보
- 리뷰 목록

### 위시리스트 (/wishlist)
- 저장한 숙소 목록
- 삭제 기능

### 내 리뷰 (/my-reviews)
- 작성한 리뷰 목록
- 수정/삭제 기능

### 마이페이지 (/my-page)
- 프로필 정보
- 이름, 전화번호 수정

## 개발 가이드

### 코딩 컨벤션
- TypeScript 사용
- ESLint + Prettier 적용
- 함수형 컴포넌트 + Hooks 사용
- 명확한 변수명 및 함수명

### Git 워크플로우
- main: 프로덕션 브랜치
- develop: 개발 브랜치
- feature/*: 기능 개발 브랜치

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.
