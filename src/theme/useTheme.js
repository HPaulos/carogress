import { useTheme } from '../contexts/ThemeContext'

export const useThemeClasses = () => {
  const { isDark } = useTheme()
  
  return {
    isDark,
    
    // Common theme classes
    classes: {
      // Backgrounds
      bg: {
        primary: 'bg-[var(--bg-primary)]',
        secondary: 'bg-[var(--bg-secondary)]',
        tertiary: 'bg-[var(--bg-tertiary)]',
        card: 'bg-[var(--bg-card)]',
        modal: 'bg-[var(--bg-modal)]',
        input: 'bg-[var(--bg-input)]',
      },
      
      // Text
      text: {
        primary: 'text-[var(--text-primary)]',
        secondary: 'text-[var(--text-secondary)]',
        tertiary: 'text-[var(--text-tertiary)]',
        muted: 'text-[var(--text-muted)]',
        inverse: 'text-[var(--text-inverse)]',
      },
      
      // Borders
      border: {
        primary: 'border-[var(--border-primary)]',
        secondary: 'border-[var(--border-secondary)]',
        accent: 'border-[var(--border-accent)]',
      },
      
      // Status colors
      status: {
        success: 'text-[var(--status-success)]',
        warning: 'text-[var(--status-warning)]',
        error: 'text-[var(--status-error)]',
        info: 'text-[var(--status-info)]',
      },
    },
  }
}

// Re-export the main useTheme hook
export { useTheme }
