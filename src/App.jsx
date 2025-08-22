import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AIChatbot from './components/common/AIChatbot'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PricingPage from './pages/PricingPage'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import StoriesPage from './pages/StoriesPage'
import InterviewPage from './pages/InterviewPage'
import ResumePage from './pages/ResumePage'
import DocumentDetailsPage from './pages/DocumentDetailsPage'
import ProfilePage from './pages/ProfilePage'
import AICoachPage from './pages/AICoachPage'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useThemeClasses } from './theme/useTheme'

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const { classes } = useThemeClasses()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <h2 className={`text-xl font-semibold ${classes.text.primary}`}>Loading AI Career Progress Tracker...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={`${location.pathname === '/ai-coach' ? 'h-screen overflow-hidden' : 'min-h-screen'} ${classes.bg.primary}`}>
      {location.pathname !== '/ai-coach' && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/stories" element={
            <ProtectedRoute>
              <StoriesPage />
            </ProtectedRoute>
          } />
          <Route path="/interview" element={
            <ProtectedRoute>
              <InterviewPage />
            </ProtectedRoute>
          } />
          <Route path="/resume" element={
            <ProtectedRoute>
              <ResumePage />
            </ProtectedRoute>
          } />
          <Route path="/document/:type/:documentId" element={
            <ProtectedRoute>
              <DocumentDetailsPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/ai-coach" element={
            <ProtectedRoute>
              <AICoachPage />
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>
      <AIChatbot />
      {location.pathname !== '/ai-coach' && <Footer />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
