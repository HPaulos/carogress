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
  Sparkles
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
  const [resumes, setResumes] = useState([])
  const [coverLetters, setCoverLetters] = useState([])
  
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
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design with strong visual hierarchy' },
    { id: 'classic', name: 'Classic', description: 'Traditional format with professional appearance' },
    { id: 'creative', name: 'Creative', description: 'Unique design for creative industries' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and clean with focus on content' }
  ]
  
  const coverLetterTemplates = [
    { id: 'professional', name: 'Professional', description: 'Formal tone suitable for corporate environments' },
    { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone' },
    { id: 'confident', name: 'Confident', description: 'Assertive and self-assured approach' },
    { id: 'enthusiastic', name: 'Enthusiastic', description: 'Energetic and passionate tone' }
  ]

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const data = await mockDataService.getDocuments()
      setResumes(data.resumes || [])
      setCoverLetters(data.coverLetters || [])
    } catch (error) {
      console.error('Error loading documents:', error)
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateDocument = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Simulate AI generation progress over 2 minutes (120 seconds)
    const totalTime = 120000 // 2 minutes in milliseconds
    const interval = 1000 // Update every second
    const progressIncrement = (interval / totalTime) * 100
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + progressIncrement
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, interval)
    
    // Complete generation after 2 minutes
    setTimeout(() => {
      clearInterval(progressInterval)
      setGenerationProgress(100)
      
      // Add a small delay to show 100% completion
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationProgress(0)
        toast.success(`${documentType === 'resume' ? 'Resume' : 'Cover letter'} generated successfully!`)
        setCurrentStep(1)
        setActiveTab('resumes')
        loadDocuments()
      }, 1000)
    }, totalTime)
  }

  const handleDownload = (document, format = 'pdf') => {
    toast.success(`Downloading ${document.title} as ${format.toUpperCase()}...`)
    // In a real app, this would trigger a download
  }

  const handleCopy = (document) => {
    const content = document.type === 'resume' 
      ? JSON.stringify(document.content, null, 2)
      : document.content
    
    navigator.clipboard.writeText(content)
    toast.success('Content copied to clipboard!')
  }

  const handleDelete = (documentId, type) => {
    if (type === 'resume') {
      setResumes(resumes.filter(r => r.id !== documentId))
    } else {
      setCoverLetters(coverLetters.filter(cl => cl.id !== documentId))
    }
    toast.success('Document deleted successfully')
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
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Please sign in to access your documents</h2>
          <p className={classes.text.secondary}>You need to be logged in to view your resumes and cover letters.</p>
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
              <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Resume & Cover Letter</h1>
              <p className={`text-sm ${classes.text.secondary}`}>
                Create professional documents with AI assistance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab('generator')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New
              </button>
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
                    { title: 'Generate Resume', icon: FileText, action: () => setActiveTab('generator') },
                    { title: 'Practice Interview', icon: MessageSquare, action: () => window.location.href = '/interview' },
                    { title: 'View Stories', icon: BookOpen, action: () => window.location.href = '/stories' },
                    { title: 'AI Career Coach', icon: Sparkles, action: () => window.location.href = '/ai-coach' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        item.title === 'Generate Resume' && activeTab === 'generator'
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
              
              {/* Document Stats */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Document Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Total Resumes</span>
                    <span className={`font-medium ${classes.text.primary}`}>{resumes.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Cover Letters</span>
                    <span className={`font-medium ${classes.text.primary}`}>{coverLetters.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Total Downloads</span>
                    <span className={`font-medium ${classes.text.primary}`}>
                      {resumes.reduce((sum, r) => sum + r.downloads, 0) + coverLetters.reduce((sum, cl) => sum + cl.downloads, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-6">
            {/* Tab Navigation */}
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
              {[
                { id: 'generator', label: 'Create Document', icon: Plus },
                { id: 'resumes', label: 'Resumes', icon: FileText },
                { id: 'cover-letters', label: 'Cover Letters', icon: MessageSquare }
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

            {/* Generator Content */}
            {activeTab === 'generator' && (
              <div className="space-y-4">
                {/* Step Indicator */}
                <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <button
                          onClick={() => step <= currentStep && setCurrentStep(step)}
                          disabled={step > currentStep}
                          className={`relative w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                            step <= currentStep 
                              ? 'bg-blue-600 text-white shadow-sm' 
                              : `${classes.bg.tertiary} ${classes.text.muted} border ${classes.border.primary} cursor-not-allowed`
                          } ${step < currentStep ? 'hover:bg-blue-700' : ''}`}
                        >
                          {step < currentStep ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <span className="font-bold">{step}</span>
                          )}
                        </button>
                        {step < 4 && (
                          <div className={`w-12 h-0.5 mx-2 rounded-full transition-all duration-500 ${
                            step < currentStep 
                              ? 'bg-blue-600' 
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
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6`}>
                    <div className="text-center mb-6">
                      <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                        Choose Document Type
                      </h3>
                      <p className={`${classes.text.secondary} text-sm`}>Select the type of document you want to create</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setDocumentType('resume')}
                        className={`group relative p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                          documentType === 'resume'
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-500 shadow-sm'
                            : `${classes.bg.tertiary} ${classes.border.primary} hover:border-blue-300 dark:hover:border-blue-500`
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            documentType === 'resume'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}>
                            <FileEdit className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className={`font-medium ${classes.text.primary}`}>Resume</h4>
                            <p className={`text-xs ${classes.text.secondary}`}>Professional CV</p>
                          </div>
                        </div>
                        <p className={`text-xs ${classes.text.secondary} leading-relaxed`}>
                          Create a comprehensive resume highlighting your achievements, experience, and skills with AI-powered optimization.
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>ATS Optimized</span>
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span>Multiple Templates</span>
                        </div>
                      </button>

                      <button
                        onClick={() => setDocumentType('cover-letter')}
                        className={`group relative p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                          documentType === 'cover-letter'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-500 shadow-sm'
                            : `${classes.bg.tertiary} ${classes.border.primary} hover:border-green-300 dark:hover:border-green-500`
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            documentType === 'cover-letter'
                              ? 'bg-green-600 text-white'
                              : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          }`}>
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className={`font-medium ${classes.text.primary}`}>Cover Letter</h4>
                            <p className={`text-xs ${classes.text.secondary}`}>Professional Letter</p>
                          </div>
                        </div>
                        <p className={`text-xs ${classes.text.secondary} leading-relaxed`}>
                          Create a compelling cover letter tailored to specific job opportunities with AI-powered personalization.
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>Job-Specific</span>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>AI Tailored</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6`}>
                    <div className="text-center mb-6">
                      <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                        Choose Template
                      </h3>
                      <p className={`${classes.text.secondary} text-sm`}>Select a template that matches your style and industry</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(documentType === 'resume' ? resumeTemplates : coverLetterTemplates).map((template, index) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            if (documentType === 'resume') {
                              setResumeConfig({ ...resumeConfig, template: template.id })
                            } else {
                              setCoverLetterConfig({ ...coverLetterConfig, tone: template.id })
                            }
                          }}
                          className={`group relative p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                            (documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id
                              ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-500 shadow-sm'
                              : `${classes.bg.tertiary} ${classes.border.primary} hover:border-purple-300 dark:hover:border-purple-500`
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className={`font-medium ${classes.text.primary}`}>{template.name}</h4>
                            {(documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id && (
                              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className={`text-xs ${classes.text.secondary} leading-relaxed`}>{template.description}</p>
                          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>Professional</span>
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                            <span>Modern</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6`}>
                    <div className="text-center mb-6">
                      <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                        Customize Settings
                      </h3>
                      <p className={`${classes.text.secondary} text-sm`}>Configure your document preferences</p>
                    </div>
                    
                    <div className="space-y-4">
                      {documentType === 'resume' ? (
                        <>
                          <div>
                            <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                              Maximum Pages
                            </label>
                            <select
                              value={resumeConfig.maxPages}
                              onChange={(e) => setResumeConfig({ ...resumeConfig, maxPages: parseInt(e.target.value) })}
                              className={`w-full px-3 py-2 border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            >
                              <option value={1}>1 Page</option>
                              <option value={2}>2 Pages</option>
                              <option value={3}>3 Pages</option>
                            </select>
                          </div>
                          
                          <div className="space-y-3">
                            <label className={`block text-sm font-medium ${classes.text.primary}`}>
                              Contact Information
                            </label>
                            <div className="space-y-2">
                              {[
                                { key: 'includeEmail', label: 'Include Email Address' },
                                { key: 'includePhone', label: 'Include Phone Number' },
                                { key: 'includeAddress', label: 'Include Physical Address' }
                              ].map((item) => (
                                <label key={item.key} className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={resumeConfig[item.key]}
                                    onChange={(e) => setResumeConfig({ ...resumeConfig, [item.key]: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className={`text-sm ${classes.text.secondary}`}>{item.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>
                          <label className={`block text-sm font-medium ${classes.text.primary} mb-2`}>
                            Job Description (Optional)
                          </label>
                          <textarea
                            value={coverLetterConfig.jobDescription}
                            onChange={(e) => setCoverLetterConfig({ ...coverLetterConfig, jobDescription: e.target.value })}
                            placeholder="Paste the job description here to help AI tailor your cover letter..."
                            className={`w-full h-24 px-3 py-2 border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-6`}>
                    <div className="text-center mb-6">
                      <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                        Review & Generate
                      </h3>
                      <p className={`${classes.text.secondary} text-sm`}>Review your configuration before AI generation</p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className={`font-medium ${classes.text.primary}`}>Configuration Summary</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`${classes.bg.card} p-3 rounded-lg border ${classes.border.primary}`}>
                          <h5 className={`font-medium ${classes.text.primary} mb-2 flex items-center gap-2`}>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Document Settings
                          </h5>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className={classes.text.secondary}>Type:</span>
                              <span className={`font-medium text-blue-600 dark:text-blue-400`}>
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
                        
                        <div className={`${classes.bg.card} p-3 rounded-lg border ${classes.border.primary}`}>
                          <h5 className={`font-medium ${classes.text.primary} mb-2 flex items-center gap-2`}>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {documentType === 'resume' ? 'Contact Info' : 'Job Details'}
                          </h5>
                          <div className="space-y-1 text-xs">
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

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <h4 className={`font-medium ${classes.text.primary}`}>AI Generation Features</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={classes.text.secondary}>Achievement-Based</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={classes.text.secondary}>Professional Format</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={classes.text.secondary}>ATS Optimized</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className={classes.text.secondary}>Industry Specific</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className={`flex items-center justify-between pt-4 border-t ${classes.border.primary}/50`}>
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="group relative px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    <span className="font-medium text-gray-700">Previous</span>
                  </button>
                  
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">
                      Step {currentStep} of 4
                    </span>
                  </div>
                  
                  {currentStep < 4 ? (
                    <button
                      onClick={nextStep}
                      className="group relative px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="font-medium text-white">Next</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={handleGenerateDocument}
                      className="group relative px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-white" />
                      <span className="font-medium text-white">
                        Generate {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Documents Content */}
            {(activeTab === 'resumes' || activeTab === 'cover-letters') && (
              <div className="space-y-4">
                {(activeTab === 'resumes' ? resumes : coverLetters).map((document, index) => (
                  <div
                    key={document.id}
                    className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer`}
                    onClick={() => navigate(`/document/${document.type}/${document.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        document.type === 'resume' 
                          ? 'bg-blue-50 dark:bg-blue-900/20' 
                          : 'bg-green-50 dark:bg-green-900/20'
                      }`}>
                        {document.type === 'resume' ? (
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-medium ${classes.text.primary} truncate`}>
                              {document.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs ${classes.text.secondary}`}>
                                {new Date(document.createdAt).toLocaleDateString()}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400`}>
                                {document.template}
                              </span>
                              <div className="flex items-center gap-1">
                                <Download className="w-3 h-3 text-gray-400" />
                                <span className={`text-xs font-medium ${classes.text.primary}`}>
                                  {document.downloads}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(document)
                              }}
                              className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(document.id, document.type)
                              }}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className={`text-xs ${classes.text.secondary}`}>
                              Based on {document.basedOnAchievements} achievements
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className={`text-xs font-medium ${classes.text.primary}`}>
                                {document.rating}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className={`text-xs ${classes.text.secondary}`}>
                              {new Date(document.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Recent Documents */}
          <div className="col-span-3">
            <div className="sticky top-24">
              {/* Recent Documents */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Recent Documents</h3>
                <div className="space-y-3">
                  {[...resumes, ...coverLetters]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map((document) => (
                      <div key={document.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          document.type === 'resume' 
                            ? 'bg-blue-100 dark:bg-blue-900/30' 
                            : 'bg-green-100 dark:bg-green-900/30'
                        }`}>
                          {document.type === 'resume' ? (
                            <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <MessageSquare className="w-3 h-3 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium ${classes.text.primary} truncate`}>
                            {document.title}
                          </p>
                          <p className={`text-xs ${classes.text.secondary}`}>
                            {new Date(document.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Template Usage */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Template Usage</h3>
                <div className="space-y-3">
                  {resumeTemplates.map((template) => {
                    const count = resumes.filter(r => r.template === template.name).length
                    return (
                      <div key={template.id} className="flex items-center justify-between">
                        <span className={`text-xs ${classes.text.secondary}`}>{template.name}</span>
                        <span className={`text-xs font-medium ${classes.text.primary} bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full`}>
                          {count}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generation Overlay */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${classes.bg.card} ${classes.border.primary} border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl`}
          >
            <div className="text-center">
              {/* AI Brain Animation */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping"></div>
                  </div>
                </div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              </div>

              <h3 className={`text-2xl font-bold ${classes.text.primary} mb-2`}>
                AI is Generating Your {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
              </h3>
              <p className={`${classes.text.secondary} mb-6`}>
                Our AI is analyzing your achievements and creating a professional document...
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className={classes.text.secondary}>Progress</span>
                  <span className={`font-medium ${classes.text.primary}`}>{Math.round(generationProgress)}%</span>
                </div>
                <div className={`w-full ${classes.bg.tertiary} rounded-full h-3 overflow-hidden`}>
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Generation Steps */}
              <div className="space-y-3 text-left">
                {[
                  { text: "Analyzing your achievements", completed: generationProgress > 20 },
                  { text: "Optimizing content structure", completed: generationProgress > 40 },
                  { text: "Applying professional formatting", completed: generationProgress > 60 },
                  { text: "Finalizing document", completed: generationProgress > 80 },
                  { text: "Quality check and optimization", completed: generationProgress > 95 }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {step.completed ? (
                        <Check className="w-3 h-3" />
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
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className={`text-sm ${classes.text.secondary}`}>
                  Estimated time remaining: {Math.max(0, Math.ceil((100 - generationProgress) / 0.83))} seconds
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ResumePage
