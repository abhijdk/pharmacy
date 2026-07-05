import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Intelligently merges Tailwind classes without conflicts.
 * Example: cn('px-2 py-1 bg-red-500', customClasses)
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}