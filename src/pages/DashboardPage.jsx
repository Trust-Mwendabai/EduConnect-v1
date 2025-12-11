import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Bell, 
  Download,
  Upload,
  CreditCard,
  CheckCircle,
  AlertCircle,
  User,
  Award,
  Target,
  Brain,
  DollarSign,
  FileText,
  BarChart3,
  Users,
  Play,
  Star,
  Bot,
  Accessibility,
  Sparkles
} from 'lucide-react'
import AICompanion from '../components/ai/AICompanion'
import AccessibilityPanel from '../components/accessibility/AccessibilityPanel'
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard'
import DocumentGenerator from '../components/documents/DocumentGenerator'
import { NotificationProvider, useNotifications } from '../components/notifications/NotificationSystem'

function DashboardPage() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAICompanion, setShowAICompanion] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'assignment', message: 'New assignment posted in Web Development', time: '2 hours ago', read: false },
    { id: 2, type: 'payment', message: 'Payment reminder: Course fees due', time: '5 hours ago', read: false },
    { id: 3, type: 'grade', message: 'Your quiz has been graded: 85%', time: '1 day ago', read: true },
    { id: 4, type: 'announcement', message: 'System maintenance scheduled for tonight', time: '2 days ago', read: true }
  ])

  const [activeCourses] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Today, 2:00 PM',
      grade: 'A-',
      thumbnail: 'https://picsum.photos/seed/webdev/400/200'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      grade: 'B+',
      thumbnail: 'https://picsum.photos/seed/algo/400/200'
    },
    {
      id: 3,
      title: 'Database Management',
      instructor: 'Dr. Emily Rodriguez',
      progress: 45,
      nextClass: 'Friday, 3:00 PM',
      grade: 'B',
      thumbnail: 'https://picsum.photos/seed/db/400/200'
    }
  ])

  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const [upcomingAssignments] = useState([
    {
      id: 1,
      title: 'React Project Submission',
      course: 'Web Development Fundamentals',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      priority: 'high',
      submitted: false
    },
    {
      id: 2,
      title: 'Algorithm Analysis Paper',
      course: 'Data Structures & Algorithms',
      dueDate: '2024-01-18',
      dueTime: '5:00 PM',
      priority: 'medium',
      submitted: false
    },
    {
      id: 3,
      title: 'SQL Query Assignment',
      course: 'Database Management',
      dueDate: '2024-01-20',
      dueTime: '2:00 PM',
      priority: 'low',
      submitted: true
    }
  ])

  const [aiSuggestions] = useState([
    {
      id: 1,
      type: 'study',
      title: 'Focus on React Hooks',
      description: 'Based on your recent quiz performance, spend extra time on useEffect and custom hooks',
      priority: 'high'
    },
    {
      id: 2,
      type: 'time',
      title: 'Optimize Study Schedule',
      description: 'Your peak performance hours are 2-4 PM. Schedule difficult topics during this time',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'resource',
      title: 'Recommended Practice Problems',
      description: 'Complete these 5 algorithm problems to improve your understanding of recursion',
      priority: 'medium'
    }
  ])

  const [financialStatus] = useState({
    totalFees: 5000,
    paid: 3500,
    balance: 1500,
    nextPaymentDue: '2024-01-20',
    clearanceStatus: {
      library: true,
      accounts: false,
      faculty: true,
      hostel: true
    }
  })

  const [attendanceData] = useState({
    overall: 92,
    thisMonth: 95,
    lastMonth: 89,
    byCourse: [
      { course: 'Web Development', percentage: 95 },
      { course: 'Data Structures', percentage: 88 },
      { course: 'Database Management', percentage: 93 }
    ]
  })

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getClearanceProgress = () => {
    const status = financialStatus.clearanceStatus
    const completed = Object.values(status).filter(Boolean).length
    return (completed / Object.keys(status).length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#011F5B]">Student Dashboard</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User size={16} />
                <span>John Doe</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAICompanion(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="AI Learning Companion"
              >
                <Bot size={20} />
              </button>
              <button 
                onClick={() => setShowAccessibility(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="Accessibility Settings"
              >
                <Accessibility size={20} />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link to="/profile" className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
          {['overview', 'courses', 'assignments', 'attendance', 'financial', 'ai-suggestions', 'analytics', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#011F5B] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <BookOpen size={20} />
                  <span className="text-sm font-medium">Active Courses</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">3</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <Target size={20} />
                  <span className="text-sm font-medium">Avg Progress</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">60%</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <Clock size={20} />
                  <span className="text-sm font-medium">Pending</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">2</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <Award size={20} />
                  <span className="text-sm font-medium">Avg Grade</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">B+</div>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Bell size={18} />
                  Notifications
                </h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notif.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notif.type === 'assignment' ? 'bg-blue-500' :
                        notif.type === 'payment' ? 'bg-red-500' :
                        notif.type === 'grade' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Courses */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <BookOpen size={18} />
                  Active Courses
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {activeCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <img src={course.thumbnail} alt={course.title} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#011F5B]">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} />
                          <span>{course.nextClass}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award size={14} />
                          <span>Grade: {course.grade}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Link to={`/course/${course.id}`} className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors">
                      <Play size={20} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Brain size={18} />
                  AI Study Suggestions
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        suggestion.priority === 'high' ? 'bg-red-500' :
                        suggestion.priority === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#011F5B] text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#011F5B] mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.instructor}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Class:</span>
                      <span className="font-medium">{course.nextClass}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current Grade:</span>
                      <span className="font-medium text-[#FF6B35]">{course.grade}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 py-2 px-4 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors">
                      Continue Learning
                    </button>
                    <button className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors">
                      <BarChart3 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                <FileText size={18} />
                Upcoming Assignments
              </h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-[#011F5B]">{assignment.title}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                          {assignment.submitted && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                              Submitted
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{assignment.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{assignment.dueTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!assignment.submitted && (
                          <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors">
                            Submit
                          </button>
                        )}
                        <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Attendance Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Overall Attendance</p>
                    <p className="text-2xl font-bold text-[#011F5B]">{attendanceData.overall}%</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-xl font-semibold text-green-600">{attendanceData.thisMonth}%</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">Last Month</p>
                    <p className="text-xl font-semibold text-yellow-600">{attendanceData.lastMonth}%</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Attendance by Course</h3>
              <div className="space-y-3">
                {attendanceData.byCourse.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.course}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Financial Status</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Total Fees</span>
                    <span className="font-semibold">${financialStatus.totalFees}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-semibold text-green-600">${financialStatus.paid}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Balance</span>
                    <span className="font-semibold text-red-600">${financialStatus.balance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Payment Due</span>
                    <span className="font-medium">{financialStatus.nextPaymentDue}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                  Make Payment
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Clearance Status</h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm font-medium">{Math.round(getClearanceProgress())}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full transition-all"
                    style={{ width: `${getClearanceProgress()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                {Object.entries(financialStatus.clearanceStatus).map(([department, cleared]) => (
                  <div key={department} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        cleared ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {cleared ? (
                          <CheckCircle size={16} className="text-green-600" />
                        ) : (
                          <AlertCircle size={16} className="text-red-600" />
                        )}
                      </div>
                      <span className="font-medium capitalize">{department}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      cleared ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {cleared ? 'Cleared' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions Tab */}
        {activeTab === 'ai-suggestions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    suggestion.type === 'study' ? 'bg-blue-100' :
                    suggestion.type === 'time' ? 'bg-purple-100' :
                    'bg-green-100'
                  }`}>
                    {suggestion.type === 'study' ? (
                      <BookOpen size={20} className="text-blue-600" />
                    ) : suggestion.type === 'time' ? (
                      <Clock size={20} className="text-purple-600" />
                    ) : (
                      <Target size={20} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#011F5B]">{suggestion.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{suggestion.description}</p>
                    <button className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors text-sm">
                      Apply Suggestion
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Learning Analytics</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowAnalytics(true)}
                  className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Open Analytics
                </button>
              </div>
            </div>
            <AnalyticsDashboard userRole="student" />
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Documents & Forms</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDocumentGenerator(true)}
                  className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Documents
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DocumentGenerator documentType="clearance" />
              <DocumentGenerator documentType="receipt" />
            </div>
          </div>
        )}
      </div>

      {/* AI Companion */}
      <AICompanion
        isOpen={showAICompanion}
        onClose={() => setShowAICompanion(false)}
      />

      {/* Accessibility Panel */}
      <AccessibilityPanel
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
      />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        userRole="student"
      />

      {/* Document Generator */}
      <DocumentGenerator
        isOpen={showDocumentGenerator}
        onClose={() => setShowDocumentGenerator(false)}
      />
    </div>
  )
}

// Wrapper component with NotificationProvider
const DashboardPageWrapper = () => (
  <NotificationProvider>
    <DashboardPage />
  </NotificationProvider>
)

export default DashboardPageWrapper
