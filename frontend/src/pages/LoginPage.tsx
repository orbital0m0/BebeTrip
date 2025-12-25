import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      let errorMessage = '로그인에 실패했습니다.';
      if (error === 'authentication_failed') {
        errorMessage = '인증에 실패했습니다. 다시 시도해주세요.';
      } else if (error === 'server_error') {
        errorMessage = '서버 오류가 발생했습니다.';
      }
      alert(errorMessage);
    }
  }, [error]);

  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/auth/kakao`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${API_URL}/auth/naver`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            베베트립
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            영유아 숙소 특화 플랫폼
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
            </svg>
            카카오로 시작하기
          </button>

          <button
            onClick={handleNaverLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
            네이버로 시작하기
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>로그인하면 베베트립의 서비스 약관 및</p>
          <p>개인정보 처리방침에 동의하게 됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
