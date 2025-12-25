import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiHome size={20} />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
