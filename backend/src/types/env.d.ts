declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server Configuration
      PORT?: string;
      NODE_ENV?: 'development' | 'production' | 'test';
      FRONTEND_URL?: string;

      // Database Configuration
      DB_HOST?: string;
      DB_PORT?: string;
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;

      // JWT Configuration
      JWT_SECRET?: string;

      // Session Configuration
      SESSION_SECRET?: string;

      // Kakao OAuth
      KAKAO_CLIENT_ID?: string;
      KAKAO_CLIENT_SECRET?: string;
      KAKAO_CALLBACK_URL?: string;

      // Naver OAuth
      NAVER_CLIENT_ID?: string;
      NAVER_CLIENT_SECRET?: string;
      NAVER_CALLBACK_URL?: string;

      // 공공데이터포털 API
      PUBLIC_DATA_API_KEY?: string;
      PUBLIC_DATA_API_BASE_URL?: string;
    }
  }
}

export {};
