import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { masterDataService } from '../services/masterDataService';

interface FilterSidebarProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onClose }) => {
  const [ageMonths, setAgeMonths] = useState<any[]>([]);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [selectedAgeMonths, setSelectedAgeMonths] = useState<number[]>(filters.ageMonths || []);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(filters.amenities || []);
  const [minPrice, setMinPrice] = useState<string>(filters.minPrice?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(filters.maxPrice?.toString() || '');
  const [minRating, setMinRating] = useState<number>(filters.minRating || 0);

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = async () => {
    try {
      const [ageMonthsData, amenitiesData] = await Promise.all([
        masterDataService.getAgeMonths(),
        masterDataService.getAmenities(),
      ]);
      setAgeMonths(ageMonthsData);
      setAmenities(amenitiesData);
    } catch (error) {
      console.error('Failed to load master data:', error);
    }
  };

  const handleAgeMonthToggle = (monthFrom: number) => {
    const newSelection = selectedAgeMonths.includes(monthFrom)
      ? selectedAgeMonths.filter(m => m !== monthFrom)
      : [...selectedAgeMonths, monthFrom];
    setSelectedAgeMonths(newSelection);
  };

  const handleAmenityToggle = (amenityId: number) => {
    const newSelection = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(a => a !== amenityId)
      : [...selectedAmenities, amenityId];
    setSelectedAmenities(newSelection);
  };

  const handleApply = () => {
    onFilterChange({
      ...filters,
      ageMonths: selectedAgeMonths.length > 0 ? selectedAgeMonths : undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRating: minRating > 0 ? minRating : undefined,
    });
    onClose?.();
  };

  const handleReset = () => {
    setSelectedAgeMonths([]);
    setSelectedAmenities([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    onFilterChange({
      ...filters,
      ageMonths: undefined,
      amenities: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });
  };

  // Group amenities by category
  const amenitiesByCategory = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.categoryName]) {
      acc[amenity.categoryName] = [];
    }
    acc[amenity.categoryName].push(amenity);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">필터</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Age Months Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">아이 월령</h4>
          <div className="space-y-2">
            {ageMonths.map((age) => (
              <label key={age.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAgeMonths.includes(age.monthFrom)}
                  onChange={() => handleAgeMonthToggle(age.monthFrom)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{age.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">편의용품</h4>
          <div className="space-y-4">
            {Object.entries(amenitiesByCategory).map(([category, items]) => (
              <div key={category}>
                <h5 className="text-xs font-medium text-gray-500 mb-2">{category}</h5>
                <div className="space-y-2">
                  {items.map((amenity) => (
                    <label key={amenity.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity.id)}
                        onChange={() => handleAmenityToggle(amenity.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">가격대 (1박 기준)</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="최소"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500">~</span>
            <input
              type="number"
              placeholder="최대"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">평점</h4>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                  className="border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{rating}점 이상</span>
              </label>
            ))}
            <label className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={minRating === 0}
                onChange={() => setMinRating(0)}
                className="border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700">전체</span>
            </label>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-3">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          초기화
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
