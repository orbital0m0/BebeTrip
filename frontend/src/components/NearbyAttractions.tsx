import { useState, useEffect } from 'react';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import { publicDataService, type TourismItem } from '../services/publicDataService';
import { kakaoLocalService, type MedicalPlace } from '../services/kakaoLocalService';
import Badge from './ui/Badge';

interface NearbyAttractionsProps {
  mapX: number;
  mapY: number;
  radius?: number;
}

type TabType = 'attractions' | 'culturalFacilities' | 'restaurants' | 'shopping' | 'events' | 'hospitals' | 'pharmacies';

const NearbyAttractions = ({ mapX, mapY, radius = 3000 }: NearbyAttractionsProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('attractions');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    attractions: TourismItem[];
    culturalFacilities: TourismItem[];
    restaurants: TourismItem[];
    shopping: TourismItem[];
    events: TourismItem[];
    hospitals: MedicalPlace[];
    pharmacies: MedicalPlace[];
  }>({
    attractions: [],
    culturalFacilities: [],
    restaurants: [],
    shopping: [],
    events: [],
    hospitals: [],
    pharmacies: [],
  });

  useEffect(() => {
    loadNearbyAttractions();
  }, [mapX, mapY, radius]);

  const loadNearbyAttractions = async () => {
    setLoading(true);
    try {
      const [tourismResult, medicalResult] = await Promise.all([
        publicDataService.getNearbyAll(mapX, mapY, radius),
        kakaoLocalService.getNearbyMedical(mapX, mapY, radius),
      ]);

      if (tourismResult.success && medicalResult.success) {
        setData({
          ...tourismResult.data,
          hospitals: medicalResult.data.hospitals,
          pharmacies: medicalResult.data.pharmacies,
        });
      }
    } catch (error) {
      console.error('Failed to load nearby attractions:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'attractions' as TabType, label: '🏞️ 관광지', icon: '🏞️' },
    { key: 'culturalFacilities' as TabType, label: '🎭 문화시설', icon: '🎭' },
    { key: 'restaurants' as TabType, label: '🍽️ 음식점', icon: '🍽️' },
    { key: 'shopping' as TabType, label: '🛍️ 쇼핑', icon: '🛍️' },
    { key: 'events' as TabType, label: '🎪 축제/행사', icon: '🎪' },
    { key: 'hospitals' as TabType, label: '🏥 병원', icon: '🏥' },
    { key: 'pharmacies' as TabType, label: '💊 약국', icon: '💊' },
  ];

  const currentItems = data[activeTab] || [];

  // 타입 가드: TourismItem인지 MedicalPlace인지 확인
  const isTourismItem = (item: TourismItem | MedicalPlace): item is TourismItem => {
    return 'contentid' in item;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ 주변 관광지</h2>
        <div className="flex items-center justify-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ 주변 관광지</h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 border-b-2 border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.key
                ? 'text-primary-600 border-primary-500'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {currentItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg text-gray-500">
            반경 {(radius / 1000).toFixed(1)}km 내 {tabs.find(t => t.key === activeTab)?.label}이 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((item, index) => {
            const tourism = isTourismItem(item);
            const itemKey = tourism ? item.contentid : item.id;
            const title = tourism ? item.title : item.place_name;
            const address = tourism ? `${item.addr1} ${item.addr2 || ''}` : item.address_name;
            const phone = tourism ? item.tel : item.phone;
            const distance = tourism ? item.dist : item.distance;
            const image = tourism ? item.firstimage : undefined;

            return (
              <div
                key={`${itemKey}-${index}`}
                className="border-2 border-gray-100 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                {image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {title}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
                  <FiMapPin className="text-primary-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="line-clamp-2">{address}</span>
                </div>

                {/* Phone */}
                {phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FiPhone className="text-primary-500 flex-shrink-0" size={16} />
                    <span>{phone}</span>
                  </div>
                )}

                {/* Distance */}
                {distance && (
                  <div className="mt-3">
                    <Badge variant="safe">
                      📍 {(parseFloat(distance) / 1000).toFixed(1)}km
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
        <p className="text-sm text-gray-700">
          {activeTab === 'hospitals' || activeTab === 'pharmacies' ? (
            <>ℹ️ 카카오 로컬 API를 활용하여 주변 {(radius / 1000).toFixed(1)}km 이내의 정보를 제공합니다.</>
          ) : (
            <>ℹ️ 공공데이터포털의 한국관광공사 API를 활용하여 주변 {(radius / 1000).toFixed(1)}km 이내의 정보를 제공합니다.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default NearbyAttractions;
