import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-500 no-underline">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-lg flex items-center justify-center text-white text-xl">
            👶
          </div>
          베베트립
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 list-none m-0 p-0">
            <li>
              <Link
                to="/accommodations"
                className="text-gray-700 no-underline font-medium transition-colors duration-200 hover:text-primary-500"
              >
                숙소 찾기
              </Link>
            </li>
            <li>
              <Link
                to="/my-reviews"
                className="text-gray-700 no-underline font-medium transition-colors duration-200 hover:text-primary-500"
              >
                내 리뷰
              </Link>
            </li>
            <li>
              <Link
                to="/guide"
                className="text-gray-700 no-underline font-medium transition-colors duration-200 hover:text-primary-500"
              >
                여행 가이드
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist">
            <Button variant="icon" size="md" title="찜">
              ♥
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="md">
              로그인 / 회원가입
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
