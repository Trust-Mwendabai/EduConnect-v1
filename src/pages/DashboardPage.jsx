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
  Sparkles,
  Timer,
  MapPin,
  Video,
  ChevronRight,
  FileCode,
  FileAudio,
  FileSpreadsheet,
  Lock,
  Unlock,
  Megaphone,
  AlertTriangle,
  Eye,
  Trash2
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

      <div className="container-custom py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Access</h3>
            
            {/* Academic Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Academic</h4>
              <div className="space-y-2">
                <Link 
                  to="/timetable"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Timer className="w-4 h-4" />
                  <span className="text-sm">Timetable</span>
                </Link>
                <Link 
                  to="/exams"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Online Exams</span>
                </Link>
                <Link 
                  to="/course-outline"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Course Outline</span>
                </Link>
                <Link 
                  to="/study-materials"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Study Materials</span>
                </Link>
                <Link 
                  to="/study-room"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Study Room</span>
                </Link>
              </div>
            </div>

            {/* Learning Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Learning</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <Video className="w-4 h-4" />
                  <span className="text-sm">Virtual Classroom</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <Target className="w-4 h-4" />
                  <span className="text-sm">Assignments</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Grades</span>
                </button>
              </div>
            </div>

            {/* Account Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Account</h4>
              <div className="space-y-2">
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Financial</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
                </button>
                <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 w-full">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-900">React Mid-term</span>
                </div>
                <p className="text-xs text-red-700">Tomorrow, 10:00 AM</p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Database Quiz</span>
                </div>
                <p className="text-xs text-blue-700">Friday, 2:00 PM</p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Study Group</span>
                </div>
                <p className="text-xs text-green-700">Saturday, 3:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'courses', label: 'Courses' },
                { id: 'assignments', label: 'Assignments' },
                { id: 'attendance', label: 'Attendance' },
                { id: 'financial', label: 'Financial' },
                { id: 'ai-suggestions', label: 'AI Suggestions' },
                { id: 'notifications', label: 'Notifications' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#011F5B] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
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

        {/* Timetable Tab */}
        {activeTab === 'timetable' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">My Timetable</h2>
              <Link 
                to="/timetable"
                className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                View Full Timetable
              </Link>
            </div>
            
            {/* Today's Classes */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#FF6B35]" />
                    Today's Classes
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { course: 'Advanced React Development', instructor: 'Dr. Sarah Johnson', time: '9:00 AM - 10:30 AM', room: 'Virtual Room 101', type: 'online' },
                    { course: 'Database Management', instructor: 'Prof. Michael Chen', time: '11:00 AM - 12:30 PM', room: 'Room 205', type: 'offline' }
                  ].map((cls, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{cls.course}</h4>
                          <p className="text-sm text-gray-600">{cls.instructor}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {cls.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {cls.room}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              cls.type === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {cls.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {cls.type === 'online' && (
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                              <Video className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Exams */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#FF6B35]" />
                    Upcoming Exams
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { course: 'Advanced React Development', title: 'Mid-term Examination', date: '2024-01-20', time: '10:00 AM' },
                    { course: 'Database Management', title: 'Quiz 3', date: '2024-01-22', time: '2:00 PM' }
                  ].map((exam, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{exam.title}</h4>
                          <p className="text-sm text-gray-600">{exam.course}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {exam.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {exam.time}
                            </span>
                          </div>
                        </div>
                        <Link 
                          to="/exams"
                          className="px-3 py-1 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF8C61] transition-colors"
                        >
                          Start
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Today's Classes</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900">3h</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Online Classes</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upcoming Exams</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exams Tab */}
        {activeTab === 'exams' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Online Exams</h2>
              <Link 
                to="/exams"
                className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors flex items-center gap-2"
              >
                <Timer className="w-4 h-4" />
                View All Exams
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  course: 'Advanced React Development',
                  title: 'Mid-term Examination',
                  description: 'Comprehensive assessment covering React fundamentals',
                  duration: 120,
                  totalQuestions: 30,
                  totalMarks: 100,
                  date: '2024-01-20',
                  time: '10:00 AM',
                  status: 'upcoming'
                },
                {
                  id: 2,
                  course: 'Database Management',
                  title: 'Quiz 3 - SQL Queries',
                  description: 'Test your knowledge of SQL queries and operations',
                  duration: 60,
                  totalQuestions: 20,
                  totalMarks: 50,
                  date: '2024-01-22',
                  time: '2:00 PM',
                  status: 'upcoming'
                },
                {
                  id: 3,
                  course: 'Web Design Fundamentals',
                  title: 'Project Submission',
                  description: 'Submit your responsive website project',
                  duration: 0,
                  totalQuestions: 1,
                  totalMarks: 100,
                  date: '2024-01-25',
                  time: '11:59 PM',
                  status: 'submission'
                }
              ].map(exam => (
                <div key={exam.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-600">{exam.course}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        exam.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {exam.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{exam.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4" />
                        <span>{exam.duration > 0 ? `${exam.duration} minutes` : 'No time limit'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>{exam.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{exam.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exam.date} at {exam.time}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Attempts: 0/1</span>
                      <Link
                        to={`/exams/${exam.id}`}
                        className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors text-sm font-medium"
                      >
                        Start Exam
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Outline Tab */}
        {activeTab === 'outline' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Course Outlines</h2>
              <Link 
                to="/course-outline"
                className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                View All Courses
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Advanced React Development',
                  instructor: 'Dr. Sarah Johnson',
                  progress: 65,
                  nextLesson: 'Custom Hooks Creation',
                  modules: 12,
                  duration: '12 weeks'
                },
                {
                  title: 'Database Management',
                  instructor: 'Prof. Michael Chen',
                  progress: 40,
                  nextLesson: 'SQL Joins',
                  modules: 10,
                  duration: '10 weeks'
                },
                {
                  title: 'Web Design Fundamentals',
                  instructor: 'Ms. Emily Davis',
                  progress: 80,
                  nextLesson: 'Responsive Design',
                  modules: 8,
                  duration: '8 weeks'
                }
              ].map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>Next Lesson:</span>
                      <span className="font-medium">{course.nextLesson}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modules:</span>
                      <span>{course.modules}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/course-outline"
                    className="w-full px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors text-center font-medium"
                  >
                    View Outline
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Materials Tab */}
        {activeTab === 'materials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Study Materials</h2>
              <Link 
                to="/study-materials"
                className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Browse All Materials
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'React Hooks Deep Dive',
                  type: 'video',
                  course: 'Advanced React Development',
                  size: '1.2 GB',
                  duration: '2h 15min',
                  rating: 4.9
                },
                {
                  title: 'Database Design Principles',
                  type: 'document',
                  course: 'Database Management',
                  size: '2.5 MB',
                  pages: 45,
                  rating: 4.7
                },
                {
                  title: 'CSS Grid Layout Workshop',
                  type: 'video',
                  course: 'Web Design Fundamentals',
                  size: '890 MB',
                  duration: '1h 45min',
                  rating: 4.8
                },
                {
                  title: 'JavaScript Algorithms',
                  type: 'code',
                  course: 'Advanced React Development',
                  size: '450 KB',
                  files: 23,
                  rating: 4.6
                },
                {
                  title: 'UI/UX Design Principles',
                  type: 'presentation',
                  course: 'Web Design Fundamentals',
                  size: '15.3 MB',
                  slides: 67,
                  rating: 4.5
                },
                {
                  title: 'Database Trends Podcast',
                  type: 'audio',
                  course: 'Database Management',
                  size: '42 MB',
                  duration: '45min',
                  rating: 4.4
                }
              ].map((material, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      material.type === 'video' ? 'bg-blue-100' :
                      material.type === 'document' ? 'bg-green-100' :
                      material.type === 'code' ? 'bg-indigo-100' :
                      material.type === 'presentation' ? 'bg-orange-100' :
                      material.type === 'audio' ? 'bg-purple-100' :
                      'bg-gray-100'
                    }`}>
                      {material.type === 'video' ? <Video className="w-6 h-6 text-blue-600" /> :
                       material.type === 'document' ? <FileText className="w-6 h-6 text-green-600" /> :
                       material.type === 'code' ? <FileCode className="w-6 h-6 text-indigo-600" /> :
                       material.type === 'presentation' ? <FileSpreadsheet className="w-6 h-6 text-orange-600" /> :
                       material.type === 'audio' ? <FileAudio className="w-6 h-6 text-purple-600" /> :
                       <File className="w-6 h-6 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{material.title}</h3>
                      <p className="text-sm text-gray-600">{material.course}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize">{material.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{material.size}</span>
                    </div>
                    {material.duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{material.duration}</span>
                      </div>
                    )}
                    {material.pages && (
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span>{material.pages}</span>
                      </div>
                    )}
                    {material.files && (
                      <div className="flex justify-between">
                        <span>Files:</span>
                        <span>{material.files}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {material.rating}
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/study-materials"
                    className="w-full px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors text-center font-medium"
                  >
                    Access Material
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Study Room Tab */}
        {activeTab === 'study-room' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Study Rooms</h2>
              <Link 
                to="/study-room"
                className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Browse Study Rooms
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'React Hooks Study Session',
                  topic: 'Advanced React Hooks and Performance',
                  participants: 12,
                  maxParticipants: 20,
                  host: 'Sarah Johnson',
                  isPrivate: false,
                  tags: ['react', 'hooks', 'javascript']
                },
                {
                  title: 'Database Study Group',
                  topic: 'SQL Queries and Database Design',
                  participants: 8,
                  maxParticipants: 15,
                  host: 'Michael Chen',
                  isPrivate: false,
                  tags: ['database', 'sql', 'design']
                },
                {
                  title: 'Web Design Workshop',
                  topic: 'CSS Grid and Flexbox Practice',
                  participants: 15,
                  maxParticipants: 25,
                  host: 'Emily Davis',
                  isPrivate: false,
                  tags: ['css', 'design', 'layout']
                }
              ].map((room, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{room.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{room.topic}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          Host: {room.host}
                        </span>
                        <span className="flex items-center gap-1">
                          {room.isPrivate ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          {room.isPrivate ? 'Private' : 'Public'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {room.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants</span>
                      <span className="font-medium">{room.participants}/{room.maxParticipants}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(room.participants / room.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link 
                    to="/study-room/react-study-101"
                    className="w-full px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors text-center font-medium"
                  >
                    Join Room
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Notifications & Announcements</h2>
              <Link 
                to="/notifications"
                className="px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                View All Notifications
              </Link>
            </div>
            
            {/* Recent Notifications */}
            <div className="space-y-4 mb-6">
              {[
                {
                  type: 'announcement',
                  title: 'System Maintenance Scheduled',
                  message: 'Platform maintenance on Saturday, January 20th from 2:00 AM to 6:00 AM CAT',
                  time: '2 hours ago',
                  priority: 'high',
                  read: false
                },
                {
                  type: 'success',
                  title: 'Assignment Submitted Successfully',
                  message: 'Your Advanced React Development assignment has been submitted',
                  time: '4 hours ago',
                  priority: 'medium',
                  read: false
                },
                {
                  type: 'warning',
                  title: 'Payment Reminder',
                  message: 'Your monthly tuition payment of ZMW 2,500 is due in 3 days',
                  time: '6 hours ago',
                  priority: 'high',
                  read: true
                },
                {
                  type: 'info',
                  title: 'New Course Available',
                  message: 'Machine Learning Fundamentals is now open for enrollment',
                  time: '1 day ago',
                  priority: 'medium',
                  read: true
                }
              ].map((notification, index) => {
                const IconComponent = notification.type === 'announcement' ? Megaphone :
                                   notification.type === 'success' ? CheckCircle :
                                   notification.type === 'warning' ? AlertTriangle :
                                   notification.type === 'error' ? AlertCircle :
                                   Bell
                                   
                const colorClass = notification.type === 'announcement' ? 'bg-purple-100 text-purple-600 border-purple-200' :
                                   notification.type === 'success' ? 'bg-green-100 text-green-600 border-green-200' :
                                   notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600 border-yellow-200' :
                                   notification.type === 'error' ? 'bg-red-100 text-red-600 border-red-200' :
                                   'bg-blue-100 text-blue-600 border-blue-200'
                
                return (
                  <div key={index} className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${
                    !notification.read ? 'border-l-4 border-blue-500' : ''
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h3>
                              {notification.priority === 'high' && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High Priority</span>
                              )}
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notification.time}
                              </span>
                              <span className="capitalize">{notification.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {!notification.read && (
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                            )}
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Announcements</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
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
