import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="text-8xl mb-4">😵</div>
            <h1 className="text-9xl font-extrabold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-6">
              404
            </h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              <FiHome size={20} className="inline mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
