import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  ArrowLeft
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const { currentUser, updatePassword } = useAuth()
  const { classes } = useThemeClasses()
  const navigate = useNavigate()
  
  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordErrors, setPasswordErrors] = useState({})

  // General settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    profileVisibility: 'public',
    language: 'en'
  })

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    // Reset errors
    setPasswordErrors({})
    
    // Validation
    const errors = {}
    
    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required'
    }
    
    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required'
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters'
    }
    
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password'
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors)
      return
    }
    
    setIsChangingPassword(true)
    
    try {
      await updatePassword(passwordForm.newPassword)
      toast.success('Password updated successfully!')
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setShowPasswords({ current: false, new: false, confirm: false })
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error(error.message || 'Failed to update password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    toast.success('Setting updated!')
  }

  const settingsSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      items: [
        {
          type: 'info',
          label: 'Email',
          value: currentUser?.email || 'Not available',
          description: 'Your account email address'
        },
        {
          type: 'info',
          label: 'Account Created',
          value: currentUser?.metadata?.creationTime ? 
            new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
            'Not available',
          description: 'When your account was created'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'from-purple-500 to-pink-500',
      items: [
        {
          type: 'toggle',
          label: 'Email Notifications',
          value: settings.emailNotifications,
          description: 'Receive important updates via email',
          onChange: (value) => handleSettingChange('emailNotifications', value)
        },
        {
          type: 'toggle',
          label: 'Push Notifications',
          value: settings.pushNotifications,
          description: 'Get real-time notifications in your browser',
          onChange: (value) => handleSettingChange('pushNotifications', value)
        },
        {
          type: 'toggle',
          label: 'Marketing Emails',
          value: settings.marketingEmails,
          description: 'Receive updates about new features and tips',
          onChange: (value) => handleSettingChange('marketingEmails', value)
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      items: [
        {
          type: 'select',
          label: 'Profile Visibility',
          value: settings.profileVisibility,
          options: [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'friends', label: 'Friends Only' }
          ],
          description: 'Who can see your profile and achievements',
          onChange: (value) => handleSettingChange('profileVisibility', value)
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      items: [
        {
          type: 'select',
          label: 'Language',
          value: settings.language,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' }
          ],
          description: 'Choose your preferred language',
          onChange: (value) => handleSettingChange('language', value)
        }
      ]
    }
  ]

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Header */}
      <div className={`${classes.bg.card} ${classes.border.primary} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-lg ${classes.bg.tertiary} ${classes.text.secondary} hover:${classes.text.primary} transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${classes.text.primary}`}>Settings</h1>
                  <p className={`text-sm ${classes.text.secondary}`}>Manage your account preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Password Change Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${classes.text.primary}`}>Change Password</h2>
                <p className={`text-sm ${classes.text.secondary}`}>Update your account password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className={`w-full px-4 py-3 ${classes.bg.tertiary} ${classes.border.primary} border rounded-lg ${classes.text.primary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors ${
                      passwordErrors.currentPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className={`w-full px-4 py-3 ${classes.bg.tertiary} ${classes.border.primary} border rounded-lg ${classes.text.primary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors ${
                      passwordErrors.newPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full px-4 py-3 ${classes.bg.tertiary} ${classes.border.primary} border rounded-lg ${classes.text.primary} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors ${
                      passwordErrors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isChangingPassword ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Password
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className={`text-lg font-bold ${classes.text.primary}`}>{section.title}</h2>
                  <p className={`text-sm ${classes.text.secondary}`}>Manage your {section.title.toLowerCase()}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="flex-1">
                      <h3 className={`font-medium ${classes.text.primary}`}>{item.label}</h3>
                      <p className={`text-sm ${classes.text.secondary}`}>{item.description}</p>
                    </div>
                    
                    <div className="ml-4">
                      {item.type === 'info' && (
                        <span className={`text-sm ${classes.text.secondary}`}>{item.value}</span>
                      )}
                      
                      {item.type === 'toggle' && (
                        <button
                          onClick={() => item.onChange(!item.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            item.value ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              item.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      
                      {item.type === 'select' && (
                        <select
                          value={item.value}
                          onChange={(e) => item.onChange(e.target.value)}
                          className={`px-3 py-1 ${classes.bg.tertiary} ${classes.border.primary} border rounded-lg ${classes.text.primary} text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500`}
                        >
                          {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
