# 배포 가이드

베베트립 프로젝트 배포 가이드입니다.

## 목차
- [Docker를 이용한 배포](#docker를-이용한-배포)
- [수동 배포](#수동-배포)
- [환경 변수 설정](#환경-변수-설정)
- [데이터베이스 마이그레이션](#데이터베이스-마이그레이션)

## Docker를 이용한 배포

### 사전 요구사항
- Docker 20.10 이상
- Docker Compose 2.0 이상

### 배포 단계

1. **환경 변수 설정**

루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다:

```bash
cp .env.example .env
# .env 파일을 편집하여 실제 값으로 변경
```

2. **Docker Compose로 실행**

```bash
docker-compose up -d
```

이 명령어는 다음을 실행합니다:
- PostgreSQL 데이터베이스 컨테이너 시작
- 백엔드 API 서버 빌드 및 시작
- 프론트엔드 정적 파일 빌드 및 Nginx 서버 시작

3. **서비스 확인**

```bash
# 컨테이너 상태 확인
docker-compose ps

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f backend
docker-compose logs -f frontend
```

4. **접속**

- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:5000
- 데이터베이스: localhost:5432

### Docker Compose 명령어

```bash
# 서비스 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 서비스 재시작
docker-compose restart

# 볼륨까지 삭제 (데이터베이스 초기화)
docker-compose down -v

# 이미지 재빌드
docker-compose build --no-cache
docker-compose up -d
```

## 수동 배포

### 백엔드 배포

1. **의존성 설치**
```bash
cd backend
npm ci --only=production
```

2. **TypeScript 빌드**
```bash
npm run build
```

3. **PM2로 실행 (선택사항)**
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

4. **직접 실행**
```bash
NODE_ENV=production node dist/server.js
```

### 프론트엔드 배포

1. **의존성 설치**
```bash
cd frontend
npm ci
```

2. **프로덕션 빌드**
```bash
npm run build
```

3. **Nginx 설정**

`/etc/nginx/sites-available/bebetrip` 파일 생성:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/bebetrip/frontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 프록시
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Nginx 활성화**
```bash
sudo ln -s /etc/nginx/sites-available/bebetrip /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 환경 변수 설정

### 필수 환경 변수

#### 백엔드

```env
# Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com

# Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=bebetrip

# JWT (반드시 강력한 비밀키로 변경)
JWT_SECRET=your-strong-jwt-secret-key

# Session (반드시 강력한 비밀키로 변경)
SESSION_SECRET=your-strong-session-secret-key

# Kakao OAuth
KAKAO_CLIENT_ID=your-kakao-client-id
KAKAO_CALLBACK_URL=https://your-domain.com/api/auth/kakao/callback

# Naver OAuth
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
NAVER_CALLBACK_URL=https://your-domain.com/api/auth/naver/callback
```

#### 프론트엔드

```env
VITE_API_URL=https://your-domain.com/api
```

## 데이터베이스 마이그레이션

### 초기 설정

```bash
# 데이터베이스 생성
createdb bebetrip

# 스키마 생성
psql -d bebetrip -f database/schema.sql

# 마스터 데이터 삽입
psql -d bebetrip -f database/seed.sql
```

### 백업

```bash
# 전체 데이터베이스 백업
pg_dump bebetrip > backup_$(date +%Y%m%d).sql

# 특정 테이블만 백업
pg_dump bebetrip -t users -t accommodations > backup_tables.sql
```

### 복원

```bash
# 데이터베이스 복원
psql -d bebetrip < backup_20231201.sql
```

## 보안 권장사항

1. **환경 변수**
   - `.env` 파일은 절대 Git에 커밋하지 마세요
   - 프로덕션 환경에서는 강력한 비밀키를 사용하세요
   - 환경 변수 관리 서비스 사용 권장 (AWS Secrets Manager, Vault 등)

2. **HTTPS 사용**
   - Let's Encrypt를 이용한 무료 SSL 인증서 발급 권장
   - Cloudflare 등의 CDN 서비스 사용 가능

3. **데이터베이스**
   - 강력한 비밀번호 사용
   - 외부 접근 제한 (방화벽 설정)
   - 정기적인 백업

4. **파일 업로드**
   - 업로드 크기 제한 설정
   - 파일 타입 검증
   - 스캔 서비스 사용 권장

## 모니터링

### PM2 모니터링

```bash
# 실시간 모니터링
pm2 monit

# 상태 확인
pm2 status

# 로그 확인
pm2 logs
```

### Docker 모니터링

```bash
# 컨테이너 리소스 사용량
docker stats

# 로그 확인
docker-compose logs -f --tail=100
```

## 트러블슈팅

### 데이터베이스 연결 실패

```bash
# 데이터베이스 연결 테스트
psql -h DB_HOST -U DB_USER -d DB_NAME

# Docker 네트워크 확인
docker network inspect bebetrip_default
```

### 포트 충돌

```bash
# 포트 사용 확인
netstat -tuln | grep 5000
lsof -i :5000

# Docker Compose 포트 변경
# docker-compose.yml에서 ports 섹션 수정
```

### 메모리 부족

```bash
# PM2 메모리 모니터링
pm2 list
pm2 restart app-name

# Docker 메모리 제한 설정
# docker-compose.yml에 deploy 섹션 추가
```

## 성능 최적화

1. **캐싱**
   - Nginx 레벨 캐싱 설정
   - Redis 캐시 서버 도입 고려

2. **CDN**
   - 정적 파일 CDN 사용
   - 이미지 최적화 서비스 사용

3. **데이터베이스**
   - 인덱스 최적화
   - 커넥션 풀 설정
   - 쿼리 성능 분석

## 지원

배포 관련 문의사항은 이슈를 등록해주세요.
