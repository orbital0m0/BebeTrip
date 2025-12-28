import { useState, useRef, useEffect } from 'react';
import { FiMinus, FiPlus, FiUsers } from 'react-icons/fi';

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
}

interface GuestSelectorProps {
  value: GuestCounts;
  onChange: (value: GuestCounts) => void;
  label?: string;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ value, onChange, label = '인원' }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleIncrement = (type: keyof GuestCounts) => {
    onChange({
      ...value,
      [type]: value[type] + 1,
    });
  };

  const handleDecrement = (type: keyof GuestCounts) => {
    const minValue = type === 'adults' ? 1 : 0;
    if (value[type] > minValue) {
      onChange({
        ...value,
        [type]: value[type] - 1,
      });
    }
  };

  const totalGuests = value.adults + value.children + value.infants;

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
          <FiUsers className="text-gray-400" size={18} />
          <span className="text-gray-900">
            {totalGuests}명 (성인 {value.adults}, 어린이 {value.children}, 영유아 {value.infants})
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 p-4">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">성인</div>
                <div className="text-sm text-gray-500">만 13세 이상</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDecrement('adults')}
                  disabled={value.adults <= 1}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{value.adults}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement('adults')}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">어린이</div>
                <div className="text-sm text-gray-500">만 2~12세</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDecrement('children')}
                  disabled={value.children <= 0}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{value.children}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement('children')}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">영유아</div>
                <div className="text-sm text-gray-500">만 2세 미만</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDecrement('infants')}
                  disabled={value.infants <= 0}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{value.infants}</span>
                <button
                  type="button"
                  onClick={() => handleIncrement('infants')}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary-500 transition-colors"
                >
                  <FiPlus size={16} />
                </button>
              </div>
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

export default GuestSelector;
