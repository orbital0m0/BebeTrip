import type { Meta, StoryObj } from '@storybook/react';
import ReviewCard from './ReviewCard';

const meta = {
  title: 'UI/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: {
      name: '김00님',
      initial: '김',
    },
    rating: 5.0,
    ratings: {
      safety: 5.0,
      cleanliness: 5.0,
      convenience: 4.5,
      facilities: 5.0,
    },
    childAge: '14개월 아기 동반',
    stayDate: '2024.12.20',
    content:
      '14개월 아기와 처음 여행이었는데 정말 만족스러웠어요! 모든 콘센트에 안전커버가 설치되어 있고, 침대 가드도 튼튼했습니다. 아기 욕조와 젖병 소독기까지 구비되어 있어서 짐을 많이 줄일 수 있었어요. 특히 방음이 잘 되어서 아기가 밤에 울어도 부담 없었습니다. 다만 주차장에서 객실까지 조금 걸어야 하는 점은 아쉬웠어요. 그래도 전반적으로 영유아 동반 가족에게 강력 추천합니다! 👶❤️',
    positiveTags: ['✓ 안전장치 완비', '✓ 조용한 환경', '✓ 넓은 객실', '✓ 친절한 직원'],
    negativeTags: ['• 주차장 거리'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&h=200&fit=crop',
    ],
  },
};

export const WithoutImages: Story = {
  args: {
    author: {
      name: '박00님',
      initial: '박',
    },
    rating: 4.5,
    ratings: {
      safety: 4.5,
      cleanliness: 5.0,
      convenience: 4.0,
      facilities: 4.5,
    },
    childAge: '8개월 아기 동반',
    stayDate: '2024.12.15',
    content: '아기와 함께 편안하게 지낼 수 있었어요. 시설이 깔끔하고 직원분들도 친절했습니다. 다만 엘리베이터가 없어서 짐 옮기는 게 조금 힘들었어요.',
    positiveTags: ['✓ 깔끔한 시설', '✓ 친절한 서비스'],
    negativeTags: ['• 엘리베이터 없음'],
  },
};

export const SimpleReview: Story = {
  args: {
    author: {
      name: '이00님',
      initial: '이',
    },
    rating: 4.0,
    childAge: '24개월 아기 동반',
    stayDate: '2024.12.10',
    content: '전반적으로 만족스러운 숙박이었습니다. 아이가 좋아했어요!',
  },
};

export const MultipleReviews: Story = {
  render: () => (
    <div className="space-y-4 max-w-3xl">
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
        content="14개월 아기와 처음 여행이었는데 정말 만족스러웠어요! 모든 콘센트에 안전커버가 설치되어 있고, 침대 가드도 튼튼했습니다."
        positiveTags={['✓ 안전장치 완비', '✓ 조용한 환경', '✓ 넓은 객실']}
        negativeTags={['• 주차장 거리']}
        images={[
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
        ]}
      />
      <ReviewCard
        author={{ name: '박00님', initial: '박' }}
        rating={4.5}
        ratings={{
          safety: 4.5,
          cleanliness: 5.0,
          convenience: 4.0,
          facilities: 4.5,
        }}
        childAge="8개월 아기 동반"
        stayDate="2024.12.15"
        content="아기와 함께 편안하게 지낼 수 있었어요. 시설이 깔끔하고 직원분들도 친절했습니다."
        positiveTags={['✓ 깔끔한 시설', '✓ 친절한 서비스']}
        negativeTags={['• 엘리베이터 없음']}
      />
      <ReviewCard
        author={{ name: '이00님', initial: '이' }}
        rating={4.0}
        childAge="24개월 아기 동반"
        stayDate="2024.12.10"
        content="전반적으로 만족스러운 숙박이었습니다. 아이가 좋아했어요!"
      />
    </div>
  ),
};
