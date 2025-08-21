import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PenTool, Plus, BookOpen, Eye, Edit, Trash2, Calendar, User, Trophy, 
  Copy, Heart, Share2, MessageCircle, Clock, TrendingUp, Sparkles, 
  ChevronDown, ChevronUp, Home, FileText, MessageSquare, Target, 
  BarChart3, Activity, Award, Zap, Crown, Heart as HeartIcon, 
  Briefcase, Lightbulb, ChevronLeft, ChevronRight, Search, X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const StoriesPage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStory, setSelectedStory] = useState(null)
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [likedStories, setLikedStories] = useState(new Set())
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedStories, setExpandedStories] = useState(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Stories', icon: BookOpen, color: 'blue' },
    { id: 'Leadership', name: 'Leadership', icon: Crown, color: 'yellow' },
    { id: 'Technical', name: 'Technical', icon: Target, color: 'green' },
    { id: 'Innovation', name: 'Innovation', icon: Lightbulb, color: 'purple' },
    { id: 'Collaboration', name: 'Collaboration', icon: HeartIcon, color: 'pink' }
  ]

  useEffect(() => {
    loadStories()
  }, [user])

  const loadStories = async () => {
    if (!user) return
    
    try {
      // Mock stories data based on achievements - ordered from latest to oldest
      const mockStories = [
        {
          id: '1',
          title: 'Leading a High-Performance Development Team',
          content: `I successfully led a team of 5 developers to deliver a critical project 2 weeks ahead of schedule. When we faced unexpected technical challenges with the legacy system integration, I organized daily stand-ups to identify blockers early and implemented a mentorship system pairing senior developers with junior team members.

The key to our success was breaking down complex problems into manageable tasks and maintaining clear communication channels. I also introduced automated testing protocols that reduced our bug rate by 40%. This experience taught me the importance of adaptive leadership and how investing in team development pays dividends in project outcomes.

The project's success led to my promotion to Senior Engineering Manager and became a template for other teams in the organization.`,
          excerpt: 'Successfully led a team of 5 developers to deliver a critical project 2 weeks ahead of schedule, implementing mentorship systems and automated testing protocols.',
          category: 'Leadership',
          createdAt: '2024-02-20T10:30:00Z',
          achievements: ['Led team of 5 developers', 'Delivered project ahead of schedule', 'Reduced bug rate by 40%'],
          tags: ['Leadership', 'Project Management', 'Team Building'],
          wordCount: 156,
          likes: 24,
          comments: 8,
          shares: 3,
          readTime: '3 min read',
          author: {
            name: user.name,
            avatar: user.avatar,
            title: user.title
          }
        },
        {
          id: '2',
          title: 'Solving Complex Technical Architecture Challenges',
          content: `When our e-commerce platform started experiencing performance issues during peak traffic, I spearheaded a complete architecture overhaul. The challenge was maintaining system availability while implementing significant changes to our microservices infrastructure.

I conducted a thorough analysis of our bottlenecks and designed a solution using containerization and load balancing that improved our system's capacity by 300%. The implementation required coordinating with multiple teams and ensuring zero downtime during the migration.

This project not only solved our immediate scalability issues but also established best practices for future system design. The new architecture handled Black Friday traffic flawlessly, processing 50% more transactions than the previous year.`,
          excerpt: 'Spearheaded a complete architecture overhaul that improved system capacity by 300% and handled 50% more Black Friday transactions with zero downtime.',
          category: 'Technical',
          createdAt: '2024-02-18T14:20:00Z',
          achievements: ['Improved system capacity by 300%', 'Zero downtime migration', 'Handled 50% more transactions'],
          tags: ['Architecture', 'Scalability', 'Performance'],
          wordCount: 142,
          likes: 31,
          comments: 12,
          shares: 7,
          readTime: '2 min read',
          author: {
            name: user.name,
            avatar: user.avatar,
            title: user.title
          }
        },
        {
          id: '3',
          title: 'Transforming Customer Experience Through Innovation',
          content: `Recognizing that our customer support was becoming a bottleneck, I proposed and implemented an AI-powered chatbot solution that revolutionized our customer service approach. The project involved analyzing thousands of support tickets to identify common patterns and developing intelligent responses.

I collaborated with the UX team to ensure the chatbot felt natural and helpful, not robotic. We also created a seamless handoff process to human agents for complex issues. The implementation included comprehensive testing and gradual rollout to gather feedback and refine the system.

The results exceeded expectations: we reduced response time by 80% and improved customer satisfaction scores by 35%. The chatbot now handles 70% of routine inquiries, allowing our human agents to focus on complex problem-solving.`,
          excerpt: 'Implemented an AI-powered chatbot solution that reduced response time by 80% and improved customer satisfaction by 35%, handling 70% of routine inquiries.',
          category: 'Innovation',
          createdAt: '2024-02-15T09:15:00Z',
          achievements: ['Reduced response time by 80%', 'Improved satisfaction by 35%', 'Automated 70% of routine inquiries'],
          tags: ['Innovation', 'AI', 'Customer Experience'],
          wordCount: 168,
          likes: 19,
          comments: 6,
          shares: 4,
          readTime: '3 min read',
          author: {
            name: user.name,
            avatar: user.avatar,
            title: user.title
          }
        },
        {
          id: '4',
          title: 'Building Cross-Functional Collaboration Excellence',
          content: `When our company decided to launch a new product line, I was tasked with coordinating efforts across marketing, engineering, and sales teams. The challenge was aligning different departments with varying priorities and timelines.

I established a collaborative framework that included weekly cross-functional meetings, shared project management tools, and clear communication protocols. I also created a feedback loop where each team could voice concerns and suggest improvements.

The result was a successful product launch that exceeded sales targets by 25% and received positive customer feedback. The collaborative framework became a company standard and improved interdepartmental relationships across the organization.`,
          excerpt: 'Established a cross-functional collaboration framework that led to a successful product launch exceeding sales targets by 25% and became a company standard.',
          category: 'Collaboration',
          createdAt: '2024-02-12T16:45:00Z',
          achievements: ['Exceeded sales targets by 25%', 'Established collaboration framework', 'Improved interdepartmental relationships'],
          tags: ['Collaboration', 'Product Launch', 'Cross-functional'],
          wordCount: 134,
          likes: 15,
          comments: 4,
          shares: 2,
          readTime: '2 min read',
          author: {
            name: user.name,
            avatar: user.avatar,
            title: user.title
          }
        },
        {
          id: '5',
          title: 'Mentoring Junior Developers to Senior Level',
          content: `Over the past year, I've mentored three junior developers who have all been promoted to senior positions. My approach focused on creating a structured learning environment while encouraging independent problem-solving.

I developed a mentorship program that included code reviews, pair programming sessions, and regular one-on-one meetings. I also encouraged my mentees to take on challenging projects and present their work to the team.

The success of this mentorship program led to its adoption across the entire engineering department. All three mentees are now contributing significantly to our codebase and mentoring others themselves.`,
          excerpt: 'Mentored three junior developers to senior positions through a structured program that was later adopted across the entire engineering department.',
          category: 'Leadership',
          createdAt: '2024-02-10T11:20:00Z',
          achievements: ['Mentored 3 developers to senior level', 'Created mentorship program', 'Program adopted company-wide'],
          tags: ['Mentorship', 'Leadership', 'Career Development'],
          wordCount: 118,
          likes: 28,
          comments: 9,
          shares: 5,
          readTime: '2 min read',
          author: {
            name: user.name,
            avatar: user.avatar,
            title: user.title
          }
        }
      ]
      
      setStories(mockStories)
      setLoading(false)
    } catch (error) {
      console.error('Error loading stories:', error)
      toast.error('Failed to load stories')
      setLoading(false)
    }
  }

  const handleLike = (storyId) => {
    const newLikedStories = new Set(likedStories)
    if (newLikedStories.has(storyId)) {
      newLikedStories.delete(storyId)
      toast.success('Removed from favorites')
    } else {
      newLikedStories.add(storyId)
      toast.success('Added to favorites')
    }
    setLikedStories(newLikedStories)
  }

  const handleShare = (story) => {
    navigator.clipboard.writeText(`${story.title}\n\n${story.excerpt}\n\nRead more at: ${window.location.origin}/stories/${story.id}`)
    toast.success('Story link copied to clipboard!')
  }

  const handleCopy = (story) => {
    navigator.clipboard.writeText(story.content)
    toast.success('Story content copied to clipboard!')
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

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.icon : BookOpen
  }

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.color : 'blue'
  }

  // Filter stories based on search and category
  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || story.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const storiesPerPage = 5
  const totalStories = filteredStories.length
  const totalPages = Math.ceil(totalStories / storiesPerPage)
  const startIndex = (currentPage - 1) * storiesPerPage
  const endIndex = startIndex + storiesPerPage
  const currentStories = filteredStories.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className={`${classes.text.secondary}`}>Loading your stories...</p>
        </div>
      </div>
    )
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
                Stories
              </h1>
              <p className={`text-xs ${classes.text.secondary} flex items-center gap-2`}>
                <Sparkles className="w-3 h-3 text-cyan-500" />
                Your career journey, <span className="bg-gradient-to-r from-cyan-500 to-magenta-500 bg-clip-text text-transparent font-semibold">powered by AI</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">


          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Categories</h3>
            </div>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setCurrentPage(1)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:shadow-lg ${
                    selectedCategory === category.id 
                      ? `bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 shadow-lg ${classes.text.primary}`
                      : `bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:from-purple-500/10 hover:to-pink-500/10 hover:border-purple-400/30 ${classes.text.secondary} hover:${classes.text.primary}`
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'
                  }`}>
                    <category.icon className={`w-5 h-5 ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold">{category.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stories.filter(s => category.id === 'all' || s.category === category.id).length} stories
                    </p>
                  </div>
                  {selectedCategory === category.id && (
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Your Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Stories</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{stories.length}</p>
                </div>
                <div className="text-center p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Views</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{stories.reduce((sum, s) => sum + s.likes, 0)}</p>
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/20">
                <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Average Read Time</p>
                <p className={`text-sm font-bold ${classes.text.primary}`}>2.5 min</p>
              </div>
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
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center justify-between"
              >
                <div>
                  <h2 className={`text-2xl font-bold ${classes.text.primary} mb-2`}>
                    {selectedCategory === 'all' ? 'All Stories' : `${selectedCategory} Stories`}
                  </h2>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    {totalStories} story{totalStories !== 1 ? 'ies' : ''} • {stories.reduce((sum, s) => sum + s.wordCount, 0)} words total
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowStoryModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  New Story
                </motion.button>
              </motion.div>

              {/* Search */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="relative"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder="Search stories..."
                  className={`w-full px-4 py-3 pl-12 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>

              {/* Stories Grid */}
              <div className="space-y-6">
                {currentStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center`}>
                            {(() => {
                              const IconComponent = getCategoryIcon(story.category)
                              return <IconComponent className="w-5 h-5 text-cyan-500" />
                            })()}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold ${classes.text.primary} mb-1`}>
                              {story.title}
                            </h3>
                            <div className="flex items-center gap-4 text-xs">
                              <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                <Calendar className="w-3 h-3" />
                                {formatTimeAgo(story.createdAt)}
                              </span>
                              <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                <Clock className="w-3 h-3" />
                                {story.readTime}
                              </span>
                              <span className={`${classes.text.secondary} capitalize`}>
                                {story.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${classes.text.secondary} ${expandedStories.has(story.id) ? '' : 'line-clamp-3'} mb-4`}>
                          {story.excerpt}
                        </p>
                        
                        {story.excerpt.length > 150 && (
                          <button
                            onClick={() => {
                              const newExpanded = new Set(expandedStories)
                              if (newExpanded.has(story.id)) {
                                newExpanded.delete(story.id)
                              } else {
                                newExpanded.add(story.id)
                              }
                              setExpandedStories(newExpanded)
                            }}
                            className={`text-xs font-medium mb-4 hover:underline ${classes.text.primary}`}
                          >
                            {expandedStories.has(story.id) ? 'Show less' : 'Show more'}
                          </button>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleLike(story.id)}
                              className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${
                                likedStories.has(story.id)
                                  ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-xs font-medium">{story.likes}</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="flex items-center gap-1 p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">{story.comments}</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleShare(story)}
                              className="flex items-center gap-1 p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                              <span className="text-xs font-medium">{story.shares}</span>
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCopy(story)}
                              className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                              title="Copy content"
                            >
                              <Copy className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedStory(story)
                                setShowStoryModal(true)
                              }}
                              className="p-2 text-gray-400 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                              title="View full story"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="mt-8"
                >
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className={`text-sm font-bold ${classes.text.primary}`}>Story Pages</h3>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            Showing {startIndex + 1}-{Math.min(endIndex, totalStories)} of {totalStories} stories
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
                  </div>
                </motion.div>
              )}
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
                <p className={`text-xs ${classes.text.secondary}`}>Your latest story interactions</p>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Recent Activity */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Recent Stories</h3>
              <div className="space-y-3">
                {stories.slice(0, 3).map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                                         <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                       {(() => {
                         const IconComponent = getCategoryIcon(story.category)
                         return <IconComponent className="w-3 h-3 text-cyan-500" />
                       })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${classes.text.primary} line-clamp-2`}>
                        {story.title}
                      </p>
                      <p className={`text-xs ${classes.text.secondary} mt-1`}>
                        {formatTimeAgo(story.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Leadership', 'Technical', 'Innovation', 'Collaboration', 'Mentorship'].map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className="px-2 py-1 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded-lg border border-cyan-400/20"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Writing Tips */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Writing Tips</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Start with a compelling hook</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-magenta-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Include specific metrics and results</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Share lessons learned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${classes.bg.card} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
            <div className={`${classes.bg.secondary} px-6 py-4 border-b ${classes.border.primary} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-cyan-500" />
                <h3 className={`font-semibold ${classes.text.primary}`}>
                  {selectedStory ? 'Edit Story' : 'Create New Story'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowStoryModal(false)
                  setSelectedStory(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Story Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your story title..."
                    className={`w-full px-4 py-3 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Category
                  </label>
                  <select className={`w-full px-4 py-3 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}>
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                    Story Content
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Write your story here... Share your experiences, challenges, and achievements..."
                    className={`w-full px-4 py-3 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none`}
                  />
                </div>
              </div>
            </div>

            <div className={`px-6 py-4 border-t ${classes.border.primary} ${classes.bg.secondary}`}>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowStoryModal(false)
                    setSelectedStory(null)
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                  {selectedStory ? 'Update Story' : 'Create Story'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StoriesPage
