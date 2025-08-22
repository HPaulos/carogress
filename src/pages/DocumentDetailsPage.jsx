import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FileEdit, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  FileText, 
  ArrowLeft,
  Star,
  Calendar,
  FileDown,
  FileUp,
  Share2,
  Printer,
  MessageSquare,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import { getRandomMockUser } from '../utils/mockUserData'
import toast from 'react-hot-toast'

const DocumentDetailsPage = () => {
  const { documentId, type } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { classes } = useThemeClasses()
  const [mockUser] = useState(getRandomMockUser())
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('preview')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    loadDocument()
  }, [documentId, type])

  const loadDocument = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      
      // Check if this is a generated document (recently created)
      const isGeneratedDocument = documentId && documentId.length > 10 && !isNaN(documentId)
      
      let documentData
      
      if (isGeneratedDocument) {
        // This is a generated document - create detailed content based on type
        documentData = {
          id: documentId,
          type: type,
          title: type === 'resume' ? 'AI Generated Resume' : 'AI Generated Cover Letter',
          template: type === 'resume' ? 'Modern' : 'Professional',
          rating: 0,
          downloads: 0,
          basedOnAchievements: Math.floor(Math.random() * 10) + 5,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          content: type === 'resume' ? {
            name: mockUser.name,
            title: 'Software Engineer',
            email: mockUser.email,
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            summary: 'Experienced software engineer with expertise in modern web technologies and full-stack development. Proven track record of delivering scalable solutions and collaborating effectively in agile environments.',
            experience: [
              {
                position: 'Software Engineer',
                company: 'Tech Company',
                duration: '2022 - Present',
                achievements: [
                  'Developed and maintained web applications using React and Node.js',
                  'Collaborated with cross-functional teams to deliver high-quality software',
                  'Implemented new features and improved application performance'
                ]
              },
              {
                position: 'Junior Developer',
                company: 'Startup Inc.',
                duration: '2020 - 2022',
                achievements: [
                  'Built responsive user interfaces using modern frameworks',
                  'Participated in code reviews and contributed to team best practices',
                  'Worked on bug fixes and feature implementations'
                ]
              }
            ],
            education: [
              {
                degree: 'Bachelor of Science in Computer Science',
                school: 'University of Technology',
                year: '2020'
              }
            ],
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'Docker']
          } : `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With experience in modern web technologies and a passion for creating impactful solutions, I am excited about the opportunity to contribute to your team.

Throughout my career, I have demonstrated expertise in full-stack development, including React, Node.js, and cloud platforms. I have successfully collaborated with cross-functional teams, delivered high-quality software, and continuously improved my technical skills.

My experience includes:
• Developing and maintaining web applications using modern frameworks
• Collaborating with cross-functional teams in agile environments
• Implementing new features and improving application performance
• Participating in code reviews and contributing to team best practices
• Building responsive user interfaces and working on bug fixes

I am particularly drawn to your company's innovative approach to technology and commitment to excellence. I believe my technical skills, collaborative approach, and passion for learning align perfectly with your team's goals.

I would welcome the opportunity to discuss how my background and skills can contribute to your organization's success. Thank you for considering my application.

Best regards,
${mockUser.name}`
        }
      } else {
        // Use existing mock document data for saved documents
        documentData = {
          id: documentId,
          type: type,
          title: type === 'resume' ? 'Software Engineer Resume' : 'Cover Letter for Senior Developer Position',
          template: type === 'resume' ? 'Modern Professional' : 'Professional',
          rating: 4.8,
          downloads: 12,
          basedOnAchievements: 15,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          content: type === 'resume' ? {
            name: 'John Doe',
            title: 'Senior Software Engineer',
            email: 'john.doe@email.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading development teams.',
            experience: [
              {
                position: 'Senior Software Engineer',
                company: 'TechCorp Inc.',
                duration: '2021 - Present',
                achievements: [
                  'Led development of microservices architecture serving 1M+ users',
                  'Improved application performance by 40% through optimization',
                  'Mentored 3 junior developers and conducted code reviews'
                ]
              },
              {
                position: 'Software Engineer',
                company: 'StartupXYZ',
                duration: '2019 - 2021',
                achievements: [
                  'Built and deployed 5+ production applications',
                  'Collaborated with cross-functional teams on agile projects',
                  'Implemented CI/CD pipelines reducing deployment time by 60%'
                ]
              }
            ],
            skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'GraphQL']
          } : `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at your company. With over 5 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am excited about the opportunity to contribute to your team.

Throughout my career, I have demonstrated expertise in modern web technologies including React, Node.js, and cloud platforms. I have successfully led development teams, mentored junior developers, and delivered projects that have served over 1 million users.

My experience includes:
• Leading microservices architecture development
• Improving application performance by 40%
• Mentoring junior developers and conducting code reviews
• Building and deploying production applications
• Implementing CI/CD pipelines

I am particularly drawn to your company's innovative approach to technology and commitment to excellence. I believe my technical skills, leadership experience, and passion for creating impactful solutions align perfectly with your team's goals.

I would welcome the opportunity to discuss how my background and skills can contribute to your organization's success. Thank you for considering my application.

Best regards,
John Doe`
        }
      }
      
      setDocument(documentData)
    } catch (error) {
      console.error('Error loading document:', error)
      toast.error('Failed to load document')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (format = 'pdf') => {
    toast.success(`Downloading ${document.title} as ${format.toUpperCase()}...`)
    // In a real app, this would trigger a download
  }

  const handleCopy = () => {
    const content = document.type === 'resume' 
      ? JSON.stringify(document.content, null, 2)
      : document.content
    
    navigator.clipboard.writeText(content)
    toast.success('Content copied to clipboard!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Check out my ${document.type}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDelete = () => {
    toast.success('Document deleted successfully')
    navigate('/resume')
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>Document not found</h2>
          <p className={classes.text.secondary}>The document you're looking for doesn't exist.</p>
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
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/resume')}
                className={`p-2 ${classes.bg.card} ${classes.border.primary} border rounded-lg hover:${classes.bg.tertiary} transition-colors`}
              >
                <ArrowLeft className={`w-5 h-5 ${classes.text.secondary}`} />
              </button>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  document.type === 'resume' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-r from-green-500 to-green-600'
                }`}>
                  {document.type === 'resume' ? (
                    <FileEdit className="w-6 h-6 text-white" />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h1 className={`text-3xl font-bold ${classes.text.primary}`}>{document.title}</h1>
                  <p className={`${classes.text.secondary}`}>
                    {document.type === 'resume' ? 'Resume' : 'Cover Letter'} • {document.template} Template
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{document.rating}</span>
              </div>
            </div>
          </div>

          {/* Document Stats */}
          <div className={`${classes.bg.card} p-6 rounded-2xl border ${classes.border.primary} mb-6`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className={`text-sm ${classes.text.muted}`}>Created</p>
                  <p className={`font-semibold ${classes.text.primary}`}>
                    {new Date(document.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className={`text-sm ${classes.text.muted}`}>Last Modified</p>
                  <p className={`font-semibold ${classes.text.primary}`}>
                    {new Date(document.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <FileDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className={`text-sm ${classes.text.muted}`}>Downloads</p>
                  <p className={`font-semibold ${classes.text.primary}`}>{document.downloads}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className={`text-sm ${classes.text.muted}`}>Based on</p>
                  <p className={`font-semibold ${classes.text.primary}`}>{document.basedOnAchievements} achievements</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className={`flex ${classes.bg.tertiary} p-1 rounded-xl`}>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'preview'
                    ? `${classes.bg.card} ${classes.text.primary} shadow-sm`
                    : `${classes.text.secondary} hover:${classes.text.primary}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </div>
              </button>
              <button
                onClick={() => setActiveTab('actions')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'actions'
                    ? `${classes.bg.card} ${classes.text.primary} shadow-sm`
                    : `${classes.text.secondary} hover:${classes.text.primary}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Actions
                </div>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className={`p-2 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                title="Share"
              >
                <Share2 className={`w-4 h-4 ${classes.text.secondary}`} />
              </button>
              <button
                onClick={handlePrint}
                className={`p-2 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                title="Print"
              >
                <Printer className={`w-4 h-4 ${classes.text.secondary}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'preview' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} overflow-hidden`}
              >
                <div className="p-8">
                  {document.type === 'resume' ? (
                    <div className="space-y-8">
                      {/* Header */}
                      <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
                        <h2 className={`text-3xl font-bold ${classes.text.primary} mb-2`}>
                          {document.content.name}
                        </h2>
                        <p className={`text-xl ${classes.text.secondary} mb-3`}>
                          {document.content.title}
                        </p>
                        <div className={`flex items-center justify-center gap-4 ${classes.text.muted} text-sm`}>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{document.content.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{document.content.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{document.content.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Summary */}
                      <div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-3 flex items-center gap-2`}>
                          <User className="w-5 h-5" />
                          Professional Summary
                        </h3>
                        <p className={`${classes.text.secondary} leading-relaxed`}>
                          {document.content.summary}
                        </p>
                      </div>
                      
                      {/* Experience */}
                      <div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-4 flex items-center gap-2`}>
                          <Briefcase className="w-5 h-5" />
                          Professional Experience
                        </h3>
                        <div className="space-y-6">
                          {document.content.experience.map((exp, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-6">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className={`text-lg font-semibold ${classes.text.primary}`}>
                                    {exp.position}
                                  </h4>
                                  <p className={`${classes.text.secondary} font-medium`}>
                                    {exp.company}
                                  </p>
                                </div>
                                <span className={`${classes.text.muted} text-sm`}>{exp.duration}</span>
                              </div>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, achIndex) => (
                                  <li key={achIndex} className={`${classes.text.secondary} text-sm flex items-start gap-2`}>
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div>
                        <h3 className={`text-xl font-bold ${classes.text.primary} mb-3 flex items-center gap-2`}>
                          <Award className="w-5 h-5" />
                          Technical Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {document.content.skills.map((skill, index) => (
                            <span key={index} className={`px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium`}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`${classes.text.secondary} leading-relaxed whitespace-pre-wrap`}>
                      {document.content}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Download Options */}
                <div className={`${classes.bg.card} p-6 rounded-2xl border ${classes.border.primary}`}>
                  <h3 className={`text-xl font-bold ${classes.text.primary} mb-4 flex items-center gap-2`}>
                    <Download className="w-5 h-5" />
                    Download Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleDownload('pdf')}
                      className={`p-4 ${classes.bg.tertiary} rounded-xl border ${classes.border.primary} hover:${classes.bg.secondary} transition-all duration-200 group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                          <FileDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${classes.text.primary}`}>Download PDF</p>
                          <p className={`text-sm ${classes.text.muted}`}>High-quality print format</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleDownload('doc')}
                      className={`p-4 ${classes.bg.tertiary} rounded-xl border ${classes.border.primary} hover:${classes.bg.secondary} transition-all duration-200 group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <FileUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${classes.text.primary}`}>Download DOC</p>
                          <p className={`text-sm ${classes.text.muted}`}>Editable Word format</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`${classes.bg.card} p-6 rounded-2xl border ${classes.border.primary}`}>
                  <h3 className={`text-xl font-bold ${classes.text.primary} mb-4 flex items-center gap-2`}>
                    <Target className="w-5 h-5" />
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleCopy}
                      className={`p-4 ${classes.bg.tertiary} rounded-xl border ${classes.border.primary} hover:${classes.bg.secondary} transition-all duration-200 group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                          <Copy className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${classes.text.primary}`}>Copy Content</p>
                          <p className={`text-sm ${classes.text.muted}`}>Copy to clipboard</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => navigate(`/resume?edit=${document.id}`)}
                      className={`p-4 ${classes.bg.tertiary} rounded-xl border ${classes.border.primary} hover:${classes.bg.secondary} transition-all duration-200 group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <Edit className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="text-left">
                          <p className={`font-semibold ${classes.text.primary}`}>Edit Document</p>
                          <p className={`text-sm ${classes.text.muted}`}>Modify content</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className={`${classes.bg.card} p-6 rounded-2xl border border-red-200 dark:border-red-800`}>
                  <h3 className={`text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2`}>
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </h3>
                  <p className={`${classes.text.secondary} mb-4`}>
                    Once you delete this document, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete Document
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Info */}
            <div className={`${classes.bg.card} p-6 rounded-2xl border ${classes.border.primary}`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Document Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${classes.text.secondary}`}>Type:</span>
                  <span className={`font-medium ${classes.text.primary}`}>
                    {document.type === 'resume' ? 'Resume' : 'Cover Letter'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${classes.text.secondary}`}>Template:</span>
                  <span className={`font-medium ${classes.text.primary}`}>{document.template}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${classes.text.secondary}`}>Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className={`font-medium ${classes.text.primary}`}>{document.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className={`${classes.text.secondary}`}>Downloads:</span>
                  <span className={`font-medium ${classes.text.primary}`}>{document.downloads}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${classes.text.secondary}`}>Achievements:</span>
                  <span className={`font-medium ${classes.text.primary}`}>{document.basedOnAchievements}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${classes.bg.card} p-6 rounded-2xl border ${classes.border.primary}`}>
              <h3 className={`text-lg font-bold ${classes.text.primary} mb-4`}>Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className={`text-sm ${classes.text.primary}`}>Document created</p>
                    <p className={`text-xs ${classes.text.muted}`}>
                      {new Date(document.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className={`text-sm ${classes.text.primary}`}>Last downloaded</p>
                    <p className={`text-xs ${classes.text.muted}`}>2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className={`text-sm ${classes.text.primary}`}>Content updated</p>
                    <p className={`text-xs ${classes.text.muted}`}>1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${classes.bg.modal} rounded-xl shadow-2xl max-w-md w-full border ${classes.border.primary}`}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${classes.text.primary}`}>Delete Document</h3>
                  <p className={`text-sm ${classes.text.secondary}`}>This action cannot be undone</p>
                </div>
              </div>
              
              <p className={`${classes.text.secondary} mb-6`}>
                Are you sure you want to delete "{document.title}"? This will permanently remove the document and all associated data.
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className={`flex-1 px-4 py-2 ${classes.bg.tertiary} ${classes.text.secondary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default DocumentDetailsPage
