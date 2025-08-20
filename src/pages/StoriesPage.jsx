import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PenTool, Plus, BookOpen, Eye, Edit, Trash2, Calendar, User, Trophy, Copy, Heart, Share2, MessageCircle, Clock, TrendingUp, Sparkles, ChevronDown, ChevronUp, Home, FileText, MessageSquare } from 'lucide-react'
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

  const categories = [
    { id: 'all', name: 'All Stories', count: 0 },
    { id: 'Leadership', name: 'Leadership', count: 0 },
    { id: 'Technical', name: 'Technical', count: 0 },
    { id: 'Innovation', name: 'Innovation', count: 0 },
    { id: 'Collaboration', name: 'Collaboration', count: 0 }
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
          title: 'Building Cross-Functional Collaboration',
          content: `One of my most rewarding experiences was establishing a cross-functional collaboration framework between engineering, design, and product teams. The challenge was breaking down silos and creating a culture of shared ownership.

I initiated weekly cross-team workshops where we shared challenges, celebrated wins, and brainstormed solutions together. I also implemented a shared project management system that provided visibility into each team's priorities and dependencies.

The impact was transformative: project delivery time improved by 30%, and team satisfaction scores increased by 45%. Most importantly, we created a culture where teams genuinely enjoyed working together and felt invested in each other's success.`,
          excerpt: 'Established a cross-functional collaboration framework that improved project delivery time by 30% and increased team satisfaction by 45%.',
          category: 'Collaboration',
          createdAt: '2024-02-12T16:45:00Z',
          achievements: ['Improved delivery time by 30%', 'Increased team satisfaction by 45%', 'Established collaboration framework'],
          tags: ['Collaboration', 'Team Building', 'Project Management'],
          wordCount: 134,
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
    } catch (error) {
      console.error('Error loading stories:', error)
      toast.error('Failed to load stories')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyStory = (story) => {
    navigator.clipboard.writeText(story.content)
    toast.success('Story copied to clipboard!')
  }

  const handleDeleteStory = (storyId) => {
    setStories(stories.filter(story => story.id !== storyId))
    toast.success('Story deleted successfully')
  }

  const handleLikeStory = (storyId) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId)
      } else {
        newLiked.add(storyId)
      }
      return newLiked
    })
  }

  const handleShareStory = (story) => {
    // In a real app, this would open share options
    toast.success('Share options opened!')
  }

  const toggleStoryExpansion = (storyId) => {
    setExpandedStories(prev => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(storyId)) {
        newExpanded.delete(storyId)
      } else {
        newExpanded.add(storyId)
      }
      return newExpanded
    })
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Leadership': 'bg-blue-100 text-blue-800',
      'Technical': 'bg-green-100 text-green-800',
      'Innovation': 'bg-purple-100 text-purple-800',
      'Collaboration': 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory)

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
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Please sign in to access your stories</h2>
          <p className={classes.text.secondary}>You need to be logged in to view your AI-generated stories.</p>
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
              <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Career Stories</h1>
              <p className={`text-sm ${classes.text.secondary}`}>
                AI-generated narratives based on your achievements and experience
              </p>
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
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        item.title === 'View Stories'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                          : `${classes.text.secondary} hover:${classes.text.primary}`
                      }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Stories Stats */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Stories Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Total Stories</span>
                    <span className={`font-medium ${classes.text.primary}`}>{stories.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Categories</span>
                    <span className={`font-medium ${classes.text.primary}`}>{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Total Words</span>
                    <span className={`font-medium ${classes.text.primary}`}>
                      {stories.reduce((sum, story) => sum + story.wordCount, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-6">

        {/* Stories Feed */}
        {filteredStories.length > 0 ? (
          <div className="space-y-8">
            {filteredStories.map((story, index) => {
              const isExpanded = expandedStories.has(story.id)
              
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`card p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${classes.bg.card} border ${classes.border.primary}`}
                >
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className={`badge ${getCategoryColor(story.category)} px-3 py-1`}>
                        {story.category}
                      </span>
                      <span className={`text-xs ${classes.text.muted} ${classes.bg.tertiary} px-2 py-1 rounded-full`}>
                        AI Generated
                      </span>
                      <span className={`text-sm ${classes.text.muted}`}>•</span>
                      <span className={`text-sm ${classes.text.muted}`}>{formatTimeAgo(story.createdAt)}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteStory(story.id)}
                      className={`p-2 ${classes.text.tertiary} hover:text-red-600 transition-colors rounded-full hover:bg-red-50`}
                      title="Delete story"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Story Content */}
                  <div className="mb-6">
                    <h4 className={`text-xl font-bold ${classes.text.primary} mb-3 leading-tight`}>
                      {story.title}
                    </h4>
                    
                    {!isExpanded ? (
                      <p className={`${classes.text.secondary} leading-relaxed text-base mb-4`}>
                        {story.excerpt}
                      </p>
                    ) : (
                      <div className="mb-6">
                        <div className={`whitespace-pre-wrap ${classes.text.secondary} leading-relaxed text-base mb-6`}>
                          {story.content}
                        </div>
                        
                        {/* Achievements Section */}
                        <div className={`${classes.bg.tertiary} p-4 rounded-lg mb-6`}>
                          <h5 className={`font-semibold ${classes.text.primary} mb-3`}>Based on these achievements:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {story.achievements.map((achievement, achievementIndex) => (
                              <div key={achievementIndex} className="flex items-center space-x-3">
                                <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                <span className={`text-sm ${classes.text.secondary}`}>{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Toggle Button */}
                    <button
                      onClick={() => toggleStoryExpansion(story.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 hover:underline"
                    >
                      <span>{isExpanded ? 'Show less' : 'Read full story'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Story Stats */}
                  <div className={`flex items-center justify-between text-sm ${classes.text.muted} mb-6`}>
                    <div className="flex items-center space-x-6">
                      <span className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{story.readTime}</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4" />
                        <span>{story.achievements.length} achievements</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{story.wordCount} words</span>
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span key={tagIndex} className={`px-3 py-1 ${classes.bg.tertiary} ${classes.text.secondary} text-sm rounded-full border ${classes.border.primary}`}>
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Interaction Bar */}
                  <div className={`flex items-center justify-between pt-6 border-t ${classes.border.primary}`}>
                    <div className="flex items-center space-x-8">
                      <button
                        onClick={() => handleLikeStory(story.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          likedStories.has(story.id) 
                            ? 'text-red-600' 
                            : `${classes.text.muted} hover:text-red-600`
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${likedStories.has(story.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{story.likes + (likedStories.has(story.id) ? 1 : 0)}</span>
                      </button>
                      
                      <button className={`flex items-center space-x-2 ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}>
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{story.comments}</span>
                      </button>
                      
                      <button
                        onClick={() => handleShareStory(story)}
                        className={`flex items-center space-x-2 ${classes.text.muted} hover:${classes.text.secondary} transition-colors`}
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">{story.shares}</span>
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleCopyStory(story)}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                      title="Copy story"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Stories Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Your AI will automatically generate career stories based on your logged achievements. Keep tracking your accomplishments!
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Sparkles className="w-4 h-4" />
              <span>Stories are generated automatically from your achievements</span>
            </div>
          </motion.div>
        )}
          </div>

          {/* Right Sidebar - Story Categories */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Story Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const count = category.id === 'all' 
                      ? stories.length 
                      : stories.filter(story => story.category === category.id).length;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : `${classes.text.secondary} hover:${classes.bg.secondary}`
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className={`font-medium px-2 py-0.5 rounded-full ${
                          selectedCategory === category.id 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Recent Stories */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Recent Stories</h3>
                <div className="space-y-3">
                  {stories.slice(0, 5).map((story, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs ${classes.text.primary} font-medium truncate`}>
                          {story.title}
                        </p>
                        <p className={`text-xs ${classes.text.secondary} mt-1`}>
                          {formatTimeAgo(story.createdAt)}
                        </p>
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

export default StoriesPage
