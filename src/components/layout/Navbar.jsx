import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useThemeClasses } from '../../theme/useTheme'
import mockDataService from '../../services/mockDataService'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { classes } = useThemeClasses()
  const location = useLocation()

  useEffect(() => {
    if (user) {
      loadUnreadNotifications()
    }
  }, [user])

  const loadUnreadNotifications = async () => {
    try {
      const notifications = await mockDataService.getUnreadNotifications()
      setUnreadNotifications(notifications.length)
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  // Different nav items based on authentication status
  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ]

  const userNavItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Stories', path: '/stories' },
    { name: 'Interview Prep', path: '/interview' },
    { name: 'Resume', path: '/resume' },
    { name: 'AI Coach', path: '/ai-coach' },
    { name: 'Profile', path: '/profile' },
  ]

  const navItems = user ? userNavItems : publicNavItems

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`sticky top-0 z-50 ${classes.bg.card}/80 backdrop-blur-md border-b ${classes.border.primary}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className={`text-xl font-bold ${classes.text.primary}`}>CareerProgress</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600'
                    : `${classes.text.secondary} hover:text-blue-600`
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 ${classes.text.secondary} hover:text-blue-600 transition-colors`}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <button className={`relative p-2 ${classes.text.secondary} hover:text-blue-600 transition-colors`}>
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center space-x-2 text-sm font-medium ${classes.text.secondary} hover:text-blue-600 transition-colors`}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                    <ChevronDown size={16} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute right-0 mt-2 w-48 ${classes.bg.modal} rounded-lg shadow-lg border ${classes.border.primary} py-2`}
                      >
                        <Link
                          to="/dashboard"
                          className={`flex items-center px-4 py-2 text-sm ${classes.text.secondary} hover:${classes.bg.tertiary}`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User size={16} className="mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className={`flex items-center px-4 py-2 text-sm ${classes.text.secondary} hover:${classes.bg.tertiary}`}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings size={16} className="mr-3" />
                          Settings
                        </Link>
                        <hr className={`my-2 ${classes.border.primary}`} />
                        <button
                          onClick={() => {
                            logout()
                            setIsDropdownOpen(false)
                          }}
                          className={`flex items-center w-full px-4 py-2 text-sm ${classes.text.secondary} hover:${classes.bg.tertiary}`}
                        >
                          <LogOut size={16} className="mr-3" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`text-sm font-medium ${classes.text.secondary} hover:text-blue-600 transition-colors`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${classes.text.secondary} hover:text-blue-600 transition-colors`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${classes.bg.card} border-t ${classes.border.primary}`}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : `${classes.text.secondary} hover:text-blue-600 hover:${classes.bg.tertiary}`
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <hr className={`my-2 ${classes.border.primary}`} />
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 text-sm font-medium ${classes.text.secondary} hover:text-blue-600 hover:${classes.bg.tertiary} rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-2 text-sm font-medium ${classes.text.secondary} hover:text-blue-600 hover:${classes.bg.tertiary} rounded-md`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <hr className={`my-2 ${classes.border.primary}`} />
                  <Link
                    to="/signin"
                    className={`block px-3 py-2 text-sm font-medium ${classes.text.secondary} hover:text-blue-600 hover:${classes.bg.tertiary} rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className={`block px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    Start Free Trial
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
