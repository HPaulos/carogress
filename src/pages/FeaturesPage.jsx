import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Target, 
  MessageSquare, 
  FileText, 
  Award, 
  TrendingUp, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Users, 
  Shield, 
  Clock, 
  Globe, 
  BarChart3, 
  Lightbulb, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Rocket, 
  Eye, 
  Download, 
  Share2, 
  Lock,
  Unlock,
  Infinity,
  Smartphone,
  Monitor,
  Tablet,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import toast from 'react-hot-toast'

const FeaturesPage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [activeTab, setActiveTab] = useState('all')
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      id: 'ai-insights',
      category: 'ai',
      icon: Brain,
      title: 'AI-Powered Career Insights',
      description: 'Get personalized career recommendations and insights powered by advanced AI algorithms that analyze your achievements and suggest next steps.',
      benefits: [
        'Personalized career path recommendations',
        'Skill gap analysis and suggestions',
        'Industry trend insights',
        'Salary benchmarking data'
      ],
      color: 'from-purple-500 to-pink-500',
      demo: 'https://example.com/ai-insights-demo'
    },
    {
      id: 'achievement-tracking',
      category: 'tracking',
      icon: Award,
      title: 'Smart Achievement Tracking',
      description: 'Log and organize your professional achievements with intelligent categorization and detailed storytelling capabilities.',
      benefits: [
        'Intelligent achievement categorization',
        'Impact quantification tools',
        'Story generation from achievements',
        'Progress visualization'
      ],
      color: 'from-blue-500 to-cyan-500',
      demo: 'https://example.com/achievement-demo'
    },
    {
      id: 'interview-prep',
      category: 'prep',
      icon: MessageSquare,
      title: 'AI Interview Preparation',
      description: 'Practice with AI-generated interview questions tailored to your industry, experience level, and target roles.',
      benefits: [
        'Role-specific question generation',
        'Behavioral interview practice',
        'Technical question preparation',
        'Real-time feedback and scoring'
      ],
      color: 'from-green-500 to-emerald-500',
      demo: 'https://example.com/interview-demo'
    },
    {
      id: 'resume-builder',
      category: 'documents',
      icon: FileText,
      title: 'AI Resume & Cover Letter Builder',
      description: 'Create professional, ATS-optimized resumes and compelling cover letters that highlight your achievements effectively.',
      benefits: [
        'ATS-optimized templates',
        'Achievement-based content generation',
        'Multiple format exports',
        'Real-time optimization suggestions'
      ],
      color: 'from-orange-500 to-red-500',
      demo: 'https://example.com/resume-demo'
    },
    {
      id: 'goal-tracking',
      category: 'tracking',
      icon: Target,
      title: 'Career Goal Management',
      description: 'Set, track, and achieve your career goals with detailed progress monitoring and milestone celebrations.',
      benefits: [
        'SMART goal setting framework',
        'Progress tracking and analytics',
        'Milestone celebrations',
        'Goal achievement predictions'
      ],
      color: 'from-indigo-500 to-purple-500',
      demo: 'https://example.com/goals-demo'
    },
    {
      id: 'analytics',
      category: 'analytics',
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Visualize your career growth with comprehensive analytics, performance metrics, and actionable insights.',
      benefits: [
        'Career growth visualization',
        'Performance trend analysis',
        'Skill development tracking',
        'Market competitiveness insights'
      ],
      color: 'from-teal-500 to-blue-500',
      demo: 'https://example.com/analytics-demo'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Features', icon: Sparkles },
    { id: 'ai', name: 'AI Features', icon: Brain },
    { id: 'tracking', name: 'Tracking', icon: Target },
    { id: 'prep', name: 'Interview Prep', icon: MessageSquare },
    { id: 'documents', icon: FileText, name: 'Documents' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }
  ]

  const stats = [
    { number: '95%', label: 'Success Rate', description: 'Users who achieved their career goals' },
    { number: '3x', label: 'Faster Growth', description: 'Average career progression speed' },
    { number: '50K+', label: 'Active Users', description: 'Professionals using our platform' },
    { number: '2.5M+', label: 'Achievements Logged', description: 'Professional milestones tracked' }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'The AI insights feature helped me identify exactly what skills I needed to develop. Within 6 months, I landed my dream role!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The achievement tracking is brilliant. It helped me build a compelling narrative for my career progression.',
      rating: 5
    }
  ]

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeTab)

  const handleGetStarted = () => {
    if (user) {
      toast.success('Welcome back! Redirecting to your dashboard...')
    } else {
      toast.success('Let\'s start your career journey!')
    }
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Comprehensive Career Development Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-7xl font-bold ${classes.text.primary} mb-6 leading-tight`}
            >
              Powerful Features to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accelerate Your Career
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl ${classes.text.secondary} mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Discover how our AI-powered platform combines cutting-edge technology with proven career development strategies 
              to help you achieve your professional goals faster than ever before.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to={user ? '/dashboard' : '/signup'}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Watch Demo</p>
                  <p className="text-white/70 text-sm">3 min overview</p>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className={`text-lg font-semibold ${classes.text.primary} mb-1`}>{stat.label}</div>
                <div className={`${classes.text.secondary}`}>{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Our comprehensive suite of features is designed to support every aspect of your career development journey.
            </motion.p>
          </div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : `${classes.bg.tertiary} ${classes.text.secondary} hover:${classes.bg.secondary} hover:${classes.text.primary}`
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${classes.text.primary} mb-4`}>{feature.title}</h3>
                    <p className={`${classes.text.secondary} leading-relaxed mb-6`}>{feature.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className={`${classes.text.primary}`}>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                        Try Feature
                      </button>
                      <button className={`px-4 py-2 ${classes.bg.tertiary} ${classes.text.secondary} rounded-lg hover:${classes.bg.secondary} transition-colors text-sm font-medium`}>
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Loved by Career Professionals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              See how our features have transformed careers and accelerated professional growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className={`text-lg ${classes.text.primary} mb-6 leading-relaxed`}>
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className={`font-semibold ${classes.text.primary}`}>
                      {testimonial.name}
                    </div>
                    <div className={`${classes.text.secondary}`}>
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${classes.bg.card} rounded-3xl border ${classes.border.primary} p-12 md:p-16`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}>
              Ready to Experience These Features?
            </h2>
            <p className={`text-xl ${classes.text.secondary} mb-8 max-w-2xl mx-auto`}>
              Join thousands of professionals who are already accelerating their careers with our powerful platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? '/dashboard' : '/signup'}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-4 border border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-white mx-auto mb-4" />
                <p className="text-white">Features demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeaturesPage
