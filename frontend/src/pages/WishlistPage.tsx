import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { wishlistService } from '../services/wishlistService';
import Layout from '../components/Layout';

interface WishlistItem {
  id: number;
  accommodationId: number;
  createdAt: string;
  accommodation: {
    id: number;
    name: string;
    description: string;
    address: string;
    region: string;
    thumbnailImage?: string;
    averageRating?: number;
    reviewCount?: number;
    minPrice?: number;
  };
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const data = await wishlistService.getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (accommodationId: number) => {
    if (!window.confirm('위시리스트에서 삭제하시겠습니까?')) {
      return;
    }

    try {
      await wishlistService.removeFromWishlist(accommodationId);
      setWishlist((prev) => prev.filter((item) => item.accommodationId !== accommodationId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">위시리스트</h1>
          <p className="text-primary-100">저장한 숙소를 확인하세요</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">저장한 숙소가 없습니다.</p>
            <Link
              to="/accommodations"
              className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              숙소 둘러보기
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-lg text-gray-900">
                총 <span className="font-semibold">{wishlist.length}</span>개의 숙소
              </p>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Image */}
                  <Link
                    to={`/accommodations/${item.accommodation.id}`}
                    className="block relative h-48 bg-gray-200"
                  >
                    {item.accommodation.thumbnailImage ? (
                      <img
                        src={item.accommodation.thumbnailImage}
                        alt={item.accommodation.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link
                      to={`/accommodations/${item.accommodation.id}`}
                      className="block hover:opacity-75 transition-opacity"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                        {item.accommodation.name}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FiMapPin className="mr-1" />
                        <span>{item.accommodation.region}</span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.accommodation.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center">
                          {item.accommodation.averageRating && item.accommodation.averageRating > 0 ? (
                            <>
                              <FiStar className="text-yellow-400 fill-current mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {item.accommodation.averageRating.toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500 ml-1">
                                ({item.accommodation.reviewCount})
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">리뷰 없음</span>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.accommodation.minPrice ? (
                            <>
                              <div className="text-lg font-bold text-gray-900">
                                {item.accommodation.minPrice.toLocaleString()}원
                              </div>
                              <div className="text-xs text-gray-500">1박 기준</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">가격 문의</div>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.accommodation.id)}
                      className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FiTrash2 size={16} />
                      <span>삭제</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default WishlistPage;
