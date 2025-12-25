import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import AccommodationsPage from './pages/AccommodationsPage';
import AccommodationDetailPage from './pages/AccommodationDetailPage';
import MyReviewsPage from './pages/MyReviewsPage';
import WishlistPage from './pages/WishlistPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/accommodations" element={<AccommodationsPage />} />
            <Route path="/accommodations/:id" element={<AccommodationDetailPage />} />
            <Route path="/my-reviews" element={<MyReviewsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/my-page" element={<MyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
