import dotenv from 'dotenv';

// IMPORTANT: Load environment variables BEFORE importing any modules
dotenv.config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import './config/passport';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import accommodationRoutes from './routes/accommodationRoutes';
import masterDataRoutes from './routes/masterDataRoutes';
import wishlistRoutes from './routes/wishlistRoutes';
import reviewRoutes from './routes/reviewRoutes';
import publicDataRoutes from './routes/publicDataRoutes';
import kakaoLocalRoutes from './routes/kakaoLocalRoutes';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // 개발 환경에서는 모든 localhost origin 허용
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else if (process.env.FRONTEND_URL === origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'bebetrip-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'BeBe Trip API Server' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/public-data', publicDataRoutes);
app.use('/api/kakao-local', kakaoLocalRoutes);
app.use('/api', masterDataRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
