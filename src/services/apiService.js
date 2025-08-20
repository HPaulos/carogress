// API Service - Simulates backend API calls with in-memory database
class ApiService {
  constructor() {
    // In-memory database
    this.db = {
      users: [],
      achievements: [],
      documents: { resumes: [], coverLetters: [] },
      notifications: [],
      jobApplications: [],
      stories: [],
      interviewQuestions: [],
      aiConversations: [],
      userProgress: [],
      templates: []
    }
    
    // Initialize with mock data
    this.initializeMockData()
    
    // API configuration
    this.config = {
      baseUrl: '/api/v1',
      timeout: 10000,
      retryAttempts: 3
    }
  }

  // Initialize mock data
  initializeMockData() {
    // Users
    this.db.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        title: 'Senior Software Engineer',
        level: 5,
        totalPoints: 1250,
        streak: 7,
        achievements: ['1', '2', '3', '4', '5'],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
        goals: ['Become Tech Lead', 'Learn Machine Learning', 'Contribute to Open Source'],
        socialLinks: [
          { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
          { label: 'GitHub', url: 'https://github.com/johndoe' }
        ],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-02-20T14:30:00Z'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        title: 'Product Manager',
        level: 4,
        totalPoints: 980,
        streak: 12,
        achievements: ['6', '7', '8'],
        skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis'],
        goals: ['Lead Product Team', 'Launch Successful Product', 'Improve User Experience'],
        socialLinks: [
          { label: 'LinkedIn', url: 'https://linkedin.com/in/janesmith' }
        ],
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-02-18T16:45:00Z'
      }
    ]

