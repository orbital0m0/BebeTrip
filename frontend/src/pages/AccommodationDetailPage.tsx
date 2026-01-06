import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiStar, FiUsers, FiEdit3 } from 'react-icons/fi';
import { accommodationService } from '../services/accommodationService';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import ImageGallery from '../components/ImageGallery';
import AmenitiesChecklist from '../components/AmenitiesChecklist';
import WishlistButton from '../components/WishlistButton';
import ReviewModal from '../components/ReviewModal';
import NearbyAttractions from '../components/NearbyAttractions';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface AccommodationDetail {
  id: number;
  name: string;
  description: string;
  address: string;
  region: string;
  totalRooms: number;
  createdAt: string;
  updatedAt: string;
  images: Array<{
    id: number;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
  }>;
  roomTypes: Array<{
    id: number;
    name: string;
    description?: string;
    maxOccupancy: number;
    pricePerNight: number;
  }>;
  amenities: Record<string, Array<{
    id: number;
    name: string;
    icon?: string;
    isAvailable: boolean;
    notes?: string;
    ageMonthFrom?: number;
    ageMonthTo?: number;
  }>>;
  reviews: Array<{
    id: number;
    rating: number;
    content: string;
    childAgeMonths: number;
    totalPeople: number;
    roomType: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      profileImage?: string;
    };
    pros: Array<{ id: number; name: string }>;
    cons: Array<{ id: number; name: string }>;
    images: Array<{ id: number; imageUrl: string }>;
  }>;
  averageRating: number;
  reviewCount: number;
}

// 숙소 ID별 좌표 매핑 (임시)
// TODO: 데이터베이스에 latitude, longitude 컬럼 추가 필요
const getCoordinates = (accommodationId: number) => {
  const coordinates: Record<number, { mapX: number; mapY: number }> = {
    1: { mapX: 129.1603, mapY: 35.1586 }, // 해운대 베이비 호텔 (부산)
    2: { mapX: 126.5601, mapY: 33.2541 }, // 제주 아일랜드 키즈 리조트 (제주)
    3: { mapX: 128.8761, mapY: 37.7519 }, // 강릉 오션뷰 펜션 (강원)
  };

  return coordinates[accommodationId] || { mapX: 126.9780, mapY: 37.5665 }; // 기본값: 서울
};

const AccommodationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [accommodation, setAccommodation] = useState<AccommodationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (id) {
      loadAccommodation(parseInt(id));
    }
  }, [id]);

  const loadAccommodation = async (accommodationId: number) => {
    setLoading(true);
    try {
      const data = await accommodationService.getAccommodationById(accommodationId);
      setAccommodation(data);
    } catch (error) {
      console.error('Failed to load accommodation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (!accommodation) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-xl text-gray-600">숙소 정보를 찾을 수 없습니다.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Image Gallery */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <ImageGallery images={accommodation.images} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {accommodation.name}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <FiMapPin className="text-primary-500" size={18} />
                    <span className="text-base">{accommodation.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {accommodation.averageRating > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-accent-500 text-xl">★</span>
                        <span className="text-lg font-bold text-gray-900">
                          {accommodation.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">
                          ({accommodation.reviewCount}개 리뷰)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <WishlistButton accommodationId={accommodation.id} size="lg" />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🏠 숙소 소개</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{accommodation.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🧸 편의용품</h2>
              <AmenitiesChecklist amenities={accommodation.amenities} />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  💬 리뷰 ({accommodation.reviewCount})
                </h2>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                      return;
                    }
                    setShowReviewModal(true);
                  }}
                >
                  <FiEdit3 size={16} className="inline mr-2" />
                  리뷰 작성
                </Button>
              </div>

              {accommodation.reviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✍️</div>
                  <p className="text-lg text-gray-500">
                    아직 작성된 리뷰가 없습니다.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {accommodation.reviews.map((review) => (
                    <div key={review.id} className="border-b-2 border-gray-100 pb-8 last:border-0">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {review.user.profileImage ? (
                            <img
                              src={review.user.profileImage}
                              alt={review.user.name}
                              className="w-12 h-12 rounded-full ring-2 ring-primary-100"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                              <span className="text-primary-600 font-semibold">
                                {review.user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900">{review.user.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-accent-500">★</span>
                          <span className="font-bold text-gray-900">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Review Info */}
                      <div className="flex items-center flex-wrap gap-3 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FiUsers className="text-gray-400" size={16} />
                          <span>{review.totalPeople}명</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span>아이 {review.childAgeMonths}개월</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{review.roomType}</span>
                      </div>

                      {/* Review Content */}
                      {review.content && (
                        <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>
                      )}

                      {/* Pros/Cons */}
                      {(review.pros.length > 0 || review.cons.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          {review.pros.length > 0 && (
                            <div>
                              <p className="text-sm font-bold text-success mb-3">👍 장점</p>
                              <div className="flex flex-wrap gap-2">
                                {review.pros.map((pro) => (
                                  <Badge key={pro.id} variant="positive">
                                    {pro.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {review.cons.length > 0 && (
                            <div>
                              <p className="text-sm font-bold text-error mb-3">👎 단점</p>
                              <div className="flex flex-wrap gap-2">
                                {review.cons.map((con) => (
                                  <Badge key={con.id} variant="negative">
                                    {con.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Review Images */}
                      {review.images.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {review.images.map((image) => (
                            <img
                              key={image.id}
                              src={image.imageUrl}
                              alt="Review"
                              className="w-40 h-40 object-cover rounded-xl flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nearby Attractions */}
            <NearbyAttractions
              mapX={getCoordinates(accommodation.id).mapX}
              mapY={getCoordinates(accommodation.id).mapY}
              radius={3000}
            />
          </div>

          {/* Right Column - Room Types & Booking Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🛏️ 객실 정보</h2>

                {accommodation.roomTypes.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">🚪</div>
                    <p className="text-gray-500">
                      객실 정보가 없습니다.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {accommodation.roomTypes.map((room) => (
                      <div
                        key={room.id}
                        className="border-2 border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-gray-900 text-lg">{room.name}</h3>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary-500 font-inter">
                              ₩{room.pricePerNight.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">1박 기준</div>
                          </div>
                        </div>

                        {room.description && (
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{room.description}</p>
                        )}

                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                          <FiUsers className="text-primary-500" size={16} />
                          <span>최대 {room.maxOccupancy}명</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-5 bg-gradient-to-br from-secondary-50 to-primary-50 border-2 border-secondary-100 rounded-xl">
                  <p className="text-sm font-semibold text-gray-800">
                    ℹ️ <strong>안내:</strong> 예약 문의는 숙소에 직접 연락해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          accommodationId={accommodation.id}
          accommodationName={accommodation.name}
          roomTypes={accommodation.roomTypes}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            loadAccommodation(accommodation.id);
          }}
        />
      )}
    </div>
    </Layout>
  );
};

export default AccommodationDetailPage;
