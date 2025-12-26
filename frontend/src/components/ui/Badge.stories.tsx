import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['safe', 'age', 'recommended', 'positive', 'negative'],
      description: 'Badge의 스타일 변형',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Safe: Story = {
  args: {
    variant: 'safe',
    children: '✓ 안전인증',
  },
};

export const Age: Story = {
  args: {
    variant: 'age',
    children: '0-24개월 추천',
  },
};

export const Recommended: Story = {
  args: {
    variant: 'recommended',
    children: '🏆 베스트',
  },
};

export const Positive: Story = {
  args: {
    variant: 'positive',
    children: '✓ 안전장치 완비',
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    children: '• 주차장 거리',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="safe">✓ 안전인증</Badge>
      <Badge variant="age">0-24개월 추천</Badge>
      <Badge variant="recommended">🏆 베스트</Badge>
      <Badge variant="positive">✓ 조용한 환경</Badge>
      <Badge variant="negative">• 주차장 거리</Badge>
    </div>
  ),
};
