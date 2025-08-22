import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  Camera,
  ChevronRight,
  ChevronLeft,
  Download,
  Share2,
  BarChart3,
  Activity,
  Zap,
  Check,
  Search,
  Filter,
  MoreHorizontal,
  Bell,
  Heart,
  Bookmark,
  ExternalLink,
  Copy,
  Lock,
  Shield,
  Key,
  Crown,
  Trophy,
  Flag,
  Compass,
  Map,
  Building,
  School,
  Code,
  Database,
  Server,
  Cloud,
  Wifi,
  Signal,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  HardDrive,
  Cpu,
  Fan,
  Thermometer,
  Timer,
  Watch,
  Sun,
  Moon,
  Wind
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import { getRandomMockUser } from '../utils/mockUserData'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { classes } = useThemeClasses()
  const [mockUser] = useState(getRandomMockUser())
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newGoal, setNewGoal] = useState('')
  const [newSocialLink, setNewSocialLink] = useState({ label: '', url: '' })
  const [showSocialForm, setShowSocialForm] = useState(false)
  const [currentTab, setCurrentTab] = useState('overview')

  useEffect(() => {
    loadProfile()
  }, [])

  // Helper functions
  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths}m ago`
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'achievement': return Award
      case 'document': return FileText
      case 'interview': return MessageSquare
      case 'skill': return Code
      case 'goal': return Target
      default: return Star
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'achievement': return 'green'
      case 'document': return 'blue'
      case 'interview': return 'purple'
      case 'skill': return 'cyan'
      case 'goal': return 'orange'
      default: return 'gray'
    }
  }

  const loadProfile = async () => {
    try {
      setLoading(true)
      // Mock profile data - in real app, this would fetch from API
      const mockProfile = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: mockUser.title,
        company: 'TechCorp Inc.',
        bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.',
        avatar: mockUser.avatar,
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
              <h1 className={`text-xl font-bold bg-gradient-to-r from-cyan-600 to-magenta-600 bg-clip-text text-transparent`}>Profile</h1>
              <p className={`text-sm ${classes.text.secondary}`}>
                Manage your professional information and preferences
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setEditing(!editing)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  editing 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {editing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {editing ? 'Save Changes' : 'Edit Profile'}
              </button>
              <Link
                to="/settings"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Profile Content */}
          <div className="col-span-8">
            {/* Compact Profile Header */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 mb-6 shadow-lg`}>
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img 
                    src={profile.avatar} 
                    alt={profile.name} 
                    className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                  {editing && (
                    <button className="absolute bottom-0 right-0 p-1 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full hover:shadow-lg transition-all duration-300">
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
                    <span className={`text-sm px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-600 dark:text-cyan-400 rounded-full font-medium`}>
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
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 mb-6 shadow-lg`}>
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
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 mb-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${classes.text.primary} flex items-center gap-2`}>
                  <Code className="w-5 h-5 text-cyan-500" />
                  Skills & Expertise
                </h3>
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
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-all duration-300"
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
                    className={`px-3 py-1 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 flex items-center gap-2 hover:shadow-md transition-all duration-300`}
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
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 mb-6 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${classes.text.primary} flex items-center gap-2`}>
                  <Target className="w-5 h-5 text-green-500" />
                  Career Goals
                </h3>
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
                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-all duration-300"
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
                    className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4 text-green-500" />
                      </div>
                      <span className={`text-sm font-medium ${classes.text.primary}`}>{goal}</span>
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
          <div className="col-span-4">
            <div className="sticky top-24">
              {/* Social Links */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 mb-4 shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-sm font-bold ${classes.text.primary} flex items-center gap-2`}>
                    <Globe className="w-4 h-4 text-purple-500" />
                    Social Links
                  </h3>
                  {editing && !showSocialForm && (
                    <button
                      onClick={() => setShowSocialForm(true)}
                      className="p-1 text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* Add Social Link Form */}
                {showSocialForm && (
                  <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-200 dark:border-purple-800 mb-4">
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
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-all duration-300"
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
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                          <Linkedin className="w-4 h-4 text-purple-500" />
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
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}>
                <h3 className={`text-sm font-bold ${classes.text.primary} mb-4 flex items-center gap-2`}>
                  <Activity className="w-4 h-4 text-pink-500" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {profile.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${
                        activity.type === 'achievement' ? 'from-green-500/20 to-emerald-500/20' :
                        activity.type === 'document' ? 'from-blue-500/20 to-purple-500/20' :
                        'from-purple-500/20 to-pink-500/20'
                      } rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {activity.type === 'achievement' ? (
                          <Award className="w-4 h-4 text-green-500" />
                        ) : activity.type === 'document' ? (
                          <FileText className="w-4 h-4 text-blue-500" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-purple-500" />
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
