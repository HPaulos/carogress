import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  Bot,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const ForgotPasswordPage = () => {
  const { classes } = useThemeClasses()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [errors, setErrors] = useState({})

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
      await resetPassword(email)
      setIsEmailSent(true)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error) {
      console.error('Password reset error:', error)
      let errorMessage = 'Failed to send reset email. Please try again.'
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
        setErrors({ email: 'No account found with this email' })
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
        setErrors({ email: 'Please enter a valid email' })
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.'
        setErrors({ email: 'Too many requests' })
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
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
            Reset Password
          </motion.h2>
          <motion.p 
            className={`text-sm ${classes.text.secondary}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isEmailSent 
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive reset instructions'
            }
          </motion.p>
        </motion.div>

        {/* Compact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${classes.bg.card} ${classes.border.primary} border rounded-xl shadow-xl p-6`}
        >
          {!isEmailSent ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                  Check Your Email
                </h3>
                <p className={`text-sm ${classes.text.secondary}`}>
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setIsEmailSent(false)
                  setEmail('')
                  setErrors({})
                }}
                className={`w-full py-2 px-4 ${classes.bg.tertiary} ${classes.border.primary} border text-sm font-medium rounded-lg hover:${classes.bg.secondary} transition-colors`}
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Back to Sign In Link */}
          <div className="mt-4 text-center">
            <Link
              to="/signin"
              className={`text-sm ${classes.text.secondary} hover:text-blue-600 transition-colors flex items-center justify-center`}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
