import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Zap, 
  Award, 
  Target, 
  MessageSquare, 
  FileText, 
  Brain, 
  Rocket,
  Play,
  ChevronRight,
  ChevronLeft,
  Quote,
  ArrowUpRight,
  Shield,
  Clock,
  Globe,
  Sparkles,
  BarChart3,
  Lightbulb,
  Code,
  Briefcase,
  GraduationCap,
  Heart,
  ThumbsUp,
  Eye,
  Download,
  Share2,
  X,
  Trophy,
  Plus,
  User
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import toast from 'react-hot-toast'

const HomePage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized career recommendations and insights powered by advanced AI algorithms.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and track your career goals with detailed progress monitoring and milestone celebrations.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: 'Interview Prep',
      description: 'Practice with AI-generated interview questions tailored to your industry and experience level.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create professional resumes and cover letters using AI that highlights your achievements.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Award,
      title: 'Achievement Tracking',
      description: 'Log and showcase your professional achievements with detailed storytelling.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visualize your career growth with comprehensive analytics and performance metrics.',
      color: 'from-teal-500 to-blue-500'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'This app completely transformed my career journey. The AI insights helped me identify skills I needed to develop, and the interview prep was incredibly realistic.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'The achievement tracking feature is brilliant. It helped me build a compelling narrative for my career progression and land my dream job.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      company: 'DesignStudio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'The resume builder is amazing! It created a professional resume that perfectly highlighted my achievements and helped me stand out.',
      rating: 5
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '2.5M+', label: 'Achievements Logged', icon: Award },
    { number: '500+', label: 'Companies Hiring', icon: Briefcase }
  ]

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with your career journey',
      features: [
        'Basic achievement tracking',
        '5 AI-generated stories',
        'Limited interview questions',
        'Basic resume templates',
        'Community support'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Everything you need to accelerate your career growth',
      features: [
        'Unlimited achievement tracking',
        'Unlimited AI stories',
        'Advanced interview prep',
        'Premium resume templates',
        'AI career coaching',
        'Priority support',
        'Analytics dashboard'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per year',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team management',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        'Custom branding',
        'API access'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleGetStarted = () => {
    if (user) {
      toast.success('Welcome back! Redirecting to your dashboard...')
    } else {
      toast.success('Let\'s start your career journey!')
    }
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Hero Section - Compact 100vh Design */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className={`absolute inset-0 ${classes.bg.primary}`}>
          {/* Dynamic Gradient Mesh */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
            />
          </div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23000000' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
              }}
            />
          </div>
        </div>

        {/* Floating Interactive Elements */}
        <div className="absolute inset-0">
          {/* Rotating Rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={`w-${32 + i * 8} h-${32 + i * 8} border-2 border-${['cyan', 'magenta', 'yellow'][i]}-400/30 rounded-full`} />
            </motion.div>
          ))}
          
          {/* Floating Icons */}
          {[
            { icon: Trophy, color: 'emerald', delay: 0 },
            { icon: Target, color: 'blue', delay: 2 },
            { icon: TrendingUp, color: 'purple', delay: 4 },
            { icon: Award, color: 'pink', delay: 6 }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 25}%`,
                top: `${60 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay
              }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-400/20 to-${item.color}-600/20 ${classes.bg.card} backdrop-blur-sm border border-${item.color}-400/30 rounded-2xl flex items-center justify-center shadow-lg`}>
                <item.icon className={`w-8 h-8 text-${item.color}-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
          <div className="grid lg:grid-cols-12 gap-6 items-center h-full">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-4"
              >
                <div className={`inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-cyan-500/10 via-magenta-500/10 to-yellow-500/10 dark:from-cyan-500/20 dark:via-magenta-500/20 dark:to-yellow-500/20 backdrop-blur-xl border border-cyan-400/30 dark:border-cyan-400/50 ${classes.text.primary} rounded-xl text-sm font-bold shadow-lg`}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4 text-cyan-500" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-cyan-600 via-magenta-600 to-yellow-600 bg-clip-text text-transparent font-bold">
                    🚀 Next-Generation Career Platform
                  </span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-none">
                  <span className={`block ${classes.text.primary}`}>
                    Level Up
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 bg-clip-text text-transparent">
                    Your Career
                  </span>
                  <span className={`block text-lg md:text-xl lg:text-2xl font-medium mt-2 ${classes.text.secondary}`}>
                    With AI-Powered Intelligence
                  </span>
                </h1>
              </motion.div>

              {/* Interactive Value Proposition */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-6"
              >
                <p className={`text-lg md:text-xl mb-4 leading-relaxed ${classes.text.secondary}`}>
                  Transform your professional journey with cutting-edge AI technology. 
                  <span className="bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-bold"> Track achievements</span>, 
                  <span className="bg-gradient-to-r from-magenta-400 to-yellow-400 bg-clip-text text-transparent font-bold"> ace interviews</span>, and 
                  <span className="bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent font-bold"> build winning resumes</span>.
                </p>
                
                {/* Interactive Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { icon: Brain, text: 'AI-Powered Insights', color: 'cyan' },
                    { icon: Rocket, text: 'Smart Automation', color: 'magenta' },
                    { icon: Star, text: 'Proven Results', color: 'yellow' }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                      className={`flex items-center gap-2 p-3 ${classes.bg.tertiary} rounded-lg border border-${feature.color}-400/20 hover:border-${feature.color}-400/40 transition-colors cursor-pointer group`}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className={`font-semibold text-sm ${classes.text.primary}`}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <Link
                  to={user ? '/dashboard' : '/signup'}
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 hover:from-cyan-600 hover:via-magenta-600 hover:to-yellow-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <span className="relative flex items-center gap-3">
                    <Rocket className="w-5 h-5" />
                    Launch Your Success
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className={`group flex items-center gap-3 px-6 py-4 ${classes.bg.card} border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-base ${classes.text.primary}`}>See the Magic</p>
                    <p className={`text-xs ${classes.text.secondary}`}>2 min demo</p>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Right Column - Interactive Demo */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className={`relative ${classes.bg.card} backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl transform perspective-1000 max-w-sm w-full`}
              >
                {/* Animated Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-full flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <p className={`font-bold text-lg ${classes.text.primary}`}>Alex Chen</p>
                      <p className={`text-xs ${classes.text.secondary}`}>Senior Developer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`text-3xl font-black ${classes.text.primary}`}
                    >
                      Level 8
                    </motion.div>
                    <p className={`text-xs ${classes.text.secondary}`}>2,450 points</p>
                  </div>
                </div>

                {/* Animated Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Progress to Level 9</span>
                    <span className={classes.text.secondary}>87%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 via-magenta-500 to-yellow-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '87%' }}
                      transition={{ delay: 1.5, duration: 2, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Animated Achievements */}
                <div className="space-y-3 mb-4">
                  <h3 className={`font-bold text-base ${classes.text.primary}`}>Recent Wins</h3>
                  {[
                    { title: 'Led Team of 10', points: '+75', color: 'cyan', delay: 2 },
                    { title: 'Shipped MVP', points: '+60', color: 'magenta', delay: 2.5 },
                    { title: 'Mentored 5 Devs', points: '+45', color: 'yellow', delay: 3 }
                  ].map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: achievement.delay, duration: 0.8 }}
                      className={`flex items-center justify-between p-3 ${classes.bg.tertiary} rounded-lg border border-${achievement.color}-400/20 hover:border-${achievement.color}-400/40 transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          className={`w-10 h-10 bg-${achievement.color}-500/20 rounded-lg flex items-center justify-center`}
                        >
                          <Trophy className={`w-5 h-5 text-${achievement.color}-500`} />
                        </motion.div>
                        <span className={`font-semibold text-sm ${classes.text.primary}`}>{achievement.title}</span>
                      </div>
                      <span className={`text-base font-bold text-${achievement.color}-500`}>{achievement.points}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Plus, label: 'Log Win', color: 'cyan' },
                    { icon: FileText, label: 'Build Resume', color: 'magenta' },
                    { icon: MessageSquare, label: 'Practice', color: 'yellow' },
                    { icon: Brain, label: 'AI Coach', color: 'cyan' }
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 3.5 + index * 0.1, duration: 0.6 }}
                      className={`flex items-center gap-2 p-3 ${classes.bg.tertiary} border border-${action.color}-400/20 rounded-lg hover:border-${action.color}-400/40 hover:bg-${action.color}-500/5 transition-all duration-300 group`}
                    >
                      <action.icon className={`w-4 h-4 text-${action.color}-500 group-hover:scale-110 transition-transform`} />
                      <span className={`text-xs font-semibold ${classes.text.primary}`}>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Career-Focused */}
      <section className={`py-24 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-medium ${classes.text.primary}`}>Powerful Features</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${classes.text.primary} mb-6`}
            >
              Your Complete
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Career Toolkit
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              From tracking daily achievements to landing your dream job, we provide everything you need for professional success.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Achievement Tracking',
                description: 'Log and showcase your professional milestones with detailed storytelling and impact metrics.',
                color: 'from-green-500 to-emerald-500',
                features: ['Impact scoring', 'Story generation', 'Progress visualization']
              },
              {
                icon: Brain,
                title: 'AI Career Coach',
                description: 'Get personalized career advice, interview tips, and skill development recommendations.',
                color: 'from-blue-500 to-indigo-500',
                features: ['Personalized insights', 'Skill gap analysis', 'Career path guidance']
              },
              {
                icon: FileText,
                title: 'Resume Builder',
                description: 'Create professional resumes and cover letters that highlight your achievements effectively.',
                color: 'from-purple-500 to-pink-500',
                features: ['AI optimization', 'Multiple templates', 'ATS-friendly']
              },
              {
                icon: MessageSquare,
                title: 'Interview Prep',
                description: 'Practice with AI-generated questions tailored to your industry and experience level.',
                color: 'from-orange-500 to-red-500',
                features: ['Industry-specific', 'Behavioral questions', 'Answer coaching']
              },
              {
                icon: TrendingUp,
                title: 'Progress Analytics',
                description: 'Visualize your career growth with comprehensive analytics and performance metrics.',
                color: 'from-cyan-500 to-blue-500',
                features: ['Growth tracking', 'Goal monitoring', 'Performance insights']
              },
              {
                icon: Target,
                title: 'Goal Setting',
                description: 'Set and track career goals with detailed progress monitoring and milestone celebrations.',
                color: 'from-indigo-500 to-purple-500',
                features: ['Smart milestones', 'Progress tracking', 'Achievement rewards']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`group relative ${classes.bg.card} rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className={`text-xl font-bold ${classes.text.primary} mb-4 group-hover:text-blue-600 transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className={`${classes.text.secondary} leading-relaxed mb-6`}>
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <div className="space-y-2">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className={`text-sm ${classes.text.secondary}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Career Journey */}
      <section className={`py-24 ${classes.bg.primary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 dark:bg-green-500/20 rounded-full mb-6"
            >
              <Target className="w-4 h-4 text-green-500" />
              <span className={`text-sm font-medium ${classes.text.primary}`}>Simple Process</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${classes.text.primary} mb-6`}
            >
              Your Career Journey
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                in 3 Simple Steps
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Transform your professional growth with our streamlined process designed for maximum impact.
            </motion.p>
          </div>

          {/* Steps with Visual Connection */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: '01',
                  title: 'Track Achievements',
                  description: 'Log your professional milestones, skills, and experiences with our intuitive interface.',
                  icon: Award,
                  color: 'green',
                  details: ['Impact scoring', 'Story generation', 'Progress tracking']
                },
                {
                  step: '02',
                  title: 'Get AI Insights',
                  description: 'Receive personalized career recommendations and skill development insights powered by AI.',
                  icon: Brain,
                  color: 'blue',
                  details: ['Career path guidance', 'Skill gap analysis', 'Interview preparation']
                },
                {
                  step: '03',
                  title: 'Accelerate Success',
                  description: 'Build compelling resumes, prepare for interviews, and land your dream job.',
                  icon: Rocket,
                  color: 'purple',
                  details: ['Resume optimization', 'Interview coaching', 'Job application support']
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="text-center"
                >
                  {/* Step Number */}
                  <div className={`relative w-20 h-20 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                    {/* Connection Points */}
                    {index < 2 && (
                      <div className="hidden lg:block absolute -right-10 top-1/2 w-10 h-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform -translate-y-1/2"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className={`${classes.bg.card} rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className={`w-16 h-16 bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-500`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold ${classes.text.primary} mb-4`}>
                      {item.title}
                    </h3>
                    
                    <p className={`${classes.text.secondary} mb-6 leading-relaxed`}>
                      {item.description}
                    </p>
                    
                    {/* Details List */}
                    <div className="space-y-2">
                      {item.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 bg-${item.color}-500 rounded-full`}></div>
                          <span className={`text-sm ${classes.text.secondary}`}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Success Stories */}
      <section className={`py-24 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              <span className={`text-sm font-medium ${classes.text.primary}`}>Success Stories</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${classes.text.primary} mb-6`}
            >
              Trusted by
              <span className="block bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Career Professionals
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Join thousands of professionals who have accelerated their careers and achieved their goals with our platform.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 md:p-12`}
            >
              <div className="flex items-start gap-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className={`text-lg ${classes.text.primary} mb-6 leading-relaxed`}>
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className={`font-semibold ${classes.text.primary}`}>
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className={`${classes.text.secondary}`}>
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className={`p-3 ${classes.bg.tertiary} rounded-full hover:${classes.bg.secondary} transition-colors`}
              >
                <ChevronLeft className={`w-5 h-5 ${classes.text.secondary}`} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-blue-600' 
                        : `${classes.bg.tertiary} hover:${classes.bg.secondary}`
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className={`p-3 ${classes.bg.tertiary} rounded-full hover:${classes.bg.secondary} transition-colors`}
              >
                <ChevronRight className={`w-5 h-5 ${classes.text.secondary}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Start free and upgrade as you grow. No hidden fees, cancel anytime.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold ${classes.text.primary} mb-2`}>{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    {plan.period !== 'forever' && (
                      <span className={`${classes.text.secondary}`}>/{plan.period}</span>
                    )}
                  </div>
                  <p className={`${classes.text.secondary}`}>{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={`${classes.text.primary}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={user ? '/dashboard' : '/signup'}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : `${classes.bg.tertiary} ${classes.text.primary} hover:${classes.bg.secondary}`
                  }`}
                >
                  {plan.cta}
                </Link>
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
              Ready to Transform Your Career?
            </h2>
            <p className={`text-xl ${classes.text.secondary} mb-8 max-w-2xl mx-auto`}>
              Join thousands of professionals who are already accelerating their careers with AI-powered insights and tools.
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
              <button className="px-8 py-4 border border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                Schedule Demo
              </button>
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
                <p className="text-white">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
