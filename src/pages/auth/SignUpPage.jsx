import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Twitter, 
  Linkedin,
  Bot,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Shield,
  Zap
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const { classes } = useThemeClasses()
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      await signUp(formData.email, formData.password, formData.name)
      toast.success('Account created successfully! Welcome to AI Career Tracker!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to create account. Please try again.')
      setErrors({
        email: 'Email might already be in use'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = (provider) => {
    toast.success(`${provider} sign up coming soon!`)
  }

  const getPasswordStrength = () => {
    if (!formData.password) return { strength: 0, color: 'gray', text: '' }
    
    let strength = 0
    if (formData.password.length >= 8) strength++
    if (/[a-z]/.test(formData.password)) strength++
    if (/[A-Z]/.test(formData.password)) strength++
    if (/\d/.test(formData.password)) strength++
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++
    
    const strengthMap = {
      1: { color: 'red', text: 'Very Weak' },
      2: { color: 'orange', text: 'Weak' },
      3: { color: 'yellow', text: 'Fair' },
      4: { color: 'blue', text: 'Good' },
      5: { color: 'green', text: 'Strong' }
    }
    
    return { strength, ...strengthMap[strength] }
  }

  const passwordStrength = getPasswordStrength()

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
            Join the future
          </h2>
          <p className={`${classes.text.secondary}`}>
            Create your account and start your career journey
          </p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl shadow-xl p-8`}
        >
          {/* Social Sign Up Buttons */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Github, label: 'GitHub', color: 'hover:bg-gray-100 dark:hover:bg-gray-800' },
                { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' }
              ].map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleSocialSignUp(social.label)}
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
                  Or sign up with email
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                Full name
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

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
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs ${classes.text.secondary}`}>Password strength:</span>
                    <span className={`text-xs font-medium text-${passwordStrength.color}-500`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 bg-${passwordStrength.color}-500`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                Confirm password
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className={`w-4 h-4 mt-1 ${classes.border.primary} border rounded focus:ring-2 focus:ring-blue-500 ${classes.bg.input}`}
                />
                <span className={`ml-2 text-sm ${classes.text.secondary}`}>
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.terms}
                </div>
              )}
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
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center">
                  Create account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className={`text-sm ${classes.text.secondary}`}>
              Already have an account?{' '}
              <Link
                to="/signin"
                className={`font-semibold text-blue-600 hover:text-blue-500 transition-colors`}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Benefits Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl p-6`}>
            <h3 className={`font-semibold ${classes.text.primary} mb-4`}>
              Start your career journey today
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              {[
                { icon: Sparkles, text: 'AI-powered career insights and recommendations' },
                { icon: CheckCircle, text: 'Track achievements and build compelling stories' },
                { icon: Bot, text: 'Personalized interview preparation and resume building' },
                { icon: Zap, text: 'Gamified progress tracking and motivation' }
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

export default SignUpPage
