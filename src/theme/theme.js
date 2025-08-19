// Centralized theme configuration
export const theme = {
  // Color palette
  colors: {
    // Primary brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Accent colors
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    
    // Success colors
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Warning colors
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    
    // Error colors
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    
    // Purple for special features
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    
    // Gray scale
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },

  // Dark theme overrides
  dark: {
    // Background colors
    background: {
      primary: '#0f172a',    // slate-900
      secondary: '#1e293b',  // slate-800
      tertiary: '#334155',   // slate-700
      card: '#1e293b',       // slate-800
      modal: '#1e293b',      // slate-800
      input: '#334155',      // slate-700
    },
    
    // Text colors
    text: {
      primary: '#f8fafc',    // slate-50
      secondary: '#cbd5e1',  // slate-300
      tertiary: '#94a3b8',   // slate-400
      muted: '#64748b',      // slate-500
      inverse: '#0f172a',    // slate-900
    },
    
    // Border colors
    border: {
      primary: '#334155',    // slate-700
      secondary: '#475569',  // slate-600
      accent: '#3b82f6',     // blue-500
    },
    
    // Status colors (adjusted for dark theme)
    status: {
      success: '#22c55e',    // green-500
      warning: '#f59e0b',    // amber-500
      error: '#ef4444',      // red-500
      info: '#3b82f6',       // blue-500
    },
  },

  // Light theme overrides
  light: {
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',  // slate-50
      tertiary: '#f1f5f9',   // slate-100
      card: '#ffffff',
      modal: '#ffffff',
      input: '#ffffff',
    },
    
    // Text colors
    text: {
      primary: '#0f172a',    // slate-900
      secondary: '#475569',  // slate-600
      tertiary: '#64748b',   // slate-500
      muted: '#94a3b8',      // slate-400
      inverse: '#ffffff',
    },
    
    // Border colors
    border: {
      primary: '#e2e8f0',    // slate-200
      secondary: '#cbd5e1',  // slate-300
      accent: '#3b82f6',     // blue-500
    },
    
    // Status colors
    status: {
      success: '#16a34a',    // green-600
      warning: '#d97706',    // amber-600
      error: '#dc2626',      // red-600
      info: '#2563eb',       // blue-600
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
}

// Theme utility functions
export const getThemeColor = (color, variant = 500) => {
  return theme.colors[color]?.[variant] || color
}

export const getThemeValue = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme)
}

// CSS custom properties for theme
export const generateThemeCSS = (isDark = false) => {
  const currentTheme = isDark ? theme.dark : theme.light
  
  return {
    '--bg-primary': currentTheme.background.primary,
    '--bg-secondary': currentTheme.background.secondary,
    '--bg-tertiary': currentTheme.background.tertiary,
    '--bg-card': currentTheme.background.card,
    '--bg-modal': currentTheme.background.modal,
    '--bg-input': currentTheme.background.input,
    
    '--text-primary': currentTheme.text.primary,
    '--text-secondary': currentTheme.text.secondary,
    '--text-tertiary': currentTheme.text.tertiary,
    '--text-muted': currentTheme.text.muted,
    '--text-inverse': currentTheme.text.inverse,
    
    '--border-primary': currentTheme.border.primary,
    '--border-secondary': currentTheme.border.secondary,
    '--border-accent': currentTheme.border.accent,
    
    '--status-success': currentTheme.status.success,
    '--status-warning': currentTheme.status.warning,
    '--status-error': currentTheme.status.error,
    '--status-info': currentTheme.status.info,
  }
}
