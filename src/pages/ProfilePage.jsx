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
  EyeOff
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
            title: 'Practice Interview',
            description: 'Completed mock interview session',
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
    toast.success('Profile updated successfully!')
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
    loadProfile() // Reset to original data
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
      toast.success('Skill added!')
    }
  }

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
    toast.success('Skill removed!')
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setProfile(prev => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()]
      }))
      setNewGoal('')
      toast.success('Goal added!')
    }
  }

  const removeGoal = (goalToRemove) => {
    setProfile(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal !== goalToRemove)
    }))
    toast.success('Goal removed!')
  }

  const addSocialLink = () => {
    if (newSocialLink.label.trim() && newSocialLink.url.trim()) {
      setProfile(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { ...newSocialLink }]
      }))
      setNewSocialLink({ label: '', url: '' })
      toast.success('Social link added!')
    }
  }

  const removeSocialLink = (linkToRemove) => {
    setProfile(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter(link => link.url !== linkToRemove.url)
    }))
    toast.success('Social link removed!')
  }

  const getSocialIcon = (iconName) => {
    const icons = {
      linkedin: Linkedin,
      github: Github,
      twitter: Twitter,
      instagram: Instagram,
      facebook: Facebook,
      globe: Globe
    }
    return icons[iconName] || Globe
  }

  const getActivityIcon = (type) => {
    const icons = {
      achievement: Award,
      document: FileText,
      interview: MessageSquare
    }
    return icons[type] || CheckCircle
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Please sign in to view your profile</h2>
          <p className={classes.text.secondary}>You need to be logged in to access your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-4xl font-bold ${classes.text.primary} mb-4`}>
              Profile
            </h1>
            <p className={`text-lg ${classes.text.secondary} max-w-2xl mx-auto`}>
              Manage your personal information, skills, goals, and achievements
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} overflow-hidden shadow-xl`}
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500">
                <img 
                  src={profile.coverImage} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Edit Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setEditing(!editing)}
                    className={`p-2 ${classes.bg.card}/80 backdrop-blur-sm rounded-lg hover:${classes.bg.tertiary} transition-colors`}
                  >
                    {editing ? (
                      <X className={`w-5 h-5 ${classes.text.secondary}`} />
                    ) : (
                      <Edit3 className={`w-5 h-5 ${classes.text.secondary}`} />
                    )}
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="absolute -top-16 left-6">
                  <div className="relative">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                    />
                    {editing && (
                      <button className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="pt-20">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className={`text-3xl font-bold ${classes.text.primary} mb-2`}>
                        {profile.name}
                      </h2>
                      <p className={`text-xl ${classes.text.secondary} mb-1`}>
                        {profile.title}
                      </p>
                      <p className={`${classes.text.muted}`}>
                        {profile.company}
                      </p>
                    </div>
                    
                    {editing && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCancel}
                          className={`px-4 py-2 ${classes.bg.tertiary} ${classes.text.secondary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${classes.bg.tertiary} rounded-lg flex items-center justify-center`}>
                        <Mail className={`w-5 h-5 ${classes.text.secondary}`} />
                      </div>
                      <div>
                        <p className={`text-sm ${classes.text.muted}`}>Email</p>
                        <p className={`${classes.text.primary}`}>{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${classes.bg.tertiary} rounded-lg flex items-center justify-center`}>
                        <Phone className={`w-5 h-5 ${classes.text.secondary}`} />
                      </div>
                      <div>
                        <p className={`text-sm ${classes.text.muted}`}>Phone</p>
                        <p className={`${classes.text.primary}`}>{profile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${classes.bg.tertiary} rounded-lg flex items-center justify-center`}>
                        <MapPin className={`w-5 h-5 ${classes.text.secondary}`} />
                      </div>
                      <div>
                        <p className={`text-sm ${classes.text.muted}`}>Location</p>
                        <p className={`${classes.text.primary}`}>{profile.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${classes.text.primary} mb-3`}>About</h3>
                    <p className={`${classes.text.secondary} leading-relaxed`}>
                      {profile.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${classes.text.primary}`}>Skills</h3>
                </div>
                {editing && (
                  <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mb-4">
                {profile.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium`}
                  >
                    <span>{skill}</span>
                    {editing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a new skill..."
                    className={`flex-1 px-3 py-2 ${classes.bg.input} border ${classes.border.primary} rounded-lg ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </motion.div>

            {/* Goals Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${classes.text.primary}`}>Career Goals</h3>
                </div>
                {editing && (
                  <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3 mb-4">
                {profile.goals.map((goal, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 ${classes.bg.tertiary} rounded-lg`}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={`${classes.text.primary} flex-1`}>{goal}</span>
                    {editing && (
                      <button
                        onClick={() => removeGoal(goal)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    placeholder="Add a new goal..."
                    className={`flex-1 px-3 py-2 ${classes.bg.input} border ${classes.border.primary} rounded-lg ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-green-500`}
                  />
                  <button
                    onClick={addGoal}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </motion.div>

            {/* Social Links Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 shadow-xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${classes.text.primary}`}>Social Links</h3>
                </div>
                {editing && (
                  <button className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3 mb-4">
                {profile.socialLinks.map((link, index) => {
                  const IconComponent = getSocialIcon(link.icon)
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 ${classes.bg.tertiary} rounded-lg`}
                    >
                      <IconComponent className={`w-5 h-5 ${classes.text.secondary}`} />
                      <div className="flex-1">
                        <p className={`${classes.text.primary} font-medium`}>{link.label}</p>
                        <p className={`${classes.text.muted} text-sm`}>{link.url}</p>
                      </div>
                      {editing && (
                        <button
                          onClick={() => removeSocialLink(link)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>

              {editing && (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newSocialLink.label}
                    onChange={(e) => setNewSocialLink(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Platform name (e.g., LinkedIn, GitHub)..."
                    className={`w-full px-3 py-2 ${classes.bg.input} border ${classes.border.primary} rounded-lg ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="URL..."
                      className={`flex-1 px-3 py-2 ${classes.bg.input} border ${classes.border.primary} rounded-lg ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <button
                      onClick={addSocialLink}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 shadow-xl`}
            >
              <h3 className={`text-xl font-bold ${classes.text.primary} mb-6`}>Your Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Achievements</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.achievements}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Streak</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.streak} days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Level</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.level}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Experience</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.experience} XP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Documents</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.documents}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className={`${classes.text.primary}`}>Interviews</span>
                  </div>
                  <span className={`font-bold ${classes.text.primary}`}>{profile.stats.interviews}</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 shadow-xl`}
            >
              <h3 className={`text-xl font-bold ${classes.text.primary} mb-6`}>Recent Activity</h3>
              
              <div className="space-y-4">
                {profile.recentActivity.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${classes.bg.tertiary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className={`w-4 h-4 ${classes.text.secondary}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`${classes.text.primary} font-medium text-sm`}>{activity.title}</p>
                        <p className={`${classes.text.muted} text-xs`}>{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className={`w-3 h-3 ${classes.text.muted}`} />
                          <span className={`text-xs ${classes.text.muted}`}>
                            {activity.date.toLocaleDateString()}
                          </span>
                          <span className={`text-xs text-green-600 dark:text-green-400 font-medium`}>
                            +{activity.points} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
