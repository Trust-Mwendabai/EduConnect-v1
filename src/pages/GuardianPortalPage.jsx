import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, TrendingUp, Calendar, DollarSign, Bell, Award, AlertCircle, CheckCircle, MessageSquare, FileText, Target, Brain, BarChart3, Clock, Star, ChevronRight, X, Info, CreditCard, Check, User, Home, GraduationCap, Settings, LogOut, Menu, ChevronLeft, Search, BookOpen, Video, Mail, Phone, MapPin, Download, Eye, Send } from 'lucide-react'

export default function GuardianPortalPage() {
  const [selectedStudent, setSelectedStudent] = useState('john')
  const [activeTab, setActiveTab] = useState('overview')
  const [messageText, setMessageText] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const students = [
    { id: '1', name: 'Emma Johnson', grade: '10th Grade', class: 'A', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100' },
    { id: '2', name: 'Michael Johnson', grade: '7th Grade', class: 'B', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' }
  ]

  const academicPerformance = [
    { subject: 'Mathematics', grade: 'A', score: 92, trend: 'up', change: '+5%' },
    { subject: 'Science', grade: 'B+', score: 87, trend: 'up', change: '+3%' },
    { subject: 'English', grade: 'A-', score: 90, trend: 'stable', change: '0%' },
    { subject: 'History', grade: 'B', score: 82, trend: 'down', change: '-2%' },
    { subject: 'Art', grade: 'A', score: 95, trend: 'up', change: '+8%' }
  ]

  const attendanceData = [
    { month: 'Jan', present: 18, absent: 2, late: 1 },
    { month: 'Feb', present: 20, absent: 0, late: 0 },
    { month: 'Mar', present: 19, absent: 1, late: 1 },
    { month: 'Apr', present: 22, absent: 0, late: 0 },
    { month: 'May', present: 21, absent: 1, late: 0 }
  ]

  const behaviourLogs = [
    { date: '2024-05-15', type: 'positive', description: 'Excellent participation in class discussion', teacher: 'Ms. Smith' },
    { date: '2024-05-14', type: 'positive', description: 'Helped classmate with assignment', teacher: 'Mr. Davis' },
    { date: '2024-05-10', type: 'concern', description: 'Late submission of homework', teacher: 'Ms. Wilson' },
    { date: '2024-05-08', type: 'positive', description: 'Outstanding presentation skills', teacher: 'Dr. Brown' },
    { date: '2024-05-05', type: 'neutral', description: 'Standard classroom behavior', teacher: 'Ms. Garcia' }
  ]

  const paymentHistory = [
    { date: '2024-05-01', description: 'Tuition Fee - May 2024', amount: 850.00, status: 'paid', method: 'Credit Card' },
    { date: '2024-04-01', description: 'Tuition Fee - April 2024', amount: 850.00, status: 'paid', method: 'Bank Transfer' },
    { date: '2024-03-15', description: 'Field Trip - Science Museum', amount: 45.00, status: 'paid', method: 'Credit Card' },
    { date: '2024-03-01', description: 'Tuition Fee - March 2024', amount: 850.00, status: 'paid', method: 'Bank Transfer' },
    { date: '2024-02-01', description: 'Tuition Fee - February 2024', amount: 850.00, status: 'paid', method: 'Credit Card' }
  ]

  const outstandingBalances = [
    { item: 'Tuition Fee - June 2024', amount: 850.00, dueDate: '2024-06-01' },
    { item: 'Summer Camp Fee', amount: 200.00, dueDate: '2024-06-15' },
    { item: 'Textbook Rental', amount: 75.00, dueDate: '2024-05-30' }
  ]

  const teachers = [
    { id: '1', name: 'Ms. Sarah Smith', subject: 'Mathematics', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100', status: 'online' },
    { id: '2', name: 'Mr. John Davis', subject: 'Science', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', status: 'offline' },
    { id: '3', name: 'Dr. Emily Wilson', subject: 'English', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', status: 'online' }
  ]

  const messages = [
    { id: '1', teacher: 'Ms. Sarah Smith', subject: 'Mathematics', message: 'Emma is doing excellent in algebra. Keep up the great work!', date: '2024-05-15', time: '2:30 PM', unread: true },
    { id: '2', teacher: 'Mr. John Davis', subject: 'Science', message: 'Please ensure Emma completes her science project by Friday.', date: '2024-05-14', time: '10:15 AM', unread: false },
    { id: '3', teacher: 'Dr. Emily Wilson', subject: 'English', message: 'Emma\'s essay writing has improved significantly this term.', date: '2024-05-13', time: '3:45 PM', unread: false }
  ]

  const sendMessage = () => {
    if (messageText.trim() && selectedTeacher) {
      setMessageText('')
      setSelectedTeacher('')
    }
  }

  const getAttendancePercentage = (month) => {
    const data = attendanceData.find(d => d.month === month)
    return data ? ((data.present / (data.present + data.absent + data.late)) * 100).toFixed(1) : 0
  }

  const getOverallAttendance = () => {
    const totalPresent = attendanceData.reduce((sum, d) => sum + d.present, 0)
    const totalDays = attendanceData.reduce((sum, d) => sum + d.present + d.absent + d.late, 0)
    return ((totalPresent / totalDays) * 100).toFixed(1)
  }

  const getAverageGrade = () => {
    const totalScore = academicPerformance.reduce((sum, subject) => sum + subject.score, 0)
    return (totalScore / academicPerformance.length).toFixed(1)
  }

  const sidebarItems = [
    { id: 'home', label: 'Back to Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'behaviour', label: 'Behaviour', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
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
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">EduConnect</h2>
                  <p className="text-xs text-blue-200">Guardian Portal</p>
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
                <p className="font-medium">Parent User</p>
                <p className="text-xs text-blue-200">Guardian ID: GRD001</p>
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
                   activeTab === 'academics' ? 'Academic Performance' :
                   activeTab === 'attendance' ? 'Attendance Records' :
                   activeTab === 'behaviour' ? 'Behaviour Reports' :
                   activeTab === 'payments' ? 'Payment Management' :
                   activeTab === 'messages' ? 'Messages' : 'Settings'}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Parent Dashboard</span>
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

        {/* Student Selection */}
        <div className="p-6 bg-white border-b">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Student</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map(student => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-colors ${
                  selectedStudent === student.id 
                    ? 'border-[#FF6B35] bg-orange-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.grade} - Class {student.class}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+5%</span>
              </div>
              <h3 className="text-2xl font-bold text-[#011F5B]">{getAverageGrade()}%</h3>
              <p className="text-gray-600 text-sm">Average Grade</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">Excellent</span>
              </div>
              <h3 className="text-2xl font-bold text-[#011F5B]">{getOverallAttendance()}%</h3>
              <p className="text-gray-600 text-sm">Attendance Rate</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-sm text-red-600 font-medium">3 Due</span>
              </div>
              <h3 className="text-2xl font-bold text-[#011F5B]">$1,125</h3>
              <p className="text-gray-600 text-sm">Outstanding Balance</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-purple-600 font-medium">1 New</span>
              </div>
              <h3 className="text-2xl font-bold text-[#011F5B]">{messages.filter(m => m.unread).length}</h3>
              <p className="text-gray-600 text-sm">Unread Messages</p>
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Academic Performance</h2>
              <div className="space-y-4">
                {academicPerformance.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#011F5B]">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">Grade: {subject.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#011F5B]">{subject.score}%</p>
                        <p className={`text-sm font-medium flex items-center gap-1 ${
                          subject.trend === 'up' ? 'text-green-600' : 
                          subject.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {subject.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                          {subject.trend === 'down' && <TrendingUp className="w-4 h-4 rotate-180" />}
                          {subject.change}
                        </p>
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full" 
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {attendanceData.map((month, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{month.month}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Present: {month.present}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-600">Absent: {month.absent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-yellow-600">Late: {month.late}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${getAttendancePercentage(month.month)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{getAttendancePercentage(month.month)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'behaviour' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Behaviour Logs</h2>
              <div className="space-y-4">
                {behaviourLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${
                      log.type === 'positive' ? 'bg-green-100' : 
                      log.type === 'concern' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {log.type === 'positive' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {log.type === 'concern' && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {log.type === 'neutral' && <Clock className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900">{log.description}</h3>
                        <span className="text-sm text-gray-500">{log.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">Reported by {log.teacher}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Outstanding Balances</h2>
              <div className="space-y-4">
                {outstandingBalances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{balance.item}</h3>
                      <p className="text-sm text-gray-600">Due: {balance.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-600">${balance.amount.toFixed(2)}</p>
                      <button className="mt-1 px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                        Pay Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h2>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{payment.description}</h3>
                      <p className="text-sm text-gray-600">{payment.method} • {payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                        payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        <CheckCircle className="w-3 h-3" />
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img src={teachers.find(t => t.name === message.teacher)?.avatar} alt={message.teacher} className="w-10 h-10 rounded-full" />
                          <div>
                            <h3 className="font-medium text-gray-900">{message.teacher}</h3>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{message.date}</p>
                          <p className="text-xs text-gray-400">{message.time}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                      {message.unread && (
                        <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700">
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Send Message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher</label>
                    <select 
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a teacher...</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message here..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button 
                    onClick={sendMessage}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Teacher Availability</h3>
                  <div className="space-y-3">
                    {teachers.map(teacher => (
                      <div key={teacher.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            teacher.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                            <p className="text-xs text-gray-600">{teacher.subject}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          teacher.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {teacher.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
