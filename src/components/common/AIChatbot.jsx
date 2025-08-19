import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Paperclip,
  Smile,
  Loader2,
  ChevronUp,
  ChevronDown,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useThemeClasses } from '../../theme/useTheme'
import toast from 'react-hot-toast'

const AIChatbot = () => {
  const { classes } = useThemeClasses()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Career Coach. I'm here to help you with career advice, interview preparation, resume tips, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Let me help you with that. Based on your situation, I'd recommend focusing on specific achievements and quantifying your impact.",
        "I understand your concern. Many professionals face similar challenges. Here are some strategies that have worked well for others in your position.",
        "Excellent point! For career development, it's important to continuously build on your strengths while addressing areas for growth.",
        "That's a common challenge in today's job market. Let me share some proven techniques that can help you stand out.",
        "I'm glad you asked about that! This is a crucial aspect of career growth. Here's what I suggest based on current industry trends."
      ]
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }



  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleExpand = () => {
    setIsOpen(false)
    navigate('/ai-coach')
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 ${classes.bg.card} ${classes.border.primary} border-2 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group`}
          >
            <div className="relative">
              <MessageCircle className={`w-8 h-8 mx-auto ${classes.text.primary} group-hover:text-blue-600 transition-colors`} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 w-96 h-[500px] ${classes.bg.card} ${classes.border.primary} border-2 rounded-2xl shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 ${classes.bg.secondary} border-b ${classes.border.primary}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${classes.text.primary}`}>AI Career Coach</h3>
                  <p className={`text-sm ${classes.text.secondary}`}>Online • Ready to help</p>
                </div>
              </div>
                                      <div className="flex items-center gap-2">
                          <button
                            onClick={handleExpand}
                            className={`p-2 rounded-lg hover:${classes.bg.tertiary} transition-colors`}
                            title="Open full AI Coach page"
                          >
                            <Maximize2 className={`w-4 h-4 ${classes.text.secondary}`} />
                          </button>
                          <button
                            onClick={() => setIsOpen(false)}
                            className={`p-2 rounded-lg hover:${classes.bg.tertiary} transition-colors`}
                          >
                            <X className={`w-4 h-4 ${classes.text.secondary}`} />
                          </button>
                        </div>
            </div>

            {/* Messages Area */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '400px' }}
                  exit={{ height: 0 }}
                  className="flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-2xl px-4 py-3 ${
                            message.type === 'user'
                              ? `${classes.bg.primary} ${classes.border.primary} border`
                              : `${classes.bg.tertiary}`
                          }`}>
                            <p className={`text-sm ${classes.text.primary} leading-relaxed`}>
                              {message.content}
                            </p>
                            <p className={`text-xs ${classes.text.muted} mt-2`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className={`${classes.bg.tertiary} rounded-2xl px-4 py-3`}>
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                              <span className={`text-sm ${classes.text.secondary}`}>AI is typing...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className={`p-4 border-t ${classes.border.primary}`}>
                    <div className="flex items-end gap-2">
                      <div className="flex-1 relative">
                        <textarea
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          className={`w-full resize-none rounded-xl px-4 py-3 pr-12 ${classes.bg.input} ${classes.border.primary} border ${classes.text.primary} placeholder-${classes.text.muted} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          rows={1}
                          style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                        <div className="absolute right-3 bottom-3 flex items-center gap-1">
                          <button className={`p-1 rounded hover:${classes.bg.secondary} transition-colors`}>
                            <Paperclip className={`w-4 h-4 ${classes.text.muted}`} />
                          </button>
                          <button className={`p-1 rounded hover:${classes.bg.secondary} transition-colors`}>
                            <Smile className={`w-4 h-4 ${classes.text.muted}`} />
                          </button>
                        </div>
                      </div>
                                                      <button
                                  onClick={handleSendMessage}
                                  disabled={!inputValue.trim() || isTyping}
                                  className={`p-3 rounded-xl transition-all duration-200 ${
                                    inputValue.trim() && !isTyping
                                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
                                      : `${classes.bg.tertiary} ${classes.text.muted} cursor-not-allowed`
                                  }`}
                                >
                                  <Send className="w-5 h-5" />
                                </button>
                    </div>
                    
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AIChatbot
