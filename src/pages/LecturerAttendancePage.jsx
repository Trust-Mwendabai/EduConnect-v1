import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Calendar, Clock, CheckCircle, X, Download, Search, Filter, Plus, Edit, Trash2, Save, RefreshCw, AlertCircle, TrendingUp, ArrowLeft, ChevronDown, ChevronUp, Printer, Mail, Phone, MapPin, BookOpen, User, Check, XCircle, AlertTriangle } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'

function LecturerAttendancePage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [bulkAction, setBulkAction] = useState('')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showNotes, setShowNotes] = useState({})
  const [notes, setNotes] = useState({})
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')

  // Mock course data
  const courses = [
    { id: 1, title: 'Advanced React Development', code: 'CS401', students: 45, schedule: 'Mon, Wed, Fri 2:00 PM' },
    { id: 2, title: 'Data Science Fundamentals', code: 'DS201', students: 38, schedule: 'Tue, Thu 10:00 AM' },
    { id: 3, title: 'UI/UX Design Principles', code: 'DES301', students: 32, schedule: 'Wed, Fri 3:00 PM' }
  ]

  // Mock student data
  const studentsData = [
    { id: 1, name: 'Alice Johnson', studentId: 'STU001', email: 'alice.j@edu.com', phone: '+1234567890', totalClasses: 24, attendedClasses: 22, attendanceRate: 92 },
    { id: 2, name: 'Bob Smith', studentId: 'STU002', email: 'bob.s@edu.com', phone: '+1234567891', totalClasses: 24, attendedClasses: 20, attendanceRate: 83 },
    { id: 3, name: 'Carol Williams', studentId: 'STU003', email: 'carol.w@edu.com', phone: '+1234567892', totalClasses: 24, attendedClasses: 24, attendanceRate: 100 },
    { id: 4, name: 'David Brown', studentId: 'STU004', email: 'david.b@edu.com', phone: '+1234567893', totalClasses: 24, attendedClasses: 18, attendanceRate: 75 },
    { id: 5, name: 'Emma Davis', studentId: 'STU005', email: 'emma.d@edu.com', phone: '+1234567894', totalClasses: 24, attendedClasses: 21, attendanceRate: 88 }
  ]

  // Mock attendance records
  const attendanceRecords = [
    { date: '2024-05-20', courseId: 1, present: [1, 3, 5], absent: [2, 4], late: [], notes: { '2': 'Sick leave', '4': 'Family emergency' } },
    { date: '2024-05-18', courseId: 1, present: [1, 2, 3, 4, 5], absent: [], late: [2], notes: { '2': 'Traffic delay' } },
    { date: '2024-05-15', courseId: 1, present: [1, 3, 4, 5], absent: [2], late: [], notes: {} }
  ]

  // Initialize attendance data when course and date are selected
  useEffect(() => {
    if (selectedCourse) {
      const todayAttendance = attendanceRecords.find(
        record => record.date === selectedDate && record.courseId === selectedCourse.id
      )
      
      if (todayAttendance) {
        const data = studentsData.map(student => ({
          ...student,
          status: todayAttendance.present.includes(student.id) ? 'present' : 
                 todayAttendance.absent.includes(student.id) ? 'absent' : 
                 todayAttendance.late.includes(student.id) ? 'late' : 'not_marked',
          note: todayAttendance.notes[student.id] || ''
        }))
        setAttendanceData(data)
      } else {
        const data = studentsData.map(student => ({
          ...student,
          status: 'not_marked',
          note: ''
        }))
        setAttendanceData(data)
      }
    }
  }, [selectedCourse, selectedDate])

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (attendanceData.some(student => student.status !== 'not_marked')) {
        setAutoSaveStatus('saving')
        setTimeout(() => setAutoSaveStatus('saved'), 1000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [attendanceData])

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    )
    setAutoSaveStatus('unsaved')
  }

  const handleNoteChange = (studentId, note) => {
    setNotes(prev => ({ ...prev, [studentId]: note }))
    setAutoSaveStatus('unsaved')
  }

  const saveNotes = () => {
    setAttendanceData(prev =>
      prev.map(student => ({
        ...student,
        note: notes[student.id] || student.note
      }))
    )
    setAutoSaveStatus('saving')
    setTimeout(() => setAutoSaveStatus('saved'), 1000)
  }

  const handleBulkAction = (action) => {
    const selectedIds = selectedStudents.map(student => student.id)
    setAttendanceData(prev =>
      prev.map(student =>
        selectedIds.includes(student.id) ? { ...student, status: action } : student
      )
    )
    setSelectedStudents([])
    setBulkAction('')
    setAutoSaveStatus('unsaved')
  }

  const handleStudentSelect = (student) => {
    setSelectedStudents(prev =>
      prev.find(s => s.id === student.id)
        ? prev.filter(s => s.id !== student.id)
        : [...prev, student]
    )
  }

  const selectAllStudents = () => {
    if (selectedStudents.length === attendanceData.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(attendanceData)
    }
  }

  const exportAttendance = (format) => {
    // Mock export functionality
    console.log(`Exporting attendance as ${format}`)
    alert(`Attendance data exported as ${format.toUpperCase()}`)
  }

  const getAttendanceStats = () => {
    const total = attendanceData.length
    const present = attendanceData.filter(s => s.status === 'present').length
    const absent = attendanceData.filter(s => s.status === 'absent').length
    const late = attendanceData.filter(s => s.status === 'late').length
    const notMarked = attendanceData.filter(s => s.status === 'not_marked').length

    return { total, present, absent, late, notMarked }
  }

  const CourseSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Attendance Management</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#011F5B]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#011F5B]" />
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Active</span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.code}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Students</span>
                  <span className="font-semibold text-gray-800">{course.students}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Schedule</span>
                  <span className="font-semibold text-gray-800">{course.schedule}</span>
                </div>
              </div>

              <GradientButton 
                gradient={gradients.primary}
                className="w-full"
                onClick={() => setSelectedCourse(course)}
              >
                Take Attendance
              </GradientButton>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attendance Summary */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance Summary</h3>
        <div className="space-y-4">
          {attendanceRecords.slice(0, 3).map((record, index) => {
            const course = courses.find(c => c.id === record.courseId)
            const attendanceRate = Math.round((record.present.length / studentsData.length) * 100)
            
            return (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#011F5B]/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#011F5B]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{course?.title}</h4>
                    <p className="text-sm text-gray-600">{record.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{record.present.length}</div>
                    <div className="text-xs text-gray-600">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">{record.absent.length}</div>
                    <div className="text-xs text-gray-600">Absent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-orange-600">{record.late.length}</div>
                    <div className="text-xs text-gray-600">Late</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-800">{attendanceRate}%</div>
                    <div className="text-xs text-gray-600">Rate</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const AttendanceInterface = () => {
    const stats = getAttendanceStats()

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
                <p className="text-gray-600">{selectedCourse.code} • {selectedCourse.schedule}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {autoSaveStatus === 'saved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {autoSaveStatus === 'saving' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                {autoSaveStatus === 'unsaved' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                <span>{autoSaveStatus === 'saved' ? 'All changes saved' : autoSaveStatus === 'saving' ? 'Saving...' : 'Unsaved changes'}</span>
              </div>
              
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
              />
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <GradientCard gradient={gradients.success}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.present}</div>
                <div className="text-white/80 text-sm">Present</div>
              </div>
            </GradientCard>
            
            <GradientCard gradient={gradients.error}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.absent}</div>
                <div className="text-white/80 text-sm">Absent</div>
              </div>
            </GradientCard>
            
            <GradientCard gradient={gradients.warning}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.late}</div>
                <div className="text-white/80 text-sm">Late</div>
              </div>
            </GradientCard>
            
            <GradientCard gradient={gradients.info}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.notMarked}</div>
                <div className="text-white/80 text-sm">Not Marked</div>
              </div>
            </GradientCard>
            
            <GradientCard gradient={gradients.primary}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-white/80 text-sm">Total</div>
              </div>
            </GradientCard>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue-800">
                  {selectedStudents.length} students selected
                </span>
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="px-3 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose action...</option>
                  <option value="present">Mark Present</option>
                  <option value="absent">Mark Absent</option>
                  <option value="late">Mark Late</option>
                </select>
                <GradientButton
                  gradient={gradients.primary}
                  size="sm"
                  onClick={() => handleBulkAction(bulkAction)}
                  disabled={!bulkAction}
                >
                  Apply
                </GradientButton>
              </div>
              <button
                onClick={() => setSelectedStudents([])}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Student List</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] text-sm"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="not_marked">Not Marked</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === attendanceData.length}
                      onChange={selectAllStudents}
                      className="w-4 h-4 text-[#011F5B] rounded focus:ring-[#011F5B]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData
                  .filter(student => {
                    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                       student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
                    const matchesFilter = filterStatus === 'all' || student.status === filterStatus
                    return matchesSearch && matchesFilter
                  })
                  .map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedStudents.find(s => s.id === student.id)}
                          onChange={() => handleStudentSelect(student)}
                          className="w-4 h-4 text-[#011F5B] rounded focus:ring-[#011F5B]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-[#011F5B]/10 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-[#011F5B]" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.studentId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{student.attendanceRate}%</div>
                          <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full"
                              style={{ width: `${student.attendanceRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            student.status === 'present' ? 'bg-green-100 text-green-800 focus:ring-green-500' :
                            student.status === 'absent' ? 'bg-red-100 text-red-800 focus:ring-red-500' :
                            student.status === 'late' ? 'bg-yellow-100 text-yellow-800 focus:ring-yellow-500' :
                            'bg-gray-100 text-gray-800 focus:ring-gray-500'
                          }`}
                        >
                          <option value="not_marked">Not Marked</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowNotes(prev => ({ ...prev, [student.id]: !prev[student.id] }))}
                            className="p-1 text-gray-600 hover:text-[#011F5B] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {student.status === 'absent' && (
                            <button className="p-1 text-gray-600 hover:text-blue-600 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Notes Section */}
          {Object.values(showNotes).some(show => show) && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <h4 className="font-semibold text-gray-800 mb-4">Attendance Notes</h4>
              <div className="space-y-3">
                {attendanceData
                  .filter(student => showNotes[student.id])
                  .map(student => (
                    <div key={student.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#011F5B]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[#011F5B]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 text-sm">{student.name}</div>
                        <textarea
                          value={notes[student.id] || student.note}
                          onChange={(e) => handleNoteChange(student.id, e.target.value)}
                          placeholder="Add attendance notes..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] h-20 text-sm resize-none mt-1"
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 flex justify-end">
                <GradientButton gradient={gradients.primary} onClick={saveNotes}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Notes
                </GradientButton>
              </div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Attendance</h3>
          <div className="flex items-center gap-4">
            <GradientButton gradient={gradients.primary} onClick={() => exportAttendance('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export as CSV
            </GradientButton>
            <GradientButton gradient={gradients.secondary} onClick={() => exportAttendance('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </GradientButton>
            <GradientButton gradient={gradients.info} onClick={() => exportAttendance('excel')}>
              <Download className="w-4 h-4 mr-2" />
              Export as Excel
            </GradientButton>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Printer className="w-4 h-4 mr-2" />
              Print Report
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/lecturer/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Attendance Manager</h1>
                <p className="text-sm text-gray-600">Track and manage student attendance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">91.7% Avg Rate</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {selectedCourse ? <AttendanceInterface /> : <CourseSelection />}
      </main>
    </div>
  )
}

export default LecturerAttendancePage
