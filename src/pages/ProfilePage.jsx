import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Award, 
  Target, 
  Calendar,
  Briefcase,
  GraduationCap,
  Linkedin,
  Twitter,
  Globe,
  Github,
  Instagram,
  Facebook,
  Star,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Home,
  BookOpen,
  Sparkles,
  Settings,
  Camera
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const [newSocialLink, setNewSocialLink] = useState({ label: '', url: '' })
  const [showSocialForm, setShowSocialForm] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      // Mock profile data - in real app, this would fetch from API
      const mockProfile = {
        id: user.id,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=300&fit=crop',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'],
        goals: ['Lead a development team', 'Master cloud architecture', 'Contribute to open source'],
        socialLinks: [
          { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
          { label: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
          { label: 'Twitter', url: 'https://twitter.com/johndoe', icon: 'twitter' }
        ],
        stats: {
          achievements: 45,
          streak: 12,
          level: 8,
          experience: 1250,
          documents: 8,
          interviews: 15
        },
        recentActivity: [
          {
            id: 1,
            type: 'achievement',
            title: 'Completed React Course',
            description: 'Finished advanced React patterns course',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            points: 50
          },
          {
            id: 2,
            type: 'document',
            title: 'Generated Resume',
            description: 'Created new professional resume',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            points: 25
          },
          {
            id: 3,
            type: 'interview',
            title: 'Practice Session',
            description: 'Completed behavioral interview practice',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            points: 30
          }
        ]
      }
      
      setProfile(mockProfile)
    } catch (error) {
      console.error('Error loading profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    setEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
      toast.success('Skill added!')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
    toast.success('Skill removed!')
  }

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setProfile(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }))
      setNewGoal('')
      toast.success('Goal added!')
    }
  }

  const handleRemoveGoal = (goalToRemove) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal !== goalToRemove)
    }))
    toast.success('Goal removed!')
  }

  const handleAddSocialLink = () => {
    if (newSocialLink.label.trim() && newSocialLink.url.trim()) {
      setProfile(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { ...newSocialLink }]
      }))
      setNewSocialLink({ label: '', url: '' })
      setShowSocialForm(false)
      toast.success('Social link added!')
    }
  }

  const handleCancelSocialLink = () => {
    setNewSocialLink({ label: '', url: '' })
    setShowSocialForm(false)
  }

  const handleRemoveSocialLink = (linkToRemove) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.label !== linkToRemove.label)
    }))
    toast.success('Social link removed!')
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Profile not found</h2>
          <p className={classes.text.secondary}>Unable to load profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Professional Header */}
      <div className={`${classes.bg.card} ${classes.border.primary} border-b shadow-sm sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Profile</h1>
              <p className={`text-sm ${classes.text.secondary}`}>
                Manage your professional information and preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setEditing(!editing)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  editing 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {editing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {editing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Quick Access */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Quick Access</h3>
                <div className="space-y-2">
                  {[
                    { title: 'Dashboard', icon: Home, action: () => window.location.href = '/dashboard' },
                    { title: 'Log Achievement', icon: Plus, action: () => window.location.href = '/dashboard' },
                    { title: 'Generate Resume', icon: FileText, action: () => window.location.href = '/resume' },
                    { title: 'Interview Prep', icon: MessageSquare, action: () => window.location.href = '/interview' },
                    { title: 'View Stories', icon: BookOpen, action: () => window.location.href = '/stories' },
                    { title: 'AI Career Coach', icon: Sparkles, action: () => window.location.href = '/ai-coach' },
                    { title: 'Profile', icon: User, action: () => window.location.href = '/profile' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${classes.text.secondary} hover:${classes.text.primary}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Profile Stats */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Profile Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Level</span>
                    <span className={`font-medium ${classes.text.primary}`}>{profile.stats.level}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Experience</span>
                    <span className={`font-medium ${classes.text.primary}`}>{profile.stats.experience} XP</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Streak</span>
                    <span className={`font-medium ${classes.text.primary}`}>{profile.stats.streak} days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Achievements</span>
                    <span className={`font-medium ${classes.text.primary}`}>{profile.stats.achievements}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Profile Content */}
          <div className="col-span-6">
            {/* Compact Profile Header */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6 mb-6`}>
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                  {editing && (
                    <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-3 h-3 text-white" />
                    </button>
                  )}
                </div>
                
                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className={`text-lg font-semibold ${classes.text.primary}`}>
                      {editing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className={`px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      ) : (
                        profile.name
                      )}
                    </h2>
                    <span className={`text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full`}>
                      Level {profile.stats.level}
                    </span>
                  </div>
                  <p className={`text-sm ${classes.text.secondary} mb-1`}>
                    {editing ? (
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        className={`px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    ) : (
                      profile.title
                    )}
                  </p>
                  <p className={`text-xs ${classes.text.secondary}`}>
                    {editing ? (
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        className={`px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    ) : (
                      profile.company
                    )}
                  </p>
                </div>
              </div>
              
              {/* Bio */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-2`}>Bio</h3>
                {editing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={2}
                    className={`w-full px-3 py-2 border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                ) : (
                  <p className={`text-sm ${classes.text.secondary} leading-relaxed`}>{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6 mb-6`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${classes.text.secondary}`}>
                      {editing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className={`w-full px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      ) : (
                        profile.email
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${classes.text.secondary}`}>
                      {editing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className={`w-full px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      ) : (
                        profile.phone
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${classes.text.secondary}`}>
                      {editing ? (
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className={`w-full px-2 py-1 border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      ) : (
                        profile.location
                      )}
                    </span>
                  </div>
                </div>
              </div>

            {/* Skills Section */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${classes.text.primary}`}>Skills</h3>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      placeholder="Add skill..."
                      className={`px-3 py-1 text-sm border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-2`}
                  >
                    <span>{skill}</span>
                    {editing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Goals Section */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${classes.text.primary}`}>Career Goals</h3>
                {editing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                      placeholder="Add goal..."
                      className={`px-3 py-1 text-sm border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <button
                      onClick={handleAddGoal}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {profile.goals.map((goal, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800`}
                  >
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className={`text-sm ${classes.text.primary}`}>{goal}</span>
                    </div>
                    {editing && (
                      <button
                        onClick={() => handleRemoveGoal(goal)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Social Links & Activity */}
          <div className="col-span-3">
            <div className="sticky top-24">
              {/* Social Links */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-medium ${classes.text.primary}`}>Social Links</h3>
                  {editing && !showSocialForm && (
                    <button
                      onClick={() => setShowSocialForm(true)}
                      className="p-1 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* Add Social Link Form */}
                {showSocialForm && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3">
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newSocialLink.label}
                        onChange={(e) => setNewSocialLink(prev => ({ ...prev, label: e.target.value }))}
                        placeholder="Platform name (e.g., LinkedIn, GitHub)..."
                        className={`w-full px-2 py-1 text-xs border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      <input
                        type="url"
                        value={newSocialLink.url}
                        onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="URL..."
                        className={`w-full px-2 py-1 text-xs border ${classes.border.primary} rounded ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddSocialLink}
                          className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                        >
                          Add
                        </button>
                        <button
                          onClick={handleCancelSocialLink}
                          className="px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {profile.socialLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className={`text-xs font-medium ${classes.text.primary}`}>{link.label}</p>
                          <p className={`text-xs ${classes.text.secondary}`}>{link.url}</p>
                        </div>
                      </div>
                      {editing && (
                        <button
                          onClick={() => handleRemoveSocialLink(link)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Recent Activity</h3>
                <div className="space-y-3">
                  {profile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'achievement' ? 'bg-green-100 dark:bg-green-900/30' :
                        activity.type === 'document' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-purple-100 dark:bg-purple-900/30'
                      }`}>
                        {activity.type === 'achievement' ? (
                          <Award className="w-3 h-3 text-green-600 dark:text-green-400" />
                        ) : activity.type === 'document' ? (
                          <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <MessageSquare className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium ${classes.text.primary} truncate`}>
                          {activity.title}
                        </p>
                        <p className={`text-xs ${classes.text.secondary} truncate`}>
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className={`text-xs ${classes.text.secondary}`}>
                            {activity.date.toLocaleDateString()}
                          </span>
                          <span className={`text-xs font-medium text-green-600 dark:text-green-400`}>
                            +{activity.points} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
