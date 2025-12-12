import React, { useState } from 'react'
import { 
  Users, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Settings,
  CheckCircle,
  AlertCircle,
  Award,
  Target,
  Brain,
  FileText,
  BarChart3,
  Shield,
  Activity,
  Bot,
  Accessibility,
  Clock,
  GraduationCap,
  Download,
  RefreshCw,
  Home,
  Star,
  Archive,
  Monitor,
  ShieldCheck,
  UserPlus,
  Settings2,
  Tag,
  Plus
} from 'lucide-react'

// Mock components
const AICompanion = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">AI Companion</h3>
        <button onClick={onClose} className="px-4 py-2 bg-[#011F5B] text-white rounded">Close</button>
      </div>
    </div>
  )
}

const AccessibilityPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Accessibility Panel</h3>
        <button onClick={onClose} className="px-4 py-2 bg-[#011F5B] text-white rounded">Close</button>
      </div>
    </div>
  )
}

const AnalyticsDashboard = ({ isOpen, onClose, userRole }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
        <h3 className="text-lg font-bold mb-4">Analytics Dashboard ({userRole})</h3>
        <button onClick={onClose} className="px-4 py-2 bg-[#011F5B] text-white rounded">Close</button>
      </div>
    </div>
  )
}

const DocumentGenerator = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Document Generator</h3>
        <button onClick={onClose} className="px-4 py-2 bg-[#011F5B] text-white rounded">Close</button>
      </div>
    </div>
  )
}

const NotificationContext = React.createContext()

const NotificationProvider = ({ children }) => {
  const showSuccess = (message) => console.log('Success:', message)
  const showError = (message) => console.log('Error:', message)
  const showWarning = (message) => console.log('Warning:', message)
  const showInfo = (message) => console.log('Info:', message)

  return (
    <NotificationContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
    </NotificationContext.Provider>
  )
}

const useNotifications = () => React.useContext(NotificationContext)

