import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin,
  Bot,
  Sparkles,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const SignInPage = () => {
  const { classes } = useThemeClasses()
  const { signin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      await signin(formData.email, formData.password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Signin error:', error)
      let errorMessage = 'Failed to sign in. Please try again.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
        setErrors({
          email: 'No account found with this email'
        })
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.'
        setErrors({
          password: 'Incorrect password'
        })
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
        setErrors({
          email: 'Please enter a valid email'
        })
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.'
        setErrors({
          email: 'Too many failed attempts',
          password: 'Too many failed attempts'
        })
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon!`)
  }

  return (
    <div className={`h-screen ${classes.bg.primary} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        />
      </div>
      
      <div className="w-full max-w-sm relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              AI Career Tracker
            </h1>
          </motion.div>
          <motion.h2 
            className={`text-2xl font-bold ${classes.text.primary} mb-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            className={`text-sm ${classes.text.secondary}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sign in to continue your career journey
          </motion.p>
        </motion.div>

        {/* Compact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${classes.bg.card} ${classes.border.primary} border rounded-xl shadow-xl p-6`}
        >
          {/* Social Login Buttons */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Github, label: 'GitHub', color: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' }
              ].map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleSocialLogin(social.label)}
                  className={`flex items-center justify-center p-2 ${classes.bg.tertiary} ${classes.border.primary} border rounded-lg ${social.color} transition-colors`}
                >
                  <social.icon className={`w-4 h-4 ${classes.text.secondary}`} />
                </button>
              ))}
            </div>
            
            <div className="relative my-4">
              <div className={`absolute inset-0 flex items-center ${classes.border.primary} border-t`}>
                <div className="w-full border-t border-transparent" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className={`px-2 ${classes.bg.card} ${classes.text.muted}`}>
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${classes.text.primary} mb-1`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${classes.text.muted}`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 ${classes.bg.input} ${classes.border.primary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.text.primary} placeholder-${classes.text.muted}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${classes.text.primary} mb-1`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${classes.text.muted}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-2 ${classes.bg.input} ${classes.border.primary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.text.primary} placeholder-${classes.text.muted}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${classes.text.muted} hover:${classes.text.primary} transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1 flex items-center"
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className={`text-sm ${classes.text.secondary} hover:text-blue-600 transition-colors`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <ArrowRight className="w-4 h-4 mr-2" />
              )}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className={`text-sm ${classes.text.secondary}`}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignInPage
