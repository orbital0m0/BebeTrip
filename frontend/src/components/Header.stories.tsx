import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  render: () => (
    <div>
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">페이지 콘텐츠</h1>
        <p className="text-gray-600 mb-4">
          Header는 sticky 속성으로 스크롤 시 상단에 고정됩니다.
        </p>
        <div className="h-screen bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">스크롤해보세요</p>
        </div>
      </div>
    </div>
  ),
};
