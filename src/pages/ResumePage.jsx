import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import { getRandomMockUser } from '../utils/mockUserData'
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
  const { currentUser } = useAuth()
  const { classes } = useThemeClasses()
  const navigate = useNavigate()
  const [mockUser] = useState(getRandomMockUser())
  
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (activeTab === 'generator' && !generatedDocument) {
        if (event.key === 'ArrowLeft' && currentStep > 1) {
          prevStep()
        } else if (event.key === 'ArrowRight' && currentStep < 4) {
          nextStep()
        } else if (event.key === 'Enter' && currentStep === 4) {
          handleGenerateDocument()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentStep, activeTab, generatedDocument])

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
      {/* Left Sidebar */}
      <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-0 lg:h-screen flex flex-col border-r border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{mockUser.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Resume Builder
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                AI-powered document creation
              </p>
            </div>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Document Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Document Types
            </h3>
            <div className="space-y-2">
              {documentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id)
                    setCurrentPage(1)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeTab === category.id
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <category.icon className={`w-4 h-4 ${
                      activeTab === category.id
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Your Stats */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Your Stats
            </h3>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {resumes.length + coverLetters.length}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Total Documents
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="text-lg font-bold text-green-700 dark:text-green-300">
                  {resumes.length}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  Resumes Created
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {activeTab === 'generator' ? 'Create Document' : 
                 activeTab === 'all' ? 'All Documents' : 
                 `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s`}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activeTab === 'generator' ? 'Step-by-step document creation' : 
                 `${totalDocuments} document${totalDocuments !== 1 ? 's' : ''} • Based on your achievements`}
              </p>
            </div>
            {activeTab !== 'generator' && (
              <button
                onClick={() => setActiveTab('generator')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create New
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          {activeTab !== 'generator' && (
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
              {[
                { id: 'all', label: 'All Documents', icon: FileText },
                { id: 'resume', label: 'Resumes', icon: FileEdit },
                { id: 'cover-letter', label: 'Cover Letters', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          {activeTab !== 'generator' && (
            <div className="relative mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Search documents..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}

          {/* Generator Content */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              {/* Modern Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[
                  { step: 1, text: 'Document Type', icon: FileText, completed: currentStep >= 1 },
                  { step: 2, text: 'Template', icon: Settings, completed: currentStep >= 2 },
                  { step: 3, text: 'Customize', icon: Palette, completed: currentStep >= 3 },
                  { step: 4, text: 'Generate', icon: Zap, completed: currentStep >= 4 }
                ].map((step, index) => (
                  <div key={step.step} className="flex items-center">
                    <button
                      onClick={() => step.step <= currentStep && setCurrentStep(step.step)}
                      disabled={step.step > currentStep}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                        step.completed ? 'bg-green-500 text-white' : 
                        step.step === currentStep ? 'bg-blue-500 text-white' : 
                        'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.completed ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                    </button>
                    {index < 3 && (
                      <div className={`w-16 h-0.5 mx-2 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="flex-1 flex flex-col relative">
                {/* Left Navigation Arrow */}
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 ${classes.bg.card} backdrop-blur-sm ${classes.border.primary} border-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group`}
                >
                  <ChevronLeft className={`w-5 h-5 ${classes.text.secondary} group-hover:${classes.text.primary} transition-colors`} />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={currentStep < 4 ? nextStep : handleGenerateDocument}
                  disabled={currentStep === 4 && !documentType}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full hover:from-cyan-600 hover:to-magenta-600 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {currentStep < 4 ? (
                    <ChevronRight className="w-5 h-5 text-white" />
                  ) : (
                    <Zap className="w-5 h-5 text-white" />
                  )}
                </button>

                <div className="flex-1 overflow-y-auto p-6 px-16">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Choose Document Type
                        </h3>
                        <p className={`text-sm ${classes.text.secondary}`}>
                          Select the type of document you want to create with AI
                        </p>
                      </div>
                      
                      {/* Document Options */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Resume Option */}
                        <button
                          onClick={() => setDocumentType('resume')}
                          className={`group relative p-4 rounded-lg text-left transition-all duration-300 ${
                            documentType === 'resume'
                              ? `${classes.bg.secondary} ${classes.border.accent} border-2 shadow-lg`
                              : `${classes.bg.card} ${classes.border.primary} border-2 hover:${classes.bg.secondary} hover:${classes.border.accent} hover:shadow-md`
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <FileEdit className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className={`font-semibold ${classes.text.primary}`}>Resume</h4>
                              <p className={`text-xs ${classes.text.secondary}`}>Professional CV</p>
                            </div>
                          </div>
                          {documentType === 'resume' && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>

                        {/* Cover Letter Option */}
                        <button
                          onClick={() => setDocumentType('cover-letter')}
                          className={`group relative p-4 rounded-lg text-left transition-all duration-300 ${
                            documentType === 'cover-letter'
                              ? `${classes.bg.secondary} ${classes.border.accent} border-2 shadow-lg`
                              : `${classes.bg.card} ${classes.border.primary} border-2 hover:${classes.bg.secondary} hover:${classes.border.accent} hover:shadow-md`
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className={`font-semibold ${classes.text.primary}`}>Cover Letter</h4>
                              <p className={`text-xs ${classes.text.secondary}`}>Job application letter</p>
                            </div>
                          </div>
                          {documentType === 'cover-letter' && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Settings className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Choose Template
                        </h3>
                        <p className={`text-sm ${classes.text.secondary}`}>
                          Select a template that matches your style and industry
                        </p>
                      </div>
                      
                      {/* Template Options */}
                      <div className="grid grid-cols-2 gap-4">
                        {(documentType === 'resume' ? resumeTemplates : coverLetterTemplates).map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`group relative p-4 rounded-lg text-left transition-all duration-300 ${
                              selectedTemplate === template.id
                                ? `${classes.bg.secondary} ${classes.border.accent} border-2 shadow-lg`
                                : `${classes.bg.card} ${classes.border.primary} border-2 hover:${classes.bg.secondary} hover:${classes.border.accent} hover:shadow-md`
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 bg-gradient-to-r from-${template.color}-500 to-${template.color}-600 rounded-lg flex items-center justify-center`}>
                                <template.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className={`font-semibold ${classes.text.primary}`}>{template.name}</h4>
                                <p className={`text-xs ${classes.text.secondary}`}>{template.description}</p>
                              </div>
                            </div>
                            {selectedTemplate === template.id && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Palette className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Customize Settings
                        </h3>
                        <p className={`text-sm ${classes.text.secondary}`}>
                          Configure your document preferences and styling
                        </p>
                      </div>
                      
                      {/* Customization Options */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <Type className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className={`font-semibold ${classes.text.primary}`}>Content</h4>
                          </div>
                          <div className="space-y-2">
                            <label className={`flex items-center gap-2 text-sm ${classes.text.secondary}`}>
                              <input type="checkbox" checked={resumeConfig.includeEmail} onChange={(e) => setResumeConfig(prev => ({ ...prev, includeEmail: e.target.checked }))} className="rounded" />
                              Include Email
                            </label>
                            <label className={`flex items-center gap-2 text-sm ${classes.text.secondary}`}>
                              <input type="checkbox" checked={resumeConfig.includePhone} onChange={(e) => setResumeConfig(prev => ({ ...prev, includePhone: e.target.checked }))} className="rounded" />
                              Include Phone
                            </label>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <Layout className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className={`font-semibold ${classes.text.primary}`}>Layout</h4>
                          </div>
                          <div className="space-y-2">
                            <label className={`flex items-center gap-2 text-sm ${classes.text.secondary}`}>
                              <input type="radio" name="maxPages" value="1" checked={resumeConfig.maxPages === 1} onChange={(e) => setResumeConfig(prev => ({ ...prev, maxPages: parseInt(e.target.value) }))} className="rounded" />
                              1 Page
                            </label>
                            <label className={`flex items-center gap-2 text-sm ${classes.text.secondary}`}>
                              <input type="radio" name="maxPages" value="2" checked={resumeConfig.maxPages === 2} onChange={(e) => setResumeConfig(prev => ({ ...prev, maxPages: parseInt(e.target.value) }))} className="rounded" />
                              2 Pages
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-2`}>
                          Review & Generate
                        </h3>
                        <p className={`text-sm ${classes.text.secondary}`}>
                          Review your settings and generate your document
                        </p>
                      </div>
                      
                      {/* Summary */}
                      <div className={`p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <h4 className={`font-semibold ${classes.text.primary}`}>Document Summary</h4>
                        </div>
                        <div className="space-y-3">
                          <div className={`flex justify-between items-center p-2 rounded ${classes.bg.tertiary}`}>
                            <span className={`text-sm ${classes.text.secondary}`}>Type:</span>
                            <span className={`text-sm font-medium ${classes.text.primary} capitalize`}>{documentType}</span>
                          </div>
                          <div className={`flex justify-between items-center p-2 rounded ${classes.bg.tertiary}`}>
                            <span className={`text-sm ${classes.text.secondary}`}>Template:</span>
                            <span className={`text-sm font-medium ${classes.text.primary}`}>{selectedTemplate}</span>
                          </div>
                          <div className={`flex justify-between items-center p-2 rounded ${classes.bg.tertiary}`}>
                            <span className={`text-sm ${classes.text.secondary}`}>Pages:</span>
                            <span className={`text-sm font-medium ${classes.text.primary}`}>{resumeConfig.maxPages}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Documents Grid */}
          {activeTab !== 'generator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDocuments.map((document, index) => (
                <div
                  key={document.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        {(() => {
                          const IconComponent = getCategoryIcon(document.type)
                          return <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        })()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {document.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {document.type}
                        </p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      document.status === 'published' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {document.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimeAgo(document.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {document.views} views
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDownload(document.id)}
                      className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Document Pages</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Showing {startIndex + 1}-{Math.min(endIndex, totalDocuments)} of {totalDocuments} documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Page</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 px-3 py-1 rounded-lg">
                      {currentPage} of {totalPages}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                        : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:${classes.bg.secondary}`
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-cyan-500 to-magenta-500 text-white shadow-lg'
                            : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:${classes.bg.secondary}`
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                        : `${classes.bg.card} ${classes.border.primary} border hover:shadow-md ${classes.text.primary} hover:${classes.bg.secondary}`
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ResumePage
