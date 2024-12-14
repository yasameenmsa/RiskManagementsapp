import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'ghost', size = 'sm', children, ...props }, ref) => {
    const variants = {
      primary: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      secondary: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      danger: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
      ghost: 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:ring-gray-500'
    };

    const sizes = {
      sm: 'p-1',
      md: 'p-2',
      lg: 'p-3'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex justify-center items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;