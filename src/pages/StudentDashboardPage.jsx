import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BookOpen, Clock, Users, Star, Award, TrendingUp, Calendar, PlayCircle, Download, CheckCircle, Target, Brain, BarChart3, User, Settings, LogOut, Menu, ChevronLeft, Search, Bell, Home, GraduationCap, CreditCard, FileText, MessageSquare } from 'lucide-react'

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [enrollmentRecord, setEnrollmentRecord] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      subject: 'React Development - Module 2 Feedback',
      message: 'Great work on Module 2! Your understanding of React hooks is impressive. Keep up the excellent progress.',
      time: '2 hours ago',
      unread: true,
      course: 'Advanced React Development',
      type: 'instructor'
    },
    {
      id: 2,
      sender: 'Teaching Assistant',
      subject: 'Assignment Reminder',
      message: 'Don\'t forget to submit your React project by Friday. The requirements are posted in the course materials.',
      time: '5 hours ago',
      unread: true,
      course: 'Advanced React Development',
      type: 'announcement'
    },
    {
      id: 3,
      sender: 'Michael Chen',
      subject: 'UI/UX Design Resources',
      message: 'I\'ve added some new design resources to help with your current project. Check the materials section.',
      time: '1 day ago',
      unread: false,
      course: 'UI/UX Design Fundamentals',
      type: 'instructor'
    },
    {
      id: 4,
      sender: 'EduConnect Support',
      subject: 'Certificate Available',
      message: 'Congratulations! Your JavaScript Fundamentals certificate is now available for download.',
      time: '2 days ago',
      unread: false,
      course: 'JavaScript Fundamentals',
      type: 'system'
    },
    {
      id: 5,
      sender: 'Dr. Emily Rodriguez',
      subject: 'Data Science Workshop',
      message: 'Join us for an extra workshop on Python data visualization this Thursday at 3 PM.',
      time: '3 days ago',
      unread: false,
      course: 'Data Science with Python',
      type: 'event'
    }
  ])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: ''
  })

  useEffect(() => {
    const savedEnrollment = localStorage.getItem('enrollmentRecord')
    if (savedEnrollment) {
      setEnrollmentRecord(JSON.parse(savedEnrollment))
      setEnrolledCourses([JSON.parse(savedEnrollment).course])
    }
  }, [])

  const sidebarItems = [
    { id: 'home', label: 'Back to Home', icon: Home },
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: GraduationCap },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const stats = [
    { icon: BookOpen, value: enrolledCourses.length, label: 'Enrolled Courses', color: 'blue' },
    { icon: Clock, value: '24', label: 'Hours Learned', color: 'green' },
    { icon: Award, value: '3', label: 'Certificates Earned', color: 'purple' },
    { icon: Star, value: '4.8', label: 'Average Rating', color: 'orange' }
  ]

  const recentActivity = [
    { type: 'course', title: 'Started React Development', time: '2 hours ago', icon: PlayCircle },
    { type: 'achievement', title: 'Completed Module 1', time: '1 day ago', icon: CheckCircle },
    { type: 'certificate', title: 'Earned JavaScript Certificate', time: '3 days ago', icon: Award }
  ]

  const upcomingDeadlines = [
    { course: 'React Development', task: 'Complete Assignment 3', dueDate: '2024-05-20', priority: 'high' },
    { course: 'UI/UX Design', task: 'Submit Final Project', dueDate: '2024-05-25', priority: 'medium' }
  ]

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (message.unread) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, unread: false } : m
      ))
    }
  }

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      const newReply = {
        id: messages.length + 1,
        sender: 'You',
        subject: `Re: ${selectedMessage.subject}`,
        message: replyText,
        time: 'Just now',
        unread: false,
        course: selectedMessage.course,
        type: 'reply'
      }
      setMessages([newReply, ...messages])
      setReplyText('')
    }
  }

  const handleCompose = () => {
    if (newMessage.recipient.trim() && newMessage.subject.trim() && newMessage.message.trim()) {
      const composedMessage = {
        id: messages.length + 1,
        sender: 'You',
        subject: newMessage.subject,
        message: newMessage.message,
        time: 'Just now',
        unread: false,
        course: 'General',
        type: 'sent'
      }
      setMessages([composedMessage, ...messages])
      setNewMessage({ recipient: '', subject: '', message: '' })
      setShowCompose(false)
    }
  }

  const markAsRead = (messageId) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, unread: false } : m
    ))
  }

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId))
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#011F5B] text-white transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-lg flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">EduConnect</h2>
                  <p className="text-xs text-blue-200">Student Portal</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home') {
                      window.location.href = '/'
                    } else {
                      setActiveTab(item.id)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    item.id === 'home'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : activeTab === item.id
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="font-medium">Student User</p>
                <p className="text-xs text-blue-200">ID: STU001</p>
              </div>
            )}
            {isSidebarOpen && (
              <button className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-[#011F5B] capitalize">
                  {activeTab === 'overview' ? 'Dashboard Overview' : 
                   activeTab === 'courses' ? 'My Courses' :
                   activeTab === 'progress' ? 'Learning Progress' :
                   activeTab === 'certificates' ? 'My Certificates' :
                   activeTab === 'payments' ? 'Payment History' :
                   activeTab === 'messages' ? 'Messages' : 'Settings'}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Student Dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                  />
                </div>
                <button className="relative p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                  <User size={20} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
                <p className="text-blue-100 mb-4">Continue your learning journey and achieve your goals.</p>
                {enrollmentRecord && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm text-blue-100 mb-1">Recently Enrolled:</p>
                    <p className="font-semibold">{enrollmentRecord.course.title}</p>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  const colorClasses = {
                    blue: 'bg-blue-100 text-blue-600',
                    green: 'bg-green-100 text-green-600',
                    purple: 'bg-purple-100 text-purple-600',
                    orange: 'bg-orange-100 text-orange-600'
                  }
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]} mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Recent Activity & Deadlines */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="border-l-4 border-[--color-warm-orange] pl-4">
                        <p className="font-medium text-gray-900">{deadline.task}</p>
                        <p className="text-sm text-gray-600">{deadline.course}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{deadline.dueDate}</p>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            deadline.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {deadline.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">My Enrolled Courses</h2>
              {enrolledCourses.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  {enrolledCourses.map((course, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Enrolled
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#011F5B] mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">by {course.instructor}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>25%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[--color-warm-orange] h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses enrolled yet</h3>
                  <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course</p>
                  <Link to="/courses" className="px-6 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">Learning Progress</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Overall Progress</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 relative">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke="#FF6B35" strokeWidth="12" fill="none" 
                              strokeDasharray={`${2 * Math.PI * 56 * 0.25} ${2 * Math.PI * 56 * 0.75}`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#011F5B]">25%</span>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">Course Completion</p>
                      </div>
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 relative">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none" 
                              strokeDasharray={`${2 * Math.PI * 56 * 0.75} ${2 * Math.PI * 56 * 0.25}`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#011F5B]">75%</span>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">Assignments Done</p>
                      </div>
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 relative">
                          <svg className="transform -rotate-90 w-32 h-32">
                            <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                            <circle cx="64" cy="64" r="56" stroke="#8b5cf6" strokeWidth="12" fill="none" 
                              strokeDasharray={`${2 * Math.PI * 56 * 0.5} ${2 * Math.PI * 56 * 0.5}`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-[#011F5B]">50%</span>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">Quiz Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">My Certificates</h2>
              <div className="text-center py-16">
                <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates yet</h3>
                <p className="text-gray-600 mb-4">Complete courses to earn certificates</p>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">Payment History</h2>
              {enrollmentRecord ? (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{enrollmentRecord.course.title}</h3>
                        <p className="text-sm text-gray-600">Enrollment Date: {new Date(enrollmentRecord.enrollmentDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Method: {enrollmentRecord.payment.method === 'mobile_money' ? 'Mobile Money' : 'Bank Transfer'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#011F5B]">ZMW {enrollmentRecord.course.price}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment history</h3>
                  <p className="text-gray-600">Your payment history will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#011F5B] mb-6">Messages</h2>
                <button
                  onClick={() => setShowCompose(!showCompose)}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Compose
                </button>
              </div>

              {showCompose && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-[#011F5B] mb-4">New Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                      <input
                        type="text"
                        value={newMessage.recipient}
                        onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter recipient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Type your message here..."
                        rows="4"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCompose}
                        className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Send Message
                      </button>
                      <button
                        onClick={() => setShowCompose(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-[#011F5B]">Inbox</h3>
                      <p className="text-sm text-gray-600 mt-1">{messages.filter(m => m.unread).length} unread messages</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          onClick={() => handleMessageClick(message)}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                          } ${message.unread ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium text-sm ${message.unread ? 'text-[#011F5B] font-semibold' : 'text-gray-900'}`}>
                                  {message.sender}
                                </h4>
                                {message.unread && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              <p className={`text-sm mb-1 ${message.unread ? 'text-[#011F5B] font-medium' : 'text-gray-700'}`}>
                                {message.subject}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{message.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2">
                  {selectedMessage ? (
                    <div className="bg-white rounded-xl shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-[#011F5B]">{selectedMessage.subject}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-sm text-gray-600">From: <span className="font-medium">{selectedMessage.sender}</span></p>
                              <p className="text-sm text-gray-600">{selectedMessage.time}</p>
                            </div>
                            {selectedMessage.course && (
                              <p className="text-sm text-gray-600 mt-1">Course: <span className="font-medium">{selectedMessage.course}</span></p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {selectedMessage.unread && (
                              <button
                                onClick={() => markAsRead(selectedMessage.id)}
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(selectedMessage.id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                        
                        {/* Reply Section */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-[#011F5B] mb-3">Reply</h4>
                          <div className="space-y-3">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="Type your reply here..."
                              rows="3"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={handleReply}
                                className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                              >
                                Send Reply
                              </button>
                              <button
                                onClick={() => setReplyText('')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a message</h3>
                      <p className="text-gray-600">Choose a message from the inbox to read</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6">Settings</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
