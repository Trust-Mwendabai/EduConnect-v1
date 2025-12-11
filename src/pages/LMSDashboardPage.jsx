import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Clock, DollarSign, Bell, TrendingUp, Award, AlertCircle, CheckCircle, PlayCircle, FileText, Target, Brain, Lightbulb, BarChart3, Users, Video, Download, Star, ChevronRight, X, Info, CreditCard, Check, User, Home, ShoppingCart, GraduationCap, MessageSquare, Settings, LogOut, Menu, ChevronLeft, Search } from 'lucide-react'

export default function LMSDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const activeCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Advanced State Management',
      nextClass: 'Today, 2:00 PM',
      grade: 'A-',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      nextLesson: 'Machine Learning Basics',
      nextClass: 'Tomorrow, 10:00 AM',
      grade: 'B+',
      color: 'green'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      progress: 85,
      totalLessons: 16,
      completedLessons: 14,
      nextLesson: 'User Research Methods',
      nextClass: 'Friday, 3:00 PM',
      grade: 'A',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      instructor: 'Alex Thompson',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: 'SEO Optimization',
      nextClass: 'Monday, 11:00 AM',
      grade: 'B',
      color: 'orange'
    }
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: 'React Project Submission',
      course: 'Advanced React Development',
      dueDate: '2024-05-20',
      dueTime: '11:59 PM',
      priority: 'high',
      type: 'project',
      estimatedTime: '4 hours'
    },
    {
      id: 2,
      title: 'Data Analysis Quiz',
      course: 'Data Science Fundamentals',
      dueDate: '2024-05-18',
      dueTime: '2:00 PM',
      priority: 'medium',
      type: 'quiz',
      estimatedTime: '1 hour'
    },
    {
      id: 3,
      title: 'Design Portfolio Update',
      course: 'UI/UX Design Principles',
      dueDate: '2024-05-22',
      dueTime: '5:00 PM',
      priority: 'low',
      type: 'portfolio',
      estimatedTime: '3 hours'
    },
    {
      id: 4,
      title: 'Marketing Campaign Proposal',
      course: 'Digital Marketing Strategy',
      dueDate: '2024-05-25',
      dueTime: '11:59 PM',
      priority: 'medium',
      type: 'proposal',
      estimatedTime: '5 hours'
    }
  ]

  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      time: 'Today, 2:00 PM - 3:30 PM',
      type: 'live',
      room: 'Virtual Room A',
      topic: 'Advanced State Management'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      time: 'Tomorrow, 10:00 AM - 11:30 AM',
      type: 'lecture',
      room: 'Science Lab 2',
      topic: 'Machine Learning Basics'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      time: 'Friday, 3:00 PM - 4:30 PM',
      type: 'workshop',
      room: 'Design Studio',
      topic: 'User Research Methods'
    }
  ]

  const attendanceData = {
    overall: 92,
    thisMonth: 95,
    lastMonth: 88,
    bySubject: [
      { subject: 'Advanced React Development', rate: 95 },
      { subject: 'Data Science Fundamentals', rate: 90 },
      { subject: 'UI/UX Design Principles', rate: 98 },
      { subject: 'Digital Marketing Strategy', rate: 85 }
    ]
  }

  const financialStatus = {
    tuitionBalance: 1250.00,
    nextPaymentDue: '2024-06-01',
    paymentStatus: 'partial',
    clearanceStatus: 'pending',
    totalPaid: 3400.00,
    totalDue: 4650.00,
    recentPayments: [
      { date: '2024-05-01', amount: 850.00, status: 'completed' },
      { date: '2024-04-01', amount: 850.00, status: 'completed' },
      { date: '2024-03-01', amount: 850.00, status: 'completed' }
    ]
  }

  const aiSuggestions = [
    {
      id: 1,
      type: 'study',
      title: 'Focus on React Hooks',
      description: 'Based on your recent quiz performance, spend extra time reviewing useEffect and custom hooks',
      priority: 'high',
      course: 'Advanced React Development',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      type: 'time',
      title: 'Optimize Study Schedule',
      description: 'Your peak performance hours are 10 AM - 12 PM. Schedule difficult topics during this time',
      priority: 'medium',
      course: 'General',
      estimatedTime: '30 minutes'
    },
    {
      id: 3,
      type: 'review',
      title: 'Review Data Science Basics',
      description: 'You have 3 assignments due next week. Start with the Data Analysis Quiz tomorrow',
      priority: 'high',
      course: 'Data Science Fundamentals',
      estimatedTime: '1 hour'
    },
    {
      id: 4,
      type: 'resource',
      title: 'Additional Practice Resources',
      description: 'We found 5 new practice exercises for React state management based on your learning patterns',
      priority: 'low',
      course: 'Advanced React Development',
      estimatedTime: '3 hours'
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'React Project Submission has been posted. Due in 3 days.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Posted',
      message: 'Your UI/UX Design portfolio has been graded. Score: 92%',
      time: '5 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'class',
      title: 'Class Schedule Change',
      message: 'Tomorrow\'s Data Science class moved to 11:00 AM',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Reminder',
      message: 'Tuition fee for June is due on June 1st',
      time: '2 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'System Maintenance',
      message: 'LMS will be unavailable this weekend for scheduled maintenance',
      time: '3 days ago',
      read: true,
      priority: 'low'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCourseColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      case 'purple': return 'bg-purple-500'
      case 'orange': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return <FileText className="w-5 h-5" />
      case 'grade': return <Award className="w-5 h-5" />
      case 'class': return <Calendar className="w-5 h-5" />
      case 'payment': return <DollarSign className="w-5 h-5" />
      case 'announcement': return <Bell className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const sidebarItems = [
    { id: 'home', label: 'Back to Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'classroom', label: 'Virtual Classroom', icon: Video },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

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
                  <GraduationCap size={20} className="text-white" />
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
                      setActiveSection(item.id)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    item.id === 'home'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : activeSection === item.id
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
                <p className="font-medium">John Doe</p>
                <p className="text-xs text-blue-200">Student ID: STU001</p>
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
                  {activeSection === 'overview' ? 'Dashboard Overview' : 
                   activeSection === 'courses' ? 'My Courses' :
                   activeSection === 'assignments' ? 'Assignments' :
                   activeSection === 'marketplace' ? 'Marketplace' :
                   activeSection === 'classroom' ? 'Virtual Classroom' :
                   activeSection === 'messages' ? 'Messages' :
                   activeSection === 'payments' ? 'Payments' : 'Settings'}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Learning Overview</span>
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

      {/* Dynamic Content Based on Active Section */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === 'overview' && (
            <div>
              {/* Overview Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-blue-600 font-medium">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{activeCourses.length}</h3>
                  <p className="text-gray-600 text-sm">Courses</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">This Week</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{upcomingAssignments.filter(a => new Date(a.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}</h3>
                  <p className="text-gray-600 text-sm">Assignments Due</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+5%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{attendanceData.overall}%</h3>
                  <p className="text-gray-600 text-sm">Attendance Rate</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      financialStatus.clearanceStatus === 'cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {financialStatus.clearanceStatus}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">${financialStatus.tuitionBalance}</h3>
                  <p className="text-gray-600 text-sm">Balance Due</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map(notification => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#011F5B] mb-6">AI Study Assistant</h2>
                  <div className="space-y-4">
                    {aiSuggestions.slice(0, 3).map(suggestion => (
                      <div key={suggestion.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Brain className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{suggestion.course} • {suggestion.estimatedTime}</span>
                              <button className="text-[#FF6B35] text-sm font-medium hover:text-[#E55A2B]">
                                Apply Suggestion
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'courses' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">My Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${getCourseColor(course.color)} rounded-lg flex items-center justify-center`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{course.grade}</span>
                        <p className="text-xs text-gray-500">Current Grade</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={getCourseColor(course.color) + " h-2 rounded-full transition-all duration-300"}
                          style={{ width: course.progress + "%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <PlayCircle className="w-4 h-4" />
                          <span>Next: {course.nextLesson}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{course.nextClass}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'assignments' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Assignments</h2>
              <div className="space-y-4">
                {upcomingAssignments.map(assignment => (
                  <div key={assignment.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.course}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority}
                            </span>
                            <span className="text-xs text-gray-500">Est: {assignment.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{assignment.dueDate}</p>
                        <p className="text-sm text-gray-600">{assignment.dueTime}</p>
                        <button className="mt-2 px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                          Start Assignment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'marketplace' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Marketplace</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600 mb-4">Browse courses and learning materials from our marketplace.</p>
                <Link to="/marketplace" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <ShoppingCart size={16} />
                  Visit Full Marketplace
                </Link>
              </div>
            </div>
          )}

          {activeSection === 'classroom' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Virtual Classroom</h2>
              <div className="space-y-4">
                {upcomingClasses.map(class_ => (
                  <div key={class_.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{class_.title}</h3>
                          <p className="text-sm text-gray-600">{class_.instructor}</p>
                          <p className="text-sm text-gray-500">Topic: {class_.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{class_.time}</p>
                        <p className="text-sm text-gray-600">{class_.room}</p>
                        <Link to={`/classroom/${class_.id}`} className="mt-2 inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                          Join Class
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'messages' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Messages</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">Your messaging interface will appear here.</p>
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Payments</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Balance Due</span>
                    <span className="text-lg font-bold text-red-600">${financialStatus.tuitionBalance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="text-sm font-medium text-gray-900">{financialStatus.nextPaymentDue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Clearance Status</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      financialStatus.clearanceStatus === 'cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {financialStatus.clearanceStatus}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Settings</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">Your settings and preferences will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
