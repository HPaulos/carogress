import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Loader,
  Plus,
  ArrowLeft,
  Trash2,
  Settings,
  History
} from 'lucide-react'

const AICoachPage = () => {
  const navigate = useNavigate()
  const [currentConversation, setCurrentConversation] = useState(null)
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Resume Help",
      lastMessage: "How do I improve my resume?",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messages: [
        {
          id: 1,
          type: 'ai',
          content: "Hi! I'm your AI career coach. I can help you with resume writing, interview prep, achievement tracking, and career advice. What would you like to work on today?",
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: 2,
          type: 'user',
          content: "How do I improve my resume?",
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: 3,
          type: 'ai',
          content: "I'd be happy to help you with your resume! Here are some key tips:\n\n1. **Use action verbs** - Start bullet points with strong verbs like 'Led', 'Developed', 'Implemented'\n2. **Quantify achievements** - Include numbers and percentages when possible\n3. **Focus on impact** - Show how your work benefited the company\n4. **Tailor to job** - Customize for each position you apply to\n5. **Keep it concise** - Aim for 1-2 pages maximum\n\nWould you like me to help you rewrite specific bullet points or review your current resume?",
          timestamp: new Date(Date.now() - 86400000)
        }
      ]
    },
    {
      id: 2,
      title: "Interview Preparation",
      lastMessage: "Help me prepare for technical interviews",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messages: [
        {
          id: 1,
          type: 'ai',
          content: "Hi! I'm your AI career coach. I can help you with resume writing, interview prep, achievement tracking, and career advice. What would you like to work on today?",
          timestamp: new Date(Date.now() - 172800000)
        },
        {
          id: 2,
          type: 'user',
          content: "Help me prepare for technical interviews",
          timestamp: new Date(Date.now() - 172800000)
        },
        {
          id: 3,
          type: 'ai',
          content: "Great! Technical interview preparation is crucial. Here's my approach:\n\n**Practice Areas:**\n• Data structures and algorithms\n• System design questions\n• Behavioral questions (STAR method)\n• Coding problems\n\n**Resources I recommend:**\n• LeetCode for coding practice\n• System Design Primer\n• Your own project portfolio\n\nWould you like to practice specific types of questions or work on your elevator pitch?",
          timestamp: new Date(Date.now() - 172800000)
        }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }

  useEffect(() => {
    // Only scroll if we're near the bottom or if it's a new message
    const messagesContainer = messagesEndRef.current?.parentElement
    if (messagesContainer && currentConversation?.messages) {
      const isNearBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop - messagesContainer.clientHeight < 150
      if (isNearBottom || currentConversation.messages.length <= 2) {
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
          scrollToBottom()
        })
      }
    }
  }, [currentConversation?.messages])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }, [inputValue])

  const mockAIResponses = {
    'resume': "I'd be happy to help you with your resume! I can analyze your achievements and help you create compelling bullet points. Try logging some recent achievements in your dashboard, and I'll help you transform them into impactful resume content.",
    'interview': "Great! Interview preparation is key to success. I can help you practice common questions, provide feedback on your responses, and suggest ways to showcase your achievements. Would you like to start with a specific type of interview question?",
    'achievement': "Tracking achievements is essential for career growth! I recommend logging both big wins and small improvements. Focus on quantifiable results and impact. For example, instead of 'worked on a project,' try 'led a team of 5 to deliver a feature that increased user engagement by 25%.'",
    'career': "Career development is a journey! I can help you identify growth opportunities, suggest skill development areas, and track your progress. What specific aspect of your career would you like to focus on?",
    'help': "I'm here to help! I can assist with:\n• Resume writing and optimization\n• Interview preparation and practice\n• Achievement tracking and logging\n• Career advice and guidance\n• Job application strategies\n\nWhat would you like to work on?",
    'default': "That's an interesting question! I'm designed to help with career development, resume writing, interview preparation, and achievement tracking. Could you be more specific about what you'd like to work on? I'm here to provide personalized guidance for your career journey."
  }

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return mockAIResponses.resume
    } else if (lowerMessage.includes('interview') || lowerMessage.includes('prep')) {
      return mockAIResponses.interview
    } else if (lowerMessage.includes('achievement') || lowerMessage.includes('track')) {
      return mockAIResponses.achievement
    } else if (lowerMessage.includes('career') || lowerMessage.includes('growth')) {
      return mockAIResponses.career
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return mockAIResponses.help
    } else {
      return mockAIResponses.default
    }
  }

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      lastMessage: "",
      timestamp: new Date(),
      messages: [
        {
          id: 1,
          type: 'ai',
          content: "Hi! I'm your AI career coach. I can help you with resume writing, interview prep, achievement tracking, and career advice. What would you like to work on today?",
          timestamp: new Date()
        }
      ]
    }
    setConversations(prev => [newConversation, ...prev])
    setCurrentConversation(newConversation)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentConversation) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      lastMessage: inputValue,
      timestamp: new Date()
    }

    // Store the current input value before clearing
    const currentInput = inputValue
    setInputValue('')
    
    setCurrentConversation(updatedConversation)
    setConversations(prev => 
      prev.map(conv => 
        conv.id === currentConversation.id ? updatedConversation : conv
      )
    )
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getAIResponse(currentInput),
        timestamp: new Date()
      }
      
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse]
      }

      setCurrentConversation(finalConversation)
      setConversations(prev => 
        prev.map(conv => 
          conv.id === currentConversation.id ? finalConversation : conv
        )
      )
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId))
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null)
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <div className="h-screen w-screen bg-white dark:bg-secondary-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-secondary-800 dark:bg-secondary-900 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-secondary-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-secondary-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <button
              onClick={createNewConversation}
              className="p-2 text-secondary-300 hover:text-white hover:bg-secondary-700 rounded-lg transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <h1 className="text-xl font-bold text-white">AI Career Coach</h1>
          <p className="text-sm text-secondary-400 mt-1">Your personal career assistant</p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-secondary-700 cursor-pointer hover:bg-secondary-700 transition-colors ${
                currentConversation?.id === conversation.id ? 'bg-secondary-700' : ''
              }`}
              onClick={() => setCurrentConversation(conversation)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">
                    {conversation.title}
                  </h3>
                  <p className="text-sm text-secondary-300 truncate mt-1">
                    {conversation.lastMessage || 'No messages yet'}
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    {formatTimestamp(conversation.timestamp)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conversation.id)
                  }}
                  className="ml-2 p-1 text-secondary-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-secondary-700">
          <button className="w-full flex items-center justify-center text-secondary-300 hover:text-white p-2 rounded-lg hover:bg-secondary-700 transition-colors">
            <Settings size={16} className="mr-2" />
            Settings
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-secondary-700 p-4 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentConversation.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-secondary-400">
                {currentConversation.messages.length} messages
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scroll-smooth min-h-0">
              {currentConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`py-4 ${message.type === 'user' ? 'bg-secondary-50 dark:bg-secondary-800' : 'bg-white dark:bg-secondary-900'}`}
                >
                  <div className="max-w-3xl mx-auto px-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-accent-500 text-white' 
                          : 'bg-primary-600 text-white'
                      }`}>
                        {message.type === 'user' ? (
                          <User size={16} />
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="py-4 bg-white dark:bg-secondary-900">
                  <div className="max-w-3xl mx-auto px-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-600 text-white rounded-sm flex items-center justify-center flex-shrink-0">
                        <Bot size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <Loader size={16} className="animate-spin text-primary-400" />
                          <span className="text-sm text-secondary-500 dark:text-secondary-400">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white dark:bg-secondary-800 border-t border-gray-200 dark:border-secondary-700 flex-shrink-0">
              <div className="max-w-3xl mx-auto p-4">
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Message AI Career Coach..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-secondary-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows="1"
                    disabled={isTyping}
                    style={{ minHeight: '44px', maxHeight: '200px' }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 dark:disabled:bg-secondary-600 text-white rounded-md transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2 text-center">
                  AI Career Coach can make mistakes. Consider checking important information.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to AI Career Coach
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-8">
                I'm here to help you with resume writing, interview preparation, achievement tracking, and career advice.
              </p>
              <button
                onClick={createNewConversation}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center mx-auto"
              >
                <Plus size={18} className="mr-2" />
                Start New Conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AICoachPage
