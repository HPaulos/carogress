import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  Plus,
  X,
  CheckCircle,
  Star,
  Zap,
  Award,
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  ArrowRight,
  Clock,
  Flame,
  Crown,
  BookOpen,
  Briefcase,
  Lightbulb,
  Heart,
  Shield,
  Rocket,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Activity,
  TrendingDown,
  Eye,
  Download,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share,
  Edit3,
  Trash2,
  CalendarDays,
  TrendingUpIcon,
  Home
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useThemeClasses } from '../theme/useTheme'
import mockDataService from '../services/mockDataService'
import toast from 'react-hot-toast'

const DashboardPage = () => {
  const { classes } = useThemeClasses()
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    category: 'work',
    impact: 'medium'
  })
  const [isRefining, setIsRefining] = useState(false)
  const [refinedDescription, setRefinedDescription] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [activeTab, setActiveTab] = useState('feed')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await mockDataService.getDashboardStats(user?.id || '1')
      setDashboardData(data)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      const mockAchievements = [
        {
          id: '1',
          title: 'Led successful project launch',
          description: 'Successfully managed a team of 5 developers to deliver a critical project ahead of schedule. The project involved implementing a new microservices architecture that improved system reliability by 60% and reduced deployment time from 2 hours to 15 minutes. Coordinated with stakeholders across 3 different departments and ensured all requirements were met while maintaining high code quality standards. The project was delivered 2 weeks early and received excellent feedback from both technical and business stakeholders.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 12,
          comments: 3
        },
        {
          id: '2',
          title: 'Completed advanced certification',
          description: 'Earned AWS Solutions Architect certification, expanding technical expertise in cloud architecture and infrastructure design. The certification process involved 6 months of intensive study, including hands-on labs with real-world scenarios, and passing a comprehensive exam covering 5 major domains. This certification opens up new opportunities for cloud-native projects and positions me as a subject matter expert in AWS services. The knowledge gained has already been applied to optimize our current infrastructure and reduce costs by 30%.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 8,
          comments: 1
        },
        {
          id: '3',
          title: 'Mentored junior developer',
          description: 'Provided comprehensive guidance and support to a junior developer, helping them grow their skills and confidence. Conducted weekly code reviews, pair programming sessions, and architecture discussions. The mentee successfully delivered their first feature independently and has shown significant improvement in code quality and problem-solving abilities. This experience reinforced my own understanding of best practices and improved my communication skills. The mentee is now contributing to critical projects and has become a valuable team member.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 15,
          comments: 2
        },
        {
          id: '4',
          title: 'Optimized database performance',
          description: 'Improved query performance by 40% through comprehensive database optimization. Analyzed slow-running queries, implemented proper indexing strategies, and optimized table structures. The improvements resulted in faster application response times, reduced server load, and better user experience. Also documented the optimization process for future reference and team knowledge sharing. The optimizations have been applied across multiple projects and have become standard practices for the team.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 20,
          comments: 5
        },
        {
          id: '5',
          title: 'Presented at team meeting',
          description: 'Delivered a technical presentation to the entire engineering team about implementing CI/CD best practices. The presentation covered automated testing strategies, deployment pipelines, and monitoring solutions. Received positive feedback from senior developers and the presentation led to the adoption of new tools and processes that improved our development workflow. The presentation was recorded and is now used as training material for new team members.',
          category: 'work',
          impact: 'low',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 6,
          comments: 1
        },
        {
          id: '6',
          title: 'Implemented automated testing framework',
          description: 'Designed and implemented a comprehensive automated testing framework that increased test coverage from 45% to 85%. The framework includes unit tests, integration tests, and end-to-end tests using modern testing tools. This has significantly reduced bug reports in production and improved code quality across the entire team. The framework is now being used as a standard across multiple projects and has been adopted by other teams in the organization.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 18,
          comments: 4
        },
        {
          id: '7',
          title: 'Completed React advanced course',
          description: 'Finished an intensive React advanced course covering hooks, context API, performance optimization, and advanced patterns. The course included building a full-stack application with modern React practices, state management with Redux Toolkit, and integration with backend APIs. Gained deep understanding of React internals and best practices for building scalable applications. The knowledge has been immediately applied to refactor our frontend architecture and improve performance.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 11,
          comments: 2
        },
        {
          id: '8',
          title: 'Organized team building event',
          description: 'Successfully organized a team building event that brought together 25 team members from different departments. Planned activities, coordinated logistics, and ensured everyone had a great experience. The event improved team morale, fostered better relationships between team members, and created a more collaborative work environment. Received appreciation from management and team members. The event has become an annual tradition and has significantly improved cross-departmental collaboration.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 22,
          comments: 6
        },
        {
          id: '9',
          title: 'Refactored legacy codebase',
          description: 'Successfully refactored a critical legacy codebase that was causing performance issues and maintenance problems. The refactoring involved modernizing the architecture, improving code organization, and implementing modern development practices. The new codebase is 50% faster, more maintainable, and follows current industry standards. This project served as a template for future refactoring efforts across the organization.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 25,
          comments: 8
        },
        {
          id: '10',
          title: 'Led technical architecture review',
          description: 'Conducted a comprehensive technical architecture review for a major system redesign project. Evaluated current architecture, identified bottlenecks, and proposed improvements based on industry best practices. The review involved collaboration with senior architects, system administrators, and business stakeholders. The recommendations were approved and implemented, resulting in improved system scalability and reduced operational costs.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 30,
          comments: 12
        },
        {
          id: '11',
          title: 'Completed machine learning course',
          description: 'Finished an advanced machine learning course covering algorithms, data preprocessing, model evaluation, and deployment strategies. The course included hands-on projects with real datasets and practical applications. Gained expertise in Python libraries like TensorFlow, scikit-learn, and pandas. This knowledge has opened up opportunities to work on AI-powered features and contribute to data science initiatives within the company.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 14,
          comments: 3
        },
        {
          id: '12',
          title: 'Implemented security best practices',
          description: 'Led the implementation of comprehensive security best practices across the development team. Conducted security training sessions, implemented code scanning tools, and established secure coding guidelines. The initiative resulted in a 70% reduction in security vulnerabilities and improved the overall security posture of our applications. The security framework has been adopted by other teams and has become a company-wide standard.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 28,
          comments: 7
        },
        {
          id: '13',
          title: 'Volunteered at coding bootcamp',
          description: 'Volunteered as a mentor at a local coding bootcamp, helping students learn web development fundamentals. Conducted weekly sessions covering HTML, CSS, JavaScript, and basic programming concepts. Mentored 15 students throughout the program, providing guidance on projects and career advice. The experience was incredibly rewarding and helped me develop better teaching and communication skills.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 19,
          comments: 5
        },
        {
          id: '14',
          title: 'Optimized deployment pipeline',
          description: 'Redesigned and optimized the deployment pipeline, reducing deployment time from 45 minutes to 8 minutes. Implemented parallel processing, caching strategies, and automated rollback mechanisms. The new pipeline includes comprehensive testing, security scanning, and performance monitoring. This improvement has significantly increased team productivity and reduced the risk of deployment failures.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 32,
          comments: 9
        },
        {
          id: '15',
          title: 'Completed system design course',
          description: 'Finished an intensive system design course covering distributed systems, scalability patterns, and architectural principles. The course included designing large-scale systems, understanding trade-offs, and learning from real-world case studies. Gained expertise in designing scalable, fault-tolerant systems and understanding the complexities of distributed architectures. This knowledge has been valuable for architectural decisions and system planning.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 16,
          comments: 4
        },
        {
          id: '16',
          title: 'Led code review initiative',
          description: 'Established a comprehensive code review process that improved code quality and knowledge sharing across the team. Implemented automated code quality checks, standardized review guidelines, and created a culture of constructive feedback. The initiative resulted in 40% fewer bugs in production and improved team collaboration. The process has been adopted by multiple teams and has become a company-wide standard.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 24,
          comments: 6
        },
        {
          id: '17',
          title: 'Built personal portfolio website',
          description: 'Designed and developed a comprehensive personal portfolio website showcasing my projects, skills, and experience. The website features modern design principles, responsive layout, and interactive elements. Implemented SEO best practices, performance optimization, and accessibility features. The portfolio has helped me showcase my work to potential employers and clients, leading to several interview opportunities.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 8,
          comments: 2
        },
        {
          id: '18',
          title: 'Implemented monitoring and alerting',
          description: 'Set up comprehensive monitoring and alerting systems for production applications. Implemented application performance monitoring, error tracking, and infrastructure monitoring. Created custom dashboards and automated alerting rules. The system has helped identify and resolve issues proactively, reducing downtime by 60% and improving overall system reliability.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 26,
          comments: 8
        },
        {
          id: '19',
          title: 'Completed data structures course',
          description: 'Finished an advanced data structures and algorithms course, strengthening my problem-solving skills and understanding of computational complexity. The course covered advanced topics like dynamic programming, graph algorithms, and optimization techniques. Completed numerous coding challenges and participated in algorithm competitions. This knowledge has improved my ability to write efficient code and solve complex problems.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 12,
          comments: 3
        },
        {
          id: '20',
          title: 'Organized hackathon event',
          description: 'Successfully organized a 48-hour hackathon event that brought together 50 developers from various companies. Planned the event logistics, secured sponsors, and coordinated with mentors and judges. The event featured workshops, networking sessions, and a competitive coding challenge. The hackathon fostered innovation, collaboration, and community building within the local tech scene.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 35,
          comments: 15
        },
        {
          id: '21',
          title: 'Contributed to open source project',
          description: 'Made significant contributions to a popular open source project, including bug fixes, feature implementations, and documentation improvements. Submitted 15 pull requests, reviewed code from other contributors, and participated in community discussions. The contributions have been well-received by the maintainers and have helped improve the project for thousands of users worldwide.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 18,
          comments: 7
        },
        {
          id: '22',
          title: 'Implemented microservices architecture',
          description: 'Successfully migrated a monolithic application to a microservices architecture, improving scalability and maintainability. Designed the service boundaries, implemented inter-service communication, and established deployment strategies. The migration resulted in 50% faster deployment times, improved fault isolation, and better resource utilization. The architecture has served as a template for other projects in the organization.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 29,
          comments: 11
        },
        {
          id: '23',
          title: 'Completed cloud architecture certification',
          description: 'Earned Google Cloud Professional Cloud Architect certification, demonstrating expertise in designing and managing cloud solutions. The certification process involved extensive study of cloud architecture principles, security best practices, and cost optimization strategies. The knowledge gained has been applied to design scalable cloud solutions and optimize existing infrastructure.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 13,
          comments: 4
        },
        {
          id: '24',
          title: 'Led technical interview process',
          description: 'Established and led a comprehensive technical interview process for hiring senior developers. Designed coding challenges, technical assessments, and evaluation criteria. Conducted over 50 technical interviews and provided detailed feedback to candidates. The process has helped hire high-quality developers and improved the overall technical capabilities of the team.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 21,
          comments: 6
        },
        {
          id: '25',
          title: 'Built automation tools',
          description: 'Developed a suite of automation tools that streamlined repetitive development tasks and improved team productivity. Created scripts for environment setup, testing automation, and deployment processes. The tools have saved the team hundreds of hours and reduced human error in critical processes. The automation framework has been adopted by other teams and has become a standard practice.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 105 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 27,
          comments: 9
        },
        {
          id: '26',
          title: 'Fixed critical production bug',
          description: 'Quickly identified and resolved a critical production bug that was affecting 10,000+ users. The issue was related to authentication token handling and was causing users to be logged out unexpectedly. Implemented a hotfix within 2 hours and deployed it to production, minimizing user impact. The fix included proper error handling and monitoring to prevent similar issues in the future.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 25,
          comments: 7
        },
        {
          id: '10',
          title: 'Started daily meditation practice',
          description: 'Began a daily meditation practice to improve focus and reduce stress. Started with 10 minutes per day and gradually increased to 20 minutes. The practice has helped improve concentration during coding sessions, reduced anxiety about deadlines, and provided better work-life balance. This personal development has positively impacted both professional and personal life.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 9,
          comments: 3
        },
        {
          id: '11',
          title: 'Contributed to open source project',
          description: 'Made significant contributions to a popular open source project by fixing bugs and adding new features. Submitted 5 pull requests that were accepted and merged, including documentation improvements and performance optimizations. This experience improved my coding skills, taught me about collaborative development, and built my reputation in the developer community.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 14,
          comments: 2
        },
        {
          id: '12',
          title: 'Implemented user feedback system',
          description: 'Designed and implemented a comprehensive user feedback system that collects and analyzes user input. The system includes in-app feedback forms, analytics dashboard, and automated reporting. This has provided valuable insights into user needs and pain points, leading to better product decisions and improved user satisfaction scores by 30%.',
          category: 'work',
          impact: 'medium',
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 16,
          comments: 4
        },
        {
          id: '13',
          title: 'Completed system design course',
          description: 'Finished an advanced system design course covering distributed systems, scalability patterns, and architectural best practices. Learned about microservices, load balancing, caching strategies, and database design at scale. The course included hands-on projects building scalable applications and preparing for system design interviews.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 12,
          comments: 1
        },
        {
          id: '14',
          title: 'Led code review process improvement',
          description: 'Initiated and led improvements to the code review process, implementing new guidelines and tools. Introduced automated code quality checks, standardized review templates, and established best practices for constructive feedback. This has improved code quality, reduced review time, and created a more collaborative development environment.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 19,
          comments: 5
        },
        {
          id: '15',
          title: 'Built personal portfolio website',
          description: 'Created a modern, responsive portfolio website showcasing my projects and skills. Used React, TypeScript, and modern CSS techniques to build a fast, accessible, and visually appealing site. The website includes project showcases, skills section, and contact information. This project improved my frontend skills and serves as a professional online presence.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 7,
          comments: 2
        },
        {
          id: '16',
          title: 'Led cross-functional team workshop',
          description: 'Organized and facilitated a 2-day workshop bringing together developers, designers, and product managers to align on project goals and technical architecture. The workshop resulted in improved communication between teams, clearer project requirements, and a shared understanding of technical constraints. This initiative strengthened cross-team collaboration and improved project delivery timelines.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 28,
          comments: 8
        },
        {
          id: '17',
          title: 'Completed Docker containerization project',
          description: 'Successfully containerized our entire application stack using Docker, including the main application, database, and supporting services. Created comprehensive Docker Compose configurations and documentation for local development. This project improved deployment consistency, reduced environment setup time from 2 hours to 15 minutes, and made it easier for new team members to get started.',
          category: 'work',
          impact: 'medium',
          date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 16,
          comments: 4
        },
        {
          id: '18',
          title: 'Started daily journaling habit',
          description: 'Began a daily journaling practice to reflect on work experiences, track personal growth, and document learning moments. Write for 15-20 minutes each morning, covering technical challenges, team interactions, and career goals. This habit has improved self-awareness, helped identify patterns in work performance, and provided valuable insights for career development.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 12,
          comments: 3
        },
        {
          id: '19',
          title: 'Implemented GraphQL API',
          description: 'Designed and implemented a GraphQL API to replace our REST endpoints, providing more flexible data fetching capabilities. The new API reduced over-fetching by 60%, improved frontend performance, and provided better developer experience with self-documenting queries. Also created comprehensive documentation and example queries for the development team.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 22,
          comments: 6
        },
        {
          id: '20',
          title: 'Completed machine learning course',
          description: 'Finished an intensive machine learning course covering supervised learning, unsupervised learning, and deep learning concepts. Built several projects including a recommendation system, image classification model, and natural language processing application. Gained practical experience with TensorFlow, scikit-learn, and data preprocessing techniques.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 18,
          comments: 5
        },
        {
          id: '21',
          title: 'Organized code review best practices session',
          description: 'Conducted a team-wide session on code review best practices, covering constructive feedback techniques, review checklists, and automation tools. Created standardized review templates and guidelines that improved code quality and reduced review time. The session led to more consistent and helpful code reviews across the team.',
          category: 'leadership',
          impact: 'medium',
          date: new Date(Date.now() - 52 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 20,
          comments: 4
        },
        {
          id: '22',
          title: 'Fixed critical security vulnerability',
          description: 'Identified and patched a critical SQL injection vulnerability in our authentication system that could have exposed user data. Implemented proper input validation, parameterized queries, and security headers. Also conducted a security audit of similar patterns across the codebase and created security guidelines for the team.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 31,
          comments: 9
        },
        {
          id: '23',
          title: 'Started public speaking practice',
          description: 'Began practicing public speaking by presenting at internal team meetings and local tech meetups. Started with 5-minute lightning talks and gradually increased to 20-minute presentations. This practice has improved confidence, communication skills, and ability to explain complex technical concepts clearly to different audiences.',
          category: 'personal',
          impact: 'medium',
          date: new Date(Date.now() - 58 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 15,
          comments: 3
        },
        {
          id: '24',
          title: 'Implemented CI/CD pipeline',
          description: 'Set up a comprehensive CI/CD pipeline using GitHub Actions that automates testing, building, and deployment processes. The pipeline includes automated testing, code quality checks, security scanning, and deployment to staging and production environments. This reduced deployment time from 4 hours to 30 minutes and improved code quality.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 24,
          comments: 7
        },
        {
          id: '25',
          title: 'Completed TypeScript advanced course',
          description: 'Finished an advanced TypeScript course covering advanced types, decorators, generics, and best practices for large-scale applications. Learned about type safety, design patterns, and how to write maintainable TypeScript code. Applied these concepts to improve type safety in our existing JavaScript codebase.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 62 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 14,
          comments: 2
        },
        {
          id: '26',
          title: 'Mentored three junior developers',
          description: 'Provided guidance and support to three junior developers, helping them grow their skills and confidence. Conducted regular one-on-one sessions, code reviews, and pair programming sessions. All three mentees have successfully delivered features independently and shown significant improvement in code quality and problem-solving abilities.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 26,
          comments: 8
        },
        {
          id: '27',
          title: 'Optimized application performance',
          description: 'Conducted a comprehensive performance audit and implemented optimizations that improved application load time by 40% and reduced memory usage by 30%. Implemented lazy loading, code splitting, image optimization, and caching strategies. The improvements resulted in better user experience and reduced server costs.',
          category: 'work',
          impact: 'high',
          date: new Date(Date.now() - 68 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 29,
          comments: 6
        },
        {
          id: '28',
          title: 'Started fitness routine',
          description: 'Began a regular fitness routine including strength training and cardio exercises. Work out 4-5 times per week, focusing on building strength, improving cardiovascular health, and maintaining work-life balance. This routine has improved energy levels, reduced stress, and provided better focus during work hours.',
          category: 'personal',
          impact: 'low',
          date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
          points: 10,
          likes: 11,
          comments: 4
        },
        {
          id: '29',
          title: 'Completed system architecture course',
          description: 'Finished an advanced system architecture course covering microservices, distributed systems, and scalable design patterns. Learned about service discovery, load balancing, fault tolerance, and monitoring strategies. Applied these concepts to improve our current architecture and prepare for future scaling needs.',
          category: 'learning',
          impact: 'medium',
          date: new Date(Date.now() - 72 * 24 * 60 * 60 * 1000).toISOString(),
          points: 25,
          likes: 17,
          comments: 3
        },
        {
          id: '30',
          title: 'Led successful product launch',
          description: 'Successfully led the launch of a new product feature that increased user engagement by 35% and generated $50K in additional revenue in the first month. Coordinated with marketing, sales, and support teams to ensure smooth rollout. Managed customer feedback and implemented quick iterations based on user input.',
          category: 'leadership',
          impact: 'high',
          date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
          points: 50,
          likes: 33,
          comments: 10
        }
      ]

      setDashboardData({
        user: user,
        achievements: mockAchievements,
        applications: [],
        stats: {
          totalPoints: user?.totalPoints || 1250,
          level: user?.level || 3,
          streak: user?.streak || 7,
          applicationsCount: 0,
          achievementsCount: mockAchievements.length
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAchievementSubmit = async (e) => {
    e.preventDefault()
    
    if (!achievementForm.description.trim()) {
      toast.error('Please describe your achievement')
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAchievement = {
        id: Date.now().toString(),
        title: achievementForm.description.split(' ').slice(0, 8).join(' ') + '...',
        description: achievementForm.description,
        category: achievementForm.category,
        impact: achievementForm.impact,
        date: new Date().toISOString(),
        points: getPointsForImpact(achievementForm.impact),
        likes: 0,
        comments: 0
      }

      setDashboardData(prev => ({
        ...prev,
        achievements: [newAchievement, ...(prev?.achievements || [])],
        stats: {
          ...prev?.stats,
          totalPoints: (prev?.stats?.totalPoints || 0) + newAchievement.points,
          achievementsCount: (prev?.stats?.achievementsCount || 0) + 1
        }
      }))

      setAchievementForm({
        title: '',
        description: '',
        category: 'work',
        impact: 'medium'
      })
      setRefinedDescription('')
      
      toast.success('Achievement logged successfully! 🎉')
    } catch (error) {
      toast.error('Failed to log achievement')
    }
  }

  const getPointsForImpact = (impact) => {
    const pointsMap = {
      low: 10,
      medium: 25,
      high: 50,
      critical: 100
    }
    return pointsMap[impact] || 25
  }

  const getCategoryIcon = (category) => {
    const icons = {
      work: Briefcase,
      personal: Heart,
      learning: BookOpen,
      leadership: Crown,
      innovation: Lightbulb,
      teamwork: Users,
      communication: MessageSquare
    }
    return icons[category] || Target
  }

  const getImpactColor = (impact) => {
    const colors = {
      low: 'text-green-500',
      medium: 'text-blue-500',
      high: 'text-orange-500',
      critical: 'text-red-500'
    }
    return colors[impact] || 'text-blue-500'
  }

  const getImpactLabel = (impact) => {
    const labels = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    }
    return labels[impact] || 'Medium'
  }

  const handleAIRefinement = async () => {
    if (!achievementForm.description.trim()) {
      toast.error('Please enter a description first')
      return
    }

    setIsRefining(true)
    
    setTimeout(() => {
      const originalText = achievementForm.description
      const refinedText = `Successfully ${originalText.toLowerCase().replace(/^i\s+/i, '').replace(/^i\s+/i, '')} by implementing strategic approaches and leveraging key skills. This achievement demonstrates strong ${achievementForm.category} capabilities and resulted in measurable impact.`
      
      setRefinedDescription(refinedText)
      setIsRefining(false)
      toast.success('AI has refined your description!')
    }, 2000)
  }

  const applyRefinedDescription = () => {
    if (refinedDescription) {
      setAchievementForm(prev => ({ ...prev, description: refinedDescription }))
      setRefinedDescription('')
      toast.success('Refined description applied!')
    }
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return '1d ago'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <h2 className={`text-lg font-semibold ${classes.text.primary}`}>Loading your dashboard...</h2>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className={`min-h-screen ${classes.bg.primary} flex items-center justify-center p-4`}>
        <div className={`${classes.bg.card} ${classes.border.primary} border rounded-xl p-6 text-center max-w-sm`}>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className={`text-xl font-bold ${classes.text.primary} mb-2`}>Access Required</h2>
          <p className={`${classes.text.secondary} mb-4 text-sm`}>
            Please sign in to view your personalized dashboard.
          </p>
          <button
            onClick={() => window.location.href = '/signin'}
            className="btn-primary text-sm px-4 py-2"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary}`}>
      {/* Professional Header */}
      <div className={`${classes.bg.card} ${classes.border.primary} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className={`text-lg font-semibold ${classes.text.primary}`}>Dashboard</h1>
                <p className={`text-sm ${classes.text.secondary}`}>Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={`text-sm ${classes.text.secondary}`}>Level {dashboardData?.stats?.level || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className={`text-sm ${classes.text.secondary}`}>{dashboardData?.stats?.streak || 0} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm font-medium ${classes.text.primary}`}>{dashboardData?.stats?.totalPoints || 0} pts</span>
              </div>
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
                    { title: 'Log Achievement', icon: Plus, action: () => setActiveTab('log') },
                    { title: 'Generate Resume', icon: FileText, action: () => window.location.href = '/resume' },
                    { title: 'Practice Interview', icon: MessageSquare, action: () => window.location.href = '/interview' },
                    { title: 'View Stories', icon: BookOpen, action: () => window.location.href = '/stories' },
                    { title: 'AI Career Coach', icon: Sparkles, action: () => window.location.href = '/ai-coach' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        item.title === 'Log Achievement' && activeTab === 'log' 
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
              
              {/* Progress Section */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-3`}>Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className={classes.text.secondary}>Level {dashboardData?.stats?.level || 1}</span>
                      <span className={classes.text.secondary}>
                        {dashboardData?.stats?.totalPoints || 0} / {((dashboardData?.stats?.level || 1) + 1) * 1000}
                      </span>
                    </div>
                    <div className={`w-full ${classes.bg.tertiary} rounded-full h-2 overflow-hidden`}>
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, ((dashboardData?.stats?.totalPoints || 0) / (((dashboardData?.stats?.level || 1) + 1) * 1000)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Streak</span>
                    <span className={`font-medium ${classes.text.primary}`}>{dashboardData?.stats?.streak || 0} days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={classes.text.secondary}>Achievements</span>
                    <span className={`font-medium ${classes.text.primary}`}>{dashboardData?.stats?.achievementsCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="col-span-6">
            {/* Simple Achievement Form - Always Available */}
            <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mb-6`}>
              <form onSubmit={handleAchievementSubmit} className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className={`text-sm font-medium ${classes.text.primary}`}>What did you accomplish today?</h3>
                </div>

                <div>
                  <textarea
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm({ ...achievementForm, description: e.target.value })}
                    className={`w-full h-20 px-3 py-2 border ${classes.border.primary} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${classes.bg.input} ${classes.text.primary} resize-none text-sm`}
                    placeholder="Describe your achievement... (e.g., Led a team to deliver a project ahead of schedule)"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Category Selection */}
                    <select
                      value={achievementForm.category}
                      onChange={(e) => setAchievementForm({ ...achievementForm, category: e.target.value })}
                      className={`px-3 py-1.5 text-sm border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select category...</option>
                      <option value="work">💼 Work</option>
                      <option value="learning">📚 Learning</option>
                      <option value="leadership">👑 Leadership</option>
                      <option value="personal">❤️ Personal</option>
                    </select>

                    {/* Impact Selection */}
                    <select
                      value={achievementForm.impact}
                      onChange={(e) => setAchievementForm({ ...achievementForm, impact: e.target.value })}
                      className={`px-3 py-1.5 text-sm border ${classes.border.primary} rounded-lg ${classes.bg.input} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="">Select impact...</option>
                      <option value="low">🟢 Small impact</option>
                      <option value="medium">🔵 Medium impact</option>
                      <option value="high">🟠 Big impact</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowHelp(true)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Writing Tips"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={!achievementForm.description.trim()}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        achievementForm.description.trim()
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                      }`}
                    >
                      Post
                    </button>
                  </div>
                </div>

                {refinedDescription && (
                  <div className={`${classes.bg.tertiary} rounded-lg p-3 border-l-4 border-purple-500`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${classes.text.primary}`}>AI Refined Version</span>
                      <button
                        onClick={applyRefinedDescription}
                        className="text-xs text-purple-500 hover:text-purple-600"
                      >
                        Apply
                      </button>
                    </div>
                    <p className={`text-xs ${classes.text.secondary}`}>{refinedDescription}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Recent Achievements Feed */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <h3 className={`text-sm font-medium ${classes.text.primary}`}>Recent Achievements</h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {dashboardData?.achievements?.map((achievement, index) => {
                const CategoryIcon = getCategoryIcon(achievement.category || 'work')
                return (
                  <div
                    key={achievement.id}
                    className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 hover:shadow-sm transition-shadow`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-medium ${classes.text.primary} truncate`}>
                              {achievement.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`text-xs ${classes.text.secondary}`}>{formatTimeAgo(achievement.date)}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getImpactColor(achievement.impact || 'medium')} ${classes.bg.tertiary}`}>
                                {getImpactLabel(achievement.impact || 'medium')}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className={`text-xs font-medium ${classes.text.primary}`}>
                                  {achievement.points || 25}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className={`${classes.text.secondary} text-sm leading-relaxed mb-3 line-clamp-3`}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              <span className="text-xs">{achievement.likes || 0}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition-colors">
                              <MessageCircle className="w-3 h-3" />
                              <span className="text-xs">{achievement.comments || 0}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
                              <Share className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3 text-gray-400" />
                            <span className={`text-xs ${classes.text.secondary}`}>
                              {new Date(achievement.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Sidebar - Recent Activity */}
          <div className="col-span-3">
            <div className="sticky top-24">
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Recent Activity</h3>
                <div className="space-y-3">
                  {dashboardData?.achievements?.slice(0, 5).map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs ${classes.text.primary} font-medium truncate`}>
                          {achievement.title}
                        </p>
                        <p className={`text-xs ${classes.text.secondary} mt-1`}>
                          {formatTimeAgo(achievement.date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className={`${classes.bg.card} ${classes.border.primary} border rounded-lg p-4 mt-4`}>
                <h3 className={`text-sm font-medium ${classes.text.primary} mb-4`}>Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${classes.text.secondary}`}>This Week</span>
                    <span className={`text-xs font-medium ${classes.text.primary}`}>
                      {dashboardData?.achievements?.filter(a => {
                        const date = new Date(a.date);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return date > weekAgo;
                      }).length || 0} achievements
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${classes.text.secondary}`}>Avg. Points</span>
                    <span className={`text-xs font-medium ${classes.text.primary}`}>
                      {Math.round((dashboardData?.achievements?.reduce((sum, a) => sum + (a.points || 25), 0) || 0) / Math.max(dashboardData?.achievements?.length || 1, 1))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs ${classes.text.secondary}`}>Categories</span>
                    <span className={`text-xs font-medium ${classes.text.primary}`}>
                      {new Set(dashboardData?.achievements?.map(a => a.category) || []).size}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${classes.bg.card} rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`${classes.bg.secondary} px-6 py-4 border-b ${classes.border.primary} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-500" />
                <h3 className={`font-semibold ${classes.text.primary}`}>Writing Tips</h3>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Be Specific</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Instead of "worked on a project", say "led a team of 5 developers to deliver a critical feature ahead of schedule"</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Include Impact</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Add numbers like "improved performance by 40%" or "reduced costs by $50K"</p>
                </div>
                <div>
                  <h4 className={`font-semibold ${classes.text.primary} mb-2`}>Use Action Verbs</h4>
                  <p className={`${classes.text.secondary} text-sm`}>Start with words like "led", "developed", "optimized", "mentored"</p>
                </div>
              </div>
            </div>

            <div className={`px-6 py-4 border-t ${classes.border.primary} ${classes.bg.secondary}`}>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
