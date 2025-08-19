import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
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
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const SignInPage = () => {
  const { classes } = useThemeClasses()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showTestUsers, setShowTestUsers] = useState(false)

  const testUsers = [
    {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: 'demo123',
      role: 'Software Engineer',
      company: 'Tech Corp'
    },
    {
      name: 'John Smith',
      email: 'john@example.com',
      password: 'demo123',
      role: 'Product Manager',
      company: 'Innovation Inc'
    },
    {
      name: 'Emma Davis',
      email: 'emma@example.com',
      password: 'demo123',
      role: 'UX Designer',
      company: 'Creative Studio'
    }
  ]

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
      const success = await login(formData.email, formData.password)
      if (!success) {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        })
      }
    } catch (error) {
      toast.error('An error occurred during sign in')
      setErrors({
        email: 'An error occurred during sign in',
        password: 'An error occurred during sign in'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestUserLogin = async (user) => {
    setIsLoading(true)
    try {
      const success = await login(user.email, user.password)
      if (!success) {
        toast.error('Failed to sign in with test account')
      }
    } catch (error) {
      toast.error('Failed to sign in with test account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    toast.success(`${provider} login coming soon!`)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-2xl font-bold ${classes.text.primary}`}>
              AI Career Tracker
            </h1>
          </div>
          <h2 className={`text-3xl font-bold ${classes.text.primary} mb-2`}>
            Welcome back
          </h2>
          <p className={`${classes.text.secondary}`}>
            Sign in to continue your career journey
          </p>
        </motion.div>

        {/* Test Users Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl shadow-xl p-6 mb-6`}
        >
          <button
            onClick={() => setShowTestUsers(!showTestUsers)}
            className={`w-full flex items-center justify-between p-3 ${classes.bg.tertiary} ${classes.border.primary} border rounded-xl hover:${classes.bg.secondary} transition-colors`}
          >
            <div className="flex items-center">
              <User className={`w-5 h-5 ${classes.text.secondary} mr-3`} />
              <span className={`font-medium ${classes.text.primary}`}>Try with test accounts</span>
            </div>
            {showTestUsers ? (
              <ChevronUp className={`w-5 h-5 ${classes.text.secondary}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${classes.text.secondary}`} />
            )}
          </button>

          <AnimatePresence>
            {showTestUsers && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                {testUsers.map((user, index) => (
                  <motion.button
                    key={user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleTestUserLogin(user)}
                    disabled={isLoading}
                    className={`w-full p-4 ${classes.bg.input} ${classes.border.primary} border rounded-xl hover:${classes.bg.secondary} transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${classes.text.primary}`}>{user.name}</div>
                          <div className={`text-sm ${classes.text.secondary}`}>{user.email}</div>
                          <div className="flex items-center mt-1">
                            <Briefcase className={`w-3 h-3 ${classes.text.muted} mr-1`} />
                            <span className={`text-xs ${classes.text.muted}`}>
                              {user.role} at {user.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs ${classes.text.muted} text-right`}>
                        <div>Password: demo123</div>
                        <div className="mt-1">Click to sign in</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl shadow-xl p-8`}
        >
          {/* Social Login Buttons */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Github, label: 'GitHub', color: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' }
              ].map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleSocialLogin(social.label)}
                  className={`flex items-center justify-center p-3 ${classes.bg.tertiary} ${classes.border.primary} border rounded-xl ${social.color} transition-colors`}
                >
                  <social.icon className={`w-5 h-5 ${classes.text.secondary}`} />
                </button>
              ))}
            </div>
            
            <div className="relative my-6">
              <div className={`absolute inset-0 flex items-center ${classes.border.primary} border-t`}>
                <div className="w-full border-t border-transparent" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${classes.bg.card} ${classes.text.muted}`}>
                  Or continue with email
                </span>
              </div>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                Email address
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                Password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className={`w-4 h-4 ${classes.border.primary} border rounded focus:ring-2 focus:ring-blue-500 ${classes.bg.input}`}
                />
                <span className={`ml-2 text-sm ${classes.text.secondary}`}>
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className={`text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign in
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${classes.text.secondary}`}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className={`font-semibold text-blue-600 hover:text-blue-500 transition-colors`}
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl p-6`}>
            <h3 className={`font-semibold ${classes.text.primary} mb-4`}>
              Why choose AI Career Tracker?
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              {[
                { icon: Sparkles, text: 'AI-powered career insights and recommendations' },
                { icon: CheckCircle, text: 'Track achievements and build compelling stories' },
                { icon: Bot, text: 'Personalized interview preparation and resume building' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center">
                  <feature.icon className={`w-4 h-4 ${classes.text.secondary} mr-2`} />
                  <span className={classes.text.secondary}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignInPage
