import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { Strategy as NaverStrategy } from 'passport-naver-v2';
import UserModel, { CreateUserData } from '../models/User';

// Kakao Strategy
if (process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_ID !== 'your_kakao_client_id') {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
        callbackURL: process.env.KAKAO_CALLBACK_URL || 'http://localhost:5000/api/auth/kakao/callback',
      },
    async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
      try {
        const email = profile._json.kakao_account?.email;
        const name = profile.displayName || profile._json.kakao_account?.profile?.nickname || 'Unknown';
        const profileImage = profile._json.kakao_account?.profile?.profile_image_url;

        let user = await UserModel.findByProvider('kakao', profile.id);

        if (!user) {
          const userData: CreateUserData = {
            email: email || `kakao_${profile.id}@bebetrip.com`,
            name,
            profile_image: profileImage,
            provider: 'kakao',
            provider_id: profile.id,
          };

          user = await UserModel.create(userData);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
    )
  );
}

// Naver Strategy
if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_ID !== 'your_naver_client_id') {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET || '',
        callbackURL: process.env.NAVER_CALLBACK_URL || 'http://localhost:5000/api/auth/naver/callback',
      },
    async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
      try {
        const email = profile.email;
        const name = profile.name || 'Unknown';
        const profileImage = profile.profile_image;

        let user = await UserModel.findByProvider('naver', profile.id);

        if (!user) {
          const userData: CreateUserData = {
            email: email || `naver_${profile.id}@bebetrip.com`,
            name,
            profile_image: profileImage,
            provider: 'naver',
            provider_id: profile.id,
          };

          user = await UserModel.create(userData);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
    )
  );
}

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
