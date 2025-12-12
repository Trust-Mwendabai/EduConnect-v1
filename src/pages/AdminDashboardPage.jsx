import React, { useState, useContext } from 'react'
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Bot, 
  Accessibility, 
  FileText, 
  Bell,
  Shield,
  GraduationCap,
  DollarSign,
  Brain,
  Settings,
  ShieldCheck,
  Star,
  Clock,
  Target,
  Award,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Check,
  X,
  AlertTriangle,
  Calendar,
  Building,
  UserCheck,
  UserX,
  Eye,
  Filter,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  RefreshCw,
  Archive,
  Monitor,
  UserPlus,
  Settings2,
  Tag,
  ArrowLeft
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  
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

  const [userStatistics] = useState({
    totalUsers: 15420,
    activeUsers: 12847,
    newUsersThisMonth: 342,
    userGrowthRate: 12.5,
    userRoles: {
      students: 12450,
      instructors: 1850,
      admins: 120
    },
    userActivity: {
      dailyActive: 8234,
      weeklyActive: 11234,
      monthlyActive: 12847
    }
  })

  const [revenueAnalytics] = useState({
    totalRevenue: 2847500,
    monthlyRevenue: 237291,
    revenueGrowth: 18.3,
    revenueBySource: {
      courseFees: 1847500,
      subscriptions: 650000,
      certifications: 250000,
      other: 100000
    },
    monthlyTrend: [
      { month: 'Jan', revenue: 198000 },
      { month: 'Feb', revenue: 205000 },
      { month: 'Mar', revenue: 212000 },
      { month: 'Apr', revenue: 225000 },
      { month: 'May', revenue: 237291 }
    ],
    topPayingCourses: [
      { name: 'Web Development Bootcamp', revenue: 456000, students: 1234 },
      { name: 'Data Science Masterclass', revenue: 389000, students: 987 },
      { name: 'AI & Machine Learning', revenue: 312000, students: 756 }
    ]
  })

  const [systemNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Server Maintenance Scheduled',
      message: 'System maintenance scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.',
      timestamp: '2 hours ago',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Traffic Detected',
      message: 'Unusual traffic spike detected on course enrollment servers. Monitoring system performance.',
      timestamp: '1 hour ago',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Released',
      message: 'AI-powered course recommendations now available for all students.',
      timestamp: '3 hours ago',
      priority: 'low',
      actionRequired: false
    },
    {
      id: 4,
      type: 'success',
      title: 'Monthly Report Generated',
      message: 'May 2024 performance report is now available for download.',
      timestamp: '5 hours ago',
      priority: 'low',
      actionRequired: false
    }
  ])

  const [aiRiskPredictions] = useState([
    { 
      id: 1, 
      studentName: 'Alex Johnson', 
      email: 'alex.j@edu.com',
      riskLevel: 'critical', 
      riskScore: 87,
      factors: ['3 consecutive missed assignments', '75% attendance drop', 'Failing 2 subjects'],
      recommendation: 'Immediate intervention required - schedule meeting with student and parents',
      predictedOutcome: 'High likelihood of course withdrawal',
      aiConfidence: 94,
      lastUpdated: '2 hours ago'
    },
    { 
      id: 2, 
      studentName: 'Sarah Williams', 
      email: 'sarah.w@edu.com',
      riskLevel: 'high', 
      riskScore: 72,
      factors: ['Recent grade decline', 'Low forum participation', 'Extended login gaps'],
      recommendation: 'Academic counseling and engagement program recommended',
      predictedOutcome: 'At risk of falling behind peers',
      aiConfidence: 87,
      lastUpdated: '4 hours ago'
    },
    { 
      id: 3, 
      studentName: 'Michael Chen', 
      email: 'michael.c@edu.com',
      riskLevel: 'medium', 
      riskScore: 58,
      factors: ['Late submission pattern', 'Below-average quiz scores'],
      recommendation: 'Time management workshop and peer tutoring',
      predictedOutcome: 'Can recover with support',
      aiConfidence: 76,
      lastUpdated: '6 hours ago'
    },
    { 
      id: 4, 
      studentName: 'Emma Davis', 
      email: 'emma.d@edu.com',
      riskLevel: 'low', 
      riskScore: 35,
      factors: ['Occasional late submissions'],
      recommendation: 'Monitor progress, send gentle reminders',
      predictedOutcome: 'Likely to improve without intervention',
      aiConfidence: 68,
      lastUpdated: '1 day ago'
    }
  ])

  // User Management Data
  const [allUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', department: 'Computer Science', status: 'active', lastLogin: '2 hours ago', joinDate: '2023-01-15', courses: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', department: 'Mathematics', status: 'active', lastLogin: '1 day ago', joinDate: '2022-08-20', courses: 3 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'student', department: 'Business', status: 'suspended', lastLogin: '3 days ago', joinDate: '2023-03-10', courses: 4 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'admin', department: 'Administration', status: 'active', lastLogin: '30 minutes ago', joinDate: '2022-01-05', courses: 0 },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'instructor', department: 'Physics', status: 'active', lastLogin: '5 hours ago', joinDate: '2022-11-12', courses: 2 }
  ])

  // Course Management Data
  const [courseManagement] = useState({
    pendingUploads: [
      { id: 1, instructor: 'Dr. Sarah Johnson', course: 'Advanced Web Development', uploadType: 'Video Lectures', status: 'pending', uploadDate: '2024-05-15', size: '2.3 GB' },
      { id: 2, instructor: 'Prof. Michael Chen', course: 'Data Science Fundamentals', uploadType: 'Course Materials', status: 'pending', uploadDate: '2024-05-14', size: '156 MB' },
      { id: 3, instructor: 'Dr. Emily Rodriguez', course: 'Machine Learning', uploadType: 'Assignment Templates', status: 'pending', uploadDate: '2024-05-13', size: '45 MB' }
    ],
    faculties: [
      { id: 1, name: 'Faculty of Engineering', dean: 'Dr. Alan Turing', programs: ['Computer Science', 'Software Engineering', 'Data Science'], instructors: 45, students: 1250 },
      { id: 2, name: 'Faculty of Business', dean: 'Dr. Warren Buffett', programs: ['MBA', 'Finance', 'Marketing'], instructors: 32, students: 890 },
      { id: 3, name: 'Faculty of Sciences', dean: 'Dr. Marie Curie', programs: ['Physics', 'Chemistry', 'Biology'], instructors: 28, students: 670 }
    ],
    programs: [
      { id: 1, name: 'Computer Science', faculty: 'Faculty of Engineering', duration: '4 years', credits: 120, students: 450, coordinator: 'Dr. Sarah Johnson' },
      { id: 2, name: 'MBA Program', faculty: 'Faculty of Business', duration: '2 years', credits: 60, students: 320, coordinator: 'Prof. Michael Chen' },
      { id: 3, name: 'Data Science', faculty: 'Faculty of Engineering', duration: '2 years', credits: 80, students: 280, coordinator: 'Dr. Emily Rodriguez' }
    ]
  })

  // Institution Settings Data
  const [institutionSettings] = useState({
    branding: {
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
      primaryColor: '#011F5B',
      secondaryColor: '#FF6B35',
      institutionName: 'EduConnect University',
      tagline: 'Empowering Education Through Technology'
    },
    calendar: {
      academicYear: '2024-2025',
      semesterStart: '2024-09-01',
      semesterEnd: '2024-12-15',
      holidays: [
        { date: '2024-11-28', name: 'Thanksgiving Break' },
        { date: '2024-12-25', name: 'Christmas Holiday' }
      ]
    },
    gradingScale: [
      { grade: 'A', range: '90-100', points: 4.0, description: 'Excellent' },
      { grade: 'B', range: '80-89', points: 3.0, description: 'Good' },
      { grade: 'C', range: '70-79', points: 2.0, description: 'Satisfactory' },
      { grade: 'D', range: '60-69', points: 1.0, description: 'Needs Improvement' },
      { grade: 'F', range: '0-59', points: 0.0, description: 'Failing' }
    ]
  })

  // Payments Panel Data
  const [paymentsData] = useState({
    reconciliation: [
      { id: 1, date: '2024-05-15', transactionId: 'TXN001', amount: 1250.00, type: 'Tuition Fee', status: 'reconciled', method: 'Credit Card', student: 'John Doe' },
      { id: 2, date: '2024-05-15', transactionId: 'TXN002', amount: 450.00, type: 'Course Material', status: 'pending', method: 'Bank Transfer', student: 'Jane Smith' },
      { id: 3, date: '2024-05-14', transactionId: 'TXN003', amount: 890.00, type: 'Tuition Fee', status: 'reconciled', method: 'PayPal', student: 'Robert Johnson' },
      { id: 4, date: '2024-05-14', transactionId: 'TXN004', amount: 320.00, type: 'Certification Fee', status: 'flagged', method: 'Credit Card', student: 'Emily Davis' }
    ],
    summary: {
      totalTransactions: 1247,
      reconciledAmount: 2847500,
      pendingAmount: 45600,
      flaggedAmount: 12300,
      monthlyTotal: 237291
    }
  })

  // Marketplace Moderation Data
  const [marketplaceContent] = useState([
    { id: 1, vendor: 'TechEdu Solutions', title: 'Advanced JavaScript Course', type: 'Course', status: 'pending', submittedDate: '2024-05-15', rating: 4.5, price: 89.99, flagged: false },
    { id: 2, vendor: 'LearnSmart Inc', title: 'Python Programming Guide', type: 'E-book', status: 'approved', submittedDate: '2024-05-14', rating: 4.2, price: 29.99, flagged: false },
    { id: 3, vendor: 'EduTech Pro', title: 'Data Science Video Series', type: 'Video', status: 'flagged', submittedDate: '2024-05-13', rating: 3.8, price: 149.99, flagged: true, reason: 'Inappropriate content detected' },
    { id: 4, vendor: 'SmartLearning Co', title: 'Machine Learning Toolkit', type: 'Software', status: 'pending', submittedDate: '2024-05-12', rating: 4.7, price: 199.99, flagged: false }
  ])

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
                    {userRole === 'admin' ? 'Admin Dashboard' : 'Admin Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    {userRole === 'admin' ? 'EduConnect System Administration' : 'EduConnect Learning Portal'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700">
                <Home size={16} />
                Back to Home
              </button>
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
        <div className="flex gap-8">
          <aside className={`${isSidebarOpen ? 'w-72' : 'w-16'} flex-shrink-0 transition-all duration-300 ease-in-out`}>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    {userRole === 'admin' ? <Shield className="w-5 h-5 text-white" /> : <GraduationCap className="w-5 h-5 text-white" />}
                  </div>
                  {isSidebarOpen && <h3 className="font-bold text-lg">{userRole === 'admin' ? 'Admin Tools' : 'Admin Tools'}</h3>}
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-2">
                  <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Home className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Overview</span>}
                  </button>
                  <button onClick={() => setActiveTab('userManagement')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'userManagement' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Users className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">User Management</span>}
                  </button>
                  <button onClick={() => setActiveTab('courseManagement')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'courseManagement' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <BookOpen className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Course Management</span>}
                  </button>
                  <button onClick={() => setActiveTab('institutionSettings')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'institutionSettings' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <Settings className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Institution Settings</span>}
                  </button>
                  <button onClick={() => setActiveTab('paymentsPanel')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'paymentsPanel' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <DollarSign className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Payments Panel</span>}
                  </button>
                  <button onClick={() => setActiveTab('marketplaceModeration')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'marketplaceModeration' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <ShieldCheck className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Marketplace Moderation</span>}
                  </button>
                  <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <BarChart3 className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm font-semibold">Analytics</span>}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Admin Overview Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-gradient-to-br from-blue-50 to-white">
                      <div className="flex items-center gap-3 text-blue-600 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center">
                          <Users size={24} />
                        </div>
                        <span className="text-sm font-semibold">Total Users</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{userStatistics.totalUsers.toLocaleString()}</div>
                      <p className="text-sm text-green-600 font-medium">+{userStatistics.userGrowthRate}% growth</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-gradient-to-br from-green-50 to-white">
                      <div className="flex items-center gap-3 text-green-600 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl flex items-center justify-center">
                          <DollarSign size={24} />
                        </div>
                        <span className="text-sm font-semibold">Monthly Revenue</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">${revenueAnalytics.monthlyRevenue.toLocaleString()}</div>
                      <p className="text-sm text-green-600 font-medium">+{revenueAnalytics.revenueGrowth}% growth</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-gradient-to-br from-purple-50 to-white">
                      <div className="flex items-center gap-3 text-purple-600 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl flex items-center justify-center">
                          <Brain size={24} />
                        </div>
                        <span className="text-sm font-semibold">At-Risk Students</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{aiRiskPredictions.filter(s => s.riskLevel === 'critical' || s.riskLevel === 'high').length}</div>
                      <p className="text-sm text-red-600 font-medium">Need attention</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl shadow-lg border border-gray-200/50 bg-gradient-to-br from-orange-50 to-white">
                      <div className="flex items-center gap-3 text-orange-600 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center">
                          <Bell size={24} />
                        </div>
                        <span className="text-sm font-semibold">System Alerts</span>
                      </div>
                      <div className="text-3xl font-bold text-[#011F5B] mb-2">{systemNotifications.filter(n => n.priority === 'high').length}</div>
                      <p className="text-sm text-red-600 font-medium">Critical</p>
                    </div>
                  </div>

                  {/* User Statistics Section */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">User Statistics</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                          <div className="text-3xl font-bold text-blue-600 mb-2">{userStatistics.userRoles.students.toLocaleString()}</div>
                          <p className="text-sm text-gray-600">Students</p>
                          <div className="mt-2 text-xs text-gray-500">{((userStatistics.userRoles.students / userStatistics.totalUsers) * 100).toFixed(1)}% of total</div>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                          <div className="text-3xl font-bold text-green-600 mb-2">{userStatistics.userRoles.instructors.toLocaleString()}</div>
                          <p className="text-sm text-gray-600">Instructors</p>
                          <div className="mt-2 text-xs text-gray-500">{((userStatistics.userRoles.instructors / userStatistics.totalUsers) * 100).toFixed(1)}% of total</div>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                          <div className="text-3xl font-bold text-purple-600 mb-2">{userStatistics.userRoles.admins}</div>
                          <p className="text-sm text-gray-600">Administrators</p>
                          <div className="mt-2 text-xs text-gray-500">{((userStatistics.userRoles.admins / userStatistics.totalUsers) * 100).toFixed(1)}% of total</div>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Daily Active</span>
                          <span className="font-medium text-[#011F5B]">{userStatistics.userActivity.dailyActive.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Weekly Active</span>
                          <span className="font-medium text-[#011F5B]">{userStatistics.userActivity.weeklyActive.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600">Monthly Active</span>
                          <span className="font-medium text-[#011F5B]">{userStatistics.userActivity.monthlyActive.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Analytics Section */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-green-500/10 to-green-600/5 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">Revenue Analytics</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Revenue by Source</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Course Fees</span>
                              <span className="font-medium text-[#011F5B]">${(revenueAnalytics.revenueBySource.courseFees / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{width: `${(revenueAnalytics.revenueBySource.courseFees / revenueAnalytics.totalRevenue) * 100}%`}}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Subscriptions</span>
                              <span className="font-medium text-[#011F5B]">${(revenueAnalytics.revenueBySource.subscriptions / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(revenueAnalytics.revenueBySource.subscriptions / revenueAnalytics.totalRevenue) * 100}%`}}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Certifications</span>
                              <span className="font-medium text-[#011F5B]">${(revenueAnalytics.revenueBySource.certifications / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{width: `${(revenueAnalytics.revenueBySource.certifications / revenueAnalytics.totalRevenue) * 100}%`}}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Top Performing Courses</h4>
                          <div className="space-y-3">
                            {revenueAnalytics.topPayingCourses.map((course, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-gray-900 text-sm">{course.name}</h5>
                                    <p className="text-xs text-gray-600">{course.students} students</p>
                                  </div>
                                  <span className="font-medium text-green-600">${(course.revenue / 1000).toFixed(0)}K</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Notifications Section */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">System-wide Notifications</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {systemNotifications.map((notification) => (
                          <div key={notification.id} className={`p-4 rounded-lg border ${
                            notification.type === 'critical' ? 'bg-red-50 border-red-200' :
                            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                            notification.type === 'success' ? 'bg-green-50 border-green-200' :
                            'bg-blue-50 border-blue-200'
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === 'critical' ? 'bg-red-600' :
                                notification.type === 'warning' ? 'bg-yellow-600' :
                                notification.type === 'success' ? 'bg-green-600' :
                                'bg-blue-600'
                              }`}></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                {notification.actionRequired && (
                                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700">
                                    Action Required
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Risk Predictions Section */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50">
                    <div className="p-6 bg-gradient-to-r from-purple-500/10 to-purple-600/5 border-b">
                      <h3 className="font-bold text-[#011F5B] text-lg">AI Risk Predictions - At-Risk Students</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {aiRiskPredictions.map((student) => (
                          <div key={student.id} className={`p-4 rounded-lg border ${
                            student.riskLevel === 'critical' ? 'bg-red-50 border-red-200' :
                            student.riskLevel === 'high' ? 'bg-orange-50 border-orange-200' :
                            student.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                            'bg-green-50 border-green-200'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-gray-900">{student.studentName}</h4>
                                <p className="text-sm text-gray-600">{student.email}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    student.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                                    student.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                                    student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {student.riskLevel.toUpperCase()}
                                  </span>
                                  <span className="text-sm font-bold text-gray-900">{student.riskScore}%</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">AI Confidence: {student.aiConfidence}%</div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-2"><strong>Risk Factors:</strong></p>
                              <div className="flex flex-wrap gap-2">
                                {student.factors.map((factor, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    {factor}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600"><strong>Recommendation:</strong> {student.recommendation}</p>
                              <p className="text-sm text-gray-600"><strong>Predicted Outcome:</strong> {student.predictedOutcome}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Last updated: {student.lastUpdated}</span>
                              <button className={`px-3 py-1 text-xs rounded-lg ${
                                student.riskLevel === 'critical' ? 'bg-red-600 text-white hover:bg-red-700' :
                                student.riskLevel === 'high' ? 'bg-orange-600 text-white hover:bg-orange-700' :
                                'bg-blue-600 text-white hover:bg-blue-700'
                              }`}>
                                Take Action
                              </button>
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

              {activeTab === 'userManagement' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#011F5B] text-lg">User Management</h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#011F5B] text-white rounded-lg flex items-center gap-2 hover:bg-[#00416A]">
                        <Plus size={16} />
                        Add User
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                        <Download size={16} />
                        Export
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <input type="text" placeholder="Search users..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                        </div>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Roles</option>
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Status</option>
                          <option value="active">Active</option>
                          <option value="suspended">Suspended</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">User</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Role</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Department</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Last Login</th>
                            <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {allUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-600">{user.email}</div>
                                  <div className="text-xs text-gray-500">Joined: {user.joinDate}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                  user.role === 'instructor' ? 'bg-blue-100 text-blue-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{user.department}</td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{user.lastLogin}</td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit size={14} />
                                  </button>
                                  <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                    {user.status === 'active' ? <UserX size={14} /> : <UserCheck size={14} />}
                                  </button>
                                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courseManagement' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#011F5B] text-lg">Course & Program Management</h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#011F5B] text-white rounded-lg flex items-center gap-2 hover:bg-[#00416A]">
                        <Plus size={16} />
                        Add Course
                      </button>
                    </div>
                  </div>

                  {/* Pending Lecturer Uploads */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Pending Lecturer Uploads</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {courseManagement.pendingUploads.map((upload) => (
                          <div key={upload.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Upload className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{upload.course}</h5>
                                <p className="text-sm text-gray-600">{upload.instructor} • {upload.uploadType}</p>
                                <p className="text-xs text-gray-500">{upload.uploadDate} • {upload.size}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-1">
                                <Check size={14} />
                                Approve
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center gap-1">
                                <X size={14} />
                                Reject
                              </button>
                              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-1">
                                <Eye size={14} />
                                Review
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Faculty Management */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Faculty Management</h4>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courseManagement.faculties.map((faculty) => (
                          <div key={faculty.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h5 className="font-semibold text-gray-900">{faculty.name}</h5>
                                <p className="text-sm text-gray-600">Dean: {faculty.dean}</p>
                              </div>
                              <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Instructors:</span>
                                <span className="font-medium">{faculty.instructors}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Students:</span>
                                <span className="font-medium">{faculty.students}</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs text-gray-600 mb-2">Programs:</p>
                              <div className="flex flex-wrap gap-1">
                                {faculty.programs.map((program, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                    {program}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button className="mt-3 w-full px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                              Assign Faculty
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Program Assignment */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Program Assignment</h4>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        {courseManagement.programs.map((program) => (
                          <div key={program.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">{program.name}</h5>
                                <p className="text-sm text-gray-600">{program.faculty} • {program.duration}</p>
                                <p className="text-xs text-gray-500">Coordinator: {program.coordinator} • {program.credits} credits • {program.students} students</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                                Edit
                              </button>
                              <button className="px-3 py-1 bg-[#011F5B] text-white text-sm rounded-lg hover:bg-[#00416A]">
                                Assign Instructors
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'institutionSettings' && (
                <div className="space-y-6">
                  <h3 className="font-bold text-[#011F5B] text-lg">Institution Settings</h3>

                  {/* Branding Settings */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-indigo-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Branding & Identity</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                            <input type="text" value={institutionSettings.branding.institutionName} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                            <input type="text" value={institutionSettings.branding.tagline} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                            <div className="flex gap-2">
                              <input type="color" value={institutionSettings.branding.primaryColor} className="w-12 h-10 border border-gray-300 rounded" />
                              <input type="text" value={institutionSettings.branding.primaryColor} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                            <div className="flex gap-2">
                              <input type="color" value={institutionSettings.branding.secondaryColor} className="w-12 h-10 border border-gray-300 rounded" />
                              <input type="text" value={institutionSettings.branding.secondaryColor} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                          <div className="flex items-center gap-4">
                            <img src={institutionSettings.branding.logo} alt="Logo" className="w-20 h-20 border border-gray-200 rounded-lg object-cover" />
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                              Upload New Logo
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Calendar */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Academic Calendar</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                            <input type="text" value={institutionSettings.calendar.academicYear} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Semester Start</label>
                            <input type="date" value={institutionSettings.calendar.semesterStart} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Semester End</label>
                            <input type="date" value={institutionSettings.calendar.semesterEnd} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="text-sm font-medium text-gray-700">Holidays & Breaks</label>
                            <button className="px-3 py-1 bg-[#011F5B] text-white text-sm rounded-lg hover:bg-[#00416A]">
                              Add Holiday
                            </button>
                          </div>
                          <div className="space-y-2">
                            {institutionSettings.calendar.holidays.map((holiday, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Calendar className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-medium">{holiday.name}</span>
                                  <span className="text-sm text-gray-600">{holiday.date}</span>
                                </div>
                                <button className="text-red-600 hover:text-red-700">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grading Scale */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Grading Scale</h4>
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        {institutionSettings.gradingScale.map((grade, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Award className="w-5 h-5 text-yellow-600" />
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900">Grade {grade.grade}</h5>
                                <p className="text-sm text-gray-600">{grade.range} • {grade.points} points • {grade.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <Edit size={14} />
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                          <Plus size={16} />
                          Add Grade Level
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'paymentsPanel' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#011F5B] text-lg">Payments Panel</h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                        <Download size={16} />
                        Export Excel
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                        <FileText size={16} />
                        Export PDF
                      </button>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3 text-blue-600 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm font-medium">Total Transactions</span>
                      </div>
                      <div className="text-2xl font-bold text-[#011F5B]">{paymentsData.summary.totalTransactions.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3 text-green-600 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Reconciled</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">${paymentsData.summary.reconciledAmount.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3 text-yellow-600 mb-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600">${paymentsData.summary.pendingAmount.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center gap-3 text-red-600 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="text-sm font-medium">Flagged</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600">${paymentsData.summary.flaggedAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Reconciliation Dashboard */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Reconciliation Dashboard</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-4 mb-4">
                        <input type="text" placeholder="Search transactions..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Status</option>
                          <option value="reconciled">Reconciled</option>
                          <option value="pending">Pending</option>
                          <option value="flagged">Flagged</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Types</option>
                          <option value="tuition">Tuition Fee</option>
                          <option value="material">Course Material</option>
                          <option value="certification">Certification Fee</option>
                        </select>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Date</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Transaction ID</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Student</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Type</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Amount</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Method</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Status</th>
                              <th className="text-left px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {paymentsData.reconciliation.map((payment) => (
                              <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{payment.date}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.transactionId}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{payment.student}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{payment.type}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{payment.method}</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    payment.status === 'reconciled' ? 'bg-green-100 text-green-700' :
                                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    {payment.status === 'pending' && (
                                      <button className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
                                        Reconcile
                                      </button>
                                    )}
                                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                      <Eye size={14} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'marketplaceModeration' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#011F5B] text-lg">Marketplace Moderation</h3>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#011F5B] text-white rounded-lg flex items-center gap-2 hover:bg-[#00416A]">
                        <ShieldCheck size={16} />
                        Review All
                      </button>
                    </div>
                  </div>

                  {/* Content Moderation */}
                  <div className="bg-white rounded-xl border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/5 border-b">
                      <h4 className="font-semibold text-[#011F5B]">Content Review Queue</h4>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-4 mb-4">
                        <input type="text" placeholder="Search content..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]" />
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="flagged">Flagged</option>
                        </select>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]">
                          <option value="">All Types</option>
                          <option value="course">Course</option>
                          <option value="ebook">E-book</option>
                          <option value="video">Video</option>
                          <option value="software">Software</option>
                        </select>
                      </div>
                      <div className="space-y-4">
                        {marketplaceContent.map((content) => (
                          <div key={content.id} className={`border rounded-lg p-4 ${
                            content.flagged ? 'border-red-200 bg-red-50' : 'border-gray-200'
                          }`}>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                  content.type === 'course' ? 'bg-blue-100' :
                                  content.type === 'ebook' ? 'bg-green-100' :
                                  content.type === 'video' ? 'bg-purple-100' :
                                  'bg-orange-100'
                                }`}>
                                  {content.type === 'course' ? <BookOpen className="w-6 h-6 text-blue-600" /> :
                                   content.type === 'ebook' ? <FileText className="w-6 h-6 text-green-600" /> :
                                   content.type === 'video' ? <Monitor className="w-6 h-6 text-purple-600" /> :
                                   <Tag className="w-6 h-6 text-orange-600" />}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900">{content.title}</h5>
                                  <p className="text-sm text-gray-600">{content.vendor} • {content.type}</p>
                                  <div className="flex items-center gap-4 mt-1">
                                    <span className="text-sm text-gray-500">Submitted: {content.submittedDate}</span>
                                    <span className="text-sm font-medium text-gray-900">${content.price}</span>
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-yellow-500" />
                                      <span className="text-sm text-gray-600">{content.rating}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  content.status === 'approved' ? 'bg-green-100 text-green-700' :
                                  content.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {content.status}
                                </span>
                                {content.flagged && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full flex items-center gap-1">
                                    <AlertTriangle size={12} />
                                    Flagged
                                  </span>
                                )}
                              </div>
                            </div>
                            {content.flagged && (
                              <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-800"><strong>Reason:</strong> {content.reason}</p>
                              </div>
                            )}
                            <div className="flex gap-2">
                              {content.status === 'pending' && (
                                <>
                                  <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-1">
                                    <Check size={14} />
                                    Approve
                                  </button>
                                  <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center gap-1">
                                    <X size={14} />
                                    Reject
                                  </button>
                                </>
                              )}
                              <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center gap-1">
                                <Eye size={14} />
                                Review
                              </button>
                              {content.flagged && (
                                <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 flex items-center gap-1">
                                  <AlertTriangle size={14} />
                                  Unflag
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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