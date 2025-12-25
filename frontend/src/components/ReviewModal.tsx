import { useState, useEffect } from 'react';
import { FiX, FiStar, FiUpload, FiTrash2 } from 'react-icons/fi';
import { reviewService } from '../services/reviewService';
import type { CreateReviewData, UpdateReviewData } from '../services/reviewService';
import { masterDataService } from '../services/masterDataService';

interface ReviewModalProps {
  accommodationId: number;
  accommodationName: string;
  roomTypes: Array<{ id: number; name: string }>;
  existingReview?: any;
  onClose: () => void;
  onSuccess: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  accommodationId,
  accommodationName,
  roomTypes,
  existingReview,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [roomType, setRoomType] = useState(existingReview?.roomType || '');
  const [childAgeMonths, setChildAgeMonths] = useState(existingReview?.childAgeMonths || '');
  const [totalPeople, setTotalPeople] = useState(existingReview?.totalPeople || '');
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState(existingReview?.content || '');
  const [selectedPros, setSelectedPros] = useState<number[]>(
    existingReview?.pros?.map((p: any) => p.id) || []
  );
  const [selectedCons, setSelectedCons] = useState<number[]>(
    existingReview?.cons?.map((c: any) => c.id) || []
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    existingReview?.images?.map((img: any) => img.imageUrl) || []
  );
  const [existingImages, setExistingImages] = useState<any[]>(existingReview?.images || []);

  const [prosList, setProsList] = useState<any[]>([]);
  const [consList, setConsList] = useState<any[]>([]);

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      const [pros, cons] = await Promise.all([
        masterDataService.getReviewPros(),
        masterDataService.getReviewCons(),
      ]);
      setProsList(pros);
      setConsList(cons);
    } catch (error) {
      console.error('Failed to load master data:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = existingImages.length + images.length + files.length;

    if (totalImages > 10) {
      alert('최대 10장까지 업로드 가능합니다.');
      return;
    }

    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveNewImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      const existingCount = existingImages.length;
      return prev.filter((_, i) => i !== existingCount + index);
    });
  };

  const handleRemoveExistingImage = async (imageId: number, index: number) => {
    if (!existingReview) return;

    if (window.confirm('이미지를 삭제하시겠습니까?')) {
      try {
        await reviewService.deleteReviewImage(existingReview.id, imageId);
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Failed to delete image:', error);
        alert('이미지 삭제에 실패했습니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomType || !childAgeMonths || !totalPeople) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      if (existingReview) {
        // Update review
        const updateData: UpdateReviewData = {
          roomType,
          childAgeMonths: parseInt(childAgeMonths),
          totalPeople: parseInt(totalPeople),
          rating,
          content,
          pros: selectedPros,
          cons: selectedCons,
        };

        await reviewService.updateReview(existingReview.id, updateData);

        // Upload new images
        if (images.length > 0) {
          await reviewService.uploadReviewImages(existingReview.id, images);
        }
      } else {
        // Create review
        const reviewData: CreateReviewData = {
          accommodationId,
          roomType,
          childAgeMonths: parseInt(childAgeMonths),
          totalPeople: parseInt(totalPeople),
          rating,
          content,
          pros: selectedPros,
          cons: selectedCons,
        };

        const review = await reviewService.createReview(reviewData);

        // Upload images
        if (images.length > 0) {
          await reviewService.uploadReviewImages(review.id, images);
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('리뷰 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const togglePro = (proId: number) => {
    setSelectedPros((prev) =>
      prev.includes(proId) ? prev.filter((id) => id !== proId) : [...prev, proId]
    );
  };

  const toggleCon = (conId: number) => {
    setSelectedCons((prev) =>
      prev.includes(conId) ? prev.filter((id) => id !== conId) : [...prev, conId]
    );
  };

  // Group pros and cons by category
  const groupedPros = prosList.reduce((acc, pro) => {
    if (!acc[pro.category]) acc[pro.category] = [];
    acc[pro.category].push(pro);
    return acc;
  }, {} as Record<string, any[]>);

  const groupedCons = consList.reduce((acc, con) => {
    if (!acc[con.category]) acc[con.category] = [];
    acc[con.category].push(con);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {existingReview ? '리뷰 수정' : '리뷰 작성'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">{accommodationName}</p>
          </div>

          {/* Required Fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                방 타입 <span className="text-red-500">*</span>
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">선택하세요</option>
                {roomTypes.map((rt) => (
                  <option key={rt.id} value={rt.name}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                아이 월령 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={childAgeMonths}
                onChange={(e) => setChildAgeMonths(e.target.value)}
                placeholder="예: 12"
                min="0"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">개월 단위로 입력해주세요</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                동반 인원 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={totalPeople}
                onChange={(e) => setTotalPeople(e.target.value)}
                placeholder="예: 4"
                min="1"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">아이 포함 총 인원수</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              평점
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  <FiStar
                    size={32}
                    className={
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              리뷰 내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="숙소에 대한 자세한 리뷰를 작성해주세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Pros */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              장점 (다중 선택 가능)
            </label>
            <div className="space-y-4">
              {Object.entries(groupedPros).map(([category, pros]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {pros.map((pro) => (
                      <button
                        key={pro.id}
                        type="button"
                        onClick={() => togglePro(pro.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedPros.includes(pro.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pro.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              단점 (다중 선택 가능)
            </label>
            <div className="space-y-4">
              {Object.entries(groupedCons).map(([category, cons]) => (
                <div key={category}>
                  <p className="text-xs font-medium text-gray-500 mb-2">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {cons.map((con) => (
                      <button
                        key={con.id}
                        type="button"
                        onClick={() => toggleCon(con.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCons.includes(con.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {con.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사진 (최대 10장)
            </label>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (index < existingImages.length) {
                        handleRemoveExistingImage(
                          existingImages[index].id,
                          index
                        );
                      } else {
                        handleRemoveNewImage(index - existingImages.length);
                      }
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {imagePreviews.length < 10 && (
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <div className="text-center">
                  <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
                  <p className="text-sm text-gray-600">사진 추가</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '처리 중...' : existingReview ? '수정' : '작성'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
