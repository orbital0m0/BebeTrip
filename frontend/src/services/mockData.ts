// Mock 데이터 - 백엔드 없이 프론트엔드 테스트용

export const mockAccommodations = [
  {
    id: 1,
    name: '제주 베베 리조트',
    description: '아기와 함께하는 제주 여행의 최적 선택! 모든 객실에 아기 침대, 젖병 소독기, 기저귀 교환대가 구비되어 있습니다.',
    address: '제주특별자치도 서귀포시 안덕면 화순해안로 123',
    region: '제주',
    thumbnailImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    averageRating: 4.8,
    reviewCount: 127,
    minPrice: 180000,
    isSafeCertified: true,
    recommendedAge: '6-24개월',
    isBest: true,
  },
  {
    id: 2,
    name: '강릉 아기사랑 펜션',
    description: '바다가 보이는 아늑한 펜션. 아기 목욕용품과 유아용 식기가 완비되어 있습니다.',
    address: '강원도 강릉시 해안로 456',
    region: '강원',
    thumbnailImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    averageRating: 4.6,
    reviewCount: 89,
    minPrice: 150000,
    isSafeCertified: true,
    recommendedAge: '0-12개월',
    isBest: false,
  },
  {
    id: 3,
    name: '부산 해운대 키즈 호텔',
    description: '해운대 해변 인근의 가족 친화적 호텔. 키즈 풀과 놀이방이 있습니다.',
    address: '부산광역시 해운대구 해운대해변로 789',
    region: '부산',
    thumbnailImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    averageRating: 4.7,
    reviewCount: 203,
    minPrice: 220000,
    isSafeCertified: true,
    recommendedAge: '12-36개월',
    isBest: true,
  },
  {
    id: 4,
    name: '남이섬 가족 리조트',
    description: '자연 속에서 아이와 함께 힐링할 수 있는 리조트입니다.',
    address: '강원도 춘천시 남산면 남이섬길 1',
    region: '강원',
    thumbnailImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    averageRating: 4.5,
    reviewCount: 156,
    minPrice: 170000,
    isSafeCertified: false,
    recommendedAge: '24-48개월',
    isBest: false,
  },
];

export const mockAgeMonths = [
  { id: 1, monthFrom: 0, monthTo: 6, label: '0-6개월', description: '신생아' },
  { id: 2, monthFrom: 6, monthTo: 12, label: '6-12개월', description: '영아기' },
  { id: 3, monthFrom: 12, monthTo: 24, label: '12-24개월', description: '걸음마기' },
  { id: 4, monthFrom: 24, monthTo: 36, label: '24-36개월', description: '유아기 초기' },
  { id: 5, monthFrom: 36, monthTo: 48, label: '36-48개월', description: '유아기' },
];

export const mockAmenities = [
  { id: 1, name: '아기 침대', categoryName: '침구', icon: '🛏️' },
  { id: 2, name: '젖병 소독기', categoryName: '수유용품', icon: '🍼' },
  { id: 3, name: '기저귀 교환대', categoryName: '위생용품', icon: '🧷' },
  { id: 4, name: '유아용 욕조', categoryName: '목욕용품', icon: '🛁' },
  { id: 5, name: '아기 의자', categoryName: '가구', icon: '🪑' },
  { id: 6, name: '놀이매트', categoryName: '놀이용품', icon: '🧸' },
  { id: 7, name: '범퍼침대', categoryName: '침구', icon: '🛏️' },
  { id: 8, name: '수유 쿠션', categoryName: '수유용품', icon: '💺' },
];

export const mockReviews = [
  {
    id: 1,
    accommodationId: 1,
    accommodationName: '제주 베베 리조트',
    roomType: '디럭스 트윈',
    childAgeMonths: 8,
    totalPeople: 3,
    rating: 5.0,
    content: '아기와 첫 여행이었는데 정말 만족스러웠어요! 필요한 모든 용품이 다 갖춰져 있어서 짐을 많이 줄일 수 있었습니다.',
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z',
    pros: [
      { id: 1, name: '청결도 우수' },
      { id: 2, name: '아기용품 완비' },
    ],
    cons: [],
    images: [],
  },
  {
    id: 2,
    accommodationId: 1,
    accommodationName: '제주 베베 리조트',
    roomType: '스탠다드',
    childAgeMonths: 18,
    totalPeople: 4,
    rating: 4.5,
    content: '전반적으로 좋았지만 주차장이 조금 좁았어요.',
    createdAt: '2024-12-18T14:30:00Z',
    updatedAt: '2024-12-18T14:30:00Z',
    pros: [
      { id: 3, name: '위치 좋음' },
    ],
    cons: [
      { id: 1, name: '주차 불편' },
    ],
    images: [],
  },
];

export const mockUser = {
  id: 1,
  email: 'test@example.com',
  name: '테스트 사용자',
  phone: '010-1234-5678',
  profileImage: null,
  provider: 'kakao',
  createdAt: '2024-01-01T00:00:00Z',
};

export const mockWishlist = [
  {
    id: 1,
    accommodationId: 1,
    createdAt: '2024-12-20T10:00:00Z',
    accommodation: mockAccommodations[0],
  },
  {
    id: 2,
    accommodationId: 3,
    createdAt: '2024-12-19T15:00:00Z',
    accommodation: mockAccommodations[2],
  },
];

export const mockAccommodationDetail = {
  ...mockAccommodations[0],
  images: [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      isMain: true,
      sortOrder: 0,
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200',
      isMain: false,
      sortOrder: 1,
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200',
      isMain: false,
      sortOrder: 2,
    },
  ],
  roomTypes: [
    {
      id: 1,
      name: '스탠다드 더블',
      description: '아늑한 더블 침대가 있는 기본 객실',
      maxOccupancy: 2,
      pricePerNight: 180000,
    },
    {
      id: 2,
      name: '디럭스 트윈',
      description: '여유로운 공간의 트윈 침대 객실',
      maxOccupancy: 3,
      pricePerNight: 220000,
    },
    {
      id: 3,
      name: '패밀리 스위트',
      description: '가족 단위 여행객을 위한 넓은 스위트',
      maxOccupancy: 4,
      pricePerNight: 300000,
    },
  ],
  amenities: {
    '침구': [
      { id: 1, name: '아기 침대', icon: '🛏️', isAvailable: true },
      { id: 7, name: '범퍼침대', icon: '🛏️', isAvailable: true },
    ],
    '수유용품': [
      { id: 2, name: '젖병 소독기', icon: '🍼', isAvailable: true },
      { id: 8, name: '수유 쿠션', icon: '💺', isAvailable: true },
    ],
    '위생용품': [
      { id: 3, name: '기저귀 교환대', icon: '🧷', isAvailable: true },
    ],
    '목욕용품': [
      { id: 4, name: '유아용 욕조', icon: '🛁', isAvailable: true },
    ],
    '가구': [
      { id: 5, name: '아기 의자', icon: '🪑', isAvailable: true },
    ],
    '놀이용품': [
      { id: 6, name: '놀이매트', icon: '🧸', isAvailable: true },
    ],
  },
  reviews: mockReviews,
};
