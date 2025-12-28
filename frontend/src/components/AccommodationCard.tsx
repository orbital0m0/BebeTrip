import { Link } from 'react-router-dom';
import type { Accommodation } from '../types';
import Badge from './ui/Badge';
import WishlistButton from './WishlistButton';

interface AccommodationCardProps {
  accommodation: Accommodation & {
    averageRating?: number;
    reviewCount?: number;
    minPrice?: number;
    isSafeCertified?: boolean;
    recommendedAge?: string;
    isBest?: boolean;
    features?: string[];
  };
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  return (
    <Link
      to={`/accommodations/${accommodation.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {accommodation.thumbnailImage ? (
          <img
            src={accommodation.thumbnailImage}
            alt={accommodation.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            No Image
          </div>
        )}

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton accommodationId={accommodation.id} size="md" />
        </div>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {accommodation.isSafeCertified && (
            <Badge variant="safe">✓ 안전인증</Badge>
          )}
          {accommodation.recommendedAge && (
            <Badge variant="age">{accommodation.recommendedAge}</Badge>
          )}
          {accommodation.isBest && (
            <Badge variant="recommended">🏆 베스트</Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
              {accommodation.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              📍 {accommodation.region}
            </p>
          </div>
          {accommodation.averageRating && accommodation.averageRating > 0 && (
            <div className="flex items-center gap-1 font-semibold text-gray-900">
              <span className="text-accent-500">★</span>
              {accommodation.averageRating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Features */}
        {accommodation.features && accommodation.features.length > 0 && (
          <div className="flex gap-3 flex-wrap mb-4">
            {accommodation.features.slice(0, 4).map((feature, index) => (
              <span key={index} className="text-xs text-gray-600 flex items-center gap-1">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">1박</div>
          {accommodation.minPrice ? (
            <div className="text-2xl font-bold text-gray-900 font-inter">
              ₩{accommodation.minPrice.toLocaleString()}
            </div>
          ) : (
            <div className="text-sm text-gray-400">가격 문의</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;
