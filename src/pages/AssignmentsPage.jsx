import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Download, 
  Upload, 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Star,
  BarChart3,
  Shield,
  Award,
  TrendingUp,
  X,
  Paperclip,
  Send,
  MessageSquare,
  RefreshCw,
  CheckCheck
} from 'lucide-react'

function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [submissionNotes, setSubmissionNotes] = useState('')

  const [assignments] = useState([
    {
      id: 1,
      title: 'React Project - E-commerce Platform',
      course: 'Web Development Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      description: 'Build a fully functional e-commerce platform using React, Redux, and Firebase. Include user authentication, product catalog, shopping cart, and payment integration.',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      maxMarks: 100,
      attachments: [
        { name: 'Requirements.pdf', size: '2.3 MB' },
        { name: 'Rubric.xlsx', size: '156 KB' },
        { name: 'Sample_Code.zip', size: '1.2 MB' }
      ],
      status: 'pending',
      submitted: false,
      plagiarismChecked: false,
      grade: null,
      feedback: null,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Algorithm Analysis Paper',
      course: 'Data Structures & Algorithms',
      instructor: 'Prof. Michael Chen',
      description: 'Write a comprehensive paper analyzing the time and space complexity of sorting algorithms. Include empirical measurements and theoretical analysis.',
      dueDate: '2024-01-18',
      dueTime: '5:00 PM',
      maxMarks: 50,
      attachments: [
        { name: 'Assignment_Guidelines.pdf', size: '890 KB' },
        { name: 'Citation_Guide.docx', size: '234 KB' }
      ],
      status: 'pending',
      submitted: true,
      submittedAt: '2024-01-16 10:30 AM',
      plagiarismChecked: true,
      plagiarismScore: 12,
      grade: 42,
      feedback: 'Excellent analysis! Your empirical measurements were thorough and well-documented. Consider adding more visualizations next time.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Database Schema Design',
      course: 'Database Management',
      instructor: 'Dr. Emily Rodriguez',
      description: 'Design and implement a comprehensive database schema for a university management system. Include ER diagrams, normalization, and SQL queries.',
      dueDate: '2024-01-20',
      dueTime: '2:00 PM',
      maxMarks: 75,
      attachments: [
        { name: 'ERD_Requirements.pdf', size: '1.1 MB' },
        { name: 'SQL_Examples.sql', size: '45 KB' }
      ],
      status: 'completed',
      submitted: true,
      submittedAt: '2024-01-19 3:45 PM',
      plagiarismChecked: true,
      plagiarismScore: 8,
      grade: 68,
      feedback: 'Good schema design! Your normalization was correct. Some queries could be optimized for better performance.',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Machine Learning Model Implementation',
      course: 'Artificial Intelligence',
      instructor: 'Dr. James Wilson',
      description: 'Implement and train a neural network for image classification. Include data preprocessing, model architecture, and performance evaluation.',
      dueDate: '2024-01-25',
      dueTime: '4:00 PM',
      maxMarks: 100,
      attachments: [
        { name: 'Dataset.zip', size: '45.6 MB' },
        { name: 'Model_Requirements.pdf', size: '3.2 MB' }
      ],
      status: 'pending',
      submitted: false,
      plagiarismChecked: false,
      grade: null,
      feedback: null,
      priority: 'high'
    }
  ])

  const [submissions] = useState([
    {
      id: 1,
      assignmentId: 1,
      fileName: 'Ecommerce_React_Project.zip',
      fileSize: '12.3 MB',
      uploadedAt: '2024-01-14 8:30 PM',
      status: 'processing',
      plagiarismStatus: 'pending',
      plagiarismScore: null,
      grade: null,
      feedback: null
    },
    {
      id: 2,
      assignmentId: 2,
      fileName: 'Algorithm_Analysis_Paper.pdf',
      fileSize: '2.1 MB',
      uploadedAt: '2024-01-16 10:30 AM',
      status: 'graded',
      plagiarismStatus: 'completed',
      plagiarismScore: 12,
      grade: 42,
      feedback: 'Excellent analysis! Your empirical measurements were thorough and well-documented.'
    }
  ])

  const courses = ['all', 'Web Development Fundamentals', 'Data Structures & Algorithms', 'Database Management', 'Artificial Intelligence']

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse
    
    return matchesSearch && matchesCourse
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'submitted': return 'text-blue-600 bg-blue-100'
      case 'grading': return 'text-purple-600 bg-purple-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlagiarismColor = (score) => {
    if (score === null) return 'text-gray-500'
    if (score < 15) return 'text-green-600'
    if (score < 30) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGradeColor = (grade, maxMarks) => {
    const percentage = (grade / maxMarks) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    if (percentage >= 60) return 'text-purple-600'
    return 'text-red-600'
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmitAssignment = () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setShowSubmissionModal(false)
          setSelectedFile(null)
          setSubmissionNotes('')
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-12">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Assignments & Submissions
              </h1>
              <p className="text-lg text-white/90" style={{ fontFamily: 'var(--font-body)' }}>
                Track your assignments, submit work, and view grades
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 -mt-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent bg-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {courses.map(course => (
                <option key={course} value={course}>
                  {course === 'all' ? 'All Courses' : course}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md mb-8">
          {['pending', 'submitted', 'graded', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'pending' && ` (${assignments.filter(a => !a.submitted).length})`}
              {tab === 'submitted' && ` (${assignments.filter(a => a.submitted && !a.grade).length})`}
              {tab === 'graded' && ` (${assignments.filter(a => a.grade).length})`}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        <div className="space-y-6">
          {filteredAssignments
            .filter(assignment => {
              if (activeTab === 'all') return true
              if (activeTab === 'pending') return !assignment.submitted
              if (activeTab === 'submitted') return assignment.submitted && !assignment.grade
              if (activeTab === 'graded') return assignment.grade
              return true
            })
            .map(assignment => (
            <div key={assignment.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Assignment Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>{assignment.title}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        assignment.priority === 'high' ? 'bg-red-100 text-red-600' :
                        assignment.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {assignment.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <FileText size={14} />
                        <span>{assignment.course}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Due: {assignment.dueDate} at {assignment.dueTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award size={14} />
                        <span>{assignment.maxMarks} marks</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4" style={{ fontFamily: 'var(--font-body)' }}>{assignment.description}</p>
                    
                    {/* Attachments */}
                    <div className="mb-4">
                      <h4 className="font-medium text-[#011F5B] mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        <Paperclip size={16} />
                        Assignment Materials:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {assignment.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all text-sm group"
                          >
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-[#FF6B35] transition-colors">
                              <Download size={16} className="text-blue-600 group-hover:text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-gray-900">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors">
                      <Edit size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submission Section */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <h4 className="font-semibold text-[#011F5B] mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  <FileText size={20} />
                  Submission Status
                </h4>
                
                {!assignment.submitted ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-[#FF6B35]/30 rounded-xl p-8 text-center bg-white hover:border-[#FF6B35] transition-colors">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="text-white" size={32} />
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Ready to Submit?
                      </h4>
                      <p className="text-gray-600 mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                        Upload your completed assignment. Supported formats: PDF, DOC, DOCX, ZIP, RAR (Max 50MB)
                      </p>
                      <button
                        onClick={() => {
                          setSelectedAssignment(assignment)
                          setShowSubmissionModal(true)
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <Upload size={20} />
                        <span>Submit Assignment</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Submitted File Info */}
                    <div className="bg-white border-2 border-green-200 rounded-xl p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle className="text-green-600" size={24} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                              Assignment Submitted Successfully
                            </p>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                              Submitted on {assignment.submittedAt || '2024-01-16 10:30 AM'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors" title="View Submission">
                            <Eye size={20} />
                          </button>
                          <button className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors" title="Download">
                            <Download size={20} />
                          </button>
                        </div>
                      </div>

                      {/* Submission Timeline */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <Clock size={16} />
                        <span>Processing time: 2-3 business days for grading</span>
                      </div>
                    </div>

                    {/* Plagiarism Check */}
                    <div className="bg-white border-2 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Shield className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                              Plagiarism Analysis
                            </h5>
                            <p className="text-sm text-gray-600">AI-powered originality check</p>
                          </div>
                        </div>
                        {assignment.plagiarismChecked && (
                          <div className="text-right">
                            <span className={`text-2xl font-bold ${getPlagiarismColor(assignment.plagiarismScore)}`}>
                              {assignment.plagiarismScore}%
                            </span>
                            <p className="text-xs text-gray-500">Similarity</p>
                          </div>
                        )}
                      </div>
                      {assignment.plagiarismChecked ? (
                        <div className="space-y-3">
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${
                                assignment.plagiarismScore < 15 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                assignment.plagiarismScore < 30 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                'bg-gradient-to-r from-red-500 to-red-600'
                              }`}
                              style={{ width: `${assignment.plagiarismScore}%` }}
                            ></div>
                          </div>
                          <div className={`p-3 rounded-lg ${
                            assignment.plagiarismScore < 15 ? 'bg-green-50 border border-green-200' :
                            assignment.plagiarismScore < 30 ? 'bg-yellow-50 border border-yellow-200' :
                            'bg-red-50 border border-red-200'
                          }`}>
                            <div className="flex items-start gap-2">
                              {assignment.plagiarismScore < 15 ? (
                                <CheckCheck className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                              ) : (
                                <AlertCircle className={`flex-shrink-0 mt-0.5 ${
                                  assignment.plagiarismScore < 30 ? 'text-yellow-600' : 'text-red-600'
                                }`} size={18} />
                              )}
                              <p className={`text-sm font-medium ${
                                assignment.plagiarismScore < 15 ? 'text-green-700' :
                                assignment.plagiarismScore < 30 ? 'text-yellow-700' :
                                'text-red-700'
                              }`} style={{ fontFamily: 'var(--font-body)' }}>
                                {assignment.plagiarismScore < 15 ? '✓ Excellent! Original work detected with minimal similarities' :
                                 assignment.plagiarismScore < 30 ? '⚠ Some similarities found - please review highlighted sections' :
                                 '⚠ High similarity detected - instructor review required'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <RefreshCw className="text-blue-600 animate-spin" size={20} />
                          <div>
                            <p className="font-medium text-blue-900">Analysis in Progress</p>
                            <p className="text-sm text-blue-700">This usually takes 5-10 minutes</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Marking Status */}
                    <div className="bg-white border-2 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="text-purple-600" size={20} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-heading)' }}>
                            Grading Status
                          </h5>
                          <p className="text-sm text-gray-600">Track your assignment evaluation</p>
                        </div>
                      </div>

                      {assignment.grade ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
                            <div className="flex items-center gap-3">
                              <Award className="text-green-600" size={24} />
                              <div>
                                <p className="font-semibold text-gray-900">Grade Received</p>
                                <p className="text-sm text-gray-600">Graded by {assignment.instructor}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-3xl font-bold ${getGradeColor(assignment.grade, assignment.maxMarks)}`}>
                                {assignment.grade}/{assignment.maxMarks}
                              </span>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < Math.floor((assignment.grade / assignment.maxMarks) * 5) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {assignment.feedback && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                              <div className="flex items-start gap-3">
                                <MessageSquare className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                                <div>
                                  <p className="font-semibold text-blue-900 mb-2">Instructor Feedback</p>
                                  <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                                    {assignment.feedback}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Clock className="text-yellow-600" size={20} />
                            <div>
                              <p className="font-medium text-yellow-900">Awaiting Grading</p>
                              <p className="text-sm text-yellow-700">Your instructor will review and grade your submission soon</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {!assignment.grade && (
                        <button 
                          onClick={() => {
                            setSelectedAssignment(assignment)
                            setShowSubmissionModal(true)
                          }}
                          className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Resubmit Assignment
                        </button>
                      )}
                      <button className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                        View Full Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Total Assignments</p>
                <p className="text-2xl font-bold text-[#011F5B]" style={{ fontFamily: 'var(--font-heading)' }}>{assignments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Completed</p>
                <p className="text-2xl font-bold text-green-600" style={{ fontFamily: 'var(--font-heading)' }}>{assignments.filter(a => a.grade).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Pending</p>
                <p className="text-2xl font-bold text-yellow-600" style={{ fontFamily: 'var(--font-heading)' }}>{assignments.filter(a => !a.submitted).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Avg Grade</p>
                <p className="text-2xl font-bold text-purple-600" style={{ fontFamily: 'var(--font-heading)' }}>
                  {assignments.filter(a => a.grade).length > 0 
                    ? Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade / a.maxMarks * 100), 0) / assignments.filter(a => a.grade).length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-[#011F5B] to-[#00416A]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    Submit Assignment
                  </h3>
                  <p className="text-white/80" style={{ fontFamily: 'var(--font-body)' }}>
                    {selectedAssignment.title}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSubmissionModal(false)
                    setSelectedFile(null)
                    setSubmissionNotes('')
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="text-white" size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Upload Your Work
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  selectedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-[#FF6B35] bg-gray-50'
                }`}>
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="text-green-600" size={32} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{selectedFile.name}</p>
                        <p className="text-sm text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                      <h4 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        Choose a file to upload
                      </h4>
                      <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                        PDF, DOC, DOCX, ZIP, RAR (Max 50MB)
                      </p>
                      <input
                        type="file"
                        id="submission-file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.zip,.rar"
                      />
                      <label
                        htmlFor="submission-file"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        <Paperclip size={20} />
                        <span>Browse Files</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Submission Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Add any comments or notes for your instructor..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent resize-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 font-medium">Uploading your submission...</span>
                    <span className="text-[#FF6B35] font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">Please don't close this window</p>
                </div>
              )}

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Before you submit:</p>
                    <ul className="space-y-1 list-disc list-inside text-blue-800">
                      <li>Ensure your file is properly named and formatted</li>
                      <li>Check that all required sections are complete</li>
                      <li>Your submission will be checked for plagiarism</li>
                      <li>You can resubmit before the deadline if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setShowSubmissionModal(false)
                  setSelectedFile(null)
                  setSubmissionNotes('')
                }}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAssignment}
                disabled={!selectedFile || isUploading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="animate-spin" size={20} />
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={20} />
                    Submit Assignment
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default AssignmentsPage
