import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SearchBox from '../components/ui/SearchBox';
import AccommodationCard from '../components/AccommodationCard';
import ReviewCard from '../components/ui/ReviewCard';
import type { Accommodation } from '../types';

// Mock data for demo
const recommendedAccommodations: (Accommodation & {
  averageRating?: number;
  reviewCount?: number;
  minPrice?: number;
  isSafeCertified?: boolean;
  recommendedAge?: string;
  isBest?: boolean;
  features?: string[];
})[] = [
  {
    id: 1,
    name: '해운대 베이비 호텔',
    region: '부산 해운대구',
    address: '부산광역시 해운대구',
    latitude: 35.1586,
    longitude: 129.1603,
    contactNumber: '051-123-4567',
    description: '아이와 함께하는 가족 여행에 최적화된 호텔입니다.',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    thumbnailImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=450&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.9,
    reviewCount: 128,
    minPrice: 89000,
    isSafeCertified: true,
    recommendedAge: '0-24개월 추천',
    features: ['🛏️ 아기침대', '🍼 수유실', '🛁 아기욕조', '🔒 안전장치'],
  },
  {
    id: 2,
    name: '제주 아일랜드 키즈 리조트',
    region: '제주 서귀포시',
    address: '제주특별자치도 서귀포시',
    latitude: 33.2541,
    longitude: 126.5601,
    contactNumber: '064-123-4567',
    description: '아이들을 위한 완벽한 휴양지',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    thumbnailImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 5.0,
    reviewCount: 256,
    minPrice: 125000,
    isSafeCertified: true,
    isBest: true,
    features: ['🎠 키즈풀', '🎨 놀이방', '🍽️ 키즈메뉴', '🚗 주차편리'],
  },
  {
    id: 3,
    name: '강릉 오션뷰 펜션',
    region: '강원 강릉시',
    address: '강원도 강릉시',
    latitude: 37.7519,
    longitude: 128.8761,
    contactNumber: '033-123-4567',
    description: '바다가 보이는 아늑한 펜션',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    thumbnailImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=450&fit=crop',
    createdAt: new Date(),
    updatedAt: new Date(),
    averageRating: 4.7,
    reviewCount: 84,
    minPrice: 75000,
    recommendedAge: '13-36개월 추천',
    features: ['🌊 오션뷰', '🧼 살균소독', '🛗 엘리베이터', '🍳 취사가능'],
  },
];

const HomePage = () => {
  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Navigate to accommodations page with filters
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                아이와 함께
              </span>
              <br />
              안심하고 떠나는 여행
            </h1>
            <p className="text-xl text-gray-600">
              영유아 동반 가족을 위한 특별한 숙소 정보를 한곳에서
            </p>
          </div>

          <div className="flex justify-center">
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">이번 주 추천 숙소</h2>
            <Link
              to="/accommodations"
              className="text-primary-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              전체보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedAccommodations.map((accommodation) => (
              <AccommodationCard key={accommodation.id} accommodation={accommodation} />
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">실제 부모님들의 후기</h2>
            <Link
              to="/reviews"
              className="text-primary-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              리뷰 더보기 →
            </Link>
          </div>

          <ReviewCard
            author={{ name: '김00님', initial: '김' }}
            rating={5.0}
            ratings={{
              safety: 5.0,
              cleanliness: 5.0,
              convenience: 4.5,
              facilities: 5.0,
            }}
            childAge="14개월 아기 동반"
            stayDate="2024.12.20"
            content="14개월 아기와 처음 여행이었는데 정말 만족스러웠어요! 모든 콘센트에 안전커버가 설치되어 있고, 침대 가드도 튼튼했습니다. 아기 욕조와 젖병 소독기까지 구비되어 있어서 짐을 많이 줄일 수 있었어요. 특히 방음이 잘 되어서 아기가 밤에 울어도 부담 없었습니다. 다만 주차장에서 객실까지 조금 걸어야 하는 점은 아쉬웠어요. 그래도 전반적으로 영유아 동반 가족에게 강력 추천합니다! 👶❤️"
            positiveTags={['✓ 안전장치 완비', '✓ 조용한 환경', '✓ 넓은 객실', '✓ 친절한 직원']}
            negativeTags={['• 주차장 거리']}
            images={[
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
              'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&h=200&fit=crop',
            ]}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
