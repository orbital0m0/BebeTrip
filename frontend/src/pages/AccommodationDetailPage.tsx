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
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">숙소 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery images={accommodation.images} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {accommodation.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FiMapPin className="mr-2" />
                    <span>{accommodation.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {accommodation.averageRating > 0 && (
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400 fill-current mr-1" />
                        <span className="font-medium text-gray-900">
                          {accommodation.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 ml-1">
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
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">숙소 소개</h2>
              <p className="text-gray-700 whitespace-pre-line">{accommodation.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">편의용품</h2>
              <AmenitiesChecklist amenities={accommodation.amenities} />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  리뷰 ({accommodation.reviewCount})
                </h2>
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                      return;
                    }
                    setShowReviewModal(true);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <FiEdit3 size={16} />
                  <span>리뷰 작성</span>
                </button>
              </div>

              {accommodation.reviews.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  아직 작성된 리뷰가 없습니다.
                </p>
              ) : (
                <div className="space-y-6">
                  {accommodation.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {review.user.profileImage ? (
                            <img
                              src={review.user.profileImage}
                              alt={review.user.name}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-sm">
                                {review.user.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{review.user.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Review Info */}
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <FiUsers className="mr-1" />
                          <span>{review.totalPeople}명</span>
                        </div>
                        <span>•</span>
                        <span>아이 {review.childAgeMonths}개월</span>
                        <span>•</span>
                        <span>{review.roomType}</span>
                      </div>

                      {/* Review Content */}
                      {review.content && (
                        <p className="text-gray-700 mb-3">{review.content}</p>
                      )}

                      {/* Pros/Cons */}
                      {(review.pros.length > 0 || review.cons.length > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          {review.pros.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-green-700 mb-2">장점</p>
                              <div className="flex flex-wrap gap-2">
                                {review.pros.map((pro) => (
                                  <span
                                    key={pro.id}
                                    className="inline-block px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                                  >
                                    {pro.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {review.cons.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-red-700 mb-2">단점</p>
                              <div className="flex flex-wrap gap-2">
                                {review.cons.map((con) => (
                                  <span
                                    key={con.id}
                                    className="inline-block px-3 py-1 bg-red-50 text-red-700 text-sm rounded-full"
                                  >
                                    {con.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Review Images */}
                      {review.images.length > 0 && (
                        <div className="flex space-x-2 overflow-x-auto">
                          {review.images.map((image) => (
                            <img
                              key={image.id}
                              src={image.imageUrl}
                              alt="Review"
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Room Types & Booking Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">객실 정보</h2>

                {accommodation.roomTypes.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    객실 정보가 없습니다.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {accommodation.roomTypes.map((room) => (
                      <div
                        key={room.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{room.name}</h3>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {room.pricePerNight.toLocaleString()}원
                            </div>
                            <div className="text-xs text-gray-500">1박 기준</div>
                          </div>
                        </div>

                        {room.description && (
                          <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                        )}

                        <div className="flex items-center text-sm text-gray-500">
                          <FiUsers className="mr-1" />
                          <span>최대 {room.maxOccupancy}명</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>안내:</strong> 예약 문의는 숙소에 직접 연락해 주세요.
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
