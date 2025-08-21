import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, Plus, Play, CheckCircle, Clock, Target, MessageCircle, Trophy, 
  ArrowRight, Home, FileText, BookOpen, Sparkles, MessageSquare, User,
  BarChart3, Activity, Award, Zap, Crown, Heart, Briefcase, Lightbulb,
  ChevronLeft, ChevronRight, Search, X, Mic, MicOff, Volume2, VolumeX
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const InterviewPage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [practiceMode, setPracticeMode] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [practiceQuestions, setPracticeQuestions] = useState([])
  const [expandedQuestion, setExpandedQuestion] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const categories = [
    { id: 'all', name: 'All Questions', icon: Brain, color: 'blue' },
    { id: 'behavioral', name: 'Behavioral', icon: MessageCircle, color: 'green' },
    { id: 'technical', name: 'Technical', icon: Target, color: 'purple' },
    { id: 'leadership', name: 'Leadership', icon: Crown, color: 'yellow' },
    { id: 'problem-solving', name: 'Problem Solving', icon: Lightbulb, color: 'orange' }
  ]

  useEffect(() => {
    loadQuestions()
  }, [user])

  const loadQuestions = async () => {
    if (!user) return
    
    try {
      // Mock questions based on user's achievements
      const mockQuestions = [
        {
          id: '1',
          question: 'Tell me about a time when you had to lead a team through a challenging project. How did you ensure success?',
          category: 'leadership',
          difficulty: 'medium',
          basedOnAchievement: 'Led team of 5 developers to deliver project ahead of schedule',
          suggestedAnswer: 'Focus on your leadership style, communication strategies, and how you motivated the team. Mention specific challenges and solutions.',
          keyPoints: ['Leadership approach', 'Team motivation', 'Problem-solving', 'Results achieved'],
          createdAt: '2024-02-15T10:30:00Z',
          practiceCount: 3,
          successRate: 85
        },
        {
          id: '2',
          question: 'Describe a technical challenge you faced and how you solved it. What was your approach?',
          category: 'technical',
          difficulty: 'hard',
          basedOnAchievement: 'Improved system capacity by 300% through architecture overhaul',
          suggestedAnswer: 'Walk through your technical problem-solving process, including analysis, solution design, and implementation.',
          keyPoints: ['Problem analysis', 'Technical solution', 'Implementation strategy', 'Impact measurement'],
          createdAt: '2024-02-12T14:20:00Z',
          practiceCount: 5,
          successRate: 72
        },
        {
          id: '3',
          question: 'Give me an example of how you improved a process or system. What was the outcome?',
          category: 'problem-solving',
          difficulty: 'medium',
          basedOnAchievement: 'Reduced customer response time by 80% with AI chatbot implementation',
          suggestedAnswer: 'Explain your process improvement methodology and quantify the results achieved.',
          keyPoints: ['Process analysis', 'Solution development', 'Implementation', 'Measurable results'],
          createdAt: '2024-02-10T09:15:00Z',
          practiceCount: 2,
          successRate: 90
        },
        {
          id: '4',
          question: 'Tell me about a time when you had to work with a difficult stakeholder. How did you handle it?',
          category: 'behavioral',
          difficulty: 'medium',
          basedOnAchievement: 'Successfully coordinated with multiple teams during system migration',
          suggestedAnswer: 'Focus on communication skills, empathy, and conflict resolution strategies.',
          keyPoints: ['Communication approach', 'Empathy and understanding', 'Conflict resolution', 'Relationship building'],
          createdAt: '2024-02-08T16:45:00Z',
          practiceCount: 4,
          successRate: 78
        },
        {
          id: '5',
          question: 'Describe a situation where you had to make a decision with incomplete information. What was your process?',
          category: 'problem-solving',
          difficulty: 'hard',
          basedOnAchievement: 'Made critical architecture decisions during system overhaul',
          suggestedAnswer: 'Explain your decision-making framework and how you manage uncertainty.',
          keyPoints: ['Decision framework', 'Risk assessment', 'Information gathering', 'Outcome evaluation'],
          createdAt: '2024-02-05T11:30:00Z',
          practiceCount: 1,
          successRate: 65
        },
        {
          id: '6',
          question: 'How do you stay updated with the latest technologies and industry trends?',
          category: 'technical',
          difficulty: 'easy',
          basedOnAchievement: 'Completed advanced course in React and TypeScript',
          suggestedAnswer: 'Discuss your learning strategies, resources you use, and how you apply new knowledge.',
          keyPoints: ['Learning methods', 'Resources used', 'Practical application', 'Continuous improvement'],
          createdAt: '2024-02-03T13:20:00Z',
          practiceCount: 6,
          successRate: 95
        }
      ]
      
      setQuestions(mockQuestions)
      setLoading(false)
    } catch (error) {
      console.error('Error loading questions:', error)
      toast.error('Failed to load interview questions')
      setLoading(false)
    }
  }

  const handleViewDetails = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const startPractice = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      setPracticeQuestions([question])
      setCurrentQuestion(0)
      setPracticeMode(true)
      setUserAnswer('')
    }
  }

  const handlePracticeSubmit = () => {
    if (userAnswer.trim()) {
      toast.success('Answer submitted! Check your performance.')
      setUserAnswer('')
      setPracticeMode(false)
    } else {
      toast.error('Please provide an answer before submitting.')
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'green'
      case 'medium': return 'yellow'
      case 'hard': return 'red'
      default: return 'gray'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
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

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.icon : Brain
  }

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.color : 'blue'
  }

  // Filter questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.suggestedAnswer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const questionsPerPage = 5
  const totalQuestions = filteredQuestions.length
  const totalPages = Math.ceil(totalQuestions / questionsPerPage)
  const startIndex = (currentPage - 1) * questionsPerPage
  const endIndex = startIndex + questionsPerPage
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className={`${classes.text.secondary}`}>Loading interview questions...</p>
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
                Interview Prep
              </h1>
              <p className={`text-xs ${classes.text.secondary} flex items-center gap-2`}>
                <Sparkles className="w-3 h-3 text-cyan-500" />
                AI-powered questions, <span className="bg-gradient-to-r from-cyan-500 to-magenta-500 bg-clip-text text-transparent font-semibold">based on your achievements</span>
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
                <Brain className="w-3 h-3 text-white" />
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
                      ? `bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40 shadow-lg ${classes.text.primary}`
                      : `bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:from-orange-500/10 hover:to-red-500/10 hover:border-orange-400/30 ${classes.text.secondary} hover:${classes.text.primary}`
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500'
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'
                  }`}>
                    <category.icon className={`w-5 h-5 ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-semibold">{category.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {questions.filter(q => category.id === 'all' || q.category === category.id).length} questions
                    </p>
                  </div>
                  {selectedCategory === category.id && (
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
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
                <Trophy className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Your Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Questions</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{questions.length}</p>
                </div>
                <div className="text-center p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Practice Sessions</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{questions.reduce((sum, q) => sum + q.practiceCount, 0)}</p>
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/20">
                <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Average Success Rate</p>
                <p className={`text-sm font-bold ${classes.text.primary}`}>
                  {Math.round(questions.reduce((sum, q) => sum + q.successRate, 0) / questions.length)}%
                </p>
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
                    {selectedCategory === 'all' ? 'All Questions' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Questions`}
                  </h2>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    {totalQuestions} question{totalQuestions !== 1 ? 's' : ''} • Based on your achievements
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPracticeMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="w-4 h-4" />
                  Start Practice
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
                  placeholder="Search questions..."
                  className={`w-full px-4 py-3 pl-12 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>

              {/* Questions Grid */}
              <div className="space-y-6">
                {currentQuestions.map((question, index) => (
                  <motion.div
                    key={question.id}
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
                              const IconComponent = getCategoryIcon(question.category)
                              return <IconComponent className="w-5 h-5 text-cyan-500" />
                            })()}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold ${classes.text.primary} mb-1`}>
                              {question.question}
                            </h3>
                            <div className="flex items-center gap-4 text-xs">
                              <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                <Clock className="w-3 h-3" />
                                {formatTimeAgo(question.createdAt)}
                              </span>
                              <span className={`${classes.text.secondary} capitalize`}>
                                {question.category}
                              </span>
                              <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                {getDifficultyIcon(question.difficulty)} {question.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 dark:text-green-400">
                              {question.practiceCount} practices
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-yellow-600 dark:text-yellow-400">
                              {question.successRate}% success
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => startPractice(question.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                            >
                              <Play className="w-4 h-4" />
                              Practice
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleViewDetails(question.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                            >
                              <MessageCircle className="w-4 h-4" />
                              View Details
                            </motion.button>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {expandedQuestion === question.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                          >
                            <div className="space-y-4">
                              <div>
                                <h4 className={`text-sm font-bold ${classes.text.primary} mb-2`}>Based on Achievement:</h4>
                                <p className={`text-sm ${classes.text.secondary} bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 p-3 rounded-lg`}>
                                  {question.basedOnAchievement}
                                </p>
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold ${classes.text.primary} mb-2`}>Key Points to Cover:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {question.keyPoints.map((point, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-700 dark:text-yellow-400 text-xs rounded-lg border border-yellow-400/20">
                                      {point}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className={`text-sm font-bold ${classes.text.primary} mb-2`}>Suggested Approach:</h4>
                                <p className={`text-sm ${classes.text.secondary}`}>
                                  {question.suggestedAnswer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
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
                          <h3 className={`text-sm font-bold ${classes.text.primary}`}>Question Pages</h3>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            Showing {startIndex + 1}-{Math.min(endIndex, totalQuestions)} of {totalQuestions} questions
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
                <h2 className={`text-lg font-bold ${classes.text.primary}`}>Practice Session</h2>
                <p className={`text-xs ${classes.text.secondary}`}>Your current practice status</p>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Practice Session */}
            {practiceMode && practiceQuestions.length > 0 ? (
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Current Question</h3>
                <div className="space-y-4">
                  <p className={`text-sm ${classes.text.secondary}`}>
                    {practiceQuestions[currentQuestion].question}
                  </p>
                  
                  <div className="space-y-3">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      rows={4}
                      className={`w-full px-3 py-2 border-2 ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none`}
                    />
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 rounded-lg transition-colors ${
                          isRecording 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-2 rounded-lg transition-colors ${
                          isMuted 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </motion.button>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePracticeSubmit}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Submit Answer
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPracticeMode(false)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Exit
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Start Practice</h3>
                <p className={`text-xs ${classes.text.secondary} mb-4`}>
                  Click "Practice" on any question to begin your interview preparation session.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPracticeMode(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                >
                  Start Random Practice
                </motion.button>
              </div>
            )}

            {/* Recent Questions */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Recent Questions</h3>
              <div className="space-y-3">
                {questions.slice(0, 3).map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {(() => {
                        const IconComponent = getCategoryIcon(question.category)
                        return <IconComponent className="w-3 h-3 text-cyan-500" />
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${classes.text.primary} line-clamp-2`}>
                        {question.question}
                      </p>
                      <p className={`text-xs ${classes.text.secondary} mt-1`}>
                        {formatTimeAgo(question.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Interview Tips</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Use the STAR method for behavioral questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-magenta-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Practice your answers out loud</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Focus on specific examples and results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InterviewPage
