import { useState } from 'react';
import Button from './ui/Button';

interface SearchBarProps {
  onSearch: (filters: any) => void;
}

const REGIONS = ['서울', '부산', '제주', '경기', '강원', '충청', '전라', '경상'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [region, setRegion] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(1);

  const handleSearch = () => {
    onSearch({
      region: region || undefined,
      checkIn: checkIn || undefined,
      checkOut: checkOut || undefined,
      adults,
      children,
      infants,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Region */}
        <div className="flex flex-col gap-2">
          <label htmlFor="region" className="text-sm font-semibold text-gray-700">
            지역
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          >
            <option value="">전체</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Check-in */}
        <div className="flex flex-col gap-2">
          <label htmlFor="checkIn" className="text-sm font-semibold text-gray-700">
            체크인
          </label>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
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
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
          />
        </div>

        {/* People */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">인원</label>
          <div className="flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-lg transition-all duration-200 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10">
            <div className="flex-1 flex flex-col">
              <label htmlFor="adults" className="text-xs text-gray-500 mb-1">성인</label>
              <input
                id="adults"
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                className="w-full text-base font-medium border-0 focus:outline-none focus:ring-0 p-0"
              />
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="children" className="text-xs text-gray-500 mb-1">어린이</label>
              <input
                id="children"
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-full text-base font-medium border-0 focus:outline-none focus:ring-0 p-0"
              />
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="infants" className="text-xs text-gray-500 mb-1">영유아</label>
              <input
                id="infants"
                type="number"
                min="0"
                value={infants}
                onChange={(e) => setInfants(parseInt(e.target.value))}
                className="w-full text-base font-medium border-0 focus:outline-none focus:ring-0 p-0"
              />
            </div>
          </div>
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
};

export default SearchBar;