    // Achievements
    this.db.achievements = [
      {
        id: '1',
        userId: '1',
        title: 'Led successful project launch',
        description: 'Successfully managed a team of 5 developers to deliver a critical project ahead of schedule. The project involved implementing a new microservices architecture that improved system reliability by 60% and reduced deployment time from 2 hours to 15 minutes.',
        category: 'work',
        impact: 'high',
        points: 50,
        likes: 12,
        comments: 3,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        userId: '1',
        title: 'Completed advanced certification',
        description: 'Earned AWS Solutions Architect certification, expanding technical expertise in cloud architecture and infrastructure design. The certification process involved 6 months of intensive study.',
        category: 'learning',
        impact: 'medium',
        points: 25,
        likes: 8,
        comments: 1,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        userId: '1',
        title: 'Mentored junior developers',
        description: 'Provided guidance and mentorship to 3 junior developers, helping them improve their coding skills and understanding of best practices. Conducted regular code reviews and pair programming sessions.',
        category: 'leadership',
        impact: 'medium',
        points: 30,
        likes: 15,
        comments: 2,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        userId: '1',
        title: 'Optimized database performance',
        description: 'Improved database query performance by 40% through query optimization and indexing strategies. Reduced average response time from 500ms to 300ms.',
        category: 'work',
        impact: 'high',
        points: 40,
        likes: 10,
        comments: 1,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        userId: '1',
        title: 'Implemented CI/CD pipeline',
        description: 'Set up automated CI/CD pipeline that reduced deployment time by 80% and improved code quality through automated testing and code analysis.',
        category: 'work',
        impact: 'high',
        points: 45,
        likes: 18,
        comments: 4,
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '6',
        userId: '1',
        title: 'Reduced customer response time',
        description: 'Implemented AI chatbot that reduced customer response time by 80% and improved customer satisfaction scores from 3.2 to 4.5 out of 5.',
        category: 'work',
        impact: 'high',
        points: 55,
        likes: 22,
        comments: 6,
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '7',
        userId: '1',
        title: 'Improved system capacity',
        description: 'Enhanced system architecture to handle 300% more concurrent users through load balancing and caching strategies.',
        category: 'work',
        impact: 'high',
        points: 60,
        likes: 25,
        comments: 8,
        date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '8',
        userId: '1',
        title: 'Led technical architecture review',
        description: 'Conducted comprehensive technical architecture review for a major system migration, identifying potential issues and providing solutions.',
        category: 'leadership',
        impact: 'medium',
        points: 35,
        likes: 14,
        comments: 3,
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '9',
        userId: '1',
        title: 'Contributed to open source',
        description: 'Made significant contributions to a popular open-source project, including bug fixes and feature improvements.',
        category: 'community',
        impact: 'medium',
        points: 20,
        likes: 12,
        comments: 2,
        date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '10',
        userId: '1',
        title: 'Improved code quality',
        description: 'Implemented code quality standards and automated testing that reduced bug reports by 50% and improved code maintainability.',
        category: 'work',
        impact: 'medium',
        points: 30,
        likes: 16,
        comments: 4,
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Documents
    this.db.documents.resumes = [
      {
        id: '1',
        userId: '1',
        title: 'Software Engineer Resume',
        type: 'resume',
        template: 'Modern',
        content: {
          name: 'John Doe',
          title: 'Senior Software Engineer',
          email: 'john@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          summary: 'Experienced software engineer with expertise in modern web technologies and full-stack development.',
          experience: [
            {
              position: 'Senior Software Engineer',
              company: 'Tech Company',
              duration: '2022 - Present',
              achievements: ['Led development of microservices architecture', 'Improved system performance by 60%']
            }
          ],
          education: [
            {
              degree: 'Bachelor of Science in Computer Science',
              school: 'University of Technology',
              year: '2020'
            }
          ],
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        downloads: 5,
        rating: 4.8,
        basedOnAchievements: 12
      }
    ]

    this.db.documents.coverLetters = [
      {
        id: '1',
        userId: '1',
        title: 'Google Application Cover Letter',
        type: 'cover-letter',
        template: 'Professional',
        content: 'Dear Hiring Manager, I am writing to express my strong interest in the Software Engineer position...',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        downloads: 2,
        rating: 4.7,
        basedOnAchievements: 6
      }
    ]

    // Stories
    this.db.stories = [
      {
        id: '1',
        userId: '1',
        title: 'From Junior to Senior: My Career Journey',
        content: 'When I first started as a junior developer, I never imagined the incredible journey that lay ahead...',
        category: 'career-growth',
        likes: 45,
        views: 120,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Interview Questions
    this.db.interviewQuestions = [
      {
        id: '1',
        question: 'Tell me about a time when you had to lead a team through a challenging project.',
        category: 'leadership',
        difficulty: 'medium',
        basedOnAchievement: 'Led team of 5 developers to deliver project ahead of schedule',
        suggestedAnswer: 'Focus on your leadership style, communication strategies, and how you motivated the team.',
        keyPoints: ['Leadership approach', 'Team motivation', 'Problem-solving', 'Results achieved'],
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    // Notifications
    this.db.notifications = [
      {
        id: '1',
        userId: '1',
        title: 'New Achievement Unlocked!',
        message: 'Congratulations! You\'ve earned the "Project Leader" badge.',
        type: 'achievement',
        read: false,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      }
    ]
  }

  // Generic API call method
  async apiCall(endpoint, options = {}) {
    const { method = 'GET', data = null, timeout = this.config.timeout } = options
    
    // Simulate network delay
    await this.delay(Math.random() * 500 + 200)
    
    // Simulate occasional network errors
    if (Math.random() < 0.05) {
      throw new Error('Network error')
    }
    
    return { success: true, data }
  }

  // Utility method to simulate delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // User API endpoints
  async getUsers() {
    return this.apiCall('/users', { data: this.db.users })
  }

  async getUserById(id) {
    const user = this.db.users.find(u => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return this.apiCall(`/users/${id}`, { data: user })
  }

  async updateUser(id, updates) {
    const userIndex = this.db.users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }
    
    this.db.users[userIndex] = { ...this.db.users[userIndex], ...updates, updatedAt: new Date().toISOString() }
    return this.apiCall(`/users/${id}`, { method: 'PUT', data: this.db.users[userIndex] })
  }

  // Achievement API endpoints
  async getAchievements(userId = null) {
    let achievements = this.db.achievements
    if (userId) {
      achievements = achievements.filter(a => a.userId === userId)
    }
    return this.apiCall('/achievements', { data: achievements })
  }

  async createAchievement(achievement) {
    const newAchievement = {
      id: Date.now().toString(),
      userId: achievement.userId,
      ...achievement,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    }
    
    this.db.achievements.unshift(newAchievement)
    
    // Update user points and level
    const user = this.db.users.find(u => u.id === achievement.userId)
    if (user) {
      user.totalPoints += achievement.points || 0
      user.achievements.push(newAchievement.id)
      user.updatedAt = new Date().toISOString()
    }
    
    return this.apiCall('/achievements', { method: 'POST', data: newAchievement })
  }

  async updateAchievement(id, updates) {
    const achievementIndex = this.db.achievements.findIndex(a => a.id === id)
    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }
    
    this.db.achievements[achievementIndex] = { 
      ...this.db.achievements[achievementIndex], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    }
    
    return this.apiCall(`/achievements/${id}`, { method: 'PUT', data: this.db.achievements[achievementIndex] })
  }

  async deleteAchievement(id) {
    const achievementIndex = this.db.achievements.findIndex(a => a.id === id)
    if (achievementIndex === -1) {
      throw new Error('Achievement not found')
    }
    
    const achievement = this.db.achievements[achievementIndex]
    this.db.achievements.splice(achievementIndex, 1)
    
    // Update user points
    const user = this.db.users.find(u => u.id === achievement.userId)
    if (user) {
      user.totalPoints -= achievement.points || 0
      user.achievements = user.achievements.filter(aId => aId !== id)
      user.updatedAt = new Date().toISOString()
    }
    
    return this.apiCall(`/achievements/${id}`, { method: 'DELETE', data: { success: true } })
  }

  // Document API endpoints
  async getDocuments(userId = null, type = null) {
    let documents = []
    
    if (type === 'resume' || !type) {
      documents.push(...this.db.documents.resumes)
    }
    if (type === 'cover-letter' || !type) {
      documents.push(...this.db.documents.coverLetters)
    }
    
    if (userId) {
      documents = documents.filter(d => d.userId === userId)
    }
    
    return this.apiCall('/documents', { data: documents })
  }

  async createDocument(document) {
    const newDocument = {
      id: Date.now().toString(),
      userId: document.userId,
      ...document,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      downloads: 0,
      rating: 0,
      basedOnAchievements: document.basedOnAchievements || 0
    }
    
    if (document.type === 'resume') {
      this.db.documents.resumes.unshift(newDocument)
    } else {
      this.db.documents.coverLetters.unshift(newDocument)
    }
    
    return this.apiCall('/documents', { method: 'POST', data: newDocument })
  }

  async updateDocument(id, updates) {
    let document = this.db.documents.resumes.find(d => d.id === id)
    let isResume = true
    
    if (!document) {
      document = this.db.documents.coverLetters.find(d => d.id === id)
      isResume = false
    }
    
    if (!document) {
      throw new Error('Document not found')
    }
    
    const updatedDocument = { ...document, ...updates, updatedAt: new Date().toISOString() }
    
    if (isResume) {
      const index = this.db.documents.resumes.findIndex(d => d.id === id)
      this.db.documents.resumes[index] = updatedDocument
    } else {
      const index = this.db.documents.coverLetters.findIndex(d => d.id === id)
      this.db.documents.coverLetters[index] = updatedDocument
    }
    
    return this.apiCall(`/documents/${id}`, { method: 'PUT', data: updatedDocument })
  }

  async deleteDocument(id) {
    let documentIndex = this.db.documents.resumes.findIndex(d => d.id === id)
    let isResume = true
    
    if (documentIndex === -1) {
      documentIndex = this.db.documents.coverLetters.findIndex(d => d.id === id)
      isResume = false
    }
    
    if (documentIndex === -1) {
      throw new Error('Document not found')
    }
    
    if (isResume) {
      this.db.documents.resumes.splice(documentIndex, 1)
    } else {
      this.db.documents.coverLetters.splice(documentIndex, 1)
    }
    
    return this.apiCall(`/documents/${id}`, { method: 'DELETE', data: { success: true } })
  }

  // Story API endpoints
  async getStories(category = null) {
    let stories = this.db.stories
    if (category && category !== 'all') {
      stories = stories.filter(s => s.category === category)
    }
    return this.apiCall('/stories', { data: stories })
  }

  async createStory(story) {
    const newStory = {
      id: Date.now().toString(),
      userId: story.userId,
      ...story,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString()
    }
    
    this.db.stories.unshift(newStory)
    return this.apiCall('/stories', { method: 'POST', data: newStory })
  }

  // Interview Questions API endpoints
  async getInterviewQuestions(category = null) {
    let questions = this.db.interviewQuestions
    if (category && category !== 'all') {
      questions = questions.filter(q => q.category === category)
    }
    return this.apiCall('/interview-questions', { data: questions })
  }

  // Notification API endpoints
  async getNotifications(userId) {
    const notifications = this.db.notifications.filter(n => n.userId === userId)
    return this.apiCall('/notifications', { data: notifications })
  }

  async markNotificationAsRead(id) {
    const notification = this.db.notifications.find(n => n.id === id)
    if (notification) {
      notification.read = true
      notification.updatedAt = new Date().toISOString()
    }
    return this.apiCall(`/notifications/${id}/read`, { method: 'PUT', data: notification })
  }

  // AI API endpoints
  async generateAIContent(prompt, type) {
    // Simulate AI processing
    await this.delay(2000 + Math.random() * 3000)
    
    const responses = {
      'resume-bullet': [
        'Developed and implemented new feature resulting in 25% improvement in system performance',
        'Led cross-functional team to deliver project ahead of schedule by 2 weeks',
        'Optimized database queries reducing response time by 40%',
        'Designed scalable architecture supporting 10,000+ concurrent users',
        'Mentored junior developers while delivering high-quality code with 99.9% uptime'
      ],
      'cover-letter': 'Dear Hiring Manager, I am writing to express my strong interest in the position...',
      'interview-question': 'Based on your experience, how would you approach this technical challenge?',
      'story': 'Here\'s an inspiring story about career growth and professional development...'
    }
    
    return this.apiCall('/ai/generate', { 
      method: 'POST', 
      data: { 
        content: responses[type] || 'AI generated content',
        type,
        prompt 
      } 
    })
  }

  // Dashboard API endpoints
  async getDashboardStats(userId) {
    const user = this.db.users.find(u => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    const achievements = this.db.achievements.filter(a => a.userId === userId)
    const documents = [...this.db.documents.resumes, ...this.db.documents.coverLetters]
      .filter(d => d.userId === userId)
    
    const stats = {
      totalPoints: user.totalPoints,
      level: user.level,
      streak: user.streak,
      achievementsCount: achievements.length,
      documentsCount: documents.length,
      recentAchievements: achievements.slice(0, 5),
      recentDocuments: documents.slice(0, 3)
    }
    
    return this.apiCall(`/dashboard/${userId}`, { data: stats })
  }

  // Progress tracking API endpoints
  async getUserProgress(userId) {
    const user = this.db.users.find(u => u.id === userId)
    if (!user) {
      throw new Error('User not found')
    }
    
    const progress = {
      currentLevel: user.level,
      currentPoints: user.totalPoints,
      pointsToNextLevel: Math.max(0, (user.level + 1) * 100 - user.totalPoints),
      achievementsThisWeek: this.db.achievements.filter(a => 
        a.userId === userId && 
        new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    }
    
    return this.apiCall(`/progress/${userId}`, { data: progress })
  }
}

// Create singleton instance
const apiService = new ApiService()

export default apiService
