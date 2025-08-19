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
  X
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-20 left-10 w-32 h-32 border border-purple-400/30 rounded-full"
          ></motion.div>
          
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-40 right-20 w-24 h-24 border border-blue-400/30 transform rotate-45"
          ></motion.div>
          
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: 360,
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-sm"
          ></motion.div>

          <motion.div
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 right-1/3 w-16 h-16 border border-cyan-400/30 transform rotate-12"
          ></motion.div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-md border border-purple-400/30 text-white rounded-2xl text-sm font-medium mb-12 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </motion.div>
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-semibold">
                AI-Powered Career Growth Platform
              </span>
            </motion.div>

            {/* Main Heading with Typing Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight">
                <span className="block">Supercharge</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your Career
                </span>
                <span className="block text-4xl md:text-6xl font-bold text-gray-300 mt-2">
                  Journey
                </span>
              </h1>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Track achievements, prepare for interviews, build stunning resumes, and get AI-powered career insights. 
              <span className="text-white font-medium"> Your path to professional success starts here.</span>
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
              <Link
                to={user ? '/dashboard' : '/signup'}
                onClick={handleGetStarted}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Rocket className="w-6 h-6" />
                  </motion.div>
                  Get Started Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <button
                onClick={() => setIsVideoPlaying(true)}
                className="group relative px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-white/10 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg">Watch Demo</p>
                    <p className="text-gray-300 text-sm">2 min video</p>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Enhanced Stats with Animations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group text-center"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-300">
                      <stat.icon className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl"
                    ></motion.div>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
              Everything You Need to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Excel in Your Career
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Our comprehensive platform combines AI technology with proven career development strategies 
              to help you achieve your professional goals faster.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group ${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${classes.text.primary} mb-4`}>{feature.title}</h3>
                <p className={`${classes.text.secondary} leading-relaxed`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Get started in minutes and see immediate results in your career development journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Log Your Achievements',
                description: 'Start by logging your professional achievements, skills, and experiences.',
                icon: Award
              },
              {
                step: '02',
                title: 'Get AI Insights',
                description: 'Receive personalized recommendations and career insights powered by AI.',
                icon: Brain
              },
              {
                step: '03',
                title: 'Accelerate Growth',
                description: 'Use AI-generated content to prepare for interviews and build compelling resumes.',
                icon: Rocket
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${classes.text.primary} mb-4`}>{item.title}</h3>
                <p className={`${classes.text.secondary} leading-relaxed`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
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
              Join thousands of professionals who have accelerated their careers with our platform.
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
