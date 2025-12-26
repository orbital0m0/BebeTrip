import type { ButtonHTMLAttributes } from 'react';

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export default function FilterChip({
  active = false,
  className = '',
  children,
  ...props
}: FilterChipProps) {
  const baseStyles = 'px-4 py-2 border-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200';

  const activeStyles = active
    ? 'bg-primary-500 text-white border-primary-500'
    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500';

  const classes = `${baseStyles} ${activeStyles} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
