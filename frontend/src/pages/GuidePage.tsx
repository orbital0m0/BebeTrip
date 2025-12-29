import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface AgeGuide {
  ageRange: string;
  ageMonths: string;
  icon: string;
  tips: string[];
  recommended: string[];
}

interface RegionGuide {
  name: string;
  region: string;
  image: string;
  description: string;
  bestSeason: string;
  features: string[];
}

const ageGuides: AgeGuide[] = [
  {
    ageRange: '0-6개월',
    ageMonths: '영아기',
    icon: '👶',
    tips: [
      '수유 및 기저귀 교체가 용이한 숙소 선택',
      '조용하고 편안한 환경이 필수',
      '이동 거리가 짧은 근교 여행 추천',
      '24시간 운영되는 의료시설 확인',
    ],
    recommended: ['도심형 호텔', '리조트', '펜션'],
  },
  {
    ageRange: '7-12개월',
    ageMonths: '걸음마 전',
    icon: '🍼',
    tips: [
      '이유식 준비가 가능한 주방시설 확인',
      '아기 침대 및 안전 시설 필수',
      '실내 놀이공간이 있는 숙소 추천',
      '기저귀 교체대 및 욕조 시설 확인',
    ],
    recommended: ['키즈 리조트', '펜션', '콘도'],
  },
  {
    ageRange: '13-24개월',
    ageMonths: '걸음마기',
    icon: '👣',
    tips: [
      '넓은 공간과 안전 장치가 완비된 숙소',
      '실내외 놀이터가 있는 곳 추천',
      '층간 소음 걱정 없는 독채 펜션 고려',
      '아이가 먹을 수 있는 음식 제공 여부 확인',
    ],
    recommended: ['독채 펜션', '키즈 리조트', '풀빌라'],
  },
  {
    ageRange: '25-36개월',
    ageMonths: '유아기',
    icon: '🧒',
    tips: [
      '다양한 액티비티가 가능한 숙소',
      '키즈카페나 놀이방 시설 활용',
      '자연 체험이 가능한 지역 추천',
      '아이 전용 메뉴가 있는 식당 확인',
    ],
    recommended: ['테마파크 리조트', '글램핑', '농촌체험 펜션'],
  },
];

const regionGuides: RegionGuide[] = [
  {
    name: '제주도',
    region: '제주',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    description: '아이와 함께 즐기기 좋은 테마파크와 해변이 가득한 가족 여행 1번지',
    bestSeason: '봄, 가을',
    features: ['🏖️ 아이 친화 해변', '🎡 테마파크', '🌴 자연체험', '✈️ 직항편 다수'],
  },
  {
    name: '부산',
    region: '부산',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=800&h=600&fit=crop',
    description: '해운대 해수욕장과 아쿠아리움 등 아이들이 좋아하는 명소가 많은 도시',
    bestSeason: '여름, 가을',
    features: ['🌊 해수욕장', '🐠 아쿠아리움', '🚂 시티투어', '🏨 편의시설'],
  },
  {
    name: '강원도',
    region: '강원',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: '맑은 공기와 아름다운 자연, 사계절 다양한 액티비티 체험 가능',
    bestSeason: '여름, 겨울',
    features: ['⛰️ 산악체험', '🌊 동해바다', '⛷️ 스키리조트', '🌲 숲속 펜션'],
  },
  {
    name: '경주',
    region: '경북',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop',
    description: '역사 체험과 함께 테마파크까지, 교육과 재미를 동시에',
    bestSeason: '봄, 가을',
    features: ['🏛️ 역사체험', '🎢 테마파크', '🌸 벚꽃명소', '♨️ 온천리조트'],
  },
];

const checklist = [
  {
    category: '필수 의약품',
    items: ['해열제', '소화제', '밴드', '모기패치', '체온계', '처방약'],
  },
  {
    category: '위생용품',
    items: ['기저귀', '물티슈', '손소독제', '세탁세제', '비닐봉투', '휴지'],
  },
  {
    category: '식사용품',
    items: ['젖병', '분유/이유식', '턱받이', '숟가락/포크', '빨대컵', '간식'],
  },
  {
    category: '의류/침구',
    items: ['여벌옷 (2-3벌)', '수면조끼', '모자', '양말', '슬리핑백', '이불'],
  },
  {
    category: '놀이/안전',
    items: ['좋아하는 장난감', '그림책', '유모차', '아기띠', '안전문', '콘센트 캡'],
  },
];

