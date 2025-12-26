import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import api from '../services/api';
import Button from '../components/ui/Button';

const MyPage = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/users/me', { name, phone });
      setUser(response.data);
      setEditing(false);
      alert('정보가 수정되었습니다.');
    } catch (error) {
      console.error('Failed to update user info:', error);
      alert('정보 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
    }
    setEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-2">👤 내 정보</h1>
            <p className="text-lg text-primary-100">회원 정보를 관리하세요</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            {/* Profile Image */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-gray-100">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 rounded-full ring-4 ring-primary-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <FiUser className="text-primary-500" size={48} />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-sm text-gray-500">
                  {user.provider === 'kakao' ? '🟡 카카오' : '🟢 네이버'} 로그인
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email (Read-only) */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  이메일
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg">
                  <FiMail className="text-gray-400" size={18} />
                  <span className="text-gray-700">{user.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">이메일은 수정할 수 없습니다.</p>
              </div>

              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  이름
                </label>
                <div className="flex items-center gap-3">
                  <FiUser className="text-gray-400" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!editing}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 disabled:bg-gray-50 disabled:text-gray-600 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  전화번호
                </label>
                <div className="flex items-center gap-3">
                  <FiPhone className="text-gray-400" size={18} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editing}
                    placeholder="010-1234-5678"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 disabled:bg-gray-50 disabled:text-gray-600 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Provider Info */}
              <div className="mb-8 p-5 bg-gradient-to-br from-secondary-50 to-primary-50 border-2 border-secondary-100 rounded-xl">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  {user.provider === 'kakao' ? '🟡' : '🟢'} 연동 계정:{' '}
                  <span className="text-secondary-600">
                    {user.provider === 'kakao' ? '카카오' : '네이버'}
                  </span>
                </p>
                <p className="text-xs text-gray-600">
                  📅 가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {editing ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? '저장 중...' : '저장'}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    onClick={() => setEditing(true)}
                    className="w-full"
                  >
                    정보 수정
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
