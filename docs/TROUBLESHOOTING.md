# 문제 해결 가이드 (Troubleshooting Guide)

이 문서는 BeBe Trip 백엔드 개발 서버를 실행하는 동안 발생한 문제와 해결 방법을 기록합니다.

## 발생 일자
2025-12-25

## 문제 요약
개발 서버(`npm run dev`) 실행 시 여러 TypeScript 컴파일 에러 및 환경 설정 문제가 발생하여 서버가 정상적으로 시작되지 않았습니다.

---

## 문제 1: 사용하지 않는 매개변수 에러 (TS6133)

### 에러 메시지
```
error TS6133: 'req' is declared but its value is never read.
error TS6133: 'res' is declared but its value is never read.
error TS6133: 'accessToken' is declared but its value is never read.
error TS6133: 'refreshToken' is declared but its value is never read.
```

### 원인
`tsconfig.json`에 `noUnusedParameters: true` 설정이 활성화되어 있어, Express 라우트 핸들러 및 미들웨어에서 사용하지 않는 매개변수가 선언되면 컴파일 에러가 발생했습니다.

### 해결 방법
사용하지 않는 매개변수 이름 앞에 언더스코어(`_`)를 붙여서 TypeScript에게 의도적으로 사용하지 않는 변수임을 표시했습니다.

#### 수정된 파일 목록:
1. **src/server.ts** (4개 수정)
   - `req` → `_req`

2. **src/config/passport.ts** (4개 수정)
   - `accessToken` → `_accessToken`
   - `refreshToken` → `_refreshToken`

3. **src/middlewares/auth.ts** (1개 수정)
   - `res` → `_res` (optionalAuth 함수)

4. **src/controllers/masterDataController.ts** (5개 수정)
   - 모든 컨트롤러 함수에서 `req` → `_req`

5. **src/routes/reviewRoutes.ts** (3개 수정)
   - multer 설정에서 `req`, `file` → `_req`, `_file`

---

## 문제 2: passport-kakao 타입 정의 누락 (TS7016)

### 에러 메시지
```
error TS7016: Could not find a declaration file for module 'passport-kakao'.
```

### 원인
`passport-kakao` 모듈에 대한 TypeScript 타입 정의 파일이 존재하지 않아 컴파일 에러가 발생했습니다.

### 해결 방법
1. npm으로 `@types/passport-kakao` 설치 시도했으나 존재하지 않음
2. 커스텀 타입 선언 파일을 수동으로 생성

#### 생성한 파일:
**src/types/passport-kakao.d.ts**
```typescript
declare module 'passport-kakao' {
  import { Strategy as PassportStrategy } from 'passport-strategy';

  export interface StrategyOptions {
    clientID: string;
    clientSecret?: string;
    callbackURL: string;
  }

  export interface Profile {
    provider: string;
    id: string;
    displayName: string;
    _raw: string;
    _json: any;
  }

  export type VerifyCallback = (err?: Error | null, user?: any, info?: any) => void;
  export type VerifyFunction = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) => void;

  export class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    name: string;
  }
}
```

3. **tsconfig.json**에 타입 경로 추가:
```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
```

---

## 문제 3: JWT 타입 에러 (TS2769)

### 에러 메시지
```
error TS2769: No overload matches this call.
Type 'string' is not assignable to type 'number | StringValue | undefined'.
```

### 원인
`jsonwebtoken` 라이브러리의 `sign()` 함수에서 `expiresIn` 옵션의 타입이 제대로 추론되지 않았습니다.

### 해결 방법
타입 단언(type assertion)을 명시적으로 추가했습니다.

**src/utils/jwt.ts**
```typescript
// 수정 전
return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// 수정 후
return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
```

---

## 문제 4: OAuth 클라이언트 설정 누락 런타임 에러

### 에러 메시지
```
TypeError: OAuth2Strategy requires a clientID option
```

### 원인
1. `.env` 파일이 존재하지 않아 환경 변수가 로드되지 않음
2. 더미 값(`your_kakao_client_id`)이 설정되어 있어도 빈 문자열로 처리되어 에러 발생

### 해결 방법

1. **.env 파일 생성**
   ```bash
   cp .env.example .env
   ```

2. **passport.ts 수정 - 조건부 Strategy 등록**
   OAuth 클라이언트 ID가 제대로 설정되지 않았을 때는 Strategy를 등록하지 않도록 수정:

