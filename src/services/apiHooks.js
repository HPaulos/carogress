// Custom React hooks for API integration
import { useState, useEffect, useCallback } from 'react'
import apiService from './apiService'
import toast from 'react-hot-toast'

// Generic API hook with loading, error, and data states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}

// User-related hooks
export const useUser = (userId) => {
  return useApi(
    () => apiService.getUserById(userId),
    [userId]
  )
}

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateUser = useCallback(async (userId, updates) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.updateUser(userId, updates)
      toast.success('Profile updated successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to update profile')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { updateUser, loading, error }
}

// Achievement-related hooks
export const useAchievements = (userId = null) => {
  return useApi(
    () => apiService.getAchievements(userId),
    [userId]
  )
}

export const useCreateAchievement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createAchievement = useCallback(async (achievement) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.createAchievement(achievement)
      toast.success('Achievement logged successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to log achievement')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createAchievement, loading, error }
}

export const useUpdateAchievement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateAchievement = useCallback(async (id, updates) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.updateAchievement(id, updates)
      toast.success('Achievement updated successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to update achievement')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { updateAchievement, loading, error }
}

export const useDeleteAchievement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteAchievement = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await apiService.deleteAchievement(id)
      toast.success('Achievement deleted successfully!')
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to delete achievement')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { deleteAchievement, loading, error }
}

// Document-related hooks
export const useDocuments = (userId = null, type = null) => {
  return useApi(
    () => apiService.getDocuments(userId, type),
    [userId, type]
  )
}

export const useCreateDocument = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createDocument = useCallback(async (document) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.createDocument(document)
      toast.success('Document created successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to create document')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createDocument, loading, error }
}

export const useUpdateDocument = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateDocument = useCallback(async (id, updates) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.updateDocument(id, updates)
      toast.success('Document updated successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to update document')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { updateDocument, loading, error }
}

export const useDeleteDocument = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteDocument = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await apiService.deleteDocument(id)
      toast.success('Document deleted successfully!')
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to delete document')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { deleteDocument, loading, error }
}

// Story-related hooks
export const useStories = (category = null) => {
  return useApi(
    () => apiService.getStories(category),
    [category]
  )
}

export const useCreateStory = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createStory = useCallback(async (story) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.createStory(story)
      toast.success('Story published successfully!')
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to publish story')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createStory, loading, error }
}

// Interview Questions hooks
export const useInterviewQuestions = (category = null) => {
  return useApi(
    () => apiService.getInterviewQuestions(category),
    [category]
  )
}

// Notification hooks
export const useNotifications = (userId) => {
  return useApi(
    () => apiService.getNotifications(userId),
    [userId]
  )
}

export const useMarkNotificationAsRead = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const markAsRead = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      await apiService.markNotificationAsRead(id)
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to mark notification as read')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { markAsRead, loading, error }
}

// AI-related hooks
export const useAIGenerateContent = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateContent = useCallback(async (prompt, type) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiService.generateAIContent(prompt, type)
      return response.data
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Failed to generate content')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { generateContent, loading, error }
}

// Dashboard hooks
export const useDashboardStats = (userId) => {
  return useApi(
    () => apiService.getDashboardStats(userId),
    [userId]
  )
}

export const useUserProgress = (userId) => {
  return useApi(
    () => apiService.getUserProgress(userId),
    [userId]
  )
}

// Optimistic updates hook
export const useOptimisticUpdate = (updateFn, onSuccess, onError) => {
  const [loading, setLoading] = useState(false)

  const optimisticUpdate = useCallback(async (data) => {
    try {
      setLoading(true)
      // Optimistically update the UI
      if (onSuccess) onSuccess(data)
      
      // Perform the actual update
      await updateFn(data)
    } catch (err) {
      // Revert optimistic update on error
      if (onError) onError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [updateFn, onSuccess, onError])

  return { optimisticUpdate, loading }
}

// Cache management hook
export const useApiCache = () => {
  const [cache, setCache] = useState(new Map())

  const getCachedData = useCallback((key) => {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
      return cached.data
    }
    return null
  }, [cache])

  const setCachedData = useCallback((key, data) => {
    setCache(prev => new Map(prev).set(key, {
      data,
      timestamp: Date.now()
    }))
  }, [])

  const clearCache = useCallback(() => {
    setCache(new Map())
  }, [])

  const clearCacheKey = useCallback((key) => {
    setCache(prev => {
      const newCache = new Map(prev)
      newCache.delete(key)
      return newCache
    })
  }, [])

  return { getCachedData, setCachedData, clearCache, clearCacheKey }
}

// Real-time updates hook (simulated)
export const useRealtimeUpdates = (userId, onUpdate) => {
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In a real app, this would be WebSocket or Server-Sent Events
      if (Math.random() < 0.1) { // 10% chance of update
        onUpdate && onUpdate()
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [userId, onUpdate])
}
