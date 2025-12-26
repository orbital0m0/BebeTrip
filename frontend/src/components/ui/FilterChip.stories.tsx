import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FilterChip from './FilterChip';

const meta = {
  title: 'UI/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: '필터 활성화 상태',
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '0-12개월',
    active: false,
  },
};

export const Active: Story = {
  args: {
    children: '0-12개월',
    active: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['아기침대']);

    const toggleFilter = (filter: string) => {
      setSelected((prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    };

    const filters = ['아기침대', '수유 의자', '아기 욕조', '젖병 소독기', '전자레인지', '키즈풀', '놀이방'];

    return (
      <div className="flex flex-wrap gap-2 max-w-md">
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            active={selected.includes(filter)}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </FilterChip>
        ))}
      </div>
    );
  },
};

export const AgeFilters: Story = {
  render: () => {
    const [selectedAge, setSelectedAge] = useState('0-12개월');

    const ages = ['0-12개월', '13-24개월', '25-36개월', '37개월 이상'];

    return (
      <div className="flex flex-wrap gap-2">
        {ages.map((age) => (
          <FilterChip
            key={age}
            active={selectedAge === age}
            onClick={() => setSelectedAge(age)}
          >
            {age}
          </FilterChip>
        ))}
      </div>
    );
  },
};
