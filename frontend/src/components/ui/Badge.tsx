import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'safe' | 'age' | 'recommended' | 'positive' | 'negative';
  children: ReactNode;
}

export default function Badge({ variant = 'safe', className = '', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-semibold';

  const variantStyles = {
    safe: 'bg-success-light text-success',
    age: 'bg-secondary-100 text-secondary-700',
    recommended: 'bg-accent-500 text-white',
    positive: 'bg-success-light text-success',
    negative: 'bg-gray-100 text-gray-700',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
