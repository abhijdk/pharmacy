/**
 * Strict Monochromatic & Glassmorphism Design Tokens
 * Inspired by Android Cred App UI Design Language
 */

export const THEME = {
  // Color hex codes for documentation/reference where Tailwind cannot be applied
  colors: {
    dark: '#0a0a0a',
    darker: '#000000',
    light: '#f5f5f5',
    grayBorder: 'rgba(255, 255, 255, 0.08)',
    grayMuted: '#9ca3af',
  },

  // Core reusable Tailwind Class mappings to enforce visual hierarchy
  styles: {
    // Glassmorphism panels
    glassCard: 'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
    glassCardHover: 'hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 ease-out',
    
    // Inputs and operational surfaces
    inputField: 'w-full bg-white/[0.02] border border-white/[0.08] text-light placeholder-gray-400 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all duration-200 tracking-wide',
    
    // Interactive components
    btnPrimary: 'bg-light text-darker font-medium tracking-wider uppercase text-xs hover:bg-white active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none',
    btnSecondary: 'bg-transparent border border-white/[0.15] text-light font-medium tracking-wider uppercase text-xs hover:bg-white/[0.05] hover:border-white active:scale-[0.98] transition-all duration-200',
    
    // Typography treatments
    headingPremium: 'font-sans tracking-[0.15em] uppercase text-light select-none font-light',
    bodyMuted: 'text-gray-400 text-sm leading-relaxed tracking-normal',
  },

  // Strict 8px grid implementation increments
  spacing: {
    xs: '4px',    // Minimal separation
    sm: '8px',    // Base system unit
    md: '16px',   // Double unit
    lg: '24px',   // Triple unit
    xl: '32px',   // Macro unit
  },

  // Layout Radii rules
  radius: {
    card: 'rounded-2xl',     // 16px - Premium soft edges
    input: 'rounded-xl',     // 12px - Distinct fields
    button: 'rounded-lg',    // 8px - Action blocks
  }
};