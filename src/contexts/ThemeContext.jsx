import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Update localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Apply CSS variables
    const cssVars = {
      '--bg-primary': isDark ? '#0f172a' : '#ffffff',
      '--bg-secondary': isDark ? '#1e293b' : '#f8fafc',
      '--bg-tertiary': isDark ? '#334155' : '#f1f5f9',
      '--bg-card': isDark ? '#1e293b' : '#ffffff',
      '--bg-modal': isDark ? '#1e293b' : '#ffffff',
      '--bg-input': isDark ? '#334155' : '#ffffff',
      
      '--text-primary': isDark ? '#f8fafc' : '#0f172a',
      '--text-secondary': isDark ? '#cbd5e1' : '#475569',
      '--text-tertiary': isDark ? '#94a3b8' : '#64748b',
      '--text-muted': isDark ? '#64748b' : '#94a3b8',
      '--text-inverse': isDark ? '#0f172a' : '#ffffff',
      
      '--border-primary': isDark ? '#334155' : '#e2e8f0',
      '--border-secondary': isDark ? '#475569' : '#cbd5e1',
      '--border-accent': '#3b82f6',
      
      '--status-success': isDark ? '#22c55e' : '#16a34a',
      '--status-warning': isDark ? '#f59e0b' : '#d97706',
      '--status-error': isDark ? '#ef4444' : '#dc2626',
      '--status-info': isDark ? '#3b82f6' : '#2563eb',
    }

    Object.entries(cssVars).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const setTheme = (theme) => {
    setIsDark(theme === 'dark')
  }

  const value = {
    isDark,
    toggleTheme,
    setTheme,
    theme: isDark ? 'dark' : 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
