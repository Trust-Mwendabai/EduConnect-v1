import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  User,
  Award,
  Target,
  Brain,
  FileText,
  BarChart3,
  Shield,
  Database,
  Info,
  AlertTriangle,
  X,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Mail,
  Phone,
  Clock,
  GraduationCap,
  Eye,
  Download,
  Upload,
  MessageSquare,
  Lock,
  Unlock,
  RefreshCw,
  MoreVertical,
  Activity,
  Bot,
  Accessibility,
  Sparkles,
  Timer,
  Home,
  PieChart,
  Globe,
  MapPin,
  Building,
  CreditCard,
  ShoppingCart,
  Package,
  Archive,
  Star,
  Flag,
  Bookmark,
  Hash,
  AtSign,
  Zap,
  Monitor,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Cloud,
  ShieldCheck,
  Key,
  UserCheck,
  UserX,
  UsersRound,
  UserPlus,
  UserMinus,
  Briefcase,
  School,
  Library,
  Wrench,
  Settings2
} from 'lucide-react'
import AICompanion from '../components/ai/AICompanion'
import AccessibilityPanel from '../components/accessibility/AccessibilityPanel'
import AnalyticsDashboard from '../components/analytics/AnalyticsDashboard'
import DocumentGenerator from '../components/documents/DocumentGenerator'
import { NotificationProvider, useNotifications } from '../components/notifications/NotificationSystem'