const travelTips = [
  {
    icon: '🕐',
    title: '여유로운 일정',
    description: '아이의 낮잠 시간과 식사 시간을 고려해 느긋한 일정을 짜세요.',
  },
  {
    icon: '🏥',
    title: '응급상황 대비',
    description: '여행지 근처 병원 위치를 미리 확인하고 비상연락처를 저장하세요.',
  },
  {
    icon: '🍼',
    title: '수유/이유식',
    description: '수유실 위치를 미리 파악하고, 이유식은 넉넉히 준비하세요.',
  },
  {
    icon: '🎒',
    title: '가벼운 짐',
    description: '필수품 위주로 준비하고, 현지에서 구매 가능한 것은 생략하세요.',
  },
  {
    icon: '📸',
    title: '추억 만들기',
    description: '사진과 영상으로 소중한 순간을 기록하세요.',
  },
  {
    icon: '🛡️',
    title: '안전 확인',
    description: '숙소의 안전시설(안전문, 창문잠금 등)을 반드시 확인하세요.',
  },
];

const GuidePage = () => {
  const [selectedAge, setSelectedAge] = useState<number>(0);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">✈️ 여행 가이드</h1>
          <p className="text-lg md:text-xl text-primary-100">
            아이와 함께하는 안전하고 즐거운 여행을 위한 완벽 가이드
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Age Guide Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">연령대별 여행 가이드</h2>
            <p className="text-gray-600">아이의 발달 단계에 맞는 여행 정보를 확인하세요</p>
          </div>

          {/* Age Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {ageGuides.map((guide, index) => (
              <button
                key={index}
                onClick={() => setSelectedAge(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedAge === index
                    ? 'bg-primary-500 text-white shadow-lg scale-105'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-500'
                }`}
              >
                <span className="text-xl mr-2">{guide.icon}</span>
                {guide.ageRange}
              </button>
            ))}
          </div>

          {/* Age Guide Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-5xl">{ageGuides[selectedAge].icon}</span>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {ageGuides[selectedAge].ageRange}
                </h3>
                <p className="text-gray-500">{ageGuides[selectedAge].ageMonths}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCheck className="text-primary-500" />
                  여행 팁
                </h4>
                <ul className="space-y-3">
                  {ageGuides[selectedAge].tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary-500 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiHeart className="text-primary-500" />
                  추천 숙소 유형
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ageGuides[selectedAge].recommended.map((rec, index) => (
                    <Badge key={index} variant="safe">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Region Guide Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">지역별 여행지 추천</h2>
            <p className="text-gray-600">아이와 함께 가기 좋은 인기 여행지를 소개합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {regionGuides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="safe">{guide.bestSeason}</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FiMapPin className="text-primary-500" />
                    <h3 className="text-2xl font-bold text-gray-900">{guide.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{guide.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link to={`/accommodations?region=${guide.region}`}>
                    <Button variant="secondary" size="md" className="w-full">
                      {guide.name} 숙소 보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">준비물 체크리스트</h2>
            <p className="text-gray-600">여행 전 꼭 챙겨야 할 필수 아이템을 확인하세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklist.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-primary-100">
                  {category.category}
                </h3>
                <ul className="space-y-2.5">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <FiCheck className="text-primary-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Tips Section */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">알아두면 좋은 여행 팁</h2>
            <p className="text-gray-600">아이와 함께하는 여행을 더 편안하게 만드는 노하우</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelTips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-primary-100"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">완벽한 숙소를 찾아보세요</h2>
          <p className="text-lg mb-6 text-primary-100">
            아이와 함께하기 좋은 안전하고 편안한 숙소가 기다리고 있어요
          </p>
          <Link to="/accommodations">
            <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-50">
              숙소 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default GuidePage;
