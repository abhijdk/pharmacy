import React, { forwardRef } from 'react';
import { THEME } from '../../constants/theme';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  children, 
  disabled, 
  ...props 
}, ref) => {
  
  const variants = {
    primary: THEME.styles.btnPrimary,
    secondary: THEME.styles.btnSecondary,
    ghost: 'text-gray-400 hover:text-light hover:bg-white/[0.05] active:scale-[0.98] transition-all duration-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
    icon: 'p-2',
  };

  return (
    <button
      ref={ref}
      disabled={isLoading || disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium tracking-wider uppercase',
        THEME.radius.button,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';