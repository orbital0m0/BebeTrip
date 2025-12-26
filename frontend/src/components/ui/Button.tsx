import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,107,107,0.3)]',
      secondary: 'bg-white text-primary-500 border-2 border-primary-500 hover:bg-primary-50',
      icon: 'rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200',
    };

    const sizeStyles = {
      sm: variant === 'icon' ? 'w-8 h-8 p-0' : 'px-3 py-1.5 text-sm rounded-md',
      md: variant === 'icon' ? 'w-10 h-10 p-0' : 'px-5 py-2.5 text-sm rounded-md',
      lg: variant === 'icon' ? 'w-12 h-12 p-0' : 'px-6 py-3 text-base rounded-lg',
    };

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
