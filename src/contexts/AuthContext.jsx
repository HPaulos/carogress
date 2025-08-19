import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call with mock data
      const response = await fetch('/users.json')
      const data = await response.json()
      
      const foundUser = data.users.find(
        u => u.email === email && u.password === password
      )

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        toast.success(`Welcome back, ${userWithoutPassword.name}!`)
        navigate('/dashboard')
        return true
      } else {
        toast.error('Invalid email or password')
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
      return false
    }
  }

  // Alias for consistency
  const signIn = login

  const signup = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        level: 1,
        experience: 0,
        streak: 0,
        totalPoints: 0,
        achievements: [],
        createdAt: new Date().toISOString()
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      toast.success(`Welcome to AI Career Progress, ${newUser.name}!`)
      navigate('/dashboard')
      return true
    } catch (error) {
      toast.error('Signup failed. Please try again.')
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    login,
    signIn,
    signup,
    logout,
    updateUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
