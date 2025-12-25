import { Link } from 'react-router-dom';
import { FiStar, FiMapPin } from 'react-icons/fi';
import type { Accommodation } from '../types';
import WishlistButton from './WishlistButton';

interface AccommodationCardProps {
  accommodation: Accommodation & {
    averageRating?: number;
    reviewCount?: number;
    minPrice?: number;
  };
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  return (
    <Link
      to={`/accommodations/${accommodation.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {accommodation.thumbnailImage ? (
          <img
            src={accommodation.thumbnailImage}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <WishlistButton accommodationId={accommodation.id} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {accommodation.name}
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FiMapPin className="mr-1" />
          <span>{accommodation.region}</span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {accommodation.description}
        </p>

        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center">
            {accommodation.averageRating && accommodation.averageRating > 0 ? (
              <>
                <FiStar className="text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {accommodation.averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  ({accommodation.reviewCount})
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">리뷰 없음</span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            {accommodation.minPrice ? (
              <>
                <div className="text-lg font-bold text-gray-900">
                  {accommodation.minPrice.toLocaleString()}원
                </div>
                <div className="text-xs text-gray-500">1박 기준</div>
              </>
            ) : (
              <div className="text-sm text-gray-400">가격 문의</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;
