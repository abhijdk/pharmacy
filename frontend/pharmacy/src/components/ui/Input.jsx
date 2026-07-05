import React, { forwardRef } from 'react';
import { THEME } from '../../constants/theme';
import { cn } from '../../utils/cn';

export const Input = forwardRef(({ 
  className, 
  label, 
  error, 
  icon: Icon,
  ...props 
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      {label && (
        <label className="text-xs tracking-wider uppercase text-gray-400 font-medium ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            THEME.styles.inputField,
            THEME.radius.input,
            'px-4 py-3',
            Icon && 'pl-10', // Add padding if icon exists
            error && 'border-red-500/50 focus:border-red-500 text-red-100', // Error state
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <span className="text-[10px] tracking-wide text-red-400 ml-1 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';