function AdminDashboard() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAICompanion, setShowAICompanion] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // Admin-specific data
  const [systemStats] = useState({
    totalUsers: 2456,
    activeStudents: 1834,
    totalCourses: 48,
    totalInstructors: 67,
    systemUptime: '99.8%',
    storageUsed: '67%',
    pendingApprovals: 12,
    systemHealth: 'Excellent'
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
    },
    { 
      id: 3, 
      studentName: 'Mike Johnson', 
      riskLevel: 'low', 
      riskScore: 25,
      factors: ['Consistent performance', 'Good engagement'],
      recommendation: 'Monitor progress'
    }
  ])

  const [recentActivity] = useState([
    { id: 1, type: 'user', message: 'New student registration: John Doe', time: '2 mins ago', severity: 'info' },
    { id: 2, type: 'system', message: 'System backup completed successfully', time: '15 mins ago', severity: 'success' },
    { id: 3, type: 'security', message: 'Failed login attempt detected', time: '1 hour ago', severity: 'warning' },
    { id: 4, type: 'course', message: 'New course submitted for approval', time: '2 hours ago', severity: 'info' }
  ])

  const [userManagement] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor', status: 'active', lastLogin: '1 day ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'student', status: 'suspended', lastLogin: '3 days ago' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', status: 'active', lastLogin: '30 mins ago' }
  ])

  const [systemAlerts] = useState([
    { id: 1, type: 'critical', title: 'High Server Load', message: 'CPU usage at 85%', time: '5 mins ago' },
    { id: 2, type: 'warning', title: 'Storage Warning', message: 'Disk space at 80% capacity', time: '1 hour ago' },
    { id: 3, type: 'info', title: 'Update Available', message: 'System update v2.1.0 ready', time: '3 hours ago' }
  ])

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'success': return 'text-green-600 bg-green-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#011F5B]">Admin Dashboard</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>System Administrator</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAICompanion(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="AI Assistant"
              >
                <Bot size={20} />
              </button>
              <button 
                onClick={() => setShowAccessibility(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="Accessibility"
              >
                <Accessibility size={20} />
              </button>
              <button 
                onClick={() => setShowDocumentGenerator(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="Document Generator"
              >
                <FileText size={20} />
              </button>
              <button 
                onClick={() => setShowAnalytics(true)}
                className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                title="Analytics Dashboard"
              >
                <BarChart3 size={20} />
              </button>
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors">
                  <Bell size={20} />
                </button>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Admin Tools</h3>
            
            {/* System Management Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">System Management</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">User Management</span>
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">Analytics</span>
                </button>
                <button 
                  onClick={() => setActiveTab('financial')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'financial' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Financial</span>
                </button>
              </div>
            </div>

            {/* Academic Management Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Academic Management</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Courses</span>
                </button>
                <button 
                  onClick={() => setActiveTab('instructors')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'instructors' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">Instructors</span>
                </button>
                <button 
                  onClick={() => setActiveTab('exams')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'exams' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Exams</span>
                </button>
                <button 
                  onClick={() => setActiveTab('grades')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'grades' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Grades</span>
                </button>
              </div>
            </div>

            {/* System Administration Section */}
            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">System Administration</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm">Security</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings2 className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
                <button 
                  onClick={() => setActiveTab('logs')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'logs' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">System Logs</span>
                </button>
                <button 
                  onClick={() => setActiveTab('backups')}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    activeTab === 'backups' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  <span className="text-sm">Backups</span>
                </button>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm">Add User</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm">System Refresh</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Export Data</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Statistics */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <Users size={20} />
                  <span className="text-sm font-medium">Total Users</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">{systemStats.totalUsers}</div>
                <p className="text-xs text-gray-500 mt-1">+12% this month</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <BookOpen size={20} />
                  <span className="text-sm font-medium">Active Students</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">{systemStats.activeStudents}</div>
                <p className="text-xs text-gray-500 mt-1">85% retention</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <DollarSign size={20} />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">${revenueData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1">{revenueData.growthRate}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-[#FF6B35] mb-2">
                  <Activity size={20} />
                  <span className="text-sm font-medium">Uptime</span>
                </div>
                <div className="text-2xl font-bold text-[#011F5B]">{systemStats.systemUptime}</div>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
            </div>

            {/* Revenue Analytics */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <DollarSign size={18} />
                  Revenue Analytics
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Revenue</span>
                    <span className="font-semibold">${revenueData.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pending Payments</span>
                    <span className="font-semibold text-yellow-600">${revenueData.pendingPayments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Transaction</span>
                    <span className="font-semibold">${revenueData.avgTransactionValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-green-600">{revenueData.growthRate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Risk Predictions */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Brain size={18} />
                  AI Risk Predictions
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {aiPredictions.map((prediction) => (
                  <div key={prediction.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-[#011F5B]">{prediction.studentName}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            prediction.riskLevel === 'high' ? 'bg-red-100 text-red-600' :
                            prediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {prediction.riskLevel} Risk ({prediction.riskScore}%)
                          </span>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 mb-1">Risk Factors:</p>
                          <ul className="text-xs text-gray-500 list-disc list-inside">
                            {prediction.factors.map((factor, idx) => (
                              <li key={idx}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">{prediction.recommendation}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                          View Profile
                        </button>
                        <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Notifications */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                  <Bell size={18} />
                  System Notifications
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={16} className="text-red-600" />
                    <span className="font-medium text-red-800">Critical</span>
                  </div>
                  <p className="text-sm text-red-700">5 high-risk students require immediate attention</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={16} className="text-yellow-600" />
                    <span className="font-medium text-yellow-800">Warning</span>
                  </div>
                  <p className="text-sm text-yellow-700">12 course approvals pending</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Info size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-800">Info</span>
                  </div>
                  <p className="text-sm text-blue-700">Monthly report ready for review</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                <Users size={18} />
                User Management
              </h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last Login</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userManagement.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{user.name}</td>
                        <td className="py-3 px-4 text-sm">{user.email}</td>
                        <td className="py-3 px-4 text-sm capitalize">{user.role}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                            <button className="text-red-600 hover:text-red-800 text-sm">Suspend</button>
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

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-[#011F5B] mb-4">Course Management</h3>
            <p className="text-gray-600 mb-4">Manage courses, instructors, and curriculum.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Total Courses</h4>
                <p className="text-2xl font-bold text-[#011F5B]">{systemStats.totalCourses}</p>
                <p className="text-sm text-gray-600">Active courses in system</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Pending Approval</h4>
                <p className="text-2xl font-bold text-[#FF6B35]">{systemStats.pendingApprovals}</p>
                <p className="text-sm text-gray-600">Courses awaiting review</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Total Instructors</h4>
                <p className="text-2xl font-bold text-[#011F5B]">{systemStats.totalInstructors}</p>
                <p className="text-sm text-gray-600">Active instructors</p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">System Analytics</h2>
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
            <AnalyticsDashboard userRole="admin" />
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">System Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version</span>
                  <span className="font-medium">EduConnect v2.0.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Environment</span>
                  <span className="font-medium">Production</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Backup</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Database Size</span>
                  <span className="font-medium">2.4 GB</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-green-600">120ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate</span>
                  <span className="font-medium text-green-600">0.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Connections</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cache Hit Rate</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#011F5B]">Document Management</h2>
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
              <DocumentGenerator documentType="report" />
              <DocumentGenerator documentType="certificate" />
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#011F5B] flex items-center gap-2">
                <AlertCircle size={18} />
                System Alerts
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-[#011F5B]">{alert.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.type)}`}>
                          {alert.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        View Details
                      </button>
                      <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
        userRole="admin"
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
const AdminDashboardWrapper = () => (
  <NotificationProvider>
    <AdminDashboard />
  </NotificationProvider>
)

export default AdminDashboardWrapper
