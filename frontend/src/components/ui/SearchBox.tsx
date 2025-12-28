import { useState } from 'react';
import Button from './Button';

export interface SearchBoxProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  childAge: string;
  guests: string;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    childAge: '0-12개월',
    guests: '2명',
  });

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const handleChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl max-w-6xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:grid-cols-[1.5fr_1.2fr_1.2fr_1fr_1fr]">
        {/* Location */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-sm font-semibold text-gray-700">
            어디로 떠나시나요?
          </label>
          <input
            id="location"
            type="text"
            placeholder="지역 또는 숙소명 검색"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>

        {/* Check-in */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkIn" className="text-sm font-semibold text-gray-700">
            체크인
          </label>
          <input
            id="checkIn"
            type="date"
            value={filters.checkIn}
            onChange={(e) => handleChange('checkIn', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 cursor-pointer"
            style={{ colorScheme: 'light' }}
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkOut" className="text-sm font-semibold text-gray-700">
            체크아웃
          </label>
          <input
            id="checkOut"
            type="date"
            value={filters.checkOut}
            onChange={(e) => handleChange('checkOut', e.target.value)}
            min={filters.checkIn}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 cursor-pointer"
            style={{ colorScheme: 'light' }}
          />
        </div>

        {/* Child Age */}
        <div className="flex flex-col gap-2">
          <label htmlFor="childAge" className="text-sm font-semibold text-gray-700">
            아이 나이
          </label>
          <select
            id="childAge"
            value={filters.childAge}
            onChange={(e) => handleChange('childAge', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer"
          >
            <option className="py-3">0-12개월</option>
            <option className="py-3">13-24개월</option>
            <option className="py-3">25-36개월</option>
            <option className="py-3">37개월 이상</option>
          </select>
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-2">
          <label htmlFor="guests" className="text-sm font-semibold text-gray-700">
            인원
          </label>
          <select
            id="guests"
            value={filters.guests}
            onChange={(e) => handleChange('guests', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer"
          >
            <option className="py-3">2명</option>
            <option className="py-3">3명</option>
            <option className="py-3">4명</option>
            <option className="py-3">5명 이상</option>
          </select>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleSearch}
        className="w-full text-lg"
      >
        🔍 검색하기
      </Button>
    </div>
  );
}
