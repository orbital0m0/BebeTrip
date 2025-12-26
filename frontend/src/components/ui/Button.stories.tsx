import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'icon'],
      description: 'Button의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '검색하기',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '로그인',
  },
};

export const Icon: Story = {
  args: {
    variant: 'icon',
    children: '♥',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: '큰 버튼',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: '비활성화',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        🔍 검색하기
      </>
    ),
  },
};
