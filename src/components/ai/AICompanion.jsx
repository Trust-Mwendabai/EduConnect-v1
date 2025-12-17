import React, { useState, useRef, useEffect } from 'react'
import { Send, Mic, MicOff, Sparkles, BookOpen, Brain, Lightbulb, X, Minimize2, Maximize2, User, Bot } from 'lucide-react'
import { gradients, GradientCard, GradientButton } from '../common/GradientStyles'

const AICompanion = ({ isOpen, onClose, courseId = null, lessonId = null }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI learning companion. I'm here to help you understand concepts, answer questions, and provide personalized learning support. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput) => {
    const responses = [
      "That's a great question! Let me help you understand this concept better. Based on your learning pattern, I suggest breaking this down into smaller steps.",
      "I can see you're working on this topic. Would you like me to provide a visual explanation or recommend some practice exercises?",
      "Excellent question! This concept builds on what you learned earlier. Let me connect this to your previous lessons.",
      "I notice you might be struggling with this. Let me try explaining it in a different way that might work better for your learning style."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true)
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setInputValue("This is a simulated voice input about the current lesson topic.")
      }, 3000)
    } else {
      setIsRecording(false)
    }
  }

  const RecommendationsPanel = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-[#FF6B35]" />
        <h3 className="font-semibold text-gray-800">Personalized Recommendations</h3>
      </div>
      
      <div className="space-y-3">
        <GradientCard gradient={gradients.light} className="p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-[#011F5B] mt-1" />
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Recommended Resource</h4>
              <p className="text-sm text-gray-600 mb-2">
                "Introduction to Calculus" - This video explains the concepts you're currently studying.
              </p>
              <button className="text-sm text-[#011F5B] font-medium hover:text-[#FF6B35] transition-colors">
                Watch Now →
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard gradient={gradients.light} className="p-4">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-[#011F5B] mt-1" />
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Practice Exercise</h4>
              <p className="text-sm text-gray-600 mb-2">
                Try these 5 problems to strengthen your understanding of derivatives.
              </p>
              <button className="text-sm text-[#011F5B] font-medium hover:text-[#FF6B35] transition-colors">
                Start Practice →
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard gradient={gradients.light} className="p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#011F5B] mt-1" />
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Study Tip</h4>
              <p className="text-sm text-gray-600">
                Based on your learning pattern, studying in 25-minute intervals with 5-minute breaks works best for you.
              </p>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  )

  const ImproveUnderstandingButton = () => (
    <GradientButton
      gradient={gradients.secondary}
      className="w-full flex items-center justify-center gap-2"
      onClick={() => {
        const message = {
          id: messages.length + 1,
          type: 'user',
          content: "Can you help me improve my understanding of this topic?",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, message])
        setActiveTab('chat')
        
        setTimeout(() => {
          const response = {
            id: messages.length + 2,
            type: 'bot',
            content: "Absolutely! I'd be happy to help you better understand this topic. Let me break it down step by step and provide you with different learning approaches. What specific part is giving you trouble?",
            timestamp: new Date()
          }
          setMessages(prev => [...prev, response])
        }, 1000)
      }}
    >
      <Sparkles className="w-4 h-4" />
      Improve My Understanding
    </GradientButton>
  )

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px]">
      {!isMinimized && (
        <GradientCard gradient={gradients.primary} className="shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Learning Companion</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'recommendations'
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Recommendations
            </button>
          </div>

          {/* Content */}
          <div className="h-80 overflow-y-auto bg-white">
            {activeTab === 'chat' ? (
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <div className="p-4">
                <RecommendationsPanel />
                <div className="mt-6">
                  <ImproveUnderstandingButton />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {activeTab === 'chat' && (
            <div className="p-4 border-t border-white/20 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] text-sm"
                />
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white rounded-lg hover:shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </GradientCard>
      )}

      {/* Minimized State */}
      {isMinimized && (
        <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg shadow-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-medium">AI Companion</span>
          <button
            onClick={() => setIsMinimized(false)}
            className="ml-auto p-1 hover:bg-white/10 rounded transition-colors"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </div>
  )
}

export default AICompanion
