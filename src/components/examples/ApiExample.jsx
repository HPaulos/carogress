// Example component demonstrating the new API hooks usage
import React, { useState } from 'react'
import { useDashboardStats, useCreateAchievement, useAchievements } from '../../services/apiHooks'
import { useAuth } from '../../contexts/AuthContext'
import { useThemeClasses } from '../../theme/useTheme'
import { Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

const ApiExample = () => {
  const { classes } = useThemeClasses()
  const { user } = useAuth()
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    category: 'work',
    impact: 'medium'
  })

  // Using the new API hooks
  const { data: dashboardStats, loading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStats(user?.id)
  const { data: achievements, loading: achievementsLoading, error: achievementsError, refetch: refetchAchievements } = useAchievements(user?.id)
  const { createAchievement, loading: createLoading, error: createError } = useCreateAchievement()

  const handleCreateAchievement = async (e) => {
    e.preventDefault()
    if (!user) return

    try {
      await createAchievement({
        userId: user.id,
        ...newAchievement,
        points: newAchievement.impact === 'high' ? 50 : newAchievement.impact === 'medium' ? 25 : 10
      })
      
      // Reset form
      setNewAchievement({
        title: '',
        description: '',
        category: 'work',
        impact: 'medium'
      })
      
      // Refetch data to show the new achievement
      refetchStats()
      refetchAchievements()
    } catch (error) {
      console.error('Failed to create achievement:', error)
    }
  }

  if (statsLoading || achievementsLoading) {
    return (
      <div className={`flex items-center justify-center p-8 ${classes.bg.primary}`}>
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className={`ml-2 ${classes.text.primary}`}>Loading data...</span>
      </div>
    )
  }

  if (statsError || achievementsError) {
    return (
      <div className={`flex items-center justify-center p-8 ${classes.bg.primary}`}>
        <AlertCircle className="w-8 h-8 text-red-500" />
        <span className={`ml-2 ${classes.text.primary}`}>
          Error loading data: {statsError || achievementsError}
        </span>
      </div>
    )
  }

  return (
    <div className={`p-6 ${classes.bg.primary}`}>
      <h2 className={`text-2xl font-bold mb-6 ${classes.text.primary}`}>
        API Hooks Example
      </h2>

      {/* Dashboard Stats */}
      {dashboardStats && (
        <div className={`mb-8 p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
          <h3 className={`text-lg font-semibold mb-4 ${classes.text.primary}`}>
            Dashboard Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold text-blue-600 ${classes.text.primary}`}>
                {dashboardStats.totalPoints}
              </div>
              <div className={`text-sm ${classes.text.secondary}`}>Total Points</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-green-600 ${classes.text.primary}`}>
                {dashboardStats.level}
              </div>
              <div className={`text-sm ${classes.text.secondary}`}>Level</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-orange-600 ${classes.text.primary}`}>
                {dashboardStats.streak}
              </div>
              <div className={`text-sm ${classes.text.secondary}`}>Day Streak</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-purple-600 ${classes.text.primary}`}>
                {dashboardStats.achievementsCount}
              </div>
              <div className={`text-sm ${classes.text.secondary}`}>Achievements</div>
            </div>
          </div>
        </div>
      )}

      {/* Create Achievement Form */}
      <div className={`mb-8 p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
        <h3 className={`text-lg font-semibold mb-4 ${classes.text.primary}`}>
          Create New Achievement
        </h3>
        <form onSubmit={handleCreateAchievement} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
              Title
            </label>
            <input
              type="text"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${classes.bg.input} ${classes.border.primary} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter achievement title"
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
              Description
            </label>
            <textarea
              value={newAchievement.description}
              onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-md ${classes.bg.input} ${classes.border.primary} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Describe your achievement"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
                Category
              </label>
              <select
                value={newAchievement.category}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md ${classes.bg.input} ${classes.border.primary} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="work">Work</option>
                <option value="learning">Learning</option>
                <option value="leadership">Leadership</option>
                <option value="community">Community</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${classes.text.primary}`}>
                Impact
              </label>
              <select
                value={newAchievement.impact}
                onChange={(e) => setNewAchievement(prev => ({ ...prev, impact: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md ${classes.bg.input} ${classes.border.primary} ${classes.text.primary} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={createLoading}
            className={`flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors ${createLoading ? 'cursor-not-allowed' : ''}`}
          >
            {createLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Achievement
              </>
            )}
          </button>
          
          {createError && (
            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-300 text-sm">{createError}</span>
            </div>
          )}
        </form>
      </div>

      {/* Recent Achievements */}
      {achievements && achievements.length > 0 && (
        <div className={`p-4 rounded-lg ${classes.bg.card} ${classes.border.primary} border`}>
          <h3 className={`text-lg font-semibold mb-4 ${classes.text.primary}`}>
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {achievements.slice(0, 3).map((achievement) => (
              <div key={achievement.id} className={`p-3 rounded-md ${classes.bg.tertiary}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${classes.text.primary}`}>{achievement.title}</h4>
                    <p className={`text-sm mt-1 ${classes.text.secondary}`}>
                      {achievement.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${classes.bg.secondary} ${classes.text.secondary}`}>
                        {achievement.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${classes.bg.secondary} ${classes.text.secondary}`}>
                        {achievement.impact} impact
                      </span>
                      <span className={`text-xs ${classes.text.secondary}`}>
                        {achievement.points} points
                      </span>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiExample
