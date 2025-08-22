import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  Bot,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Shield,
  Zap,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const ForgotPasswordPage = () => {
  const { classes } = useThemeClasses()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetToken, setResetToken] = useState('')

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setErrors({ email: 'Email is required' })
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email' })
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsEmailSent(true)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    
    if (!newPassword || !confirmPassword || !resetToken) {
      setErrors({
        newPassword: !newPassword ? 'New password is required' : '',
        confirmPassword: !confirmPassword ? 'Please confirm your password' : '',
        token: !resetToken ? 'Reset token is required' : ''
      })
      return
    }
    
    if (newPassword.length < 8) {
      setErrors({ newPassword: 'Password must be at least 8 characters' })
      return
    }
    
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' })
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Password reset successfully! You can now sign in.')
      // Redirect to signin page
    } catch (error) {
      toast.error('Failed to reset password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = () => {
    if (!newPassword) return { strength: 0, color: 'gray', text: '' }
    
    let strength = 0
    if (newPassword.length >= 8) strength++
    if (/[a-z]/.test(newPassword)) strength++
    if (/[A-Z]/.test(newPassword)) strength++
    if (/\d/.test(newPassword)) strength++
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++
    
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
            {!isEmailSent ? (
              <>
                Reset Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Password
                </span>
              </>
            ) : (
              <>
                Create New
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Password
                </span>
              </>
            )}
          </motion.h2>
          <motion.p 
            className={`text-lg ${classes.text.secondary} max-w-sm mx-auto leading-relaxed`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!isEmailSent 
              ? 'Enter your email to receive a secure password reset link'
              : 'Enter your new password and the reset token from your email'
            }
          </motion.p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`group relative ${classes.bg.card} ${classes.border.primary} border rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300 overflow-hidden`}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            {!isEmailSent ? (
              /* Email Form */
              <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors({})
                      }}
                      className={`w-full pl-10 pr-4 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

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
                      Sending reset email...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Send reset email
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>
              </form>
            ) : (
              /* Password Reset Form */
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <label htmlFor="token" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Reset token
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="token"
                      value={resetToken}
                      onChange={(e) => {
                        setResetToken(e.target.value)
                        if (errors.token) setErrors({})
                      }}
                      className={`w-full pl-10 pr-4 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.token ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Enter the token from your email"
                    />
                  </div>
                  {errors.token && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.token}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    New password
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value)
                        if (errors.newPassword) setErrors({})
                      }}
                      className={`w-full pl-10 pr-12 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.newPassword ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Enter your new password"
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
                  {newPassword && (
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
                  
                  {errors.newPassword && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.newPassword}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Confirm new password
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${classes.text.muted}`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (errors.confirmPassword) setErrors({})
                      }}
                      className={`w-full pl-10 pr-12 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                      placeholder="Confirm your new password"
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
                      Resetting password...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Reset password
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  )}
                </button>
              </form>
            )}

            {/* Back to Sign In Link */}
            <div className="mt-6 text-center">
              <Link
                to="/signin"
                className={`flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Link>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </motion.div>

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className={`group relative ${classes.bg.card} ${classes.border.primary} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 overflow-hidden`}>
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative">
              <h3 className={`font-semibold ${classes.text.primary} mb-4`}>
                Security & Privacy
              </h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                {[
                  { icon: Shield, text: 'Your password reset link expires in 1 hour' },
                  { icon: CheckCircle, text: 'We never store your password in plain text' },
                  { icon: Sparkles, text: 'All communications are encrypted and secure' },
                  { icon: Zap, text: 'You can request a new reset link anytime' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center">
                    <feature.icon className={`w-4 h-4 ${classes.text.secondary} mr-2`} />
                    <span className={classes.text.secondary}>{feature.text}</span>
                  </div>
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

export default ForgotPasswordPage
