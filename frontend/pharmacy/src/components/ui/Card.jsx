import React from 'react';
import { THEME } from '../../constants/theme';
import { cn } from '../../utils/cn';

export function Card({ className, children, hoverable = false, ...props }) {
  return (
    <div
      className={cn(
        THEME.styles.glassCard,
        THEME.radius.card,
        hoverable && THEME.styles.glassCardHover,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}