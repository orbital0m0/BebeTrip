import { useState, useRef, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';

interface DateRange {
  checkIn: string;
  checkOut: string;
}

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  label?: string;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ value, onChange, label = '날짜' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedInput, setFocusedInput] = useState<'checkIn' | 'checkOut'>('checkIn');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDisplayDate = () => {
    if (!value.checkIn && !value.checkOut) {
      return '날짜 선택';
    }
    if (value.checkIn && value.checkOut) {
      const checkInDate = new Date(value.checkIn);
      const checkOutDate = new Date(value.checkOut);
      return `${checkInDate.getMonth() + 1}/${checkInDate.getDate()} - ${checkOutDate.getMonth() + 1}/${checkOutDate.getDate()}`;
    }
    if (value.checkIn) {
      const checkInDate = new Date(value.checkIn);
      return `${checkInDate.getMonth() + 1}/${checkInDate.getDate()} - 체크아웃 선택`;
    }
    return '날짜 선택';
  };

  const handleCheckInChange = (newCheckIn: string) => {
    onChange({ ...value, checkIn: newCheckIn });
    if (!value.checkOut) {
      setFocusedInput('checkOut');
    }
  };

  const handleCheckOutChange = (newCheckOut: string) => {
    onChange({ ...value, checkOut: newCheckOut });
  };

  return (
    <div className="flex flex-col gap-2 relative" ref={containerRef}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>

      {/* Input Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 bg-white cursor-pointer text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-400" size={18} />
          <span className={value.checkIn || value.checkOut ? 'text-gray-900' : 'text-gray-500'}>
            {formatDisplayDate()}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 p-4 min-w-[320px]">
          <div className="space-y-4">
            {/* Check-in */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">체크인</label>
              <input
                type="date"
                value={value.checkIn}
                onChange={(e) => handleCheckInChange(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 cursor-pointer"
                style={{ colorScheme: 'light' }}
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">체크아웃</label>
              <input
                type="date"
                value={value.checkOut}
                onChange={(e) => handleCheckOutChange(e.target.value)}
                min={value.checkIn}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg text-base transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 cursor-pointer"
                style={{ colorScheme: 'light' }}
              />
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
          >
            완료
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
