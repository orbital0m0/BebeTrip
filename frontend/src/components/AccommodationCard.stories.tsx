import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import AccommodationCard from './AccommodationCard';
import type { Accommodation } from '../types';

const meta = {
  title: 'Components/AccommodationCard',
  component: AccommodationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[350px]">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof AccommodationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseAccommodation: Accommodation = {
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
};

export const Default: Story = {
  args: {
    accommodation: {
      ...baseAccommodation,
      averageRating: 4.9,
      reviewCount: 128,
      minPrice: 89000,
      isSafeCertified: true,
      recommendedAge: '0-24개월 추천',
      features: ['🛏️ 아기침대', '🍼 수유실', '🛁 아기욕조', '🔒 안전장치'],
    },
  },
};

export const BestAccommodation: Story = {
  args: {
    accommodation: {
      ...baseAccommodation,
      name: '제주 아일랜드 키즈 리조트',
      region: '제주 서귀포시',
      thumbnailImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop',
      averageRating: 5.0,
      reviewCount: 256,
      minPrice: 125000,
      isSafeCertified: true,
      isBest: true,
      features: ['🎠 키즈풀', '🎨 놀이방', '🍽️ 키즈메뉴', '🚗 주차편리'],
    },
  },
};

export const SimpleAccommodation: Story = {
  args: {
    accommodation: {
      ...baseAccommodation,
      name: '강릉 오션뷰 펜션',
      region: '강원 강릉시',
      thumbnailImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=450&fit=crop',
      averageRating: 4.7,
      reviewCount: 84,
      minPrice: 75000,
      recommendedAge: '13-36개월 추천',
      features: ['🌊 오션뷰', '🧼 살균소독', '🛗 엘리베이터', '🍳 취사가능'],
    },
  },
};

export const NoRating: Story = {
  args: {
    accommodation: {
      ...baseAccommodation,
      minPrice: 95000,
      isSafeCertified: true,
      recommendedAge: '0-12개월 추천',
      features: ['🛏️ 아기침대', '🍼 수유실'],
    },
  },
};

export const NoPrice: Story = {
  args: {
    accommodation: {
      ...baseAccommodation,
      averageRating: 4.5,
      reviewCount: 42,
      isSafeCertified: true,
      features: ['🛏️ 아기침대', '🍼 수유실', '🛁 아기욕조'],
    },
  },
};

export const GridView: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl">
      <AccommodationCard
        accommodation={{
          ...baseAccommodation,
          averageRating: 4.9,
          minPrice: 89000,
          isSafeCertified: true,
          recommendedAge: '0-24개월 추천',
          features: ['🛏️ 아기침대', '🍼 수유실', '🛁 아기욕조', '🔒 안전장치'],
        }}
      />
      <AccommodationCard
        accommodation={{
          ...baseAccommodation,
          id: 2,
          name: '제주 아일랜드 키즈 리조트',
          region: '제주 서귀포시',
          thumbnailImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=450&fit=crop',
          averageRating: 5.0,
          minPrice: 125000,
          isSafeCertified: true,
          isBest: true,
          features: ['🎠 키즈풀', '🎨 놀이방', '🍽️ 키즈메뉴', '🚗 주차편리'],
        }}
      />
      <AccommodationCard
        accommodation={{
          ...baseAccommodation,
          id: 3,
          name: '강릉 오션뷰 펜션',
          region: '강원 강릉시',
          thumbnailImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=450&fit=crop',
          averageRating: 4.7,
          minPrice: 75000,
          recommendedAge: '13-36개월 추천',
          features: ['🌊 오션뷰', '🧼 살균소독', '🛗 엘리베이터', '🍳 취사가능'],
        }}
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
