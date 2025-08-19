import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Plus,
  X,
  CheckCircle,
  Star,
  Zap,
  Award,
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  ArrowRight,
  Clock,
  Flame,
  Crown,
  BookOpen,
  Briefcase,
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Activity,
  TrendingDown,
  Eye,
  Download,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share,
  Edit3,
  Trash2,
  CalendarDays,
  TrendingUpIcon
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const DashboardPage = () => {
  const { classes } = useThemeClasses()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    category: 'work',
    impact: 'medium'
  })
  const [isRefining, setIsRefining] = useState(false)
  const [refinedDescription, setRefinedDescription] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await mockDataService.getDashboardStats(user?.id || '1')
      setDashboardData(data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      const mockAchievements = [
        {
          id: '1',
          title: 'Led successful project launch',
          description: 'Successfully managed a team of 5 developers to deliver a critical project ahead of schedule. The project involved implementing a new microservices architecture that improved system reliability by 60% and reduced deployment time from 2 hours to 15 minutes. Coordinated with stakeholders across 3 different departments and ensured all requirements were met while maintaining high code quality standards.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 12,
          comments: 3
        },
        {
          id: '2',
          title: 'Completed advanced certification',
          description: 'Earned AWS Solutions Architect certification, expanding technical expertise in cloud architecture and infrastructure design. The certification process involved 6 months of intensive study, including hands-on labs with real-world scenarios, and passing a comprehensive exam covering 5 major domains. This certification opens up new opportunities for cloud-native projects and positions me as a subject matter expert in AWS services.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 8,
          comments: 1
        },
        {
          id: '3',
          title: 'Mentored junior developer',
          description: 'Provided comprehensive guidance and support to a junior developer, helping them grow their skills and confidence. Conducted weekly code reviews, pair programming sessions, and architecture discussions. The mentee successfully delivered their first feature independently and has shown significant improvement in code quality and problem-solving abilities. This experience reinforced my own understanding of best practices and improved my communication skills.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 15,
          comments: 2
        },
        {
          id: '4',
          title: 'Optimized database performance',
          description: 'Improved query performance by 40% through comprehensive database optimization. Analyzed slow-running queries, implemented proper indexing strategies, and optimized table structures. The improvements resulted in faster application response times, reduced server load, and better user experience. Also documented the optimization process for future reference and team knowledge sharing.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 20,
          comments: 5
        },
        {
          id: '5',
          title: 'Presented at team meeting',
          description: 'Delivered a technical presentation to the entire engineering team about implementing CI/CD best practices. The presentation covered automated testing strategies, deployment pipelines, and monitoring solutions. Received positive feedback from senior developers and the presentation led to the adoption of new tools and processes that improved our development workflow.',
          category: 'communication',
          impact: 'low',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 6,
          comments: 1
        },
        {
          id: '6',
          title: 'Implemented automated testing framework',
          description: 'Designed and implemented a comprehensive automated testing framework that increased test coverage from 45% to 85%. The framework includes unit tests, integration tests, and end-to-end tests using modern testing tools. This has significantly reduced bug reports in production and improved code quality across the entire team. The framework is now being used as a standard across multiple projects.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 18,
          comments: 4
        },
        {
          id: '7',
          title: 'Completed React advanced course',
          description: 'Finished an intensive React advanced course covering hooks, context API, performance optimization, and advanced patterns. The course included building a full-stack application with modern React practices, state management with Redux Toolkit, and integration with backend APIs. Gained deep understanding of React internals and best practices for building scalable applications.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 11,
          comments: 2
        },
        {
          id: '8',
          title: 'Organized team building event',
          description: 'Successfully organized a team building event that brought together 25 team members from different departments. Planned activities, coordinated logistics, and ensured everyone had a great experience. The event improved team morale, fostered better relationships between team members, and created a more collaborative work environment. Received appreciation from management and team members.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 22,
          comments: 6
        },
        {
          id: '9',
          title: 'Fixed critical production bug',
          description: 'Quickly identified and resolved a critical production bug that was affecting 10,000+ users. The issue was related to authentication token handling and was causing users to be logged out unexpectedly. Implemented a hotfix within 2 hours and deployed it to production, minimizing user impact. The fix included proper error handling and monitoring to prevent similar issues in the future.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 25,
          comments: 7
        },
        {
          id: '10',
          title: 'Started daily meditation practice',
          description: 'Began a daily meditation practice to improve focus and reduce stress. Started with 10 minutes per day and gradually increased to 20 minutes. The practice has helped improve concentration during coding sessions, reduced anxiety about deadlines, and provided better work-life balance. This personal development has positively impacted both professional and personal life.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 9,
          comments: 3
        },
        {
          id: '11',
          title: 'Contributed to open source project',
          description: 'Made significant contributions to a popular open source project by fixing bugs and adding new features. Submitted 5 pull requests that were accepted and merged, including documentation improvements and performance optimizations. This experience improved my coding skills, taught me about collaborative development, and built my reputation in the developer community.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 14,
          comments: 2
        },
        {
          id: '12',
          title: 'Implemented user feedback system',
          description: 'Designed and implemented a comprehensive user feedback system that collects and analyzes user input. The system includes in-app feedback forms, analytics dashboard, and automated reporting. This has provided valuable insights into user needs and pain points, leading to better product decisions and improved user satisfaction scores by 30%.',
          category: 'work',
          impact: 'medium',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 16,
          comments: 4
        },
        {
          id: '13',
          title: 'Completed system design course',
          description: 'Finished an advanced system design course covering distributed systems, scalability patterns, and architectural best practices. Learned about microservices, load balancing, caching strategies, and database design at scale. The course included hands-on projects building scalable applications and preparing for system design interviews.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 12,
          comments: 1
        },
        {
          id: '14',
          title: 'Led code review process improvement',
          description: 'Initiated and led improvements to the code review process, implementing new guidelines and tools. Introduced automated code quality checks, standardized review templates, and established best practices for constructive feedback. This has improved code quality, reduced review time, and created a more collaborative development environment.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 19,
          comments: 5
        },
        {
          id: '15',
          title: 'Built personal portfolio website',
          description: 'Created a modern, responsive portfolio website showcasing my projects and skills. Used React, TypeScript, and modern CSS techniques to build a fast, accessible, and visually appealing site. The website includes project showcases, skills section, and contact information. This project improved my frontend skills and serves as a professional online presence.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 7,
          comments: 2
        },
        {
          id: '16',
          title: 'Led cross-functional team workshop',
          description: 'Organized and facilitated a 2-day workshop bringing together developers, designers, and product managers to align on project goals and technical architecture. The workshop resulted in improved communication between teams, clearer project requirements, and a shared understanding of technical constraints. This initiative strengthened cross-team collaboration and improved project delivery timelines.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 28,
          comments: 8
        },
        {
          id: '17',
          title: 'Completed Docker containerization project',
          description: 'Successfully containerized our entire application stack using Docker, including the main application, database, and supporting services. Created comprehensive Docker Compose configurations and documentation for local development. This project improved deployment consistency, reduced environment setup time from 2 hours to 15 minutes, and made it easier for new team members to get started.',
          category: 'work',
          impact: 'medium',
          date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 16,
          comments: 4
        },
        {
          id: '18',
          title: 'Started daily journaling habit',
          description: 'Began a daily journaling practice to reflect on work experiences, track personal growth, and document learning moments. Write for 15-20 minutes each morning, covering technical challenges, team interactions, and career goals. This habit has improved self-awareness, helped identify patterns in work performance, and provided valuable insights for career development.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 12,
          comments: 3
        },
        {
          id: '19',
          title: 'Implemented GraphQL API',
          description: 'Designed and implemented a GraphQL API to replace our REST endpoints, providing more flexible data fetching capabilities. The new API reduced over-fetching by 60%, improved frontend performance, and provided better developer experience with self-documenting queries. Also created comprehensive documentation and example queries for the development team.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 22,
          comments: 6
        },
        {
          id: '20',
          title: 'Completed machine learning course',
          description: 'Finished an intensive machine learning course covering supervised learning, unsupervised learning, and deep learning concepts. Built several projects including a recommendation system, image classification model, and natural language processing application. Gained practical experience with TensorFlow, scikit-learn, and data preprocessing techniques.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 18,
          comments: 5
        },
        {
          id: '21',
          title: 'Organized code review best practices session',
          description: 'Conducted a team-wide session on code review best practices, covering constructive feedback techniques, review checklists, and automation tools. Created standardized review templates and guidelines that improved code quality and reduced review time. The session led to more consistent and helpful code reviews across the team.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 20,
          comments: 4
        },
        {
          id: '22',
          title: 'Fixed critical security vulnerability',
          description: 'Identified and patched a critical SQL injection vulnerability in our authentication system that could have exposed user data. Implemented proper input validation, parameterized queries, and security headers. Also conducted a security audit of similar patterns across the codebase and created security guidelines for the team.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 31,
          comments: 9
        },
        {
          id: '23',
          title: 'Started public speaking practice',
          description: 'Began practicing public speaking by presenting at internal team meetings and local tech meetups. Started with 5-minute lightning talks and gradually increased to 20-minute presentations. This practice has improved confidence, communication skills, and ability to explain complex technical concepts clearly to different audiences.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 15,
          comments: 3
        },
        {
          id: '24',
          title: 'Implemented CI/CD pipeline',
          description: 'Set up a comprehensive CI/CD pipeline using GitHub Actions that automates testing, building, and deployment processes. The pipeline includes automated testing, code quality checks, security scanning, and deployment to staging and production environments. This reduced deployment time from 4 hours to 30 minutes and improved code quality.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 24,
          comments: 7
        },
        {
          id: '25',
          title: 'Completed TypeScript advanced course',
          description: 'Finished an advanced TypeScript course covering advanced types, decorators, generics, and best practices for large-scale applications. Learned about type safety, design patterns, and how to write maintainable TypeScript code. Applied these concepts to improve type safety in our existing JavaScript codebase.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 14,
          comments: 2
        },
        {
          id: '26',
          title: 'Mentored three junior developers',
          description: 'Provided guidance and support to three junior developers, helping them grow their skills and confidence. Conducted regular one-on-one sessions, code reviews, and pair programming sessions. All three mentees have successfully delivered features independently and shown significant improvement in code quality and problem-solving abilities.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 26,
          comments: 8
        },
        {
          id: '27',
          title: 'Optimized application performance',
          description: 'Conducted a comprehensive performance audit and implemented optimizations that improved application load time by 40% and reduced memory usage by 30%. Implemented lazy loading, code splitting, image optimization, and caching strategies. The improvements resulted in better user experience and reduced server costs.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 29,
          comments: 6
        },
        {
          id: '28',
          title: 'Started fitness routine',
          description: 'Began a regular fitness routine including strength training and cardio exercises. Work out 4-5 times per week, focusing on building strength, improving cardiovascular health, and maintaining work-life balance. This routine has improved energy levels, reduced stress, and provided better focus during work hours.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 11,
          comments: 4
        },
        {
          id: '29',
          title: 'Completed system architecture course',
          description: 'Finished an advanced system architecture course covering microservices, distributed systems, and scalable design patterns. Learned about service discovery, load balancing, fault tolerance, and monitoring strategies. Applied these concepts to improve our current architecture and prepare for future scaling needs.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 72 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 17,
          comments: 3
        },
        {
          id: '30',
          title: 'Led successful product launch',
          description: 'Successfully led the launch of a new product feature that increased user engagement by 35% and generated $50K in additional revenue in the first month. Coordinated with marketing, sales, and support teams to ensure smooth rollout. Managed customer feedback and implemented quick iterations based on user input.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 33,
          comments: 10
        }
      ]

      setDashboardData({
        user: user,
        achievements: mockAchievements,
        applications: [],
        stats: {
          totalPoints: user?.totalPoints || 1250,
          level: user?.level || 3,
          streak: user?.streak || 7,
          applicationsCount: 0,
          achievementsCount: mockAchievements.length
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAchievementSubmit = async (e) => {
    e.preventDefault()
    
    if (!achievementForm.description.trim()) {
      toast.error('Please describe your achievement')
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAchievement = {
        id: Date.now().toString(),
        title: achievementForm.description.split(' ').slice(0, 8).join(' ') + '...',
        description: achievementForm.description,
        category: achievementForm.category,
        impact: achievementForm.impact,
        date: new Date().toISOString(),
        points: getPointsForImpact(achievementForm.impact),
        likes: 0,
        comments: 0
      }

      setDashboardData(prev => ({
        ...prev,
        achievements: [newAchievement, ...(prev?.achievements || [])],
        stats: {
          ...prev?.stats,
          totalPoints: (prev?.stats?.totalPoints || 0) + newAchievement.points,
          achievementsCount: (prev?.stats?.achievementsCount || 0) + 1
        }
      }))

      setAchievementForm({
        title: '',
        description: '',
        category: 'work',
        impact: 'medium'
      })
      setRefinedDescription('')
      
      toast.success('Achievement logged successfully! 🎉')
    } catch (error) {
      toast.error('Failed to log achievement')
    }
  }

  const getPointsForImpact = (impact) => {
    const pointsMap = {
      low: 10,
      medium: 25,
      high: 50,
      critical: 100
    }
    return pointsMap[impact] || 25
  }

  const getCategoryIcon = (category) => {
    const icons = {
      work: Briefcase,
      personal: Heart,
      learning: BookOpen,
      leadership: Crown,
      innovation: Lightbulb,
      teamwork: Users,
      communication: MessageSquare
    }
    return icons[category] || Target
  }

  const getImpactColor = (impact) => {
    const colors = {
      low: 'text-green-500',
      medium: 'text-blue-500',
      high: 'text-orange-500',
      critical: 'text-red-500'
    }
    return colors[impact] || 'text-blue-500'
  }

  const getImpactLabel = (impact) => {
    const labels = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    }
    return labels[impact] || 'Medium'
  }

  const handleAIRefinement = async () => {
    if (!achievementForm.description.trim()) {
      toast.error('Please enter a description first')
      return
    }

    setIsRefining(true)
    
    setTimeout(() => {
      const originalText = achievementForm.description
      const refinedText = `Successfully ${originalText.toLowerCase().replace(/^i\s+/i, '').replace(/^i\s+/i, '')} by implementing strategic approaches and leveraging key skills. This achievement demonstrates strong ${achievementForm.category} capabilities and resulted in measurable impact.`
      
      setRefinedDescription(refinedText)
      setIsRefining(false)
      toast.success('AI has refined your description!')
    }, 2000)
  }

  const applyRefinedDescription = () => {
    if (refinedDescription) {
      setAchievementForm(prev => ({ ...prev, description: refinedDescription }))
      setRefinedDescription('')
      toast.success('Refined description applied!')
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return '1d ago'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <h2 className={`text-lg font-semibold ${classes.text.primary}`}>Loading your dashboard...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center p-4`}>
        <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 text-center max-w-sm`}>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className={`text-xl font-bold ${classes.text.primary} mb-2`}>Access Required</h2>
          <p className={`${classes.text.secondary} mb-4 text-sm`}>
            Please sign in to view your personalized dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="btn-primary text-sm px-4 py-2"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Professional Header */}
      <div className={`${classes.bg.card} ${classes.border.primary} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Dashboard</h1>
                <p className={`text-sm ${classes.text.secondary}`}>Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={`text-sm ${classes.text.secondary}`}>Level {dashboardData?.stats?.level || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className={`text-sm ${classes.text.secondary}`}>{dashboardData?.stats?.streak || 0} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm font-medium ${classes.text.primary}`}>{dashboardData?.stats?.totalPoints || 0} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Professional Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${classes.text.primary}`}>Quick Actions</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className={`text-sm ${classes.text.secondary}`}>{dashboardData?.stats?.achievementsCount || 0} achievements</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                title: 'Log Achievement', 
                subtitle: 'Record your progress',
                icon: Plus, 
                action: () => setActiveTab('log') 
              },
              { 
                title: 'Generate Resume', 
                subtitle: 'Create professional CV',
                icon: FileText, 
                action: () => window.location.href = '/resume' 
              },
              { 
                title: 'Practice Interview', 
                subtitle: 'Prepare for success',
                icon: MessageSquare, 
                action: () => window.location.href = '/interview' 
              },
              { 
                title: 'AI Career Coach', 
                subtitle: 'Get personalized advice',
                icon: Sparkles, 
                action: () => window.location.href = '/ai-coach' 
              }
            ].map((action, index) => (
              <button
                key={action.title}
                onClick={action.action}
                className={`group p-4 ${classes.bg.card} ${classes.border.primary} border rounded-lg hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <action.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-medium text-sm ${classes.text.primary} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs ${classes.text.secondary} mt-1`}>
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Professional Progress Section */}
        <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mb-8`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${classes.text.primary}`}>Progress to Level {((dashboardData?.stats?.level || 1) + 1)}</h3>
            <span className={`text-sm ${classes.text.secondary}`}>
              {dashboardData?.stats?.totalPoints || 0} / {((dashboardData?.stats?.level || 1) + 1) * 1000} points
            </span>
          </div>
          <div className={`w-full ${classes.bg.tertiary} rounded-full h-2 overflow-hidden`}>
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{
                width: `${Math.min(100, ((dashboardData?.stats?.totalPoints || 0) / (((dashboardData?.stats?.level || 1) + 1) * 1000)) * 100)}%`
              }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* Professional Tab Navigation */}
          <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
            {[
              { id: 'feed', label: 'Activity Feed', icon: Activity },
              { id: 'log', label: 'Log Achievement', icon: Plus }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'log' && (
              <motion.div
                key="log"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl p-6`}
              >
                <h2 className={`text-xl font-bold ${classes.text.primary} mb-6`}>Log New Achievement</h2>
                
                <form onSubmit={handleAchievementSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                      Describe your achievement
                    </label>
                    <textarea
                      value={achievementForm.description}
                      onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-3 ${classes.bg.input} ${classes.border.primary} border rounded-xl ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                      placeholder="Describe what you accomplished today..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium ${classes.text.primary} mb-3`}>Category</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'work', label: 'Work', icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
                          { value: 'learning', label: 'Learning', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
                          { value: 'personal', label: 'Personal', icon: Heart, color: 'from-pink-500 to-rose-500' }
                        ].map((category) => {
                          const IconComponent = category.icon
                          return (
                            <button
                              key={category.value}
                              type="button"
                              onClick={() => setAchievementForm(prev => ({ ...prev, category: category.value }))}
                              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                                achievementForm.category === category.value
                                  ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                                  : `${classes.border.primary} ${classes.bg.input} ${classes.text.secondary} hover:${classes.bg.secondary}`
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="text-sm font-medium">{category.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${classes.text.primary} mb-3`}>Impact Level</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'low', label: 'Small', points: 10, color: 'from-green-500 to-emerald-500' },
                          { value: 'medium', label: 'Medium', points: 25, color: 'from-blue-500 to-cyan-500' },
                          { value: 'high', label: 'High', points: 50, color: 'from-orange-500 to-red-500' }
                        ].map((impact) => (
                          <button
                            key={impact.value}
                            type="button"
                            onClick={() => setAchievementForm(prev => ({ ...prev, impact: impact.value }))}
                            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                              achievementForm.impact === impact.value
                                ? `bg-gradient-to-r ${impact.color} text-white border-transparent`
                                : `${classes.border.primary} ${classes.bg.input} ${classes.text.secondary} hover:${classes.bg.secondary}`
                            }`}
                          >
                            <div className="text-lg font-bold">{impact.points}</div>
                            <span className="text-sm font-medium">{impact.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setShowHelp(true)}
                        className={`flex items-center gap-2 text-sm ${classes.text.secondary} hover:${classes.text.primary}`}
                      >
                        <HelpCircle className="w-4 h-4" />
                        Help
                      </button>
                      <button
                        type="button"
                        onClick={handleAIRefinement}
                        disabled={isRefining || !achievementForm.description.trim()}
                        className={`flex items-center gap-2 text-sm ${isRefining ? classes.text.muted : 'text-purple-500 hover:text-purple-600'}`}
                      >
                        {isRefining ? 'Refining...' : 'Refine with AI'}
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!achievementForm.description.trim()}
                      className={`px-6 py-2 rounded-xl font-medium transition-all ${
                        achievementForm.description.trim()
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                      }`}
                    >
                      Post Achievement
                    </button>
                  </div>

                  {refinedDescription && (
                    <div className={`${classes.bg.tertiary} rounded-xl p-4 border-l-4 border-purple-500`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-medium ${classes.text.primary}`}>AI Refined Version</span>
                        <button
                          onClick={applyRefinedDescription}
                          className="text-sm text-purple-500 hover:text-purple-600"
                        >
                          Apply
                        </button>
                      </div>
                      <p className={`text-sm ${classes.text.secondary}`}>{refinedDescription}</p>
                    </div>
                  )}
                </form>
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {dashboardData?.achievements?.map((achievement, index) => {
                  const CategoryIcon = getCategoryIcon(achievement.category || 'work')
                  return (
                    <div
                      key={achievement.id}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 hover:shadow-sm transition-shadow`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-sm font-medium ${classes.text.primary} truncate`}>
                                {achievement.title}
                              </h3>
                              <div className="flex items-center gap-3 mt-1">
                                <span className={`text-xs ${classes.text.secondary}`}>{formatTimeAgo(achievement.date)}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getImpactColor(achievement.impact || 'medium')} ${classes.bg.tertiary}`}>
                                  {getImpactLabel(achievement.impact || 'medium')}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className={`text-xs font-medium ${classes.text.primary}`}>
                                    {achievement.points || 25}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 p-1">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <p className={`${classes.text.secondary} text-sm leading-relaxed mb-3 line-clamp-3`}>
                            {achievement.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{achievement.likes || 0}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors">
                                <MessageCircle className="w-3 h-3" />
                                <span className="text-xs">{achievement.comments || 0}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
                                <Share className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3 text-gray-400" />
                              <span className={`text-xs ${classes.text.secondary}`}>
                                {new Date(achievement.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
