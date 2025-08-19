import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileEdit, 
  Plus, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Upload, 
  Zap, 
  Copy, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Settings,
  History,
  FileDown,
  FileUp,
  Star,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const ResumePage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState([])
  const [coverLetters, setCoverLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('generator')

  const [currentStep, setCurrentStep] = useState(1)
  const [documentType, setDocumentType] = useState('resume')


  // Resume generation state
  const [resumeConfig, setResumeConfig] = useState({
    template: 'modern',
    maxPages: 2,
    includeAddress: true,
    includePhone: true,
    includeEmail: true,
    jobDescription: '',
    focusAreas: [],
    achievements: []
  })

  // Cover letter generation state
  const [coverLetterConfig, setCoverLetterConfig] = useState({
    jobTitle: '',
    company: '',
    jobDescription: '',
    notes: '',
    tone: 'professional',
    focusPoints: []
  })

  // Templates
  const resumeTemplates = [
    { id: 'modern', name: 'Modern Professional', description: 'Clean, contemporary design with strong visual hierarchy' },
    { id: 'classic', name: 'Classic Traditional', description: 'Timeless format suitable for conservative industries' },
    { id: 'creative', name: 'Creative Portfolio', description: 'Stand out with unique layout and design elements' },
    { id: 'minimal', name: 'Minimal Clean', description: 'Simple, focused design that emphasizes content' }
  ]

  const coverLetterTemplates = [
    { id: 'professional', name: 'Professional', description: 'Formal tone suitable for corporate environments' },
    { id: 'friendly', name: 'Friendly', description: 'Warm, approachable tone for startup culture' },
    { id: 'confident', name: 'Confident', description: 'Assertive tone highlighting achievements' },
    { id: 'enthusiastic', name: 'Enthusiastic', description: 'Energetic tone showing passion and excitement' }
  ]

  useEffect(() => {
    loadDocuments()
  }, [user])

  const loadDocuments = async () => {
    if (!user) return
    
    try {
      // Mock resume data
      const mockResumes = [
        {
          id: '1',
          title: 'Software Engineer Resume',
          type: 'resume',
          template: 'modern',
          content: {
            name: 'Sarah Johnson',
            title: 'Senior Software Engineer',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            location: 'San Francisco, CA',
            summary: 'Results-driven Senior Software Engineer with 5+ years of experience leading high-performance development teams and delivering scalable solutions. Proven track record of improving system performance by 300% and reducing operational costs by 40%.',
            experience: [
              {
                company: 'TechCorp',
                position: 'Senior Software Engineer',
                duration: '2022 - Present',
                achievements: [
                  'Led cross-functional team of 5 developers to deliver critical project 2 weeks ahead of schedule, resulting in $200K cost savings',
                  'Architected and implemented microservices infrastructure that improved system capacity by 300% and reduced downtime by 95%',
                  'Established automated testing protocols that reduced bug rate by 40% and improved deployment frequency by 60%',
                  'Mentored 3 junior developers, with 100% retention rate and 2 promotions within the team'
                ]
              }
            ],
            skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB']
          },
          createdAt: '2024-02-15T10:30:00Z',
          updatedAt: '2024-02-16T14:20:00Z',
          basedOnAchievements: 5,
          downloads: 12,
          rating: 4.8
        },
        {
          id: '2',
          title: 'Technical Lead Resume',
          type: 'resume',
          template: 'classic',
          content: {
            name: 'Sarah Johnson',
            title: 'Technical Lead',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            location: 'San Francisco, CA',
            summary: 'Experienced Technical Lead specializing in system architecture and team leadership. Successfully managed multiple high-impact projects with combined value of $2M+, consistently delivering 20% under budget and ahead of schedule.',
            experience: [
              {
                company: 'TechCorp',
                position: 'Technical Lead',
                duration: '2022 - Present',
                achievements: [
                  'Spearheaded architecture overhaul for e-commerce platform, increasing system capacity by 300% and handling 50% more Black Friday transactions',
                  'Established cross-team collaboration protocols that improved project delivery time by 25% across 4 engineering teams',
                  'Led migration to containerized infrastructure with zero downtime, reducing operational costs by $150K annually'
                ]
              }
            ],
            skills: ['System Architecture', 'Team Leadership', 'Docker', 'Kubernetes', 'AWS', 'Microservices']
          },
          createdAt: '2024-02-10T09:15:00Z',
          updatedAt: '2024-02-10T09:15:00Z',
          basedOnAchievements: 3,
          downloads: 8,
          rating: 4.5
        }
      ]

      // Mock cover letters
      const mockCoverLetters = [
        {
          id: '1',
          title: 'Senior Software Engineer - Google',
          type: 'cover-letter',
          template: 'professional',
          content: `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at Google. With over 5 years of experience leading high-performance development teams and a proven track record of delivering scalable solutions, I am excited about the opportunity to contribute to Google's innovative projects.

In my current role at TechCorp, I have successfully led a cross-functional team of 5 developers to deliver a critical project 2 weeks ahead of schedule, resulting in $200K cost savings. This experience has honed my ability to balance technical excellence with business objectives – a skill I believe aligns perfectly with Google's mission to organize the world's information.

One of my most significant achievements was architecting and implementing a microservices infrastructure that improved our system capacity by 300%. This project required not only technical expertise but also the ability to coordinate with multiple stakeholders and ensure seamless migration with zero downtime. I believe this experience would be valuable in Google's fast-paced, innovation-driven environment.

Additionally, I have established automated testing protocols that reduced our bug rate by 40% and improved deployment frequency by 60%. My commitment to code quality and continuous improvement aligns with Google's high engineering standards and culture of excellence.

I am particularly drawn to Google's emphasis on solving complex problems at scale. My experience with AI-powered solutions, including developing a customer service chatbot that reduced response time by 80%, demonstrates my ability to leverage cutting-edge technology to create meaningful impact.

Thank you for considering my application. I look forward to the opportunity to discuss how my experience and passion for technology can contribute to Google's continued success.

Best regards,
Sarah Johnson`,
          jobTitle: 'Senior Software Engineer',
          company: 'Google',
          createdAt: '2024-02-12T16:45:00Z',
          basedOnAchievements: 4,
          downloads: 15,
          rating: 4.9
        }
      ]
      
      setResumes(mockResumes)
      setCoverLetters(mockCoverLetters)
    } catch (error) {
      console.error('Error loading documents:', error)
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateDocument = () => {
    toast.success(`Generating ${documentType === 'resume' ? 'resume' : 'cover letter'}...`)
    setTimeout(() => {
      toast.success(`${documentType === 'resume' ? 'Resume' : 'Cover letter'} generated successfully!`)
      setCurrentStep(1)
      setActiveTab('history')
      loadDocuments()
    }, 2000)
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

  const documents = activeTab === 'resumes' ? resumes : coverLetters

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <FileEdit className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-4xl font-bold ${classes.text.primary} mb-4`}>
              Resume & Cover Letter Generator
            </h1>
            <p className={`text-lg ${classes.text.secondary} max-w-2xl mx-auto`}>
              Create stunning, AI-powered resumes and cover letters that stand out from the crowd
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={() => {
                setActiveTab('resumes')
              }}
              className={`group relative px-6 py-3 ${classes.bg.card}/80 backdrop-blur-sm border ${classes.border.primary} rounded-xl hover:${classes.bg.card} hover:shadow-lg transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'resumes' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileEdit className="w-4 h-4 text-white" />
              </div>
              <span className={`font-medium ${classes.text.primary}`}>Resumes</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('cover-letters')
              }}
              className={`group relative px-6 py-3 ${classes.bg.card}/80 backdrop-blur-sm border ${classes.border.primary} rounded-xl hover:${classes.bg.card} hover:shadow-lg transition-all duration-300 flex items-center gap-3 ${
                activeTab === 'cover-letters' ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className={`font-medium ${classes.text.primary}`}>Cover Letters</span>
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('generator')
                setCurrentStep(1)
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Plus className="w-5 h-5 text-white relative z-10" />
              <span className="font-semibold text-white relative z-10">Create New</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Generator Panel */}
          {activeTab === 'generator' && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className={`${classes.bg.card}/80 backdrop-blur-sm border ${classes.border.primary} rounded-2xl shadow-xl p-6`}>
                {/* Step Indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center">
                          <button
                            onClick={() => step <= currentStep && setCurrentStep(step)}
                            disabled={step > currentStep}
                            className={`relative w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer ${
                              step <= currentStep 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-110 hover:shadow-xl' 
                                : `${classes.bg.tertiary} ${classes.text.muted} border-2 ${classes.border.primary} cursor-not-allowed`
                            } ${step < currentStep ? 'hover:from-blue-700 hover:to-purple-700' : ''}`}
                          >
                            {step < currentStep ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <span className="font-bold text-lg">{step}</span>
                            )}
                            {step <= currentStep && (
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                            )}
                          </button>
                          {step < 4 && (
                            <div className={`w-24 h-1.5 mx-4 rounded-full transition-all duration-500 ${
                              step < currentStep 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                                : classes.bg.tertiary
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className={`flex justify-between text-sm font-medium ${classes.text.secondary}`}>
                      <span className={`flex items-center gap-2 transition-colors ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-400' : classes.text.muted}`}>
                        <div className={`w-3 h-3 rounded-full transition-colors ${currentStep >= 1 ? 'bg-blue-600' : classes.bg.tertiary}`}></div>
                        Document Type
                      </span>
                      <span className={`flex items-center gap-2 transition-colors ${currentStep >= 2 ? 'text-purple-600 dark:text-purple-400' : classes.text.muted}`}>
                        <div className={`w-3 h-3 rounded-full transition-colors ${currentStep >= 2 ? 'bg-purple-600' : classes.bg.tertiary}`}></div>
                        Template
                      </span>
                      <span className={`flex items-center gap-2 transition-colors ${currentStep >= 3 ? 'text-indigo-600 dark:text-indigo-400' : classes.text.muted}`}>
                        <div className={`w-3 h-3 rounded-full transition-colors ${currentStep >= 3 ? 'bg-indigo-600' : classes.bg.tertiary}`}></div>
                        Customize
                      </span>
                      <span className={`flex items-center gap-2 transition-colors ${currentStep >= 4 ? 'text-green-600 dark:text-green-400' : classes.text.muted}`}>
                        <div className={`w-3 h-3 rounded-full transition-colors ${currentStep >= 4 ? 'bg-green-600' : classes.bg.tertiary}`}></div>
                        Generate
                      </span>
                    </div>
                  </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className={`text-3xl font-bold ${classes.text.primary} mb-4`}>
                        Choose Document Type
                      </h3>
                      <p className={`${classes.text.secondary} text-lg`}>Select the type of document you want to create</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDocumentType('resume')}
                        className={`group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                          documentType === 'resume'
                            ? 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-500 shadow-xl'
                            : `${classes.bg.card} border-2 ${classes.border.primary} hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg`
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              documentType === 'resume'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                                : 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800/30 dark:group-hover:to-purple-800/30'
                            }`}>
                              <FileEdit className={`w-8 h-8 transition-colors ${
                                documentType === 'resume' ? 'text-white' : 'text-blue-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className={`text-xl font-bold transition-colors ${
                                documentType === 'resume' ? 'text-blue-900 dark:text-blue-100' : classes.text.primary
                              }`}>Resume</h4>
                              <p className={`text-sm ${classes.text.secondary}`}>Professional CV</p>
                            </div>
                          </div>
                          <p className={`${classes.text.secondary} leading-relaxed`}>
                            Create a comprehensive resume highlighting your achievements, experience, and skills with AI-powered optimization.
                          </p>
                          <div className={`mt-4 flex items-center gap-2 text-sm ${classes.text.muted}`}>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>ATS Optimized</span>
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Multiple Templates</span>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDocumentType('cover-letter')}
                        className={`group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                          documentType === 'cover-letter'
                            ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-500 shadow-xl'
                            : `${classes.bg.card} border-2 ${classes.border.primary} hover:border-green-300 dark:hover:border-green-500 hover:shadow-lg`
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              documentType === 'cover-letter'
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg'
                                : 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 group-hover:from-green-200 group-hover:to-emerald-200 dark:group-hover:from-green-800/30 dark:group-hover:to-emerald-800/30'
                            }`}>
                              <MessageSquare className={`w-8 h-8 transition-colors ${
                                documentType === 'cover-letter' ? 'text-white' : 'text-green-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className={`text-xl font-bold transition-colors ${
                                documentType === 'cover-letter' ? 'text-green-900 dark:text-green-100' : classes.text.primary
                              }`}>Cover Letter</h4>
                              <p className={`text-sm ${classes.text.secondary}`}>Application letter</p>
                            </div>
                          </div>
                          <p className={`${classes.text.secondary} leading-relaxed`}>
                            Write a compelling cover letter tailored to specific job opportunities with personalized content.
                          </p>
                          <div className={`mt-4 flex items-center gap-2 text-sm ${classes.text.muted}`}>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Job-Specific</span>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span>Multiple Tones</span>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className={`text-3xl font-bold ${classes.text.primary} mb-4`}>
                        Choose Template
                      </h3>
                      <p className={`${classes.text.secondary} text-lg`}>Select a template that matches your style and industry</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(documentType === 'resume' ? resumeTemplates : coverLetterTemplates).map((template, index) => (
                        <motion.button
                          key={template.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (documentType === 'resume') {
                              setResumeConfig({ ...resumeConfig, template: template.id })
                            } else {
                              setCoverLetterConfig({ ...coverLetterConfig, tone: template.id })
                            }
                          }}
                          className={`group relative p-6 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                            (documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id
                              ? 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 border-2 border-purple-300 dark:border-purple-500 shadow-xl'
                              : `${classes.bg.card} border-2 ${classes.border.primary} hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg`
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className={`text-lg font-bold transition-colors ${
                                (documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id
                                  ? 'text-purple-900 dark:text-purple-100'
                                  : classes.text.primary
                              }`}>{template.name}</h4>
                              {(documentType === 'resume' ? resumeConfig.template : coverLetterConfig.tone) === template.id && (
                                <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <p className={`${classes.text.secondary} leading-relaxed`}>{template.description}</p>
                            <div className="mt-4 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className={`text-sm ${classes.text.muted}`}>Professional</span>
                              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                              <span className={`text-sm ${classes.text.muted}`}>Modern</span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className={`text-3xl font-bold ${classes.text.primary} mb-4`}>
                        Customize Settings
                      </h3>
                      <p className={`${classes.text.secondary} text-lg`}>Configure your {documentType === 'resume' ? 'resume' : 'cover letter'} preferences</p>
                    </div>
                    
                    {documentType === 'resume' ? (
                      <div className="space-y-8">
                        {/* Resume Settings */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                              <FileEdit className="w-5 h-5 text-white" />
                            </div>
                            <h4 className={`text-xl font-semibold ${classes.text.primary}`}>Resume Configuration</h4>
                          </div>
                          
                          <div className={`${classes.bg.card} p-6 rounded-xl border ${classes.border.primary} mb-6`}>
                            <label className={`block text-sm font-semibold ${classes.text.secondary} mb-4 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Document Length
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {[1, 2, 3].map((pages) => (
                                <button
                                  key={pages}
                                  onClick={() => setResumeConfig({ ...resumeConfig, maxPages: pages })}
                                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                    resumeConfig.maxPages === pages
                                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-md'
                                      : `${classes.bg.card} ${classes.border.primary} hover:border-blue-300 dark:hover:border-blue-500 hover:${classes.bg.tertiary}`
                                  }`}
                                >
                                  <div className={`text-2xl font-bold mb-1 ${classes.text.primary}`}>{pages}</div>
                                  <div className={`text-sm font-medium ${classes.text.secondary}`}>
                                    {pages === 1 ? '1 Page' : `${pages} Pages`}
                                  </div>
                                  <div className={`text-xs ${classes.text.muted} mt-1`}>
                                    {pages === 1 ? 'Standard' : pages === 2 ? 'Detailed' : 'Comprehensive'}
                                  </div>
                                </button>
                              ))}
                            </div>
                            <p className={`text-sm ${classes.text.muted} mt-3`}>
                              Choose based on your experience level and the role requirements
                            </p>
                          </div>

                          <div className={`${classes.bg.card} p-6 rounded-xl border ${classes.border.primary} mb-6`}>
                            <label className={`block text-sm font-semibold ${classes.text.secondary} mb-4 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Contact Information
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <label className={`flex items-center p-3 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors cursor-pointer`}>
                                <input
                                  type="checkbox"
                                  checked={resumeConfig.includeEmail}
                                  onChange={(e) => setResumeConfig({ ...resumeConfig, includeEmail: e.target.checked })}
                                  className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <Mail className={`w-5 h-5 mr-2 ${classes.text.secondary}`} />
                                <span className={`font-medium ${classes.text.primary}`}>Email Address</span>
                              </label>
                              <label className={`flex items-center p-3 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors cursor-pointer`}>
                                <input
                                  type="checkbox"
                                  checked={resumeConfig.includePhone}
                                  onChange={(e) => setResumeConfig({ ...resumeConfig, includePhone: e.target.checked })}
                                  className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <Phone className={`w-5 h-5 mr-2 ${classes.text.secondary}`} />
                                <span className={`font-medium ${classes.text.primary}`}>Phone Number</span>
                              </label>
                              <label className={`flex items-center p-3 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors cursor-pointer`}>
                                <input
                                  type="checkbox"
                                  checked={resumeConfig.includeAddress}
                                  onChange={(e) => setResumeConfig({ ...resumeConfig, includeAddress: e.target.checked })}
                                  className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <MapPin className={`w-5 h-5 mr-2 ${classes.text.secondary}`} />
                                <span className={`font-medium ${classes.text.primary}`}>Address</span>
                              </label>
                            </div>
                          </div>

                          <div className={`${classes.bg.card} p-6 rounded-xl border ${classes.border.primary}`}>
                            <label className={`block text-sm font-semibold ${classes.text.secondary} mb-3 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Job Description (Optional)
                            </label>
                            <textarea
                              value={resumeConfig.jobDescription}
                              onChange={(e) => setResumeConfig({ ...resumeConfig, jobDescription: e.target.value })}
                              placeholder="Paste the job description to tailor your resume for better ATS optimization..."
                              className={`w-full px-4 py-3 border ${classes.border.primary} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${classes.bg.input} ${classes.text.primary} shadow-sm transition-all duration-200 h-32 resize-none`}
                            />
                            <p className={`text-sm ${classes.text.muted} mt-2`}>This helps AI optimize your resume for specific job requirements</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Cover Letter Settings */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-white" />
                            </div>
                            <h4 className={`text-xl font-semibold ${classes.text.primary}`}>Cover Letter Configuration</h4>
                          </div>
                          
                          {/* Step 1: Job Description */}
                          <div className={`${classes.bg.card} p-6 rounded-xl border ${classes.border.primary} mb-6`}>
                            <label className={`block text-sm font-semibold ${classes.text.secondary} mb-3 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Job Description (Required)
                            </label>
                            <textarea
                              value={coverLetterConfig.jobDescription}
                              onChange={(e) => {
                                const jobDesc = e.target.value;
                                setCoverLetterConfig({ ...coverLetterConfig, jobDescription: jobDesc });
                                
                                // Auto-extract job title and company if job description is provided
                                if (jobDesc.length > 50) {
                                  // Simple extraction logic - in real app, this would use AI
                                  const lines = jobDesc.split('\n');
                                  const firstLine = lines[0].toLowerCase();
                                  
                                  // Extract job title patterns
                                  if (firstLine.includes('senior') || firstLine.includes('lead') || firstLine.includes('manager')) {
                                    if (!coverLetterConfig.jobTitle) {
                                      setCoverLetterConfig(prev => ({ ...prev, jobTitle: 'Senior Position' }));
                                    }
                                  } else if (firstLine.includes('engineer') || firstLine.includes('developer')) {
                                    if (!coverLetterConfig.jobTitle) {
                                      setCoverLetterConfig(prev => ({ ...prev, jobTitle: 'Software Engineer' }));
                                    }
                                  }
                                  
                                  // Extract company patterns
                                  if (firstLine.includes('google') || firstLine.includes('microsoft') || firstLine.includes('apple')) {
                                    if (!coverLetterConfig.company) {
                                      setCoverLetterConfig(prev => ({ ...prev, company: 'Tech Company' }));
                                    }
                                  }
                                }
                              }}
                              placeholder="Paste the complete job description here. The AI will automatically extract job title and company information to help create a targeted cover letter..."
                              className={`w-full px-4 py-3 border ${classes.border.primary} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${classes.bg.input} ${classes.text.primary} shadow-sm transition-all duration-200 h-40 resize-none`}
                            />
                            <p className={`text-sm ${classes.text.muted} mt-2`}>
                              <span className="font-medium text-blue-600 dark:text-blue-400">Step 1:</span> Paste the job description first. The system will analyze it to extract key details.
                            </p>
                          </div>

                          {/* Step 2: Auto-extracted Details */}
                          {coverLetterConfig.jobDescription && coverLetterConfig.jobDescription.length > 50 && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                                <h5 className={`font-semibold ${classes.text.primary}`}>AI-Extracted Information</h5>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`${classes.bg.card} p-4 rounded-lg border ${classes.border.primary}`}>
                                  <label className={`block text-sm font-semibold ${classes.text.secondary} mb-2 flex items-center gap-2`}>
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Job Title
                                  </label>
                                  <input
                                    type="text"
                                    value={coverLetterConfig.jobTitle}
                                    onChange={(e) => setCoverLetterConfig({ ...coverLetterConfig, jobTitle: e.target.value })}
                                    placeholder="Auto-detected or enter manually"
                                    className={`w-full px-3 py-2 border ${classes.border.primary} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${classes.bg.input} ${classes.text.primary} shadow-sm transition-all duration-200`}
                                  />
                                  <p className={`text-xs ${classes.text.muted} mt-1`}>You can edit this if needed</p>
                                </div>
                                <div className={`${classes.bg.card} p-4 rounded-lg border ${classes.border.primary}`}>
                                  <label className={`block text-sm font-semibold ${classes.text.secondary} mb-2 flex items-center gap-2`}>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    Company
                                  </label>
                                  <input
                                    type="text"
                                    value={coverLetterConfig.company}
                                    onChange={(e) => setCoverLetterConfig({ ...coverLetterConfig, company: e.target.value })}
                                    placeholder="Auto-detected or enter manually"
                                    className={`w-full px-3 py-2 border ${classes.border.primary} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${classes.bg.input} ${classes.text.primary} shadow-sm transition-all duration-200`}
                                  />
                                  <p className={`text-xs ${classes.text.muted} mt-1`}>You can edit this if needed</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Step 3: Additional Notes */}
                          <div className={`${classes.bg.card} p-6 rounded-xl border ${classes.border.primary}`}>
                            <label className={`block text-sm font-semibold ${classes.text.secondary} mb-3 flex items-center gap-2`}>
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              Additional Notes (Optional)
                            </label>
                            <textarea
                              value={coverLetterConfig.notes}
                              onChange={(e) => setCoverLetterConfig({ ...coverLetterConfig, notes: e.target.value })}
                              placeholder="Any additional information you'd like to include (e.g., specific achievements, connections to the company, why you're interested in this role)..."
                              className={`w-full px-4 py-3 border ${classes.border.primary} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${classes.bg.input} ${classes.text.primary} shadow-sm transition-all duration-200 h-24 resize-none`}
                            />
                            <p className={`text-sm ${classes.text.muted} mt-2`}>Optional: Add personal touches or specific points you want to highlight</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className={`text-3xl font-bold ${classes.text.primary} mb-4`}>
                        Review & Generate
                      </h3>
                      <p className={`${classes.text.secondary} text-lg`}>Review your configuration before AI generation</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <h4 className={`text-xl font-semibold ${classes.text.primary}`}>Configuration Summary</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`${classes.bg.card} p-4 rounded-xl border ${classes.border.primary}`}>
                          <h5 className={`font-semibold ${classes.text.primary} mb-3 flex items-center gap-2`}>
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Document Settings
                          </h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className={classes.text.secondary}>Type:</span>
                              <span className={`font-medium text-blue-600 dark:text-blue-400`}>{documentType === 'resume' ? 'Resume' : 'Cover Letter'}</span>
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
                                <span className={`font-medium ${classes.text.primary}`}>{resumeConfig.maxPages} {resumeConfig.maxPages === 1 ? 'Page' : 'Pages'}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`${classes.bg.card} p-4 rounded-xl border ${classes.border.primary}`}>
                          <h5 className={`font-semibold ${classes.text.primary} mb-3 flex items-center gap-2`}>
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
                                  <span className={`font-medium ${classes.text.primary}`}>{coverLetterConfig.jobTitle || 'Auto-detected'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={classes.text.secondary}>Company:</span>
                                  <span className={`font-medium ${classes.text.primary}`}>{coverLetterConfig.company || 'Auto-detected'}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">AI-Powered Generation</h5>
                          <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                            Your {documentType === 'resume' ? 'resume' : 'cover letter'} will be generated using your logged achievements and experience, 
                            optimized for ATS systems and tailored to your specifications. The AI will analyze your achievements and create compelling content.
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              ATS Optimized
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Achievement-Based
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              Professional Format
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className={`flex items-center justify-between pt-6 border-t ${classes.border.primary}/50`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="group relative px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                    <span className="font-medium text-gray-700">Previous</span>
                  </motion.button>
                  
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Step {currentStep} of 4
                    </span>
                  </div>
                  
                  {currentStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="font-semibold text-white relative z-10">Next</span>
                      <ChevronRight className="w-4 h-4 text-white relative z-10" />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerateDocument}
                      className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <Zap className="w-4 h-4 text-white relative z-10" />
                      <span className="font-semibold text-white relative z-10">
                        Generate {documentType === 'resume' ? 'Resume' : 'Cover Letter'}
                      </span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* History Main Content */}
          {(activeTab === 'resumes' || activeTab === 'cover-letters') && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <div className={`${classes.bg.card}/80 backdrop-blur-sm border ${classes.border.primary} rounded-2xl shadow-xl p-6`}>
                {/* History Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                      <History className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${classes.text.primary}`}>Document History</h3>
                      <p className={`${classes.text.secondary}`}>
                        {activeTab === 'resumes' ? 'Your generated resumes' : 'Your generated cover letters'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
                  >
                    <Plus className="w-5 h-5 text-white" />
                    <span className="font-semibold text-white">Create New</span>
                  </button>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                  <div className={`flex space-x-2 ${classes.bg.tertiary} p-2 rounded-xl`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('resumes')}
                      className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
                        activeTab === 'resumes'
                          ? `${classes.bg.card} text-blue-600 dark:text-blue-400 shadow-lg`
                          : `${classes.text.secondary} hover:${classes.text.primary} hover:${classes.bg.card}/50`
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <FileEdit className="w-4 h-4" />
                        <span>Resumes ({resumes.length})</span>
                      </div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab('cover-letters')}
                      className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-300 ${
                        activeTab === 'cover-letters'
                          ? `${classes.bg.card} text-green-600 dark:text-green-400 shadow-lg`
                          : `${classes.text.secondary} hover:${classes.text.primary} hover:${classes.bg.card}/50`
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Cover Letters ({coverLetters.length})</span>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(activeTab === 'resumes' ? resumes : coverLetters).map((document, index) => (
                    <motion.div
                      key={document.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`group relative p-4 ${classes.bg.tertiary}/60 backdrop-blur-sm border ${classes.border.primary}/50 rounded-xl hover:${classes.bg.card} hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden`}
                      onClick={() => {
                        navigate(`/document/${document.type}/${document.id}`)
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              document.type === 'resume' 
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                                : 'bg-gradient-to-r from-green-500 to-green-600'
                            }`}>
                              {document.type === 'resume' ? (
                                <FileEdit className="w-5 h-5 text-white" />
                              ) : (
                                <MessageSquare className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className={`font-semibold ${classes.text.primary} text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                                {document.title}
                              </h4>
                              <p className={`text-xs ${classes.text.muted} truncate`}>Template: {document.template}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">{document.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs mb-3">
                          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="truncate">{new Date(document.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileDown className="w-3 h-3" />
                              <span className="truncate">{document.downloads}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 flex-shrink-0">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="truncate">{document.basedOnAchievements}</span>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownload(document, 'pdf')
                            }}
                            className={`flex-1 py-2 px-3 ${classes.bg.card} hover:${classes.bg.secondary} rounded-lg text-xs font-medium ${classes.text.secondary} hover:${classes.text.primary} transition-colors flex items-center justify-center gap-1`}
                          >
                            <FileDown className="w-3 h-3" />
                            PDF
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCopy(document)
                            }}
                            className={`flex-1 py-2 px-3 ${classes.bg.card} hover:${classes.bg.secondary} rounded-lg text-xs font-medium ${classes.text.secondary} hover:${classes.text.primary} transition-colors flex items-center justify-center gap-1`}
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {(activeTab === 'resumes' ? resumes : coverLetters).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {activeTab === 'resumes' ? (
                        <FileEdit className="w-8 h-8 text-gray-400" />
                      ) : (
                        <MessageSquare className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold ${classes.text.primary} mb-2`}>
                      No {activeTab === 'resumes' ? 'resumes' : 'cover letters'} yet
                    </h3>
                    <p className={`${classes.text.secondary} mb-4`}>
                      Create your first {activeTab === 'resumes' ? 'resume' : 'cover letter'} to get started
                    </p>
                    <button
                      onClick={() => setActiveTab('generator')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Create {activeTab === 'resumes' ? 'Resume' : 'Cover Letter'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}




        </div>
      </div>
    </div>
  )
}

export default ResumePage