function AdminDashboard() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAICompanion, setShowAICompanion] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [userRole] = useState('student')
  
  const [studentData] = useState({
    activeCourses: 3,
    avgProgress: 60,
    pendingAssignments: 5,
    overallGrade: 'B+',
    attendanceRate: 85,
    studyHours: 120
  })
  
  const [activeCourses] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      nextClass: 'Today, 2:00 PM',
      grade: 'A-'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      grade: 'B+'
    },
    {
      id: 3,
      title: 'Database Management',
      instructor: 'Dr. Emily Rodriguez',
      progress: 45,
      nextClass: 'Friday, 3:00 PM',
      grade: 'B'
    }
  ])
  
  const [upcomingAssignments] = useState([
    {
      id: 1,
      title: 'React Project Submission',
      course: 'Web Development Fundamentals',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Algorithm Analysis Paper',
      course: 'Data Structures & Algorithms',
      dueDate: '2024-01-18',
      dueTime: '5:00 PM',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Database Schema Design',
      course: 'Database Management',
      dueDate: '2024-01-20',
      dueTime: '11:59 PM',
      priority: 'low'
    }
  ])

  const [systemStats] = useState({
    totalUsers: 2456,
    activeStudents: 1834,
    totalCourses: 48,
    totalInstructors: 67,
    systemUptime: '99.8%',
    pendingApprovals: 12
  })

  const [revenueData] = useState({
    totalRevenue: 245670,
    monthlyRevenue: 45890,
    pendingPayments: 12340,
    refundsProcessed: 2340,
    growthRate: '+15.3%',
    avgTransactionValue: 234.50
  })

  const [aiPredictions] = useState([
    { 
      id: 1, 
      studentName: 'John Doe', 
      riskLevel: 'high', 
      riskScore: 85,
      factors: ['Low attendance (65%)', 'Missing assignments', 'Declining grades'],
      recommendation: 'Immediate intervention required'
    },
    { 
      id: 2, 
      studentName: 'Jane Smith', 
      riskLevel: 'medium', 
      riskScore: 65,
      factors: ['Recent grade drop', 'Late submissions'],
      recommendation: 'Schedule academic counseling'
    }
  ])

  const [userManagement] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', status: 'active', lastLogin: '1 day ago' }
  ])

  const [topCourses] = useState([
    { id: 1, name: 'Web Development Fundamentals', instructor: 'Dr. Sarah Johnson', students: 234, rating: 4.8 },
    { id: 2, name: 'Data Structures & Algorithms', instructor: 'Prof. Michael Chen', students: 189, rating: 4.7 }
  ])

  const [systemPerformance] = useState({
    cpu: 45,
    memory: 67,
    storage: 82,
    network: 23
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <header className="bg-white shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#011F5B] via-[#00416A] to-[#011F5B] rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#011F5B] tracking-tight">
                    {userRole === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    {userRole === 'admin' ? 'EduConnect System Administration' : 'EduConnect Learning Portal'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowAICompanion(true)} className="p-3 text-gray-600 hover:text-[#011F5B] rounded-xl">
                <Bot size={20} />
              </button>
              <button onClick={() => setShowAccessibility(true)} className="p-3 text-gray-600 hover:text-[#011F5B] rounded-xl">
                <Accessibility size={20} />
              </button>
              <button onClick={() => setShowDocumentGenerator(true)} className="p-3 text-gray-600 hover:text-[#011F5B] rounded-xl">
                <FileText size={20} />
              </button>
              <button onClick={() => setShowAnalytics(true)} className="p-3 text-gray-600 hover:text-[#011F5B] rounded-xl">
                <BarChart3 size={20} />
              </button>
              <div className="relative">
                <button className="p-3 text-gray-600 hover:text-[#011F5B] rounded-xl">
                  <Bell size={20} />
                </button>
                <span className="absolute top-2 right-2 w-3 h-3 bg-[#FF6B35] rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    {userRole === 'admin' ? <Shield className="w-5 h-5 text-white" /> : <GraduationCap className="w-5 h-5 text-white" />}
                  </div>
                  <h3 className="font-bold text-lg">{userRole === 'admin' ? 'Admin Tools' : 'Student Tools'}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-semibold">Overview</span>
                  </button>
                  <button onClick={() => setActiveTab('courses')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-semibold">Courses</span>
                  </button>
                  <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'users' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Users className="w-5 h-5" />
                    <span className="text-sm font-semibold">Users</span>
                  </button>
                  <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Analytics</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center gap-3 text-[#FF6B35] mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                          <BookOpen size={24} />
                        </div>
                        <span className="text-sm font-semibold">Active Courses</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{studentData.activeCourses}</div>
                      <p className="text-sm text-blue-600 font-medium">On track</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-white">
                      <div className="flex items-center gap-3 text-[#FF6B35] mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                          <Target size={24} />
                        </div>
                        <span className="text-sm font-semibold">Avg Progress</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{studentData.avgProgress}%</div>
                      <p className="text-sm text-green-600 font-medium">Above average</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-white">
                      <div className="flex items-center gap-3 text-[#FF6B35] mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                          <Clock size={24} />
                        </div>
                        <span className="text-sm font-semibold">Pending</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{studentData.pendingAssignments}</div>
                      <p className="text-sm text-yellow-600 font-medium">Need attention</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-white">
                      <div className="flex items-center gap-3 text-[#FF6B35] mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                          <Award size={24} />
                        </div>
                        <span className="text-sm font-semibold">Overall Grade</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{studentData.overallGrade}</div>
                      <p className="text-sm text-green-600 font-medium">Good standing</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">My Active Courses</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {activeCourses.map((course) => (
                          <div key={course.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#011F5B]/20 to-[#00416A]/20 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-[#011F5B]" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{course.title}</h4>
                                <p className="text-xs text-gray-600">{course.instructor}</p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium text-[#011F5B]">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full" style={{width: `${course.progress}%`}}></div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-600">Grade: <span className="font-medium text-green-600">{course.grade}</span></span>
                              <span className="text-gray-600">{course.nextClass}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">Upcoming Assignments</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {upcomingAssignments.map((assignment) => (
                          <div key={assignment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${assignment.priority === 'high' ? 'bg-red-500' : assignment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                                <p className="text-sm text-gray-600">{assignment.course}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{assignment.dueDate}</p>
                              <p className="text-xs text-gray-600">{assignment.dueTime}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h3 className="font-semibold text-[#011F5B] mb-4">User Management</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userManagement.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-sm">{user.name}</td>
                            <td className="py-3 px-4 text-sm">{user.email}</td>
                            <td className="py-3 px-4 text-sm">{user.role}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <div>
                  <h3 className="font-semibold text-[#011F5B] mb-4">Course Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topCourses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm text-gray-600">{course.students} students</span>
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h3 className="font-semibold text-[#011F5B] mb-4">Analytics Dashboard</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-4">System Performance</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">CPU Usage</span>
                            <span className="text-sm font-medium">{systemPerformance.cpu}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: `${systemPerformance.cpu}%`}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">Memory</span>
                            <span className="text-sm font-medium">{systemPerformance.memory}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${systemPerformance.memory}%`}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <AICompanion isOpen={showAICompanion} onClose={() => setShowAICompanion(false)} />
      <AccessibilityPanel isOpen={showAccessibility} onClose={() => setShowAccessibility(false)} />
      <AnalyticsDashboard isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} userRole={userRole} />
      <DocumentGenerator isOpen={showDocumentGenerator} onClose={() => setShowDocumentGenerator(false)} />
    </div>
  )
}

const AdminDashboardWrapper = () => (
  <NotificationProvider>
    <AdminDashboard />
  </NotificationProvider>
)

export default AdminDashboardWrapper