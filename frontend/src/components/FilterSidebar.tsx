import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { masterDataService } from '../services/masterDataService';
import FilterChip from './ui/FilterChip';
import Button from './ui/Button';

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
        <h3 className="text-lg font-bold text-gray-900">필터</h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={24} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Age Months Filter */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">아이 나이</h4>
          <div className="flex flex-wrap gap-2">
            {ageMonths.map((age) => (
              <FilterChip
                key={age.id}
                active={selectedAgeMonths.includes(age.monthFrom)}
                onClick={() => handleAgeMonthToggle(age.monthFrom)}
              >
                {age.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Amenities Filter */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">편의 시설</h4>
          <div className="space-y-4">
            {Object.entries(amenitiesByCategory).map(([category, items]) => (
              <div key={category}>
                <h5 className="text-xs font-semibold text-gray-500 mb-2">{category}</h5>
                <div className="flex flex-wrap gap-2">
                  {items.map((amenity) => (
                    <FilterChip
                      key={amenity.id}
                      active={selectedAmenities.includes(amenity.id)}
                      onClick={() => handleAmenityToggle(amenity.id)}
                    >
                      {amenity.name}
                    </FilterChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">가격대 (1박 기준)</h4>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="최소"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200"
            />
            <span className="text-gray-500">~</span>
            <input
              type="number"
              placeholder="최대"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">평점</h4>
          <div className="flex flex-wrap gap-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <FilterChip
                key={rating}
                active={minRating === rating}
                onClick={() => setMinRating(rating)}
              >
                ★ {rating}+
              </FilterChip>
            ))}
            <FilterChip
              active={minRating === 0}
              onClick={() => setMinRating(0)}
            >
              전체
            </FilterChip>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <Button
          variant="secondary"
          size="md"
          onClick={handleReset}
          className="flex-1"
        >
          초기화
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleApply}
          className="flex-1"
        >
          적용
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
