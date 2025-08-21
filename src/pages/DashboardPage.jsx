import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, FileText, MessageSquare, Brain, Target, TrendingUp, 
  Award, Sparkles, CheckCircle, Rocket, ArrowRight, Play, User, 
  Plus, Zap, Star, Calendar, X, BarChart3, Users, BookOpen, 
  Briefcase, Lightbulb, Heart, Shield, HelpCircle, ChevronRight,
  Activity, TrendingDown, Eye, Download, MoreHorizontal, 
  ThumbsUp, MessageCircle, Share, Edit3, Trash2, CalendarDays,
  TrendingUpIcon, Home, Clock, Flame, Crown, ChevronLeft, Search
} from 'lucide-react'
import { useThemeClasses } from '../theme/useTheme'

const DashboardPage = () => {
  const { classes } = useThemeClasses()
  const [currentPage, setCurrentPage] = useState(1)
  const [showHelp, setShowHelp] = useState(false)
  const [expandedAchievements, setExpandedAchievements] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImpact, setSelectedImpact] = useState('all')
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [badges, setBadges] = useState(() => {
    const savedBadges = localStorage.getItem('userBadges')
    return savedBadges ? JSON.parse(savedBadges) : []
  })
  const [showSuggestions, setShowSuggestions] = useState(false)

  const [truncatedAchievements, setTruncatedAchievements] = useState(new Set())
  const [achievementForm, setAchievementForm] = useState(() => {
    const savedDraft = localStorage.getItem('achievementDraft')
    return savedDraft ? JSON.parse(savedDraft) : {
      description: '',
      category: 'work',
      impact: 'medium'
    }
  })

  // Mock user data
  const user = { name: 'John Doe' }

  // Hardcoded achievements for testing
  const allAchievements = [
    {
      id: 1,
      title: "Led a team of 5 developers to deliver a critical feature ahead of schedule",
      description: "Successfully managed a cross-functional team to implement a new payment system that improved transaction speed by 40%",
      category: "leadership",
      impact: "high",
      points: 150,
      date: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Completed advanced React course and implemented new patterns",
      description: "Learned React 18 features including concurrent rendering and implemented them in our main application",
      category: "learning",
      impact: "medium",
      points: 100,
      date: "2024-01-14T14:20:00Z"
    },
    {
      id: 3,
      title: "Mentored junior developer and helped them complete their first feature",
      description: "Provided guidance and code reviews for a new team member, helping them understand our codebase and best practices",
      category: "leadership",
      impact: "medium",
      points: 120,
      date: "2024-01-13T09:15:00Z"
    },
    {
      id: 4,
      title: "Optimized database queries reducing load time by 60%",
      description: "Identified and fixed performance bottlenecks in our main database, significantly improving user experience",
      category: "work",
      impact: "high",
      points: 180,
      date: "2024-01-12T16:45:00Z"
    },
    {
      id: 5,
      title: "Attended industry conference and networked with 20+ professionals",
      description: "Participated in ReactConf 2024, learned about latest trends, and built valuable connections",
      category: "learning",
      impact: "medium",
      points: 90,
      date: "2024-01-11T11:30:00Z"
    },
    {
      id: 6,
      title: "Implemented automated testing pipeline reducing bugs by 70%",
      description: "Set up comprehensive CI/CD pipeline with automated testing that catches issues before deployment",
      category: "work",
      impact: "high",
      points: 200,
      date: "2024-01-10T13:20:00Z"
    },
    {
      id: 7,
      title: "Volunteered at local coding bootcamp teaching 15 students",
      description: "Spent weekends teaching web development fundamentals to aspiring developers in my community",
      category: "personal",
      impact: "medium",
      points: 80,
      date: "2024-01-09T15:10:00Z"
    },
    {
      id: 8,
      title: "Refactored legacy codebase improving maintainability",
      description: "Modernized 10-year-old code by implementing modern patterns and removing technical debt",
      category: "work",
      impact: "high",
      points: 160,
      date: "2024-01-08T10:45:00Z"
    },
    {
      id: 9,
      title: "Learned TypeScript and migrated 3 projects",
      description: "Mastered TypeScript and successfully migrated our main applications with zero breaking changes",
      category: "learning",
      impact: "medium",
      points: 110,
      date: "2024-01-07T14:30:00Z"
    },
    {
      id: 10,
      title: "Organized team building event for 25 people",
      description: "Planned and executed a successful team retreat that improved team morale and collaboration",
      category: "leadership",
      impact: "medium",
      points: 95,
      date: "2024-01-06T12:00:00Z"
    },
    {
      id: 11,
      title: "Built personal portfolio website with modern tech stack",
      description: "Created a responsive portfolio using Next.js, Tailwind CSS, and Framer Motion",
      category: "personal",
      impact: "low",
      points: 70,
      date: "2024-01-05T16:20:00Z"
    },
    {
      id: 12,
      title: "Contributed to open source project with 50+ stars",
      description: "Added new features to a popular React library and helped maintain documentation",
      category: "work",
      impact: "medium",
      points: 85,
      date: "2024-01-04T09:30:00Z"
    }
  ]

  // Filter and search logic
  const filteredAchievements = allAchievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory
    const matchesImpact = selectedImpact === 'all' || achievement.impact === selectedImpact
    
    return matchesSearch && matchesCategory && matchesImpact
  })

  // Pagination logic
  const totalAchievements = filteredAchievements.length
  const achievementsPerPage = 7
  const totalPages = Math.ceil(totalAchievements / achievementsPerPage)
  const startIndex = (currentPage - 1) * achievementsPerPage
  const endIndex = startIndex + achievementsPerPage
  const currentAchievements = filteredAchievements.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const totalPoints = allAchievements.reduce((sum, achievement) => sum + achievement.points, 0)
  const level = Math.floor(totalPoints / 1000) + 1
  const streak = 7 // Mock streak
  const achievementsCount = allAchievements.length

  // Badge system
  const checkAndAwardBadges = (newAchievement) => {
    const newBadges = []
    
    // First achievement badge
    if (achievementsCount === 0) {
      newBadges.push({
        id: 'first-achievement',
        name: 'First Steps',
        description: 'Posted your first achievement',
        icon: '🎯',
        color: 'blue'
      })
    }
    
    // 10 achievements badge
    if (achievementsCount === 9) {
      newBadges.push({
        id: 'achievement-master',
        name: 'Achievement Master',
        description: 'Posted 10 achievements',
        icon: '🏆',
        color: 'gold'
      })
    }
    
    // High impact badge
    if (newAchievement.impact === 'high') {
      const highImpactCount = allAchievements.filter(a => a.impact === 'high').length
      if (highImpactCount === 1) {
        newBadges.push({
          id: 'high-impact',
          name: 'High Impact',
          description: 'Posted your first high-impact achievement',
          icon: '💥',
          color: 'red'
        })
      }
    }
    
    // Streak badge
    if (streak >= 7) {
      const hasStreakBadge = badges.some(b => b.id === 'streak-master')
      if (!hasStreakBadge) {
        newBadges.push({
          id: 'streak-master',
          name: 'Streak Master',
          description: 'Maintained a 7-day streak',
          icon: '🔥',
          color: 'orange'
        })
      }
    }
    
    return newBadges
  }

  const handleAchievementSubmit = (e) => {
    e.preventDefault()
    if (!achievementForm.description.trim()) return

    const newAchievement = {
      id: Date.now(),
      title: achievementForm.description,
      description: achievementForm.description,
      category: achievementForm.category,
      impact: achievementForm.impact,
      points: achievementForm.impact === 'high' ? 150 : achievementForm.impact === 'medium' ? 100 : 50,
      date: new Date().toISOString()
    }

    allAchievements.unshift(newAchievement)
    
    // Check for new badges
    const newBadges = checkAndAwardBadges(newAchievement)
    if (newBadges.length > 0) {
      const updatedBadges = [...badges, ...newBadges]
      setBadges(updatedBadges)
      localStorage.setItem('userBadges', JSON.stringify(updatedBadges))
    }
    
    // Check for level up
    const newLevel = Math.floor((totalPoints + newAchievement.points) / 1000) + 1
    if (newLevel > level) {
      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 3000)
    }
    
    setAchievementForm({ description: '', category: 'work', impact: 'medium' })
    localStorage.removeItem('achievementDraft') // Clear draft after successful submission
    setCurrentPage(1) // Reset to first page
  }

  // Auto-save draft to localStorage
  React.useEffect(() => {
    if (achievementForm.description.trim()) {
      localStorage.setItem('achievementDraft', JSON.stringify(achievementForm))
    }
  }, [achievementForm])

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return Briefcase
      case 'learning': return BookOpen
      case 'leadership': return Crown
      case 'personal': return Heart
      default: return Trophy
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  // Smart suggestions based on category
  const getSmartSuggestions = (category) => {
    const suggestions = {
      work: [
        "Led a team to deliver a project ahead of schedule",
        "Optimized a process that improved efficiency by 40%",
        "Mentored junior team members and helped them grow",
        "Implemented a new system that reduced costs by $50K",
        "Resolved a critical bug that was affecting 1000+ users"
      ],
      learning: [
        "Completed an advanced course in React and TypeScript",
        "Learned a new programming language and built a project",
        "Attended a conference and gained valuable insights",
        "Read 3 technical books and applied the concepts",
        "Participated in a hackathon and won first place"
      ],
      leadership: [
        "Organized a team building event for 25 people",
        "Led a cross-functional project with 3 different teams",
        "Mentored 5 junior developers and helped them succeed",
        "Presented to senior management and got approval",
        "Resolved a conflict between team members effectively"
      ],
      personal: [
        "Started a daily meditation practice for 30 days",
        "Volunteered at a local community center",
        "Learned to play a new musical instrument",
        "Completed a fitness challenge and improved health",
        "Built a personal website to showcase my skills"
      ]
    }
    return suggestions[category] || suggestions.work
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary} flex flex-col lg:flex-row`}>
      {/* Left Sidebar - Sticky */}
      <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen flex flex-col">
        {/* Sticky Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-base font-bold">{user.name.charAt(0)}</span>
            </motion.div>
            <div>
              <h1 className={`text-xl font-black ${classes.text.primary} mb-0.5`}>
                Dashboard
              </h1>
              <p className={`text-xs ${classes.text.secondary} flex items-center gap-2`}>
                <Sparkles className="w-3 h-3 text-cyan-500" />
                Welcome back, <span className="bg-gradient-to-r from-cyan-500 to-magenta-500 bg-clip-text text-transparent font-semibold">{user.name}</span>
              </p>

            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">

          {/* Quick Access */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Quick Access</h3>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Generate Resume', icon: FileText, action: () => window.location.href = '/resume', color: 'magenta' },
                { title: 'Interview Prep', icon: MessageSquare, action: () => window.location.href = '/interview', color: 'yellow' },
                { title: 'View Stories', icon: BookOpen, action: () => window.location.href = '/stories', color: 'purple' },
                { title: 'AI Career Coach', icon: Sparkles, action: () => window.location.href = '/ai-coach', color: 'pink' },
                { title: 'Profile', icon: User, action: () => window.location.href = '/profile', color: 'blue' }
              ].map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 hover:shadow-md ${classes.text.secondary} hover:${classes.text.primary} hover:bg-gradient-to-r hover:from-${item.color}-500/5 hover:to-${item.color}-600/5`}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                  </div>
                  <span className="text-xs font-semibold">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Progress Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Progress</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className={`${classes.text.secondary} font-medium`}>Level {level}</span>
                  <span className={`${classes.text.secondary} font-medium`}>
                    {totalPoints} / {(level + 1) * 1000}
                  </span>
                </div>
                <div className={`w-full ${classes.bg.tertiary} rounded-full h-2 overflow-hidden`}>
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(100, (totalPoints / ((level + 1) * 1000)) * 100)}%`
                    }}
                    transition={{ delay: 1, duration: 2, ease: "easeOut" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Streak</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{streak} days</p>
                </div>
                <div className="text-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Achievements</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{achievementsCount}</p>
                </div>
              </div>
              
              {/* Badges Display */}
              {badges.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className={`text-xs font-medium ${classes.text.primary}`}>Badges ({badges.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {badges.slice(0, 3).map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/20"
                        title={badge.description}
                      >
                        <span className="text-sm">{badge.icon}</span>
                        <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">{badge.name}</span>
                      </motion.div>
                    ))}
                    {badges.length > 3 && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">+{badges.length - 3} more</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area with Right Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              {/* Achievement Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
              >
                <form onSubmit={handleAchievementSubmit} className="space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${classes.text.primary}`}>What did you accomplish today?</h3>
                      <p className={`text-xs ${classes.text.secondary}`}>Share your wins and track your progress</p>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                      className={`w-full h-20 px-3 py-2 pr-16 border-2 ${classes.border.primary} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 ${classes.bg.input} ${classes.text.primary} resize-none text-sm transition-all duration-300`}
                      placeholder="Describe your achievement... (e.g., Led a team to deliver a project ahead of schedule)"
                      maxLength={500}
                    />
                    <div className="absolute bottom-2 right-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        achievementForm.description.length > 450 
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : achievementForm.description.length > 400
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {achievementForm.description.length}/500
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <select
                        value={achievementForm.category}
                        onChange={(e) => setAchievementForm({ ...achievementForm, category: e.target.value })}
                        className={`px-3 py-1.5 text-sm border-2 ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                      >
                        <option value="work">💼 Work</option>
                        <option value="learning">📚 Learning</option>
                        <option value="leadership">👑 Leadership</option>
                        <option value="personal">❤️ Personal</option>
                      </select>

                      <select
                        value={achievementForm.impact}
                        onChange={(e) => setAchievementForm({ ...achievementForm, impact: e.target.value })}
                        className={`px-3 py-1.5 text-sm border-2 ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                      >
                        <option value="low">🟢 Small impact</option>
                        <option value="medium">🔵 Medium impact</option>
                        <option value="high">🟠 Big impact</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg"
                        title="Smart Suggestions"
                      >
                        <Lightbulb className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowHelp(true)}
                        className="p-2 text-gray-400 hover:text-cyan-500 transition-colors bg-gray-50 dark:bg-gray-800 rounded-lg"
                        title="Writing Tips"
                      >
                        <HelpCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!achievementForm.description.trim()}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                          achievementForm.description.trim()
                            ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 hover:from-cyan-600 hover:to-magenta-600 text-white shadow-lg hover:shadow-xl'
                            : `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                        }`}
                      >
                        Post
                      </motion.button>
                    </div>
                  </div>
                </form>
                
                {/* Smart Suggestions */}
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 ${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-blue-500" />
                      <h4 className={`text-sm font-bold ${classes.text.primary}`}>Smart Suggestions for {achievementForm.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {getSmartSuggestions(achievementForm.category).map((suggestion, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setAchievementForm({ ...achievementForm, description: suggestion })
                            setShowSuggestions(false)
                          }}
                          className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${classes.text.secondary} hover:${classes.text.primary}`}
                        >
                          💡 {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Achievements Feed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                    <h3 className={`text-lg font-bold ${classes.text.primary}`}>Recent Achievements</h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"></div>
                </div>



                {currentAchievements.map((achievement, index) => {
                  const CategoryIcon = getCategoryIcon(achievement.category || 'work')
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div 
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30"
                        >
                          <CategoryIcon className="w-5 h-5 text-cyan-500" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-base font-bold ${classes.text.primary} mb-1`}>
                                {achievement.title}
                              </h3>
                              <p className={`text-sm ${classes.text.secondary} ${expandedAchievements.has(achievement.id) ? '' : 'line-clamp-2'}`}>
                                {achievement.description}
                              </p>
                              {achievement.description.length > 100 && achievement.description.length > 150 && (
                                <button
                                  onClick={() => {
                                    const newExpanded = new Set(expandedAchievements)
                                    if (newExpanded.has(achievement.id)) {
                                      newExpanded.delete(achievement.id)
                                    } else {
                                      newExpanded.add(achievement.id)
                                    }
                                    setExpandedAchievements(newExpanded)
                                  }}
                                  className={`text-xs font-medium mt-1 hover:underline ${classes.text.primary}`}
                                >
                                  {expandedAchievements.has(achievement.id) ? 'Show less' : 'Show more'}
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                achievement.impact === 'high' 
                                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                  : achievement.impact === 'medium'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {achievement.impact === 'high' ? '🟠' : achievement.impact === 'medium' ? '🔵' : '🟢'}
                              </span>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-600 dark:text-cyan-400`}>
                                +{achievement.points}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className={`text-xs ${classes.text.secondary} flex items-center gap-1`}>
                                <Calendar className="w-3 h-3" />
                                {formatTimeAgo(achievement.date)}
                              </span>
                              <span className={`text-xs ${classes.text.secondary} capitalize`}>
                                {achievement.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 text-gray-400 hover:text-purple-500 transition-colors"
                              >
                                <Share className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Pagination Controls */}
                <div className="mt-8">
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-sm font-bold ${classes.text.primary}`}>Achievement Pages</h3>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            Showing {startIndex + 1}-{Math.min(endIndex, totalAchievements)} of {totalAchievements} achievements
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${classes.text.secondary} font-medium`}>Page</span>
                        <span className={`text-sm font-bold ${classes.text.primary} bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 px-3 py-1 rounded-lg`}>
                          {currentPage} of {totalPages}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          currentPage === 1
                            ? `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                            : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-magenta-500/5`
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </motion.button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <motion.button
                            key={page}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg'
                                : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-magenta-500/10`
                            }`}
                          >
                            {page}
                          </motion.button>
                        ))}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          currentPage === totalPages
                            ? `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                            : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-magenta-500/5`
                        }`}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          <span className={`text-xs ${classes.text.secondary}`}>Current Page</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-magenta-500 rounded-full"></div>
                          <span className={`text-xs ${classes.text.secondary}`}>Total Pages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className={`text-xs ${classes.text.secondary}`}>Achievements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Sticky */}
        <div className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen flex flex-col">
          {/* Sticky Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${classes.text.primary}`}>Recent Activity</h2>
                <p className={`text-xs ${classes.text.secondary}`}>Your latest achievements and updates</p>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Recent Activity */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Recent Activity</h3>
              <div className="space-y-3">
                {allAchievements.slice(0, 5).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${classes.text.primary} font-medium truncate`}>
                        {achievement.title}
                      </p>
                      <p className={`text-xs ${classes.text.secondary} mt-1`}>
                        {formatTimeAgo(achievement.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${classes.text.secondary}`}>This Week</span>
                  <span className={`text-xs font-medium ${classes.text.primary}`}>
                    {allAchievements.filter(a => {
                      const date = new Date(a.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return date > weekAgo;
                    }).length} achievements
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${classes.text.secondary}`}>Avg. Points</span>
                  <span className={`text-xs font-medium ${classes.text.primary}`}>
                    {Math.round(totalPoints / achievementsCount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${classes.text.secondary}`}>Categories</span>
                  <span className={`text-xs font-medium ${classes.text.primary}`}>
                    {new Set(allAchievements.map(a => a.category)).size}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Up Modal */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={`${classes.bg.card} rounded-2xl shadow-2xl max-w-md w-full p-8 text-center`}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className={`text-2xl font-bold mb-2 ${classes.text.primary}`}>Level Up! 🎉</h2>
            <p className={`text-lg ${classes.text.secondary} mb-4`}>Congratulations! You've reached Level {level + 1}</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-3xl">🎊</span>
              <span className="text-3xl">🎊</span>
              <span className="text-3xl">🎊</span>
            </div>
            <p className={`text-sm ${classes.text.secondary}`}>Keep up the great work and continue achieving your goals!</p>
          </motion.div>
        </div>
      )}



      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${classes.bg.card} rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`${classes.bg.secondary} px-6 py-4 border-b ${classes.border.primary} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-500" />
                <h3 className={`font-semibold ${classes.text.primary}`}>Writing Tips</h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Be Specific</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Instead of "worked on a project", say "led a team of 5 developers to deliver a critical feature ahead of schedule"</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Include Impact</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Add numbers like "improved performance by 40%" or "reduced costs by $50K"</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Use Action Verbs</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Start with words like "led", "developed", "optimized", "mentored"</p>
                </div>
              </div>
            </div>

            <div className={`px-6 py-4 border-t ${classes.border.primary} ${classes.bg.secondary}`}>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
