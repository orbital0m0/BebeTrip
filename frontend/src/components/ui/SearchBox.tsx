import { useState } from 'react';
import Button from './Button';
import GuestSelector from './GuestSelector';
import DateRangeSelector from './DateRangeSelector';

export interface SearchBoxProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  childAge: string;
  adults: number;
  children: number;
  infants: number;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [childAge, setChildAge] = useState('0-12개월');
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 1,
  });

  const handleSearch = () => {
    onSearch?.({
      location,
      checkIn: dateRange.checkIn,
      checkOut: dateRange.checkOut,
      childAge,
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
    });
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl max-w-7xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:grid-cols-[1.5fr_1.5fr_0.9fr_1.7fr]">
        {/* Location */}
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-sm font-semibold text-gray-700">
            어디로 떠나시나요?
          </label>
          <input
            id="location"
            type="text"
            placeholder="지역 또는 숙소명 검색"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>

        {/* Date Range */}
        <DateRangeSelector value={dateRange} onChange={setDateRange} label="체크인 - 체크아웃" />

        {/* Child Age */}
        <div className="flex flex-col gap-2">
          <label htmlFor="childAge" className="text-sm font-semibold text-gray-700">
            아이 나이
          </label>
          <select
            id="childAge"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer"
          >
            <option className="py-3">0-12개월</option>
            <option className="py-3">13-24개월</option>
            <option className="py-3">25-36개월</option>
            <option className="py-3">37개월 이상</option>
          </select>
        </div>

        {/* Guests */}
        <GuestSelector value={guests} onChange={setGuests} label="인원" />
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
