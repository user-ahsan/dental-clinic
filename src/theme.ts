/**
 * Dental Clinic Theme Configuration
 * 
 * This module provides theme configuration for the dental clinic application.
 * Uses Tailwind v4 CSS-based design tokens defined in globals.css @theme block.
 * 
 * Color System:
 * - Primary: Blue (#2563eb) - Trust, medical, clean
 * - Secondary: Teal (#0d9488) - Health, fresh, vitality  
 * - Neutral: Warm grays - Professional, welcoming
 * 
 * Usage:
 * import { themeConfig } from '@/theme'
 * // Use themeConfig for any runtime theme adjustments
 */

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  // Dark variant colors (navy/slate for buttons)
  dark: string;
  darkHover: string;
  darkActive: string;
  // Light variant colors
  light: string;
  lightHover: string;
  // Neutral colors
  neutral: {
    dark: string;
    medium: string;
    light: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors;
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    primary: 'var(--color-primary)',
    primaryHover: 'var(--color-primary-hover)',
    primaryActive: 'var(--color-primary-active)',
    secondary: 'var(--color-secondary)',
    secondaryHover: 'var(--color-secondary-hover)',
    accent: 'var(--color-brand-accent)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
    // Dark variant colors - references CSS variables for dark mode support
    dark: 'var(--color-dark)',
    darkHover: 'var(--color-dark-hover)',
    darkActive: 'var(--color-dark-active)',
    // Light variant colors
    light: 'var(--color-bg-primary)',
    lightHover: 'var(--color-bg-secondary)',
    // Neutral colors
    neutral: {
      dark: 'var(--color-neutral-800)',
      medium: 'var(--color-neutral-600)',
      light: 'var(--color-neutral-400)',
    },
  },
  borderRadius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    full: '9999px',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  typography: {
    fontFamily: 'var(--font-sans)',
    fontSizes: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      base: 'var(--text-base)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
    },
  },
};

export function createTheme(): ThemeConfig {
  return themeConfig;
}

export default themeConfig;