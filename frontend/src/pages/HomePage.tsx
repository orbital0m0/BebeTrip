import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiStar, FiShield } from 'react-icons/fi';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              베베트립
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              영유아와 함께하는 안전하고 편안한 여행을 위한 숙소 플랫폼
            </p>
            <Link
              to="/accommodations"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              숙소 찾아보기
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <FiSearch className="text-primary-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                맞춤 검색
              </h3>
              <p className="text-sm text-gray-600">
                아이의 월령에 맞는 편의용품이 구비된 숙소를 찾아보세요
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiShield className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                안전 정보
              </h3>
              <p className="text-sm text-gray-600">
                안전용품, 위생용품 구비 현황을 한눈에 확인하세요
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <FiStar className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                실제 리뷰
              </h3>
              <p className="text-sm text-gray-600">
                같은 월령 아이를 둔 부모님들의 생생한 후기를 확인하세요
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FiHeart className="text-red-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                위시리스트
              </h3>
              <p className="text-sm text-gray-600">
                마음에 드는 숙소를 저장하고 나중에 다시 확인하세요
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              아이와 함께하는 특별한 여행을 시작하세요
            </h2>
            <p className="text-lg text-primary-100 mb-6">
              영유아 맞춤 편의시설이 갖춰진 숙소를 지금 바로 찾아보세요
            </p>
            <Link
              to="/accommodations"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              지금 시작하기
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
