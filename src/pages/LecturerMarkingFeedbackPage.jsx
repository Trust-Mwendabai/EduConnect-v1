import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, Save, X, Download, Eye, Search, Filter, CheckCircle, AlertCircle, Clock, Users, Award, Target, BookOpen, MessageSquare, Star, TrendingUp, ArrowLeft, ChevronRight, ChevronLeft, Edit, Trash2, Plus, Paperclip, Send, RefreshCw, BarChart3 } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'

function LecturerMarkingFeedbackPage() {
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [feedback, setFeedback] = useState({})
  const [grades, setGrades] = useState({})
  const [attachments, setAttachments] = useState([])
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showRubric, setShowRubric] = useState(false)
  const [bulkMode, setBulkMode] = useState(false)

  // Mock assignment data
  const assignments = [
    {
      id: 1,
      title: 'React Project Submission',
      course: 'Advanced React Development',
      courseCode: 'CS401',
      totalSubmissions: 45,
      gradedSubmissions: 15,
      pendingSubmissions: 30,
      dueDate: '2024-05-20',
      maxMarks: 100,
      status: 'active'
    },
    {
      id: 2,
      title: 'Data Analysis Quiz',
      course: 'Data Science Fundamentals',
      courseCode: 'DS201',
      totalSubmissions: 38,
      gradedSubmissions: 28,
      pendingSubmissions: 10,
      dueDate: '2024-05-18',
      maxMarks: 50,
      status: 'active'
    },
    {
      id: 3,
      title: 'Design Portfolio Update',
      course: 'UI/UX Design Principles',
      courseCode: 'DES301',
      totalSubmissions: 32,
      gradedSubmissions: 20,
      pendingSubmissions: 12,
      dueDate: '2024-05-22',
      maxMarks: 75,
      status: 'active'
    }
  ]

  // Mock student submissions data
  const studentSubmissions = [
    {
      id: 1,
      name: 'Alice Johnson',
      studentId: 'STU001',
      email: 'alice.j@edu.com',
      submissionDate: '2024-05-19 14:30',
      status: 'graded',
      grade: 85,
      feedback: 'Excellent work on the React components. Great attention to detail.',
      files: [
        { name: 'react-project.zip', size: '2.4 MB', type: 'zip' },
        { name: 'documentation.pdf', size: '1.2 MB', type: 'pdf' }
      ],
      rubricScores: {
        'Content Quality': 22,
        'Structure': 18,
        'Research': 21,
        'Presentation': 24
      },
      lateSubmission: false,
      plagiarismScore: 5
    },
    {
      id: 2,
      name: 'Bob Smith',
      studentId: 'STU002',
      email: 'bob.s@edu.com',
      submissionDate: '2024-05-19 23:45',
      status: 'pending',
      grade: null,
      feedback: '',
      files: [
        { name: 'assignment.zip', size: '3.1 MB', type: 'zip' }
      ],
      rubricScores: {},
      lateSubmission: false,
      plagiarismScore: 8
    },
    {
      id: 3,
      name: 'Carol Williams',
      studentId: 'STU003',
      email: 'carol.w@edu.com',
      submissionDate: '2024-05-20 01:15',
      status: 'pending',
      grade: null,
      feedback: '',
      files: [
        { name: 'final-project.zip', size: '4.2 MB', type: 'zip' },
        { name: 'readme.md', size: '12 KB', type: 'text' }
      ],
      rubricScores: {},
      lateSubmission: true,
      plagiarismScore: 3
    }
  ]

  const rubricCriteria = [
    { name: 'Content Quality', weight: 30, maxScore: 30 },
    { name: 'Structure', weight: 20, maxScore: 20 },
    { name: 'Research', weight: 25, maxScore: 25 },
    { name: 'Presentation', weight: 25, maxScore: 25 }
  ]

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (feedback[selectedStudent?.id] || grades[selectedStudent?.id]) {
        setAutoSaveStatus('saving')
        setTimeout(() => setAutoSaveStatus('saved'), 1000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [feedback, grades, selectedStudent])

  const handleFeedbackChange = (studentId, value) => {
    setFeedback(prev => ({ ...prev, [studentId]: value }))
    setAutoSaveStatus('unsaved')
  }

  const handleGradeChange = (studentId, criteria, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [criteria]: value
      }
    }))
    setAutoSaveStatus('unsaved')
  }

  const calculateTotalGrade = (studentId) => {
    const studentGrades = grades[studentId] || {}
    const total = Object.values(studentGrades).reduce((sum, score) => sum + parseInt(score || 0), 0)
    return total
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.split('/')[1] || 'unknown'
    }))
    setAttachments(prev => [...prev, ...newAttachments])
  }

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id))
  }

  const navigateStudent = (direction) => {
    if (direction === 'next' && currentStudentIndex < studentSubmissions.length - 1) {
      setCurrentStudentIndex(prev => prev + 1)
      setSelectedStudent(studentSubmissions[currentStudentIndex + 1])
    } else if (direction === 'prev' && currentStudentIndex > 0) {
      setCurrentStudentIndex(prev => prev - 1)
      setSelectedStudent(studentSubmissions[currentStudentIndex - 1])
    }
  }

  const AssignmentList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Assignments to Grade</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
          >
            <option value="all">All Assignments</option>
            <option value="pending">Pending Grading</option>
            <option value="graded">Graded</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map(assignment => (
          <div key={assignment.id} className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#011F5B]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#011F5B]" />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  assignment.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {assignment.status}
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{assignment.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{assignment.course}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Submissions</span>
                  <span className="font-semibold text-gray-800">{assignment.totalSubmissions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Graded</span>
                  <span className="font-semibold text-green-600">{assignment.gradedSubmissions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-orange-600">{assignment.pendingSubmissions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Marks</span>
                  <span className="font-semibold text-gray-800">{assignment.maxMarks}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full"
                  style={{ width: `${(assignment.gradedSubmissions / assignment.totalSubmissions) * 100}%` }}
                ></div>
              </div>

              <GradientButton 
                gradient={gradients.primary}
                className="w-full"
                onClick={() => setSelectedAssignment(assignment)}
              >
                Start Grading
              </GradientButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const GradingInterface = () => {
    if (!selectedAssignment || !selectedStudent) return null

    const currentGrade = calculateTotalGrade(selectedStudent.id)
    const studentGrades = grades[selectedStudent.id] || {}

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedAssignment.title}</h2>
                <p className="text-gray-600">{selectedAssignment.course}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {autoSaveStatus === 'saved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {autoSaveStatus === 'saving' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                {autoSaveStatus === 'unsaved' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                <span>{autoSaveStatus === 'saved' ? 'All changes saved' : autoSaveStatus === 'saving' ? 'Saving...' : 'Unsaved changes'}</span>
              </div>
              
              <button
                onClick={() => setBulkMode(!bulkMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  bulkMode
                    ? 'bg-[#011F5B] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {bulkMode ? 'Single Mode' : 'Bulk Mode'}
              </button>
            </div>
          </div>

          {/* Student Navigation */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <button
              onClick={() => navigateStudent('prev')}
              disabled={currentStudentIndex === 0}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <h3 className="font-semibold text-gray-800">{selectedStudent.name}</h3>
              <p className="text-sm text-gray-600">{selectedStudent.studentId} • {selectedStudent.email}</p>
              <div className="flex items-center justify-center gap-4 mt-2 text-sm">
                <span className={`px-2 py-1 rounded ${
                  selectedStudent.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {selectedStudent.status}
                </span>
                {selectedStudent.lateSubmission && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Late</span>
                )}
                <span className="text-gray-600">Submitted: {selectedStudent.submissionDate}</span>
              </div>
            </div>

            <button
              onClick={() => navigateStudent('next')}
              disabled={currentStudentIndex === studentSubmissions.length - 1}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Files */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Submission Files</h3>
              
              <div className="space-y-3">
                {selectedStudent.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{file.name}</div>
                        <div className="text-xs text-gray-500">{file.size}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Plagiarism Score: {selectedStudent.plagiarismScore}%</span>
                </div>
              </div>
            </div>

            {/* Grade Summary */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Summary</h3>
              
              <div className="space-y-3">
                {rubricCriteria.map(criteria => (
                  <div key={criteria.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{criteria.name}</div>
                      <div className="text-xs text-gray-500">Max: {criteria.maxScore}</div>
                    </div>
                    <input
                      type="number"
                      value={studentGrades[criteria.name] || ''}
                      onChange={(e) => handleGradeChange(selectedStudent.id, criteria.name, e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:border-[#011F5B]"
                      min="0"
                      max={criteria.maxScore}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">Total Grade</span>
                  <span className="text-xl font-bold text-[#011F5B]">{currentGrade}/{selectedAssignment.maxMarks}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full"
                      style={{ width: `${(currentGrade / selectedAssignment.maxMarks) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
                <button
                  onClick={() => setShowRubric(!showRubric)}
                  className="text-sm text-[#011F5B] hover:text-[#00416A]"
                >
                  {showRubric ? 'Hide' : 'Show'} Rubric
                </button>
              </div>

              {showRubric && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Evaluation Rubric</h4>
                  <div className="space-y-2 text-sm">
                    {rubricCriteria.map(criteria => (
                      <div key={criteria.name} className="flex justify-between">
                        <span className="text-gray-600">{criteria.name}</span>
                        <span className="font-medium text-gray-800">{criteria.weight}% ({criteria.maxScore} points)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Comments</label>
                <textarea
                  value={feedback[selectedStudent.id] || ''}
                  onChange={(e) => handleFeedbackChange(selectedStudent.id, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] h-48 resize-none"
                  placeholder="Provide detailed feedback for the student..."
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Attachments</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#011F5B] transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload feedback documents</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="feedback-upload"
                  />
                  <label
                    htmlFor="feedback-upload"
                    className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-[#011F5B] text-white rounded hover:bg-[#00416A] transition-colors cursor-pointer"
                  >
                    <Paperclip className="w-3 h-3" />
                    Choose Files
                  </label>
                </div>

                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2 text-sm">
                          <Paperclip className="w-3 h-3 text-gray-600" />
                          <span className="text-gray-700">{file.name}</span>
                          <span className="text-gray-500">({file.size})</span>
                        </div>
                        <button
                          onClick={() => removeAttachment(file.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Feedback Templates */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-3">Quick Feedback Templates</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Excellent work!',
                    'Good effort, but needs improvement.',
                    'Please review the requirements.',
                    'Great creativity shown.',
                    'Needs more detail.'
                  ].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => handleFeedbackChange(selectedStudent.id, (feedback[selectedStudent.id] || '') + ' ' + template)}
                      className="p-2 text-sm border border-gray-200 rounded hover:bg-gray-50 text-left"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <GradientButton gradient={gradients.success}>
                <Send className="w-4 h-4 mr-2" />
                Submit Grade & Feedback
              </GradientButton>
            </div>
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
                <h1 className="text-2xl font-bold text-gray-800">Marking & Feedback</h1>
                <p className="text-sm text-gray-600">Grade assignments and provide student feedback</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">15 Pending</span>
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
        {selectedAssignment ? <GradingInterface /> : <AssignmentList />}
      </main>
    </div>
  )
}

export default LecturerMarkingFeedbackPage