**src/config/passport.ts**
```typescript
// Kakao Strategy - 조건부 등록
if (process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_ID !== 'your_kakao_client_id') {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
        callbackURL: process.env.KAKAO_CALLBACK_URL || 'http://localhost:5000/api/auth/kakao/callback',
      },
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        // ... 구현 코드
      }
    )
  );
}

// Naver Strategy - 조건부 등록
if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_ID !== 'your_naver_client_id') {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET || '',
        callbackURL: process.env.NAVER_CALLBACK_URL || 'http://localhost:5000/api/auth/naver/callback',
      },
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        // ... 구현 코드
      }
    )
  );
}
```

---

## 문제 5: 잘못된 Import 이름 (TS2724)

### 에러 메시지
```
error TS2724: '"../middlewares/auth"' has no exported member named 'authenticateToken'.
Did you mean 'authenticate'?
```

### 원인
`src/routes/reviewRoutes.ts`에서 존재하지 않는 export 멤버 `authenticateToken`을 import하려고 시도했습니다. 실제 export된 함수 이름은 `authenticate`였습니다.

### 해결 방법

**src/routes/reviewRoutes.ts**
```typescript
// 수정 전
import { authenticateToken } from '../middlewares/auth';
router.post('/', authenticateToken, createReview);

// 수정 후
import { authenticate } from '../middlewares/auth';
router.post('/', authenticate, createReview);
```

모든 라우트에서 `authenticateToken` → `authenticate`로 변경했습니다.

---

## 문제 6: pg 타입 정의 누락

### 에러 메시지
```
error TS7016: Could not find a declaration file for module 'pg'.
```

### 해결 방법
PostgreSQL 클라이언트 타입 정의 설치:

```bash
npm install --save-dev @types/pg
```

---

## 최종 결과

모든 에러를 해결한 후 개발 서버가 성공적으로 시작되었습니다:

```
🚀 Server is running on port 5000
📝 Environment: development
```

### 설치된 타입 정의 패키지:
- `@types/passport-kakao` (수동 생성)
- `@types/pg`

### 수정된 설정 파일:
- `tsconfig.json` - typeRoots 추가
- `.env` - 환경 변수 파일 생성

### 수정된 소스 파일 (총 7개):
1. src/server.ts
2. src/config/passport.ts
3. src/middlewares/auth.ts
4. src/controllers/masterDataController.ts
5. src/routes/reviewRoutes.ts
6. src/utils/jwt.ts
7. src/types/passport-kakao.d.ts (신규 생성)

---

## 추가 권장사항

1. **프로덕션 환경 설정**
   - `.env` 파일에 실제 OAuth 클라이언트 ID와 시크릿 설정 필요
   - JWT_SECRET과 SESSION_SECRET을 강력한 값으로 변경 필요

2. **데이터베이스 설정**
   - PostgreSQL 데이터베이스 생성 및 연결 설정 필요
   - `database/schema.sql` 실행하여 테이블 생성
   - `database/seed.sql` 실행하여 초기 데이터 입력

3. **이미지 업로드 폴더**
   - `uploads/reviews/` 디렉토리 생성 필요:
     ```bash
     mkdir -p uploads/reviews
     ```

---

## 문제 7: Tailwind CSS PostCSS 플러그인 에러

### 에러 메시지
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package, so to continue using Tailwind CSS
with PostCSS you'll need to install `@tailwindcss/postcss` and update your PostCSS configuration.
```

### 원인
Tailwind CSS v4부터 PostCSS 플러그인이 별도의 패키지(`@tailwindcss/postcss`)로 분리되었습니다.
기존 설정에서는 `tailwindcss`를 직접 PostCSS 플러그인으로 사용하고 있어 에러가 발생했습니다.

### 해결 방법

1. **@tailwindcss/postcss 패키지 설치**
   ```bash
   cd frontend
   npm install --save-dev @tailwindcss/postcss
   ```

2. **postcss.config.js 파일 수정**

**frontend/postcss.config.js**
```javascript
// 수정 전
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// 수정 후
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

3. **프론트엔드 서버 재시작**
   ```bash
   # 기존 서버 종료 후 재시작
   npm run dev
   ```

### 최종 결과
프론트엔드 서버가 성공적으로 시작되었습니다:

```
VITE v7.3.0  ready in 204 ms
➜  Local:   http://localhost:5174/
```

**참고**: 포트 5173이 이미 사용 중이어서 자동으로 포트 5174로 할당되었습니다.

---

## 참고 링크
- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [Express TypeScript 가이드](https://www.typescriptlang.org/ko/docs/handbook/declaration-files/templates/module-d-ts.html)
- [Passport.js 문서](http://www.passportjs.org/)
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
