// Mock data service for simulating API calls
class MockDataService {
  constructor() {
    this.baseUrl = '/mocked'
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}.json`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  // User-related methods
  async getUsers() {
    return this.fetchData('users')
  }

  async getUserById(id) {
    const data = await this.fetchData('users')
    return data.users.find(user => user.id === id)
  }

  // Achievement-related methods
  async getAchievements() {
    return this.fetchData('achievements')
  }

  async getUserAchievements(userId) {
    const [users, achievements] = await Promise.all([
      this.fetchData('users'),
      this.fetchData('achievements')
    ])
    
    const user = users.users.find(u => u.id === userId)
    if (!user) return []

    return achievements.achievements.filter(achievement => 
      user.achievements.includes(achievement.id)
    )
  }

  // Job application methods
  async getJobApplications() {
    return this.fetchData('job-applications')
  }

  async getApplicationById(id) {
    const data = await this.fetchData('job-applications')
    return data.applications.find(app => app.id === id)
  }

  // Notification methods
  async getNotifications() {
    return this.fetchData('notifications')
  }

  async getUnreadNotifications() {
    const data = await this.fetchData('notifications')
    return data.notifications.filter(notification => !notification.read)
  }

  async markNotificationAsRead(notificationId) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: notificationId })
      }, 300)
    })
  }



  // AI-related methods
  async generateResumeBullet(achievement) {
    // Simulate AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const bullets = [
          `Developed and implemented ${achievement.title} resulting in 25% improvement in system performance`,
          `Led cross-functional team to deliver ${achievement.title} ahead of schedule by 2 weeks`,
          `Optimized ${achievement.title} process, reducing operational costs by 30%`,
          `Designed scalable architecture for ${achievement.title} supporting 10,000+ concurrent users`,
          `Mentored junior developers while delivering ${achievement.title} with 99.9% uptime`
        ]
        resolve(bullets[Math.floor(Math.random() * bullets.length)])
      }, 2000)
    })
  }

  async getAISuggestions(userId) {
    // Simulate AI suggestions based on user data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: 'skill',
            title: 'Add Leadership Skills',
            description: 'Based on your recent achievements, consider highlighting leadership experience to improve your profile.',
            priority: 'high'
          },
          {
            id: 2,
            type: 'achievement',
            title: 'Enhance Project Metrics',
            description: 'Add specific metrics to your recent project achievements to make them more impactful.',
            priority: 'medium'
          },
          {
            id: 3,
            type: 'application',
            title: 'Follow Up on Applications',
            description: 'Consider following up on your applications at Google and Microsoft this week.',
            priority: 'high'
          }
        ])
      }, 1000)
    })
  }

  // Dashboard analytics
  async getDashboardStats(userId) {
    const [users, achievements, applications] = await Promise.all([
      this.fetchData('users'),
      this.fetchData('achievements'),
      this.fetchData('job-applications')
    ])

    const user = users.users.find(u => u.id === userId)
    if (!user) return null

    const userAchievements = achievements.achievements.filter(achievement => 
      user.achievements.includes(achievement.id)
    )

    const userApplications = applications.applications.slice(0, 5) // Mock user applications

    return {
      user,
      achievements: userAchievements,
      applications: userApplications,
      stats: {
        totalPoints: user.totalPoints,
        level: user.level,
        streak: user.streak,
        applicationsCount: userApplications.length,
        achievementsCount: userAchievements.length
      }
    }
  }

  // Progress tracking
  async getProgressData(userId) {
    const [users, achievements] = await Promise.all([
      this.fetchData('users'),
      this.fetchData('achievements')
    ])

    const user = users.users.find(u => u.id === userId)
    if (!user) return null

    const levels = achievements.levels
    const currentLevel = levels.find(level => level.level === user.level)
    const nextLevel = levels.find(level => level.level === user.level + 1)

    return {
      currentLevel,
      nextLevel,
      progress: nextLevel ? 
        ((user.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 
        100
    }
  }
}

export default new MockDataService()
