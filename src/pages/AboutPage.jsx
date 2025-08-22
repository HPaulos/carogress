import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Target, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  Globe, 
  Sparkles, 
  Rocket, 
  Lightbulb, 
  Code, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  FileText, 
  Brain, 
  TrendingUp, 
  Shield, 
  Clock, 
  Zap,
  CheckCircle,
  Play,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import toast from 'react-hot-toast'

const AboutPage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()

  const stats = [
    { number: '50K+', label: 'Active Users', description: 'Professionals worldwide' },
    { number: '95%', label: 'Success Rate', description: 'Users who achieved goals' },
    { number: '2.5M+', label: 'Achievements Logged', description: 'Career milestones tracked' },
    { number: '500+', label: 'Companies Hiring', description: 'Partner organizations' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Everything we build is designed with our users\' career success in mind.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on measurable outcomes that accelerate career growth.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to solve career challenges.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your career data is protected with enterprise-grade security.',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'Former VP of Engineering at TechCorp. Passionate about democratizing career development through AI.',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'AI researcher with 10+ years in machine learning. Led AI teams at Google and OpenAI.',
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelchen'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Product leader with expertise in career development platforms. Former Product Manager at LinkedIn.',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez'
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Full-stack engineer with 8+ years building scalable platforms. Previously at Stripe and Airbnb.',
      linkedin: 'https://linkedin.com/in/davidkim',
      twitter: 'https://twitter.com/davidkim'
    }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Platform Launch',
      description: 'Launched our AI-powered career development platform with 1,000 early adopters.',
      icon: Rocket
    },
    {
      year: '2024',
      title: 'Series A Funding',
      description: 'Raised $10M to scale our platform and expand our AI capabilities.',
      icon: TrendingUp
    },
    {
      year: '2024',
      title: '50K Users Milestone',
      description: 'Reached 50,000 active users across 100+ countries.',
      icon: Users
    },
    {
      year: '2024',
      title: 'Enterprise Launch',
      description: 'Launched enterprise solutions for teams and organizations.',
      icon: Briefcase
    }
  ]

  const testimonials = [
    {
      name: 'Alex Thompson',
      role: 'Senior Software Engineer',
      company: 'Netflix',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'This platform completely transformed my career trajectory. The AI insights helped me identify exactly what I needed to focus on.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Product Manager',
      company: 'Spotify',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      content: 'The achievement tracking feature is brilliant. It helped me build a compelling narrative for my career progression.',
      rating: 5
    }
  ]

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
              <Heart className="w-4 h-4" />
              <span>Our Mission</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-7xl font-bold ${classes.text.primary} mb-6 leading-tight`}
            >
              Empowering Careers
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Through AI Innovation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl ${classes.text.secondary} mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              We're on a mission to democratize career development by making AI-powered career coaching 
              accessible to everyone. Our platform helps professionals track achievements, prepare for interviews, 
              and accelerate their career growth.
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
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <button className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Watch Our Story</p>
                  <p className="text-white/70 text-sm">2 min video</p>
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

      {/* Our Story Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}>
                Our Story
              </h2>
              <div className={`space-y-6 ${classes.text.secondary} text-lg leading-relaxed`}>
                <p>
                  Founded in 2023 by career development experts and AI researchers, we recognized that 
                  traditional career coaching was expensive, inaccessible, and often ineffective for most professionals.
                </p>
                <p>
                  We set out to create a platform that combines the power of artificial intelligence with 
                  proven career development strategies to help everyone achieve their professional goals.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 professionals worldwide, helping them track achievements, 
                  prepare for interviews, and accelerate their career growth through AI-powered insights.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 shadow-xl`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${classes.text.primary}`}>Our Vision</h3>
                    <p className={`${classes.text.secondary}`}>Democratizing career development</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className={`${classes.text.primary}`}>AI-powered career coaching for everyone</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className={`${classes.text.primary}`}>Data-driven career insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className={`${classes.text.primary}`}>Personalized learning paths</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className={`${classes.text.primary}`}>Continuous skill development</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              The principles that guide everything we do and every decision we make.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold ${classes.text.primary} mb-4`}>{value.title}</h3>
                  <p className={`${classes.text.secondary} leading-relaxed`}>{value.description}</p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              The passionate individuals behind our mission to democratize career development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 text-center hover:shadow-xl transition-all duration-300`}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`text-lg font-bold ${classes.text.primary} mb-1`}>{member.name}</h3>
                <p className={`text-blue-600 font-medium mb-3`}>{member.role}</p>
                <p className={`${classes.text.secondary} text-sm mb-4 leading-relaxed`}>{member.bio}</p>
                
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                  >
                    <Linkedin className={`w-4 h-4 ${classes.text.secondary}`} />
                  </a>
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 ${classes.bg.tertiary} rounded-lg hover:${classes.bg.secondary} transition-colors`}
                  >
                    <Twitter className={`w-4 h-4 ${classes.text.secondary}`} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Our Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Key milestones in our mission to democratize career development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${classes.bg.card} rounded-2xl border ${classes.border.primary} p-6 text-center`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                <h3 className={`text-lg font-bold ${classes.text.primary} mb-3`}>{milestone.title}</h3>
                <p className={`${classes.text.secondary} text-sm leading-relaxed`}>{milestone.description}</p>
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
              What Our Users Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              Hear from professionals whose careers have been transformed by our platform.
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

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${classes.bg.card} rounded-3xl border ${classes.border.primary} p-12 md:p-16 text-center`}
          >
            <h2 className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}>
              Get in Touch
            </h2>
            <p className={`text-xl ${classes.text.secondary} mb-8 max-w-2xl mx-auto`}>
              Have questions about our platform or want to learn more? We'd love to hear from you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className={`${classes.text.primary}`}>hello@careerprogress.ai</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <span className={`${classes.text.primary}`}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className={`${classes.text.primary}`}>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={user ? '/dashboard' : '/signup'}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="px-8 py-4 border border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
