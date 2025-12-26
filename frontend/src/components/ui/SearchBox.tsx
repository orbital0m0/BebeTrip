import { useState } from 'react';
import Button from './Button';

export interface SearchBoxProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  dates: string;
  childAge: string;
  guests: string;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    dates: '',
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
    <div className="bg-white rounded-xl p-8 shadow-xl max-w-4xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>

        {/* Dates */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dates" className="text-sm font-semibold text-gray-700">
            체크인 - 체크아웃
          </label>
          <input
            id="dates"
            type="text"
            placeholder="날짜 선택"
            value={filters.dates}
            onChange={(e) => handleChange('dates', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
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
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          >
            <option>0-12개월</option>
            <option>13-24개월</option>
            <option>25-36개월</option>
            <option>37개월 이상</option>
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
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-md text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          >
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
            <option>5명 이상</option>
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
