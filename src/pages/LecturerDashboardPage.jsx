import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Clock, Users, FileText, Upload, Award, TrendingUp, AlertCircle, CheckCircle, PlayCircle, Target, Brain, Lightbulb, BarChart3, Video, Download, Star, ChevronRight, X, Info, User, Home, Settings, LogOut, Menu, ChevronLeft, Search, Bell, MessageSquare, Edit, Trash2, Plus, FolderOpen, File, Save, Eye, Printer, Mail, Phone, MapPin, GraduationCap, Briefcase, Activity } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'
import AccessibilityPanel from '../components/accessibility/AccessibilityPanel'

function LecturerDashboardPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Mock data for lecturer's courses
  const lecturerCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      code: 'CS401',
      students: 45,
      progress: 75,
      nextClass: 'Today, 2:00 PM',
      averageGrade: 85,
      attendanceRate: 92,
      pendingAssignments: 3,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      code: 'DS201',
      students: 38,
      progress: 60,
      nextClass: 'Tomorrow, 10:00 AM',
      averageGrade: 78,
      attendanceRate: 88,
      pendingAssignments: 2,
      color: 'green'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      code: 'DES301',
      students: 32,
      progress: 85,
      nextClass: 'Friday, 3:00 PM',
      averageGrade: 90,
      attendanceRate: 95,
      pendingAssignments: 1,
      color: 'purple'
    }
  ]

  // Mock data for student performance
  const performanceHighlights = [
    {
      id: 1,
      student: 'Alice Johnson',
      course: 'Advanced React Development',
      achievement: 'Top performer in recent assignment',
      grade: 'A+',
      trend: 'up'
    },
    {
      id: 2,
      student: 'Bob Smith',
      course: 'Data Science Fundamentals',
      achievement: 'Most improved student',
      grade: 'B+',
      trend: 'up'
    },
    {
      id: 3,
      student: 'Carol Williams',
      course: 'UI/UX Design Principles',
      achievement: 'Perfect attendance',
      grade: 'A',
      trend: 'stable'
    }
  ]

  // Mock data for pending tasks
  const pendingTasks = [
    {
      id: 1,
      title: 'Grade React Projects',
      course: 'Advanced React Development',
      priority: 'high',
      dueDate: 'Today',
      submissionsCount: 15
    },
    {
      id: 2,
      title: 'Upload Lecture Materials',
      course: 'Data Science Fundamentals',
      priority: 'medium',
      dueDate: 'Tomorrow',
      type: 'upload'
    },
    {
      id: 3,
      title: 'Schedule Office Hours',
      course: 'UI/UX Design Principles',
      priority: 'low',
      dueDate: 'This week',
      type: 'schedule'
    }
  ]

  // Quick actions data
  const quickActions = [
    {
      id: 1,
      title: 'Upload Materials',
      icon: Upload,
      description: 'Add new learning resources',
      color: gradients.primary
    },
    {
      id: 2,
      title: 'Schedule Class',
      icon: Calendar,
      description: 'Set up new session',
      color: gradients.secondary
    },
    {
      id: 3,
      title: 'Create Assignment',
      icon: FileText,
      description: 'Design new assessment',
      color: gradients.info
    },
    {
      id: 4,
      title: 'Take Attendance',
      icon: Users,
      description: 'Mark student presence',
      color: gradients.success
    }
  ]

  const sidebarItems = [
    { id: 'overview', name: 'Dashboard', icon: Home },
    { id: 'courses', name: 'Course Management', icon: BookOpen, path: '/lecturer/courses' },
    { id: 'assignments', name: 'Assignments', icon: FileText, path: '/lecturer/assignments' },
    { id: 'grading', name: 'Marking & Feedback', icon: Award, path: '/lecturer/grading' },
    { id: 'attendance', name: 'Attendance', icon: Users, path: '/lecturer/attendance' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const OverviewSection = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GradientCard gradient={gradients.primary}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Total Students</p>
              <p className="text-white text-2xl font-bold">115</p>
              <p className="text-white/70 text-xs mt-1">Across 3 courses</p>
            </div>
            <Users className="w-8 h-8 text-white/50" />
          </div>
        </GradientCard>

        <GradientCard gradient={gradients.success}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Avg. Grade</p>
              <p className="text-white text-2xl font-bold">84.3%</p>
              <p className="text-white/70 text-xs mt-1">↑ 2.1% from last month</p>
            </div>
            <TrendingUp className="w-8 h-8 text-white/50" />
          </div>
        </GradientCard>

        <GradientCard gradient={gradients.info}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Attendance Rate</p>
              <p className="text-white text-2xl font-bold">91.7%</p>
              <p className="text-white/70 text-xs mt-1">↑ 3.2% improvement</p>
            </div>
            <Activity className="w-8 h-8 text-white/50" />
          </div>
        </GradientCard>

        <GradientCard gradient={gradients.warning}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Pending Tasks</p>
              <p className="text-white text-2xl font-bold">8</p>
              <p className="text-white/70 text-xs mt-1">3 high priority</p>
            </div>
            <AlertCircle className="w-8 h-8 text-white/50" />
          </div>
        </GradientCard>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-[#011F5B] hover:bg-[#011F5B]/5 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm">{action.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Course Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">My Courses</h3>
          <Link to="/lecturer/courses" className="text-[#011F5B] hover:text-[#00416A] text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {lecturerCourses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#011F5B]/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-800">{course.title}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{course.code}</span>
                  </div>
                  <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.nextClass}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {course.averageGrade}% avg grade
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Attendance</div>
                  <div className="text-lg font-semibold text-gray-800">{course.attendanceRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Performance Highlights */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Performance Highlights</h3>
        <div className="space-y-3">
          {performanceHighlights.map(student => (
            <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#011F5B]/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#011F5B]" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{student.student}</h4>
                  <p className="text-sm text-gray-600">{student.course}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-800">{student.grade}</span>
                  {student.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                </div>
                <p className="text-xs text-gray-600">{student.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Pending Tasks</h3>
          <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
            {pendingTasks.length} tasks
          </span>
        </div>
        <div className="space-y-3">
          {pendingTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#011F5B]/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' : 
                  task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div>
                  <h4 className="font-semibold text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.course}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{task.dueDate}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'courses':
        return <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Management</h3>
          <p className="text-gray-600">Course management interface will be implemented here.</p>
        </div>
      case 'assignments':
        return <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assignments</h3>
          <p className="text-gray-600">Assignment creation and management interface will be implemented here.</p>
        </div>
      case 'grading':
        return <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Marking & Feedback</h3>
          <p className="text-gray-600">Grading and feedback interface will be implemented here.</p>
        </div>
      case 'attendance':
        return <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Management</h3>
          <p className="text-gray-600">Attendance tracking interface will be implemented here.</p>
        </div>
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Lecturer Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your courses and students</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowAccessibility(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Accessibility Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#011F5B]/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#011F5B]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-600">Lecturer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-16'} flex-shrink-0 transition-all duration-300 ease-in-out`}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden m-4">
            <div className="p-6 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                {isSidebarOpen && <h3 className="font-bold text-lg">Lecturer Portal</h3>}
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-2">
                {sidebarItems.map(item => (
                  item.path ? (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {isSidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
                    </Link>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        activeSection === item.id 
                          ? 'bg-gradient-to-r from-[#011F5B]/10 to-[#00416A]/10 text-[#011F5B]' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {isSidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Accessibility Panel */}
      <AccessibilityPanel
        isOpen={showAccessibility}
        onClose={() => setShowAccessibility(false)}
      />
    </div>
  )
}

export default LecturerDashboardPage
