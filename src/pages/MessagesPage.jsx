import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  Reply, 
  Forward, 
  Star, 
  Archive, 
  Trash2, 
  MoreVertical, 
  Paperclip, 
  Smile, 
  Image, 
  File, 
  Video, 
  Phone, 
  Video as VideoIcon, 
  Clock, 
  Check, 
  CheckCheck, 
  User, 
  Users, 
  Building, 
  BookOpen, 
  Calendar, 
  AlertCircle, 
  Info, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Copy, 
  Download,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Shield,
  Zap,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  MapPin,
  Mail,
  MailOpen,
  Inbox,
  SendHorizontal,
  StarIcon,
  Flag,
  Bookmark,
  Hash,
  AtSign
} from 'lucide-react'

function MessagesPage() {
  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showMessageSettings, setShowMessageSettings] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    message: '',
    priority: 'normal',
    attachments: []
  })

  const [messages] = useState([
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      fromEmail: 'sarah.johnson@educonnect.com',
      fromRole: 'instructor',
      subject: 'React Assignment Feedback',
      message: 'Great work on your React assignment! I\'ve reviewed your submission and wanted to provide some feedback on your component structure. Consider using React hooks more effectively for state management.',
      timestamp: '2024-01-18 14:30',
      read: false,
      starred: false,
      priority: 'normal',
      category: 'academic',
      hasAttachment: true,
      attachments: ['assignment_feedback.pdf', 'react_best_practices.pdf'],
      thread: [
        {
          id: 1,
          from: 'Dr. Sarah Johnson',
          message: 'Great work on your React assignment!',
          timestamp: '2024-01-18 14:30'
        },
        {
          id: 2,
          from: 'You',
          message: 'Thank you for the feedback! I\'ll work on improving my hooks usage.',
          timestamp: '2024-01-18 15:45'
        }
      ]
    },
    {
      id: 2,
      from: 'Accounts Department',
      fromEmail: 'accounts@educonnect.com',
      fromRole: 'admin',
      subject: 'Payment Reminder - Tuition Due',
      message: 'This is a friendly reminder that your remaining tuition balance of ZMW 1,500 is due by January 20, 2024. Please ensure payment is made to avoid late fees.',
      timestamp: '2024-01-17 09:15',
      read: true,
      starred: true,
      priority: 'high',
      category: 'financial',
      hasAttachment: false,
      attachments: []
    },
    {
      id: 3,
      from: 'Michael Chen',
      fromEmail: 'michael.chen@student.educonnect.com',
      fromRole: 'student',
      subject: 'Study Group - Database Project',
      message: 'Hey! Are you available for our database project study group tomorrow? We\'re meeting in the library at 3 PM.',
      timestamp: '2024-01-16 16:45',
      read: true,
      starred: false,
      priority: 'normal',
      category: 'social',
      hasAttachment: false,
      attachments: []
    },
    {
      id: 4,
      from: 'Library Services',
      fromEmail: 'library@educonnect.com',
      fromRole: 'admin',
      subject: 'Book Return Reminder',
      message: 'You have 2 books due for return by January 22, 2024: "Database Systems" and "Web Development Basics". Please return them to avoid late fees.',
      timestamp: '2024-01-15 11:20',
      read: false,
      starred: false,
      priority: 'medium',
      category: 'administrative',
      hasAttachment: false,
      attachments: []
    },
    {
      id: 5,
      from: 'Prof. Robert Taylor',
      fromEmail: 'robert.taylor@educonnect.com',
      fromRole: 'instructor',
      subject: 'Machine Learning Course Update',
      message: 'I\'ve uploaded new lecture materials for this week\'s Machine Learning class. Please review the materials before our session on Friday.',
      timestamp: '2024-01-14 13:00',
      read: true,
      starred: true,
      priority: 'normal',
      category: 'academic',
      hasAttachment: true,
      attachments: ['ml_lecture_week3.pdf', 'python_notebook.ipynb']
    }
  ])

  const [contacts] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'instructor', email: 'sarah.johnson@educonnect.com', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'student', email: 'michael.chen@student.educonnect.com', avatar: 'MC' },
    { id: 3, name: 'Prof. Robert Taylor', role: 'instructor', email: 'robert.taylor@educonnect.com', avatar: 'RT' },
    { id: 4, name: 'Accounts Department', role: 'admin', email: 'accounts@educonnect.com', avatar: 'AD' },
    { id: 5, name: 'Library Services', role: 'admin', email: 'library@educonnect.com', avatar: 'LS' }
  ])

  const [messageStats] = useState({
    total: 156,
    unread: 12,
    starred: 8,
    sent: 89,
    drafts: 3,
    archived: 45
  })

  const getRoleIcon = (role) => {
    switch (role) {
      case 'instructor': return BookOpen
      case 'student': return Users
      case 'admin': return Building
      default: return User
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'instructor': return 'bg-blue-100 text-blue-700'
      case 'student': return 'bg-green-100 text-green-700'
      case 'admin': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return BookOpen
      case 'financial': return TrendingUp
      case 'social': return Users
      case 'administrative': return Building
      default: return MessageSquare
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && !message.read) ||
                         (selectedFilter === 'starred' && message.starred) ||
                         (selectedFilter === 'important' && message.priority === 'high')
    
    return matchesSearch && matchesFilter
  })

  const handleSendMessage = () => {
    // Handle sending message
    console.log('Sending message:', replyText)
    setReplyText('')
  }

  const handleComposeMessage = () => {
    // Handle composing new message
    console.log('Composing message:', composeData)
    setShowComposeModal(false)
    setComposeData({ to: '', subject: '', message: '', priority: 'normal', attachments: [] })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Messages</h1>
              <p className="text-white/80">Communicate with instructors, students, and administration</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowMessageSettings(true)}
                className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                title="Message Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowComposeModal(true)}
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Compose
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex gap-6 flex-1">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Folders</h3>
              <span className="text-sm text-gray-500">{messageStats.total}</span>
            </div>
            
            <div className="space-y-1">
              {[
                { id: 'inbox', label: 'Inbox', icon: Inbox, count: messageStats.unread, color: 'text-blue-600' },
                { id: 'sent', label: 'Sent', icon: SendHorizontal, count: messageStats.sent, color: 'text-gray-600' },
                { id: 'starred', label: 'Starred', icon: Star, count: messageStats.starred, color: 'text-yellow-600' },
                { id: 'drafts', label: 'Drafts', icon: File, count: messageStats.drafts, color: 'text-gray-600' },
                { id: 'archive', label: 'Archive', icon: Archive, count: messageStats.archived, color: 'text-gray-600' }
              ].map(folder => {
                const IconComponent = folder.icon
                return (
                  <button
                    key={folder.id}
                    onClick={() => setActiveTab(folder.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      activeTab === folder.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent className={`w-4 h-4 ${folder.color}`} />
                      <span className="text-sm font-medium">{folder.label}</span>
                    </div>
                    {folder.count > 0 && (
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {folder.count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Contacts */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Contacts</h3>
            <div className="space-y-2">
              {contacts.slice(0, 5).map(contact => {
                const IconComponent = getRoleIcon(contact.role)
                return (
                  <button
                    key={contact.id}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setShowComposeModal(true)}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.role}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Labels */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Labels</h3>
            <div className="space-y-2">
              {[
                { name: 'Academic', color: 'bg-blue-100 text-blue-700', icon: BookOpen },
                { name: 'Financial', color: 'bg-green-100 text-green-700', icon: TrendingUp },
                { name: 'Social', color: 'bg-purple-100 text-purple-700', icon: Users },
                { name: 'Administrative', color: 'bg-orange-100 text-orange-700', icon: Building }
              ].map(label => {
                const IconComponent = label.icon
                return (
                  <div key={label.name} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <IconComponent className="w-4 h-4" />
                    <span className={`text-xs px-2 py-1 rounded-full ${label.color}`}>
                      {label.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6">
          {/* Message List */}
          <div className="w-96 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="flex gap-2">
                {['all', 'unread', 'starred', 'important'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedFilter === filter
                        ? 'bg-[#011F5B] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto max-h-[600px]">
              {filteredMessages.map(message => {
                const RoleIcon = getRoleIcon(message.fromRole)
                const CategoryIcon = getCategoryIcon(message.category)
                return (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                    } ${!message.read ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                        {message.from.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium text-gray-900 ${!message.read ? 'font-semibold' : ''}`}>
                              {message.from}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(message.fromRole)}`}>
                              {message.fromRole}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                            {message.subject}
                          </span>
                          {message.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          {message.hasAttachment && <Paperclip className="w-3 h-3 text-gray-500" />}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{message.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </span>
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-500">{message.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Message Detail */}
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            {selectedMessage ? (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-medium text-gray-700">
                        {selectedMessage.from.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{selectedMessage.from}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(selectedMessage.fromRole)}`}>
                            {selectedMessage.fromRole}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedMessage.fromEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Reply className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Forward className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Archive className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedMessage.priority)}`}>
                        {selectedMessage.priority}
                      </span>
                      <span className="text-sm text-gray-500">{selectedMessage.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.hasAttachment && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Attachments</h4>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-3">
                              <File className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{attachment}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Download className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMessage.thread && selectedMessage.thread.length > 1 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Conversation Thread</h4>
                      <div className="space-y-3">
                        {selectedMessage.thread.map((threadMsg, index) => (
                          <div key={index} className={`p-3 rounded-lg ${
                            threadMsg.from === 'You' ? 'bg-blue-50 ml-auto max-w-[80%]' : 'bg-gray-50 max-w-[80%]'
                          }`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{threadMsg.from}</span>
                              <span className="text-xs text-gray-500">{threadMsg.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{threadMsg.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#FF6B35]"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Paperclip className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Image className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Save Draft
                      </button>
                      <button 
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Compose Message</h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="text"
                  value={composeData.to}
                  onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="Enter recipient email or name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={composeData.priority}
                  onChange={(e) => setComposeData(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={composeData.message}
                  onChange={(e) => setComposeData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Type your message..."
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#FF6B35]"
                  rows={6}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Image className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowComposeModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleComposeMessage}
                    className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default MessagesPage
