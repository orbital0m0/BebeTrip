import type { Meta, StoryObj } from '@storybook/react';
import SearchBox from './SearchBox';

const meta = {
  title: 'UI/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: (filters) => {
      console.log('Search filters:', filters);
      alert(`검색 조건:\n${JSON.stringify(filters, null, 2)}`);
    },
  },
};

export const InHeroSection: Story = {
  render: () => (
    <div className="bg-gradient-to-br from-primary-50 to-white p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            아이와 함께
          </span>
          <br />
          안심하고 떠나는 여행
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          영유아 동반 가족을 위한 특별한 숙소 정보를 한곳에서
        </p>
        <SearchBox
          onSearch={(filters) => {
            console.log('Search filters:', filters);
          }}
        />
      </div>
    </div>
  ),
};
