import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { wishlistService } from '../services/wishlistService';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';

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
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">♥ 위시리스트</h1>
          <p className="text-lg text-primary-100">저장한 숙소를 확인하세요</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">💔</div>
            <p className="text-xl text-gray-600 mb-6">저장한 숙소가 없습니다.</p>
            <Link to="/accommodations">
              <Button variant="primary" size="lg">
                숙소 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-2xl font-bold text-gray-900">
                총 <span className="text-primary-500">{wishlist.length}</span>개의 숙소
              </p>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <Link
                    to={`/accommodations/${item.accommodation.id}`}
                    className="block relative aspect-[4/3] overflow-hidden"
                  >
                    {item.accommodation.thumbnailImage ? (
                      <img
                        src={item.accommodation.thumbnailImage}
                        alt={item.accommodation.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <Link
                      to={`/accommodations/${item.accommodation.id}`}
                      className="block hover:opacity-75 transition-opacity mb-4"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                        {item.accommodation.name}
                      </h3>

                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                        📍 {item.accommodation.region}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {item.accommodation.averageRating && item.accommodation.averageRating > 0 ? (
                            <>
                              <span className="text-accent-500">★</span>
                              <span className="text-sm font-semibold text-gray-900">
                                {item.accommodation.averageRating.toFixed(1)}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm text-gray-400">리뷰 없음</span>
                          )}
                        </div>

                        {/* Price */}
                        {item.accommodation.minPrice ? (
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900 font-inter">
                              ₩{item.accommodation.minPrice.toLocaleString()}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.accommodation.id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-200 font-medium"
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
