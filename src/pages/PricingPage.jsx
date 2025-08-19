import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, 
  X, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  Globe, 
  Users, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Brain, 
  Target, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Crown, 
  Rocket, 
  Gift,
  HelpCircle,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Lock,
  Unlock,
  Infinity,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import toast from 'react-hot-toast'

const PricingPage = () => {
  const { user } = useAuth()
  const { classes } = useThemeClasses()
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started with your career journey',
      price: { monthly: 0, yearly: 0 },
      period: 'forever',
      features: [
        'Basic achievement tracking',
        '5 AI-generated stories per month',
        'Limited interview questions (10/month)',
        'Basic resume templates (3)',
        'Community support',
        'Mobile app access',
        'Basic analytics'
      ],
      limitations: [
        'No AI career coaching',
        'No advanced analytics',
        'No priority support',
        'No custom branding'
      ],
      popular: false,
      cta: 'Get Started Free',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Everything you need to accelerate your career growth',
      price: { monthly: 19, yearly: 190 },
      period: billingCycle === 'monthly' ? 'per month' : 'per year',
      features: [
        'Unlimited achievement tracking',
        'Unlimited AI-generated stories',
        'Unlimited interview questions',
        'Premium resume templates (20+)',
        'AI career coaching',
        'Priority support',
        'Advanced analytics dashboard',
        'Custom goal setting',
        'Export to PDF/DOC',
        'Email notifications',
        'Mobile app access',
        'API access'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial',
      color: 'from-blue-500 to-purple-600',
      savings: billingCycle === 'yearly' ? 'Save 17%' : null
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: { monthly: 'Custom', yearly: 'Custom' },
      period: 'per year',
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Custom integrations',
        'Dedicated support manager',
        'Advanced analytics & reporting',
        'Custom branding & white-labeling',
        'SSO & advanced security',
        'Custom training sessions',
        'SLA guarantees',
        'On-premise deployment options',
        'Custom API development',
        'Priority feature requests'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const features = [
    {
      category: 'Core Features',
      items: [
        { name: 'Achievement Tracking', free: true, pro: true, enterprise: true },
        { name: 'AI Story Generation', free: '5/month', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Interview Questions', free: '10/month', pro: 'Unlimited', enterprise: 'Unlimited' },
        { name: 'Resume Templates', free: '3', pro: '20+', enterprise: 'Custom' },
        { name: 'Cover Letter Builder', free: true, pro: true, enterprise: true }
      ]
    },
    {
      category: 'AI Features',
      items: [
        { name: 'AI Career Coaching', free: false, pro: true, enterprise: true },
        { name: 'Personalized Insights', free: false, pro: true, enterprise: true },
        { name: 'Skill Gap Analysis', free: false, pro: true, enterprise: true },
        { name: 'Career Path Recommendations', free: false, pro: true, enterprise: true }
      ]
    },
    {
      category: 'Analytics & Reporting',
      items: [
        { name: 'Basic Analytics', free: true, pro: true, enterprise: true },
        { name: 'Advanced Dashboard', free: false, pro: true, enterprise: true },
        { name: 'Progress Tracking', free: true, pro: true, enterprise: true },
        { name: 'Custom Reports', free: false, pro: true, enterprise: true },
        { name: 'Team Analytics', free: false, pro: false, enterprise: true }
      ]
    },
    {
      category: 'Support & Security',
      items: [
        { name: 'Community Support', free: true, pro: true, enterprise: true },
        { name: 'Priority Support', free: false, pro: true, enterprise: true },
        { name: 'Dedicated Manager', free: false, pro: false, enterprise: true },
        { name: 'SSO Integration', free: false, pro: false, enterprise: true },
        { name: 'Advanced Security', free: false, pro: false, enterprise: true }
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      content: 'The Pro plan was worth every penny. The AI coaching helped me land a 40% salary increase!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'Switched from Free to Pro and the unlimited features made all the difference in my job search.',
      rating: 5
    }
  ]

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, Pro plan comes with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely! You can cancel your subscription at any time with no cancellation fees.'
    }
  ]

  const handleGetStarted = (planId) => {
    setSelectedPlan(planId)
    if (user) {
      toast.success('Redirecting to your dashboard...')
    } else {
      toast.success('Let\'s start your career journey!')
    }
  }

  const getFeatureValue = (value) => {
    if (value === true) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (value === false) return <X className="w-5 h-5 text-red-500" />
    return <span className="text-sm font-medium">{value}</span>
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
              <Crown className="w-4 h-4" />
              <span>Choose Your Career Growth Plan</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-5xl md:text-7xl font-bold ${classes.text.primary} mb-6 leading-tight`}
            >
              Simple, Transparent
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl ${classes.text.secondary} mb-8 max-w-3xl mx-auto leading-relaxed`}
            >
              Start free and upgrade as you grow. No hidden fees, cancel anytime. 
              Choose the plan that best fits your career development needs.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className={`${classes.text.secondary}`}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  billingCycle === 'yearly' ? 'bg-blue-600' : `${classes.bg.tertiary}`
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                }`}></div>
              </button>
              <span className={`${classes.text.secondary}`}>Yearly</span>
              {billingCycle === 'yearly' && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  Save up to 17%
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${classes.bg.card} rounded-2xl border ${classes.border.primary} p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 shadow-xl scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold ${classes.text.primary} mb-2`}>{plan.name}</h3>
                  <p className={`${classes.text.secondary} mb-6`}>{plan.description}</p>
                  
                  <div className="mb-6">
                    {typeof plan.price[billingCycle] === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-blue-600">${plan.price[billingCycle]}</span>
                        <span className={`${classes.text.secondary}`}>/{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-blue-600">{plan.price[billingCycle]}</span>
                    )}
                  </div>

                  <Link
                    to={user ? '/dashboard' : '/signup'}
                    onClick={() => handleGetStarted(plan.id)}
                    className={`block w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                        : `${classes.bg.tertiary} ${classes.text.primary} hover:${classes.bg.secondary}`
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className={`font-semibold ${classes.text.primary} mb-3`}>What's included:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className={`${classes.text.primary}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-4">
                    <h4 className={`font-semibold ${classes.text.primary} mb-3`}>Not included:</h4>
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center gap-3">
                        <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className={`${classes.text.secondary}`}>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Compare Plans
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-xl ${classes.text.secondary} max-w-3xl mx-auto`}
            >
              See exactly what each plan includes to make the best choice for your career goals.
            </motion.p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${classes.border.primary}`}>
                  <th className="text-left py-4 px-6 font-semibold"></th>
                  <th className="text-center py-4 px-6 font-semibold">Free</th>
                  <th className="text-center py-4 px-6 font-semibold">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <tr key={categoryIndex}>
                    <td className={`py-4 px-6 font-semibold ${classes.text.primary} bg-opacity-50`} colSpan="4">
                      {category.category}
                    </td>
                  </tr>
                ))}
                {features.flatMap(category => 
                  category.items.map((item, itemIndex) => (
                    <tr key={`${category.category}-${itemIndex}`} className={`border-b ${classes.border.primary}`}>
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6 text-center">{getFeatureValue(item.free)}</td>
                      <td className="py-4 px-6 text-center">{getFeatureValue(item.pro)}</td>
                      <td className="py-4 px-6 text-center">{getFeatureValue(item.enterprise)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
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

      {/* FAQ Section */}
      <section className={`py-20 ${classes.bg.secondary}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${classes.text.primary} mb-6`}
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${classes.bg.card} rounded-xl border ${classes.border.primary} p-6`}
              >
                <h3 className={`text-lg font-semibold ${classes.text.primary} mb-3`}>
                  {faq.question}
                </h3>
                <p className={`${classes.text.secondary}`}>
                  {faq.answer}
                </p>
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
              Ready to Accelerate Your Career?
            </h2>
            <p className={`text-xl ${classes.text.secondary} mb-8 max-w-2xl mx-auto`}>
              Join thousands of professionals who are already achieving their career goals with our platform.
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
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PricingPage
