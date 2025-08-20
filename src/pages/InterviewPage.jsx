import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Plus, Play, CheckCircle, Clock, Target, MessageCircle, Trophy, ArrowRight, Home, FileText, BookOpen, Sparkles, MessageSquare } from 'lucide-react'
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

  const categories = [
    { id: 'all', name: 'All Questions', count: 0 },
    { id: 'behavioral', name: 'Behavioral', count: 0 },
    { id: 'technical', name: 'Technical', count: 0 },
    { id: 'leadership', name: 'Leadership', count: 0 },
    { id: 'problem-solving', name: 'Problem Solving', count: 0 }
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
          createdAt: '2024-02-15T10:30:00Z'
        },
        {
          id: '2',
          question: 'Describe a technical challenge you faced and how you solved it. What was your approach?',
          category: 'technical',
          difficulty: 'hard',
          basedOnAchievement: 'Improved system capacity by 300% through architecture overhaul',
          suggestedAnswer: 'Walk through your technical problem-solving process, including analysis, solution design, and implementation.',
          keyPoints: ['Problem analysis', 'Technical solution', 'Implementation strategy', 'Impact measurement'],
          createdAt: '2024-02-12T14:20:00Z'
        },
        {
          id: '3',
          question: 'Give me an example of how you improved a process or system. What was the outcome?',
          category: 'problem-solving',
          difficulty: 'medium',
          basedOnAchievement: 'Reduced customer response time by 80% with AI chatbot implementation',
          suggestedAnswer: 'Explain your process improvement methodology and quantify the results achieved.',
          keyPoints: ['Process analysis', 'Solution development', 'Implementation', 'Measurable results'],
          createdAt: '2024-02-10T09:15:00Z'
        },
        {
          id: '4',
          question: 'Tell me about a time when you had to work with a difficult stakeholder. How did you handle it?',
          category: 'behavioral',
          difficulty: 'medium',
          basedOnAchievement: 'Successfully coordinated with multiple teams during system migration',
          suggestedAnswer: 'Focus on communication skills, empathy, and conflict resolution strategies.',
          keyPoints: ['Communication approach', 'Empathy and understanding', 'Conflict resolution', 'Relationship building'],
          createdAt: '2024-02-08T16:45:00Z'
        },
        {
          id: '5',
          question: 'Describe a situation where you had to make a decision with incomplete information. What was your process?',
          category: 'problem-solving',
          difficulty: 'hard',
          basedOnAchievement: 'Made critical architecture decisions during system overhaul',
          suggestedAnswer: 'Explain your decision-making framework and how you manage uncertainty.',
          keyPoints: ['Decision framework', 'Risk assessment', 'Information gathering', 'Outcome evaluation'],
          createdAt: '2024-02-05T11:30:00Z'
        }
      ]
      
      setQuestions(mockQuestions)
    } catch (error) {
      console.error('Error loading questions:', error)
      toast.error('Failed to load interview questions')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const handleGenerateQuestions = () => {
    toast.success('Generating new interview questions from your achievements...')
    // Simulate AI question generation
    setTimeout(() => {
      toast.success('New interview questions generated!')
      loadQuestions() // Reload questions
    }, 2000)
  }

  const startPracticeSession = () => {
    const filteredQuestions = selectedCategory === 'all' 
      ? questions 
      : questions.filter(q => q.category === selectedCategory)
    
    if (filteredQuestions.length === 0) {
      toast.error('No questions available for practice')
      return
    }

    setPracticeQuestions(filteredQuestions)
    setCurrentQuestion(0)
    setUserAnswer('')
    setPracticeMode(true)
    toast.success('Practice session started!')
  }

  const nextQuestion = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer('')
    } else {
      // End practice session
      setPracticeMode(false)
      toast.success('Practice session completed!')
    }
  }

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Please sign in to access interview prep</h2>
          <p className={classes.text.secondary}>You need to be logged in to practice with AI-generated interview questions.</p>
        </div>
      </div>
    )
  }

  if (practiceMode) {
    const question = practiceQuestions[currentQuestion]
    return (
      <div className={`min-h-screen ${classes.bg.primary}`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-lg font-semibold ${classes.text.primary}`}>Practice Session</h2>
                <p className={`text-sm ${classes.text.secondary}`}>
                  Question {currentQuestion + 1} of {practiceQuestions.length}
                </p>
              </div>
              <button
                onClick={() => setPracticeMode(false)}
                className={`text-sm ${classes.text.secondary} hover:${classes.text.primary} transition-colors`}
              >
                Exit Practice
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`badge ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
                <span className="badge badge-primary">{question.category}</span>
              </div>
              
              <h3 className={`text-xl font-semibold ${classes.text.primary} mb-4`}>
                {question.question}
              </h3>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Based on:</strong> {question.basedOnAchievement}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Tip:</strong> {question.suggestedAnswer}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className={`block text-sm font-medium ${classes.text.secondary} mb-2`}>
                Your Answer
              </label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className={`w-full h-40 px-3 py-2 border ${classes.border.primary} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.bg.input} ${classes.text.primary}`}
                placeholder="Type your answer here... Use the STAR method (Situation, Task, Action, Result) for behavioral questions."
              />
            </div>

            <div className={`${classes.bg.tertiary} p-4 rounded-lg mb-6`}>
              <h4 className={`font-medium ${classes.text.primary} mb-2`}>Key Points to Cover:</h4>
              <ul className="space-y-1">
                {question.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${classes.text.secondary}`}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setPracticeMode(false)}
                className={`px-4 py-2 ${classes.text.secondary} ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
              >
                Exit Practice
              </button>
              <button
                onClick={nextQuestion}
                className="btn-primary flex items-center gap-2"
              >
                {currentQuestion < practiceQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  'Complete Session'
                )}
              </button>
            </div>
          </div>
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
              <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Interview Preparation</h1>
              <p className={`text-sm ${classes.text.secondary}`}>
                Practice with AI-generated questions based on your achievements
              </p>
            </div>
            <button 
              onClick={handleGenerateQuestions}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Generate Questions
            </button>
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
                    { title: 'Practice Interview', icon: MessageSquare, action: () => window.location.href = '/interview' },
                    { title: 'View Stories', icon: BookOpen, action: () => window.location.href = '/stories' },
                    { title: 'AI Career Coach', icon: Sparkles, action: () => window.location.href = '/ai-coach' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        item.title === 'Practice Interview'
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
              
              {/* Interview Stats */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Interview Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Total Questions</span>
                    <span className={`font-medium ${classes.text.primary}`}>{questions.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Categories</span>
                    <span className={`font-medium ${classes.text.primary}`}>{categories.length - 1}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Practice Sessions</span>
                    <span className={`font-medium ${classes.text.primary}`}>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-6">

        {/* Professional Practice Session Card */}
        <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className={`text-sm font-medium ${classes.text.primary}`}>Practice Session</h3>
                <p className={`text-xs ${classes.text.secondary}`}>Practice answering questions in a timed environment</p>
              </div>
            </div>
            <button 
              onClick={startPracticeSession}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              Start
            </button>
          </div>
        </div>



        {/* Professional Questions List */}
        {filteredQuestions.length > 0 ? (
          <div className="space-y-3">
            {filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium ${classes.text.primary} mb-1`}>
                          {question.question}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400`}>
                            {question.category}
                          </span>
                          <span className={`text-xs ${classes.text.secondary}`}>
                            {new Date(question.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`${classes.bg.tertiary} p-3 rounded mb-3`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        <span className={`text-xs font-medium ${classes.text.secondary}`}>Based on:</span>
                      </div>
                      <p className={`text-xs ${classes.text.secondary}`}>{question.basedOnAchievement}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-xs ${classes.text.secondary}`}>
                        <span>{question.keyPoints.length} key points</span>
                      </div>
                      <button 
                        onClick={() => handleViewDetails(question.id)}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
                      >
                        {expandedQuestion === question.id ? 'Hide Details' : 'View Details'} 
                        <svg 
                          className={`w-3 h-3 transition-transform ${expandedQuestion === question.id ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Expandable Details Section */}
                {expandedQuestion === question.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4"
                  >
                    <div className="space-y-4">
                      {/* Category and Difficulty */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className={`text-xs font-medium ${classes.text.primary} mb-2`}>Category</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            question.category === 'behavioral' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            question.category === 'technical' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                            question.category === 'leadership' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                            'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {question.category}
                          </span>
                        </div>
                        <div>
                          <h4 className={`text-xs font-medium ${classes.text.primary} mb-2`}>Difficulty</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                            question.difficulty === 'easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Based on Achievement */}
                      <div>
                        <h4 className={`text-xs font-medium ${classes.text.primary} mb-2`}>Based on Achievement</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className={`text-xs ${classes.text.secondary}`}>{question.basedOnAchievement}</p>
                        </div>
                      </div>

                      {/* Suggested Answer */}
                      <div>
                        <h4 className={`text-xs font-medium ${classes.text.primary} mb-2`}>Suggested Answer Approach</h4>
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <p className={`text-xs ${classes.text.secondary} leading-relaxed`}>{question.suggestedAnswer}</p>
                        </div>
                      </div>

                      {/* Key Points */}
                      <div>
                        <h4 className={`text-xs font-medium ${classes.text.primary} mb-2`}>Key Points to Cover</h4>
                        <div className="space-y-2">
                          {question.keyPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                              <p className={`text-xs ${classes.text.secondary}`}>{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setPracticeQuestions([question])
                            setPracticeMode(true)
                          }}
                          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Play className="w-3 h-3" />
                          Practice This Question
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={`text-sm font-medium ${classes.text.primary} mb-1`}>No Questions Yet</h3>
            <p className={`${classes.text.secondary} text-sm mb-4 max-w-md mx-auto`}>
              Generate your first set of interview questions based on your logged achievements.
            </p>
            <button 
              onClick={handleGenerateQuestions}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <Brain className="w-4 h-4" />
              Generate Questions
            </button>
          </div>
        )}
          </div>

          {/* Right Sidebar - Question Categories */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Question Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const count = category.id === 'all' 
                      ? questions.length 
                      : questions.filter(q => q.category === category.id).length;
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
              
              {/* Difficulty Distribution */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Difficulty Level</h3>
                <div className="space-y-3">
                  {['easy', 'medium', 'hard'].map((difficulty) => {
                    const count = questions.filter(q => q.difficulty === difficulty).length;
                    return (
                      <div key={difficulty} className="flex items-center justify-between">
                        <span className={`text-xs capitalize ${classes.text.secondary}`}>{difficulty}</span>
                        <span className={`text-xs font-medium ${classes.text.primary} bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full`}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
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
