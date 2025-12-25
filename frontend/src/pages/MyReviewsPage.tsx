import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiUsers, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { reviewService } from '../services/reviewService';
import Layout from '../components/Layout';
import ReviewModal from '../components/ReviewModal';

interface Review {
  id: number;
  accommodationId: number;
  accommodationName: string;
  accommodationThumbnail?: string;
  roomType: string;
  childAgeMonths: number;
  totalPeople: number;
  rating: number;
  content?: string;
  createdAt: string;
  updatedAt: string;
  pros: Array<{ id: number; name: string }>;
  cons: Array<{ id: number; name: string }>;
  images: Array<{ id: number; imageUrl: string }>;
}

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [pagination.page]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const result = await reviewService.getMyReviews(pagination.page, pagination.limit);
      setReviews(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: number) => {
    if (!window.confirm('리뷰를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await reviewService.deleteReview(reviewId);
      loadReviews();
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setShowReviewModal(true);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">내 리뷰</h1>
          <p className="text-primary-100">작성한 리뷰를 관리하세요</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 mb-4">작성한 리뷰가 없습니다.</p>
            <Link
              to="/accommodations"
              className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              숙소 둘러보기
            </Link>
          </div>
        ) : (
          <>
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Accommodation Info */}
                    <Link
                      to={`/accommodations/${review.accommodationId}`}
                      className="flex items-start space-x-4 flex-1 hover:opacity-75 transition-opacity"
                    >
                      {review.accommodationThumbnail && (
                        <img
                          src={review.accommodationThumbnail}
                          alt={review.accommodationName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {review.accommodationName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                        title="수정"
                      >
                        <FiEdit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="삭제"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Review Info */}
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{review.rating.toFixed(1)}</span>
                    </div>
                    <span>•</span>
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
                    <p className="text-gray-700 mb-3 whitespace-pre-line">{review.content}</p>
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    이전
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - pagination.page) <= 2
                    )
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${
                            pagination.page === page
                              ? 'bg-primary-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    다음
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && editingReview && (
        <ReviewModal
          accommodationId={editingReview.accommodationId}
          accommodationName={editingReview.accommodationName}
          roomTypes={[{ id: 0, name: editingReview.roomType }]}
          existingReview={editingReview}
          onClose={() => {
            setShowReviewModal(false);
            setEditingReview(null);
          }}
          onSuccess={() => {
            loadReviews();
          }}
        />
      )}
    </div>
    </Layout>
  );
};

export default MyReviewsPage;
