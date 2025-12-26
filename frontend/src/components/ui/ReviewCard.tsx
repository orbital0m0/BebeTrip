import Badge from './Badge';

export interface ReviewCardProps {
  author: {
    name: string;
    initial: string;
  };
  rating: number;
  ratings?: {
    safety?: number;
    cleanliness?: number;
    convenience?: number;
    facilities?: number;
  };
  childAge: string;
  stayDate: string;
  content: string;
  positiveTags?: string[];
  negativeTags?: string[];
  images?: string[];
}

export default function ReviewCard({
  author,
  rating,
  ratings,
  childAge,
  stayDate,
  content,
  positiveTags = [],
  negativeTags = [],
  images = [],
}: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold">
            {author.initial}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{author.name}</h4>
            <p className="text-sm text-gray-500">
              {childAge} · {stayDate} 숙박
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 font-semibold text-gray-900">
          <span className="text-accent-500">★</span>
          {rating.toFixed(1)}
        </div>
      </div>

      {/* Detailed Ratings */}
      {ratings && (
        <div className="flex gap-4 mb-4 flex-wrap">
          {ratings.safety !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">안전성</span>
              <span className="font-bold text-gray-900 font-inter">{ratings.safety.toFixed(1)}</span>
            </div>
          )}
          {ratings.cleanliness !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">청결도</span>
              <span className="font-bold text-gray-900 font-inter">{ratings.cleanliness.toFixed(1)}</span>
            </div>
          )}
          {ratings.convenience !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">편의성</span>
              <span className="font-bold text-gray-900 font-inter">{ratings.convenience.toFixed(1)}</span>
            </div>
          )}
          {ratings.facilities !== undefined && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">시설</span>
              <span className="font-bold text-gray-900 font-inter">{ratings.facilities.toFixed(1)}</span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {(positiveTags.length > 0 || negativeTags.length > 0) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {positiveTags.map((tag, index) => (
            <Badge key={`positive-${index}`} variant="positive">
              {tag}
            </Badge>
          ))}
          {negativeTags.map((tag, index) => (
            <Badge key={`negative-${index}`} variant="negative">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">{content}</p>

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`리뷰 이미지 ${index + 1}`}
              className="w-20 h-20 rounded-md object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
