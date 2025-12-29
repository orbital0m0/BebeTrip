import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-500 no-underline">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-400 rounded-lg flex items-center justify-center text-white text-xl">
            👶
          </div>
          베베트립
        </Link>

        {/* Navigation */}
        <div className="hidden md:block">
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
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/wishlist">
                <Button variant="icon" size="md" title="찜">
                  ♥
                </Button>
              </Link>

              <Link
                to="/my-page"
                className="flex items-center gap-2 text-gray-700 hover:text-primary-500 transition-colors no-underline"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-500" />
                  </div>
                )}
                <span className="text-sm font-medium hidden lg:block">{user.name}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors"
                title="로그아웃"
              >
                <FiLogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/wishlist">
                <Button variant="icon" size="md" title="찜">
                  ♥
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="md">
                  로그인
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="md">
                  회원가입
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
