import React from 'react';
import { X } from 'lucide-react';
import { THEME } from '../../constants/theme';
import { cn } from '../../utils/cn';
import { Card } from './Card';

export function Modal({ isOpen, onClose, title, children, className }) {
  // If the modal isn't open, don't render anything in the DOM
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Dimmed Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />
      
      {/* Modal Card Content */}
      <Card className={cn(
        "relative w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200 border-white/[0.1]", 
        className
      )}>
        <div className="flex items-center justify-between mb-6 border-b border-white/[0.05] pb-4">
          <h2 className={`${THEME.styles.headingPremium} text-lg`}>{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/[0.1] rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form or content goes here */}
        <div className="relative z-10">
          {children}
        </div>
      </Card>
    </div>
  );
}