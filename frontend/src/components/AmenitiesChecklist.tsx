import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

interface AmenitiesChecklistProps {
  amenities: Record<string, Array<{
    id: number;
    name: string;
    icon?: string;
    isAvailable: boolean;
    notes?: string;
    ageMonthFrom?: number;
    ageMonthTo?: number;
  }>>;
}

const AmenitiesChecklist: React.FC<AmenitiesChecklistProps> = ({ amenities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(amenities)[0] || ''
  );

  const categories = Object.keys(amenities);

  if (categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        편의용품 정보가 없습니다.
      </div>
    );
  }

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 border-b">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedCategory === category
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Amenities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities[selectedCategory]?.map((amenity) => (
          <div
            key={amenity.id}
            className={`flex items-start p-4 rounded-lg border ${
              amenity.isAvailable
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                amenity.isAvailable ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              {amenity.isAvailable ? (
                <FiCheck className="text-white" size={16} />
              ) : (
                <FiX className="text-white" size={16} />
              )}
            </div>

            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={`font-medium ${
                    amenity.isAvailable ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {amenity.name}
                </span>
                {amenity.ageMonthFrom !== null && amenity.ageMonthTo !== null && (
                  <span className="text-xs text-gray-500">
                    {amenity.ageMonthFrom}-{amenity.ageMonthTo}개월
                  </span>
                )}
              </div>
              {amenity.notes && (
                <p className="text-sm text-gray-600 mt-1">{amenity.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesChecklist;
