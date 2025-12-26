import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiUsers, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { reviewService } from '../services/reviewService';
import Layout from '../components/Layout';
import ReviewModal from '../components/ReviewModal';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

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
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">📝 내 리뷰</h1>
          <p className="text-lg text-primary-100">작성한 리뷰를 관리하세요</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">✍️</div>
            <p className="text-xl text-gray-600 mb-6">작성한 리뷰가 없습니다.</p>
            <Link to="/accommodations">
              <Button variant="primary" size="lg">
                숙소 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Accommodation Info */}
                    <Link
                      to={`/accommodations/${review.accommodationId}`}
                      className="flex items-start gap-4 flex-1 hover:opacity-75 transition-opacity"
                    >
                      {review.accommodationThumbnail && (
                        <img
                          src={review.accommodationThumbnail}
                          alt={review.accommodationName}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {review.accommodationName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </Link>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="p-2.5 rounded-lg text-gray-600 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200"
                        title="수정"
                      >
                        <FiEdit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="p-2.5 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                        title="삭제"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Review Info */}
                  <div className="flex items-center flex-wrap gap-3 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <span className="text-accent-500">★</span>
                      <span className="text-gray-900">{review.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-300">|</span>
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
                    <p className="text-gray-700 mb-4 whitespace-pre-line leading-relaxed">{review.content}</p>
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    이전
                  </Button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === pagination.totalPages ||
                        Math.abs(page - pagination.page) <= 2
                    )
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center gap-2">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            pagination.page === page
                              ? 'bg-primary-500 text-white shadow-md'
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-500'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    ))}

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    다음
                  </Button>
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
