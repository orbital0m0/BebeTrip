import { useState } from 'react';
import Button from './ui/Button';
import GuestSelector from './ui/GuestSelector';
import DateRangeSelector from './ui/DateRangeSelector';

interface SearchBarProps {
  onSearch: (filters: any) => void;
}

const REGIONS = ['서울', '부산', '제주', '경기', '강원', '충청', '전라', '경상'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [region, setRegion] = useState('');
  const [dateRange, setDateRange] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 1,
  });

  const handleSearch = () => {
    onSearch({
      region: region || undefined,
      checkIn: dateRange.checkIn || undefined,
      checkOut: dateRange.checkOut || undefined,
      adults: guests.adults,
      children: guests.children,
      infants: guests.infants,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Region */}
        <div className="flex flex-col gap-2">
          <label htmlFor="region" className="text-sm font-semibold text-gray-700">
            지역
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer"
          >
            <option value="" className="py-3">전체</option>
            {REGIONS.map((r) => (
              <option key={r} value={r} className="py-3">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <DateRangeSelector value={dateRange} onChange={setDateRange} label="체크인 - 체크아웃" />

        {/* People */}
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
};

export default SearchBar;
