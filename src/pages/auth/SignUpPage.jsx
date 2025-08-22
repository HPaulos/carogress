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
    <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Animated Background */}
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
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <div className={`w-${8 + i * 2} h-${8 + i * 2} bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-sm`} />
          </motion.div>
        ))}
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              AI Career Tracker
            </h1>
          </motion.div>
          <motion.h2 
            className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-4 leading-tight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join the
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Future
            </span>
          </motion.h2>
          <motion.p 
            className={`text-lg ${classes.text.secondary} max-w-sm mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Create your account and start your career journey with AI-powered insights
          </motion.p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className={`group relative ${classes.bg.card} ${classes.border.primary} border rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 overflow-hidden backdrop-blur-sm`}
          whileHover={{ y: -5 }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
                    <div className="relative">
            {/* Social Sign Up Buttons */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Github, label: 'GitHub', color: 'hover:bg-gray-100 dark:hover:bg-gray-800', bg: 'hover:shadow-lg' },
                  { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20', bg: 'hover:shadow-lg' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20', bg: 'hover:shadow-lg' }
                ].map((social, index) => (
                  <motion.button
                    key={social.label}
                    onClick={() => handleSocialSignUp(social.label)}
                    className={`flex items-center justify-center p-4 ${classes.bg.tertiary} ${classes.border.primary} border rounded-2xl ${social.color} ${social.bg} transition-all duration-300 group`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <social.icon className={`w-6 h-6 ${classes.text.secondary} group-hover:scale-110 transition-transform duration-300`} />
                  </motion.button>
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className={`block text-sm font-semibold ${classes.text.primary} mb-3`}>
                Full name
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${classes.text.muted} group-focus-within:text-blue-500 transition-colors duration-300`}>
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 ${classes.bg.input} ${classes.border.primary} border-2 rounded-2xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'hover:border-blue-300'
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
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label htmlFor="email" className={`block text-sm font-semibold ${classes.text.primary} mb-3`}>
                Email address
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${classes.text.muted} group-focus-within:text-blue-500 transition-colors duration-300`}>
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 ${classes.bg.input} ${classes.border.primary} border-2 rounded-2xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'hover:border-blue-300'
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
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className={`block text-sm font-semibold ${classes.text.primary} mb-3`}>
                Password
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${classes.text.muted} group-focus-within:text-blue-500 transition-colors duration-300`}>
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-14 py-4 ${classes.bg.input} ${classes.border.primary} border-2 rounded-2xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'hover:border-blue-300'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
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
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <label htmlFor="confirmPassword" className={`block text-sm font-semibold ${classes.text.primary} mb-3`}>
                Confirm password
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${classes.text.muted} group-focus-within:text-blue-500 transition-colors duration-300`}>
                  <Shield className="w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-14 py-4 ${classes.bg.input} ${classes.border.primary} border-2 rounded-2xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 ${
                    errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'hover:border-blue-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
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
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className={`w-5 h-5 mt-1 ${classes.border.primary} border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${classes.bg.input} transition-all duration-300`}
                />
                <span className={`ml-3 text-sm ${classes.text.secondary} leading-relaxed`}>
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
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
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              }`}
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
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
            </motion.button>
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
          
          {/* Hover Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
        </motion.div>

        {/* Benefits Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="mt-8 text-center"
        >
          <div className={`group relative ${classes.bg.card} ${classes.border.primary} border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            
                          <div className="relative">
                <motion.h3 
                  className={`text-xl font-bold ${classes.text.primary} mb-6`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Start your career journey today
                </motion.h3>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {[
                    { icon: Sparkles, text: 'AI-powered career insights and recommendations', color: 'from-purple-500 to-pink-500' },
                    { icon: CheckCircle, text: 'Track achievements and build compelling stories', color: 'from-green-500 to-emerald-500' },
                    { icon: Bot, text: 'Personalized interview preparation and resume building', color: 'from-blue-500 to-cyan-500' },
                    { icon: Zap, text: 'Gamified progress tracking and motivation', color: 'from-orange-500 to-red-500' }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-center group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className={`${classes.text.secondary} font-medium`}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              
              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUpPage
