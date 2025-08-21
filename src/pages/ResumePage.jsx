import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import { 
  FileEdit, 
  MessageSquare, 
  FileText, 
  Download, 
  Trash2, 
  Star, 
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Plus,
  Home,
  BookOpen,
  Sparkles,
  User,
  BarChart3,
  Activity,
  Award,
  Crown,
  Heart,
  Briefcase,
  Lightbulb,
  Search,
  X,
  Settings,
  Palette,
  Type,
  Layout,
  Eye,
  Share2,
  Copy,
  Edit3,
  Save,
  RotateCcw,
  Play,
  Pause,
  Target,
  TrendingUp,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import mockDataService from '../services/mockDataService'

const ResumePage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('generator')
  const [currentStep, setCurrentStep] = useState(1)
  const [documentType, setDocumentType] = useState('resume')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedDocument, setGeneratedDocument] = useState(null)
  const [resumes, setResumes] = useState([])
  const [coverLetters, setCoverLetters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  
  // Resume configuration
  const [resumeConfig, setResumeConfig] = useState({
    template: 'modern',
    maxPages: 1,
    includeEmail: true,
    includePhone: true,
    includeAddress: false
  })
  
  // Cover letter configuration
  const [coverLetterConfig, setCoverLetterConfig] = useState({
    tone: 'professional',
    jobTitle: '',
    company: '',
    jobDescription: ''
  })
  
  // Templates
  const resumeTemplates = [
    { id: 'modern', name: 'Modern', icon: Layout, color: 'blue', description: 'Clean and contemporary design with strong visual hierarchy' },
    { id: 'classic', name: 'Classic', icon: FileText, color: 'green', description: 'Traditional format with professional appearance' },
    { id: 'creative', name: 'Creative', icon: Palette, color: 'purple', description: 'Unique design for creative industries' },
    { id: 'minimal', name: 'Minimal', icon: Type, color: 'orange', description: 'Simple and clean with focus on content' }
  ]
  
  const coverLetterTemplates = [
    { id: 'professional', name: 'Professional', icon: Briefcase, color: 'blue', description: 'Formal tone suitable for corporate environments' },
    { id: 'friendly', name: 'Friendly', icon: Heart, color: 'green', description: 'Warm and approachable tone' },
    { id: 'confident', name: 'Confident', icon: Crown, color: 'yellow', description: 'Assertive and self-assured approach' },
    { id: 'enthusiastic', name: 'Enthusiastic', icon: Zap, color: 'orange', description: 'Energetic and passionate tone' }
  ]

  const documentCategories = [
    { id: 'all', name: 'All Documents', icon: FileText, color: 'blue' },
    { id: 'resume', name: 'Resumes', icon: FileEdit, color: 'green' },
    { id: 'cover-letter', name: 'Cover Letters', icon: MessageSquare, color: 'purple' },
    { id: 'portfolio', name: 'Portfolios', icon: Briefcase, color: 'yellow' }
  ]

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration
      const mockResumes = [
        {
          id: '1',
          name: 'Software Engineer Resume',
          type: 'resume',
          template: 'modern',
          createdAt: '2024-02-15T10:30:00Z',
          updatedAt: '2024-02-15T10:30:00Z',
          status: 'published',
          views: 45,
          downloads: 12,
          lastEdited: '2024-02-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Senior Developer Resume',
          type: 'resume',
          template: 'classic',
          createdAt: '2024-02-12T14:20:00Z',
          updatedAt: '2024-02-12T14:20:00Z',
          status: 'draft',
          views: 23,
          downloads: 5,
          lastEdited: '2024-02-12T14:20:00Z'
        },
        {
          id: '3',
          name: 'Frontend Developer Cover Letter',
          type: 'cover-letter',
          template: 'professional',
          createdAt: '2024-02-10T09:15:00Z',
          updatedAt: '2024-02-10T09:15:00Z',
          status: 'published',
          views: 18,
          downloads: 8,
          lastEdited: '2024-02-10T09:15:00Z'
        },
        {
          id: '4',
          name: 'Tech Lead Portfolio',
          type: 'portfolio',
          template: 'creative',
          createdAt: '2024-02-08T16:45:00Z',
          updatedAt: '2024-02-08T16:45:00Z',
          status: 'published',
          views: 67,
          downloads: 15,
          lastEdited: '2024-02-08T16:45:00Z'
        },
        {
          id: '5',
          name: 'React Developer Resume',
          type: 'resume',
          template: 'minimal',
          createdAt: '2024-02-05T11:30:00Z',
          updatedAt: '2024-02-05T11:30:00Z',
          status: 'draft',
          views: 12,
          downloads: 3,
          lastEdited: '2024-02-05T11:30:00Z'
        }
      ]
      
      setResumes(mockResumes.filter(doc => doc.type === 'resume'))
      setCoverLetters(mockResumes.filter(doc => doc.type === 'cover-letter'))
      setLoading(false)
    } catch (error) {
      console.error('Error loading documents:', error)
      toast.error('Failed to load documents')
      setLoading(false)
    }
  }

  const getTemplateIcon = (templateId) => {
    const template = [...resumeTemplates, ...coverLetterTemplates].find(t => t.id === templateId)
    return template ? template.icon : FileText
  }

  const getTemplateColor = (templateId) => {
    const template = [...resumeTemplates, ...coverLetterTemplates].find(t => t.id === templateId)
    return template ? template.color : 'blue'
  }

  const getCategoryIcon = (category) => {
    const cat = documentCategories.find(c => c.id === category)
    return cat ? cat.icon : FileText
  }

  const getCategoryColor = (category) => {
    const cat = documentCategories.find(c => c.id === category)
    return cat ? cat.color : 'blue'
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

  // Filter documents based on search and category
  const allDocuments = [...resumes, ...coverLetters]
  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeTab === 'all' || doc.type === activeTab
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const documentsPerPage = 5
  const totalDocuments = filteredDocuments.length
  const totalPages = Math.ceil(totalDocuments / documentsPerPage)
  const startIndex = (currentPage - 1) * documentsPerPage
  const endIndex = startIndex + documentsPerPage
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleGenerateDocument = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate AI generation progress over 5 seconds
    const totalTime = 5000 // 5 seconds in milliseconds
    const interval = 100 // Update every 100ms for smoother animation
    const progressIncrement = (interval / totalTime) * 100
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsGenerating(false)
          toast.success('Document generated successfully!')
          return 100
        }
        return prev + progressIncrement
      })
    }, interval)
  }

  const handleDownload = (documentId) => {
    toast.success('Download started!')
  }

  const handleShare = (documentId) => {
    toast.success('Share link copied to clipboard!')
  }

  const handleDelete = (documentId) => {
    toast.success('Document deleted!')
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSaveGeneratedDocument = () => {
    if (generatedDocument) {
      if (generatedDocument.type === 'resume') {
        setResumes(prev => [generatedDocument, ...prev])
      } else {
        setCoverLetters(prev => [generatedDocument, ...prev])
      }
      setGeneratedDocument(null)
      setCurrentStep(1)
      setActiveTab('resumes')
      toast.success('Document saved successfully!')
    }
  }

  const handleRegenerateDocument = () => {
    setGeneratedDocument(null)
    handleGenerateDocument()
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className={`${classes.text.secondary}`}>Loading your documents...</p>
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
                Resume Builder
              </h1>
              <p className={`text-xs ${classes.text.secondary} flex items-center gap-2`}>
                <Sparkles className="w-3 h-3 text-cyan-500" />
                AI-powered documents, <span className="bg-gradient-to-r from-cyan-500 to-magenta-500 bg-clip-text text-transparent font-semibold">based on your achievements</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Quick Actions */}
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
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Create New Resume', icon: Plus, action: () => setDocumentType('resume'), color: 'green' },
                { title: 'Create Cover Letter', icon: MessageSquare, action: () => setDocumentType('cover-letter'), color: 'blue' },
                { title: 'View Dashboard', icon: BarChart3, action: () => window.location.href = '/dashboard', color: 'purple' },
                { title: 'Interview Prep', icon: BookOpen, action: () => window.location.href = '/interview', color: 'yellow' }
              ].map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 hover:shadow-md ${classes.text.secondary} hover:${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-magenta-500/5`}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 text-cyan-500`} />
                  </div>
                  <span className="text-xs font-semibold">{item.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-4 shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-sm font-bold ${classes.text.primary}`}>Document Types</h3>
            </div>
            <div className="space-y-2">
              {documentCategories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    setActiveTab(category.id)
                    setCurrentPage(1)
                  }}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 hover:shadow-md ${
                    activeTab === category.id 
                      ? `${classes.bg.secondary} ${classes.text.primary} shadow-md`
                      : `${classes.text.secondary} hover:${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-magenta-500/5`
                  }`}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center`}>
                    <category.icon className={`w-4 h-4 text-cyan-500`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold">{category.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {allDocuments.filter(doc => category.id === 'all' || doc.type === category.id).length} documents
                    </p>
                  </div>
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
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Documents</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{allDocuments.length}</p>
                </div>
                <div className="text-center p-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-400/20">
                  <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Views</p>
                  <p className={`text-sm font-bold ${classes.text.primary}`}>{allDocuments.reduce((sum, doc) => sum + doc.views, 0)}</p>
                </div>
              </div>
              <div className="text-center p-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/20">
                <p className={`text-xs ${classes.text.secondary} mb-0.5`}>Total Downloads</p>
                <p className={`text-sm font-bold ${classes.text.primary}`}>
                  {allDocuments.reduce((sum, doc) => sum + doc.downloads, 0)}
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
                    {activeTab === 'generator' ? 'Create Document' : 
                     activeTab === 'all' ? 'All Documents' : 
                     `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
                  </h2>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    {activeTab === 'generator' ? 'Step-by-step document creation' : 
                     `${totalDocuments} document${totalDocuments !== 1 ? 's' : ''} • Based on your achievements`}
                  </p>
                </div>
                {activeTab !== 'generator' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab('generator')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    Create New
                  </motion.button>
                )}
              </motion.div>

              {/* Tab Navigation */}
              {activeTab !== 'generator' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6"
                >
                  {[
                    { id: 'all', label: 'All Documents', icon: FileText },
                    { id: 'resume', label: 'Resumes', icon: FileEdit },
                    { id: 'cover-letter', label: 'Cover Letters', icon: MessageSquare }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                        activeTab === tab.id
                          ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Search */}
              {activeTab !== 'generator' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder="Search documents..."
                    className={`w-full px-4 py-3 pl-12 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                  />
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>
              )}

              {/* Generator Content */}
              {activeTab === 'generator' && (
                <div className="space-y-6">
                  {/* Step Indicator */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={`step-${step}`} className="flex items-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => step <= currentStep && setCurrentStep(step)}
                            disabled={step > currentStep}
                            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                              step <= currentStep 
                                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg' 
                                : `${classes.bg.tertiary} ${classes.text.muted} border ${classes.border.primary} cursor-not-allowed`
                            } ${step < currentStep ? 'hover:from-cyan-600 hover:to-magenta-600' : ''}`}
                          >
                            {step < currentStep ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <span className="font-bold">{step}</span>
                            )}
                          </motion.button>
                          {step < 4 && (
                            <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-500 ${
                              step < currentStep 
                                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500' 
                                : classes.bg.tertiary
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                      <span>Document Type</span>
                      <span>Template</span>
                      <span>Customize</span>
                      <span>Generate</span>
                    </div>
                  </motion.div>

                  {/* Step Content */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                    >
                      <div className="text-center mb-6">
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Choose Document Type
                        </h3>
                        <p className={`${classes.text.secondary} text-sm`}>Select the type of document you want to create</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDocumentType('resume')}
                          className={`group relative p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                            documentType === 'resume'
                              ? 'bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 border-cyan-300 dark:border-cyan-500 shadow-lg'
                              : `${classes.bg.tertiary} ${classes.border.primary} hover:border-cyan-300 dark:hover:border-cyan-500 hover:shadow-md`
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              documentType === 'resume'
                                ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg'
                                : 'bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 text-cyan-600 dark:text-cyan-400'
                            }`}>
                              <FileEdit className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className={`font-bold ${classes.text.primary}`}>Resume</h4>
                              <p className={`text-sm ${classes.text.secondary}`}>Professional CV</p>
                            </div>
                          </div>
                          <p className={`text-sm ${classes.text.secondary} leading-relaxed`}>
                            Create a comprehensive resume highlighting your achievements, experience, and skills with AI-powered optimization.
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                              <span>ATS Optimized</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-magenta-500 rounded-full"></div>
                              <span>Multiple Templates</span>
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setDocumentType('cover-letter')}
                          className={`group relative p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                            documentType === 'cover-letter'
                              ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-300 dark:border-green-500 shadow-lg'
                              : `${classes.bg.tertiary} ${classes.border.primary} hover:border-green-300 dark:hover:border-green-500 hover:shadow-md`
                          }`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              documentType === 'cover-letter'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                                : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400'
                            }`}>
                              <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className={`font-bold ${classes.text.primary}`}>Cover Letter</h4>
                              <p className={`text-sm ${classes.text.secondary}`}>Professional Letter</p>
                            </div>
                          </div>
                          <p className={`text-sm ${classes.text.secondary} leading-relaxed`}>
                            Create a compelling cover letter tailored to specific job opportunities with AI-powered personalization.
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Job-Specific</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span>AI Tailored</span>
                            </div>
                          </div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                    >
                      <div className="text-center mb-6">
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Choose Template
                        </h3>
                        <p className={`${classes.text.secondary} text-sm`}>Select a template that matches your style and industry</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(documentType === 'resume' ? resumeTemplates : coverLetterTemplates).map((template, index) => (
                          <motion.button
                            key={template.id}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (documentType === 'resume') {
                                setResumeConfig({ ...resumeConfig, template: template.id })
                              } else {
                                setCoverLetterConfig({ ...coverLetterConfig, tone: template.id })
                              }
                            }}
                            className={`group relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                              (documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id
                                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-300 dark:border-purple-500 shadow-lg'
                                : `${classes.bg.tertiary} ${classes.border.primary} hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md`
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  (documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400'
                                }`}>
                                  <template.icon className="w-4 h-4" />
                                </div>
                                <h4 className={`font-bold ${classes.text.primary}`}>{template.name}</h4>
                              </div>
                              {(documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id && (
                                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <p className={`text-sm ${classes.text.secondary} leading-relaxed`}>{template.description}</p>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                    >
                      <div className="text-center mb-6">
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Customize Settings
                        </h3>
                        <p className={`${classes.text.secondary} text-sm`}>Configure your document preferences</p>
                      </div>
                      
                      <div className="space-y-6">
                        {documentType === 'resume' ? (
                          <>
                            <div>
                              <label className={`block text-sm font-bold ${classes.text.primary} mb-3`}>
                                Maximum Pages
                              </label>
                              <select
                                value={resumeConfig.maxPages}
                                onChange={(e) => setResumeConfig({ ...resumeConfig, maxPages: parseInt(e.target.value) })}
                                className={`w-full px-4 py-3 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                              >
                                <option value={1}>1 Page</option>
                                <option value={2}>2 Pages</option>
                                <option value={3}>3 Pages</option>
                              </select>
                            </div>
                            
                            <div className="space-y-4">
                              <label className={`block text-sm font-bold ${classes.text.primary}`}>
                                Contact Information
                              </label>
                              <div className="space-y-3">
                                {[
                                  { key: 'includeEmail', label: 'Include Email Address' },
                                  { key: 'includePhone', label: 'Include Phone Number' },
                                  { key: 'includeAddress', label: 'Include Physical Address' }
                                ].map((item) => (
                                  <label key={item.key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <input
                                      type="checkbox"
                                      checked={resumeConfig[item.key]}
                                      onChange={(e) => setResumeConfig({ ...resumeConfig, [item.key]: e.target.checked })}
                                      className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                    />
                                    <span className={`text-sm ${classes.text.secondary}`}>{item.label}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div>
                            <label className={`block text-sm font-bold ${classes.text.primary} mb-3`}>
                              Job Description (Optional)
                            </label>
                            <textarea
                              value={coverLetterConfig.jobDescription}
                              onChange={(e) => setCoverLetterConfig({ ...coverLetterConfig, jobDescription: e.target.value })}
                              placeholder="Paste the job description here to help AI tailor your cover letter..."
                              className={`w-full h-32 px-4 py-3 border-2 ${classes.border.primary} rounded-xl ${classes.bg.input} ${classes.text.primary} resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300`}
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && !isGenerating && !generatedDocument && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                    >
                      <div className="text-center mb-6">
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Review & Generate
                        </h3>
                        <p className={`${classes.text.secondary} text-sm`}>Review your configuration before AI generation</p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-200 dark:border-green-800 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                          <h4 className={`font-bold ${classes.text.primary}`}>Configuration Summary</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`${classes.bg.card} p-4 rounded-xl border ${classes.border.primary}`}>
                            <h5 className={`font-bold ${classes.text.primary} mb-3 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                              Document Settings
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className={classes.text.secondary}>Type:</span>
                                <span className={`font-medium text-cyan-600 dark:text-cyan-400`}>
                                  {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={classes.text.secondary}>Template:</span>
                                <span className={`font-medium ${classes.text.primary}`}>
                                  {documentType === 'resume' 
                                    ? resumeTemplates.find(t => t.id === resumeConfig.template)?.name
                                    : coverLetterTemplates.find(t => t.id === coverLetterConfig.tone)?.name
                                  }
                                </span>
                              </div>
                              {documentType === 'resume' && (
                                <div className="flex justify-between">
                                  <span className={classes.text.secondary}>Pages:</span>
                                  <span className={`font-medium ${classes.text.primary}`}>
                                    {resumeConfig.maxPages} {resumeConfig.maxPages === 1 ? 'Page' : 'Pages'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className={`${classes.bg.card} p-4 rounded-xl border ${classes.border.primary}`}>
                            <h5 className={`font-bold ${classes.text.primary} mb-3 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {documentType === 'resume' ? 'Contact Info' : 'Job Details'}
                            </h5>
                            <div className="space-y-2 text-sm">
                              {documentType === 'resume' ? (
                                <>
                                  <div className="flex justify-between">
                                    <span className={classes.text.secondary}>Email:</span>
                                    <span className={`font-medium ${resumeConfig.includeEmail ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                      {resumeConfig.includeEmail ? '✓ Included' : '✗ Excluded'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className={classes.text.secondary}>Phone:</span>
                                    <span className={`font-medium ${resumeConfig.includePhone ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                      {resumeConfig.includePhone ? '✓ Included' : '✗ Excluded'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className={classes.text.secondary}>Address:</span>
                                    <span className={`font-medium ${resumeConfig.includeAddress ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                      {resumeConfig.includeAddress ? '✓ Included' : '✗ Excluded'}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-between">
                                    <span className={classes.text.secondary}>Job Title:</span>
                                    <span className={`font-medium ${classes.text.primary}`}>
                                      {coverLetterConfig.jobTitle || 'Auto-detected'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className={classes.text.secondary}>Company:</span>
                                    <span className={`font-medium ${classes.text.primary}`}>
                                      {coverLetterConfig.company || 'Auto-detected'}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <h4 className={`font-bold ${classes.text.primary}`}>AI Generation Features</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span className={classes.text.secondary}>Achievement-Based</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span className={classes.text.secondary}>Professional Format</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span className={classes.text.secondary}>ATS Optimized</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                            <span className={classes.text.secondary}>Industry Specific</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Generation Animation Step */}
                  {currentStep === 4 && isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-8 shadow-lg`}
                    >
                      <div className="text-center">
                        {/* AI Brain Animation */}
                        <div className="relative mb-8">
                          <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full animate-ping"></div>
                            </div>
                          </div>
                          <div className="absolute inset-0 w-24 h-24 border-4 border-cyan-300 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
                        </div>

                        <h3 className={`text-2xl font-bold ${classes.text.primary} mb-3`}>
                          AI is Generating Your {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
                        </h3>
                        <p className={`${classes.text.secondary} mb-8`}>
                          Our AI is analyzing your achievements and creating a professional document...
                        </p>

                        {/* Progress Bar */}
                        <div className="mb-8">
                          <div className="flex justify-between text-sm mb-3">
                            <span className={classes.text.secondary}>Progress</span>
                            <span className={`font-bold ${classes.text.primary}`}>{Math.round(generationProgress)}%</span>
                          </div>
                          <div className={`w-full ${classes.bg.tertiary} rounded-full h-4 overflow-hidden`}>
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${generationProgress}%` }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        {/* Generation Steps */}
                        <div className="space-y-4 text-left max-w-md mx-auto">
                          {[
                            { text: "Analyzing your achievements", completed: generationProgress > 20 },
                            { text: "Optimizing content structure", completed: generationProgress > 40 },
                            { text: "Applying professional formatting", completed: generationProgress > 60 },
                            { text: "Finalizing document", completed: generationProgress > 80 },
                            { text: "Quality check and optimization", completed: generationProgress > 95 }
                          ].map((step, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                step.completed 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}>
                                {step.completed ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                )}
                              </div>
                              <span className={`text-sm ${step.completed ? classes.text.primary : classes.text.secondary}`}>
                                {step.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Estimated Time */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <p className={`text-sm ${classes.text.secondary}`}>
                            Estimated time remaining: {Math.max(0, Math.ceil((100 - generationProgress) / 20))} seconds
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Generated Document Step */}
                  {currentStep === 4 && generatedDocument && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 shadow-lg`}
                    >
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          {documentType === 'resume' ? 'Resume' : 'Cover Letter'} Generated Successfully!
                        </h3>
                        <p className={`${classes.text.secondary} text-sm`}>
                          Your AI-generated document is ready for review and download
                        </p>
                      </div>

                      {/* Document Preview */}
                      <div className={`${classes.bg.tertiary} rounded-xl p-6 mb-6`}>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className={`font-bold ${classes.text.primary}`}>{generatedDocument.title}</h4>
                            <p className={`text-sm ${classes.text.secondary}`}>
                              Template: {generatedDocument.template} • Based on {generatedDocument.basedOnAchievements} achievements
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white text-xs rounded-full font-medium`}>
                              {generatedDocument.type === 'resume' ? 'Resume' : 'Cover Letter'}
                            </span>
                          </div>
                        </div>

                        {/* Document Content Preview */}
                        <div className={`${classes.bg.card} rounded-xl p-4 border ${classes.border.primary}`}>
                          <h5 className={`font-bold ${classes.text.primary} mb-3`}>Document Preview</h5>
                          {generatedDocument.type === 'resume' ? (
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span className={classes.text.secondary}>Experience Section</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span className={classes.text.secondary}>Education Section</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span className={classes.text.secondary}>Skills Section</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className={classes.text.secondary}>
                                  {generatedDocument.content.maxPages} {generatedDocument.content.maxPages === 1 ? 'Page' : 'Pages'}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className={`text-sm ${classes.text.secondary} leading-relaxed`}>
                                {generatedDocument.content.substring(0, 200)}...
                              </p>
                              <div className="flex items-center gap-2 text-xs">
                                <span className={`px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-400 rounded`}>
                                  {generatedDocument.content.tone || 'Professional'} tone
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/document/${generatedDocument.type}/${generatedDocument.id}`)}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <FileText className="w-4 h-4" />
                          View Document
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSaveGeneratedDocument}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Save className="w-4 h-4" />
                          Save Document
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleDownload(generatedDocument, 'pdf')}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleRegenerateDocument}
                          className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Regenerate
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  {!generatedDocument && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className={`flex items-center justify-between pt-6 border-t ${classes.border.primary}/50`}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, x: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="group relative px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        <span className="font-bold text-gray-700">Previous</span>
                      </motion.button>
                      
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-full">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-gray-700">
                          Step {currentStep} of 4
                        </span>
                      </div>
                      
                      {currentStep < 4 ? (
                        <motion.button
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={nextStep}
                          className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-xl hover:from-cyan-600 hover:to-magenta-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                        >
                          <span className="font-bold text-white">Next</span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleGenerateDocument}
                          className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                        >
                          <Zap className="w-4 h-4 text-white" />
                          <span className="font-bold text-white">
                            Generate {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
                          </span>
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

                            {/* Documents Grid */}
              {activeTab !== 'generator' && (
                <div className="space-y-6">
                  {currentDocuments.map((document, index) => (
                    <motion.div
                      key={document.id}
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
                                const IconComponent = getCategoryIcon(document.type)
                                return <IconComponent className="w-5 h-5 text-cyan-500" />
                              })()}
                            </div>
                            <div className="flex-1">
                              <h3 className={`text-lg font-bold ${classes.text.primary} mb-1`}>
                                {document.name}
                              </h3>
                              <div className="flex items-center gap-4 text-xs">
                                <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                  <Calendar className="w-3 h-3" />
                                  {formatTimeAgo(document.createdAt)}
                                </span>
                                <span className={`${classes.text.secondary} capitalize`}>
                                  {document.type}
                                </span>
                                <span className={`${classes.text.secondary} flex items-center gap-1`}>
                                  {document.status === 'published' ? '🟢' : '🟡'} {document.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-blue-500" />
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                {document.views} views
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Download className="w-4 h-4 text-green-500" />
                              <span className="text-xs text-green-600 dark:text-green-400">
                                {document.downloads} downloads
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-xs text-yellow-600 dark:text-yellow-400">
                                {document.template} template
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDownload(document.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleShare(document.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                              >
                                <Share2 className="w-4 h-4" />
                                Share
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(document.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

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
                          <h3 className={`text-sm font-bold ${classes.text.primary}`}>Document Pages</h3>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            Showing {startIndex + 1}-{Math.min(endIndex, totalDocuments)} of {totalDocuments} documents
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
                <h2 className={`text-lg font-bold ${classes.text.primary}`}>Document Editor</h2>
                <p className={`text-xs ${classes.text.secondary}`}>Create and edit your documents</p>
              </div>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {/* Generation Progress */}
            {isGenerating && (
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Generating Document</h3>
                <div className="space-y-3">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 to-magenta-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${generationProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className={`text-xs ${classes.text.secondary} text-center`}>
                    {Math.round(generationProgress)}% complete
                  </p>
                </div>
              </div>
            )}

            {/* Template Selection */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Templates</h3>
              <div className="space-y-2">
                {resumeTemplates.map((template, index) => (
                  <motion.button
                    key={template.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? `${classes.bg.secondary} ${classes.text.primary} shadow-md`
                        : `${classes.text.secondary} hover:${classes.text.primary} hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-magenta-500/5`
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center`}>
                      <template.icon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold">{template.name}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {template.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Documents */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Recent Documents</h3>
              <div className="space-y-3">
                {allDocuments.slice(0, 3).map((document, index) => (
                  <motion.div
                    key={document.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {(() => {
                        const IconComponent = getCategoryIcon(document.type)
                        return <IconComponent className="w-3 h-3 text-cyan-500" />
                      })()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-medium ${classes.text.primary} line-clamp-2`}>
                        {document.name}
                      </p>
                      <p className={`text-xs ${classes.text.secondary} mt-1`}>
                        {formatTimeAgo(document.createdAt)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
              <h3 className={`text-sm font-bold ${classes.text.primary} mb-3`}>Resume Tips</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Keep it concise and focused on achievements</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-magenta-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Use action verbs and quantify results</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className={`text-xs ${classes.text.secondary}`}>Tailor content to the specific job</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
