import React from 'react';
import { cn } from '../../utils/cn';

export function Table({ children, className }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-left text-sm", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className }) {
  return (
    <thead className={cn("text-xs text-gray-400 uppercase tracking-wider bg-white/[0.02] border-b border-white/[0.08]", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className }) {
  return (
    <tr className={cn("border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors", className)}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }) {
  return <th className={cn("px-6 py-4 font-medium", className)}>{children}</th>;
}

export function TableCell({ children, className }) {
  return <td className={cn("px-6 py-4 text-gray-300 whitespace-nowrap", className)}>{children}</td>;
}