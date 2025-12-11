import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  TrendingUp
} from 'lucide-react'

function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploading(true)
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 200)
    }
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#011F5B]">Assignments & Submissions</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors">
                <Plus size={20} />
                <span>New Assignment</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-custom py-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
              />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
            >
              {courses.map(course => (
                <option key={course} value={course}>
                  {course === 'all' ? 'All Courses' : course}
                </option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg mb-6">
          {['pending', 'submitted', 'graded', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white text-[#011F5B] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
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
            <div key={assignment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Assignment Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#011F5B]">{assignment.title}</h3>
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
                    <p className="text-gray-700 mb-4">{assignment.description}</p>
                    
                    {/* Attachments */}
                    <div className="mb-4">
                      <h4 className="font-medium text-[#011F5B] mb-2">Attachments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Download size={14} />
                            <span>{attachment.name}</span>
                            <span className="text-gray-500">({attachment.size})</span>
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
              <div className="p-6 bg-gray-50">
                <h4 className="font-semibold text-[#011F5B] mb-4">Submission Details</h4>
                
                {!assignment.submitted ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                      <h4 className="text-lg font-medium text-gray-700 mb-2">Submit Your Work</h4>
                      <p className="text-gray-500 mb-4">
                        Upload your assignment file. Supported formats: PDF, DOC, DOCX, ZIP, RAR
                      </p>
                      <input
                        type="file"
                        id={`file-upload-${assignment.id}`}
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.zip,.rar"
                      />
                      <label
                        htmlFor={`file-upload-${assignment.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors cursor-pointer"
                      >
                        <Upload size={20} />
                        <span>Choose File</span>
                      </label>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Uploading...</span>
                          <span className="text-gray-600">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] h-2 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Submitted File Info */}
                    <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-[#011F5B]" size={20} />
                        <div>
                          <p className="font-medium">Assignment Submitted</p>
                          <p className="text-sm text-gray-600">
                            Submitted on {assignment.submittedAt || '2024-01-16 10:30 AM'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-[#011F5B] hover:bg-[#011F5B]/10 rounded-lg transition-colors">
                          <Eye size={20} />
                        </button>
                        <button className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Plagiarism Check */}
                    <div className="p-4 bg-white border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Shield className="text-[#011F5B]" size={20} />
                          <h5 className="font-medium">Plagiarism Check</h5>
                        </div>
                        {assignment.plagiarismChecked && (
                          <span className={`font-medium ${getPlagiarismColor(assignment.plagiarismScore)}`}>
                            {assignment.plagiarismScore}% similarity
                          </span>
                        )}
                      </div>
                      {assignment.plagiarismChecked ? (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                assignment.plagiarismScore < 15 ? 'bg-green-500' :
                                assignment.plagiarismScore < 30 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${assignment.plagiarismScore}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {assignment.plagiarismScore < 15 ? 'Original work detected' :
                             assignment.plagiarismScore < 30 ? 'Some similarities found' :
                             'High similarity detected - review required'}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertCircle size={16} />
                          <span className="text-sm">Plagiarism check in progress...</span>
                        </div>
                      )}
                    </div>

                    {/* Grade and Feedback */}
                    {assignment.grade && (
                      <div className="p-4 bg-white border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Award className="text-[#011F5B]" size={20} />
                            <h5 className="font-medium">Grade & Feedback</h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold ${getGradeColor(assignment.grade, assignment.maxMarks)}`}>
                              {assignment.grade}/{assignment.maxMarks}
                            </span>
                            <div className="flex items-center gap-1">
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
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-gray-700">{assignment.feedback}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      {!assignment.grade && (
                        <button className="flex-1 py-2 px-4 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] transition-colors">
                          Resubmit
                        </button>
                      )}
                      <button className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-xl font-bold text-[#011F5B]">{assignments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{assignments.filter(a => a.grade).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{assignments.filter(a => !a.submitted).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Grade</p>
                <p className="text-xl font-bold text-purple-600">
                  {assignments.filter(a => a.grade).length > 0 
                    ? Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade / a.maxMarks * 100), 0) / assignments.filter(a => a.grade).length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentsPage
