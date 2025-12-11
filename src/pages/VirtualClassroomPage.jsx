import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Hand, 
  MessageSquare, 
  Users, 
  Settings, 
  Send, 
  Monitor,
  ScreenShare,
  FileText,
  Download,
  Upload,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Phone,
  PhoneOff,
  UserPlus,
  Copy,
  Share2,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Award,
  Target,
  BarChart3,
  Paperclip,
  Eye,
  Lock,
  Check,
  XCircle,
  TrendingUp
} from 'lucide-react'

function VirtualClassroomPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [activeTab, setActiveTab] = useState('chat')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isDragOver, setIsDragOver] = useState(false)

  const [classInfo] = useState({
    title: 'Web Development Fundamentals - Lecture 12',
    instructor: 'Dr. Sarah Johnson',
    course: 'CS 301',
    startTime: '2:00 PM',
    duration: '90 minutes',
    date: 'January 15, 2024',
    meetingId: 'EDU-2024-001',
    attendees: 24
  })

  const [participants] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', role: 'instructor', isPresenting: false, isMuted: false, isVideoOn: true, handRaised: false },
    { id: 2, name: 'John Doe', role: 'student', isPresenting: false, isMuted: false, isVideoOn: true, handRaised: false },
    { id: 3, name: 'Jane Smith', role: 'student', isPresenting: false, isMuted: true, isVideoOn: true, handRaised: true },
    { id: 4, name: 'Mike Johnson', role: 'student', isPresenting: false, isMuted: false, isVideoOn: false, handRaised: false },
    { id: 5, name: 'Emily Davis', role: 'student', isPresenting: false, isMuted: true, isVideoOn: true, handRaised: false },
    { id: 6, name: 'Alex Wilson', role: 'student', isPresenting: false, isMuted: false, isVideoOn: true, handRaised: true },
    { id: 7, name: 'Sarah Brown', role: 'student', isPresenting: false, isMuted: true, isVideoOn: true, handRaised: false },
    { id: 8, name: 'Tom Anderson', role: 'student', isPresenting: false, isMuted: false, isVideoOn: false, handRaised: false }
  ])

  const [chatMessages] = useState([
    { id: 1, sender: 'Dr. Sarah Johnson', message: 'Welcome everyone! Today we will cover React Hooks in detail.', time: '2:01 PM', role: 'instructor' },
    { id: 2, sender: 'John Doe', message: 'Good afternoon, Professor!', time: '2:02 PM', role: 'student' },
    { id: 3, sender: 'Jane Smith', message: 'Looking forward to this lecture!', time: '2:02 PM', role: 'student' },
    { id: 4, sender: 'Dr. Sarah Johnson', message: 'Please make sure you have the code examples open from the resources section.', time: '2:03 PM', role: 'instructor' },
    { id: 5, sender: 'Mike Johnson', message: 'Can we review useEffect again?', time: '2:05 PM', role: 'student' },
    { id: 6, sender: 'Dr. Sarah Johnson', message: 'Yes, we will cover useEffect in detail today.', time: '2:06 PM', role: 'instructor' }
  ])

  const [resources] = useState([
    { id: 1, name: 'Lecture_12_Slides.pdf', size: '3.2 MB', type: 'slides', uploadedBy: 'Dr. Sarah Johnson' },
    { id: 2, name: 'React_Hooks_Examples.zip', size: '1.5 MB', type: 'code', uploadedBy: 'Dr. Sarah Johnson' },
    { id: 3, name: 'Reading_Material.pdf', size: '890 KB', type: 'document', uploadedBy: 'Dr. Sarah Johnson' },
    { id: 4, name: 'Assignment_Instructions.docx', size: '234 KB', type: 'document', uploadedBy: 'Dr. Sarah Johnson' }
  ])

  const [assignments] = useState([
    {
      id: 1,
      title: 'React Hooks Implementation',
      description: 'Create a functional component using useState and useEffect hooks to build a todo application.',
      dueDate: '2024-01-20',
      dueTime: '11:59 PM',
      maxScore: 100,
      attachments: [
        { name: 'assignment_requirements.pdf', size: '245 KB' },
        { name: 'starter_code.zip', size: '1.2 MB' }
      ],
      submissionStatus: 'not_submitted',
      plagiarismStatus: 'not_checked',
      gradingStatus: 'not_graded',
      submittedAt: null,
      gradedAt: null,
      score: null,
      feedback: null
    },
    {
      id: 2,
      title: 'API Integration Project',
      description: 'Build a weather application that fetches data from a public API and displays it with proper error handling.',
      dueDate: '2024-01-18',
      dueTime: '5:00 PM',
      maxScore: 100,
      attachments: [
        { name: 'project_specifications.pdf', size: '456 KB' },
        { name: 'api_documentation.pdf', size: '189 KB' }
      ],
      submissionStatus: 'submitted',
      plagiarismStatus: 'checking',
      gradingStatus: 'pending',
      submittedAt: '2024-01-17 3:45 PM',
      gradedAt: null,
      score: null,
      feedback: null
    },
    {
      id: 3,
      title: 'CSS Grid Layout Challenge',
      description: 'Recreate a complex website layout using CSS Grid and Flexbox. Include responsive design.',
      dueDate: '2024-01-15',
      dueTime: '11:59 PM',
      maxScore: 100,
      attachments: [
        { name: 'layout_reference.png', size: '892 KB' },
        { name: 'css_guidelines.pdf', size: '234 KB' }
      ],
      submissionStatus: 'graded',
      plagiarismStatus: 'passed',
      gradingStatus: 'completed',
      submittedAt: '2024-01-14 8:30 PM',
      gradedAt: '2024-01-16 2:15 PM',
      score: 92,
      feedback: 'Excellent use of Grid and Flexbox! Great responsive design implementation.'
    }
  ])

  const [attendance] = useState({
    present: 24,
    absent: 3,
    total: 27,
    percentage: 89
  })

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message to the server
      setChatMessage('')
    }
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
  }

  const copyMeetingLink = () => {
    // In a real app, this would copy the actual meeting link
    navigator.clipboard.writeText(`https://educonnect.com/classroom/${classInfo.meetingId}`)
  }

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      uploadTime: new Date().toLocaleTimeString(),
      uploadStatus: 'uploading'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload completion
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => 
        file.uploadStatus === 'uploading' 
          ? { ...file, uploadStatus: 'completed' }
          : file
      ))
    }, 2000)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const getSubmissionStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-100'
      case 'graded': return 'text-green-600 bg-green-100'
      case 'late': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlagiarismStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'checking': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getGradingStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-yellow-600 bg-yellow-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Header Bar */}
      <header className="bg-[#011F5B] text-white px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-[#FF6B35] hover:text-[#FF8C61] transition-colors">
            <X size={24} />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{classInfo.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {classInfo.startTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {classInfo.date}
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} />
                {attendance.present} present
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={copyMeetingLink}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
          >
            <Copy size={16} />
            <span>Copy Link</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] rounded-lg transition-colors text-sm">
            <UserPlus size={16} />
            <span>Invite</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 bg-black relative p-4">
            {/* Main Video Display */}
            <div className="h-full bg-gray-800 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-[#011F5B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-white font-bold">SJ</span>
                  </div>
                  <p className="text-white text-xl font-semibold">{classInfo.instructor}</p>
                  <p className="text-gray-400">Presenting</p>
                </div>
              </div>

              {/* Participant Grid Overlay (Bottom Right) */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 max-h-[60%] overflow-y-auto">
                {participants.slice(1, 5).map((participant) => (
                  <div key={participant.id} className="w-32 h-24 bg-gray-700 rounded-lg overflow-hidden relative border-2 border-gray-600 hover:border-[#FF6B35] transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {participant.isVideoOn ? (
                        <div className="w-12 h-12 bg-[#011F5B] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      ) : (
                        <VideoOff size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-xs truncate flex-1">{participant.name.split(' ')[0]}</p>
                        <div className="flex items-center gap-1">
                          {!participant.isMuted ? (
                            <Mic size={12} className="text-white" />
                          ) : (
                            <MicOff size={12} className="text-red-500" />
                          )}
                          {participant.handRaised && (
                            <Hand size={12} className="text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Screen Share Indicator */}
              <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Screen Sharing</span>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-t border-gray-700">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isVideoOn ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
              </button>
              
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className={`p-3 rounded-full transition-colors ${
                  isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isAudioOn ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
              </button>

              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <ScreenShare size={20} className="text-white" />
              </button>

              <button
                onClick={toggleHandRaise}
                className={`p-3 rounded-full transition-colors ${
                  isHandRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Hand size={20} className="text-white" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Users size={20} className="text-white" />
                <span className="text-white text-sm">{participants.length}</span>
              </button>

              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MessageSquare size={20} className="text-white" />
                <span className="text-white text-sm">Chat</span>
              </button>

              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                <Settings size={20} className="text-white" />
              </button>

              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2">
                <PhoneOff size={20} className="text-white" />
                <span className="text-white text-sm">Leave</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Chat & Resources */}
        {isChatOpen && (
          <div className="w-80 bg-white flex flex-col border-l border-gray-200">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-[#011F5B] border-b-2 border-[#FF6B35]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'text-[#011F5B] border-b-2 border-[#FF6B35]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'notes'
                    ? 'text-[#011F5B] border-b-2 border-[#FF6B35]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Notes
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'assignments'
                    ? 'text-[#011F5B] border-b-2 border-[#FF6B35]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Assignments
              </button>
            </div>

            {/* Chat Content */}
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${
                          msg.role === 'instructor' ? 'text-[#FF6B35]' : 'text-[#011F5B]'
                        }`}>
                          {msg.sender}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-[#FF6B35] hover:bg-[#E55A2B] rounded-lg transition-colors"
                    >
                      <Send size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Resources Content */}
            {activeTab === 'resources' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#011F5B] mb-2">Lecture Materials</h3>
                  <p className="text-xs text-gray-600">Download resources shared by the instructor</p>
                </div>
                
                {resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{resource.name}</p>
                        <p className="text-xs text-gray-500">{resource.size}</p>
                        <p className="text-xs text-gray-400 mt-1">By {resource.uploadedBy}</p>
                      </div>
                      <button className="p-2 text-[#FF6B35] hover:bg-[#FF6B35]/10 rounded-lg transition-colors flex-shrink-0">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors flex items-center justify-center gap-2">
                  <Upload size={16} />
                  <span>Share Resource</span>
                </button>
              </div>
            )}

            {/* Assignments Content */}
            {activeTab === 'assignments' && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-[#011F5B] mb-2">Assignments</h3>
                  <p className="text-xs text-gray-600 mb-4">View and submit your assignments</p>
                </div>
                
                <div className="px-4 pb-4 space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Assignment Header */}
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[#011F5B]">{assignment.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            assignment.submissionStatus === 'graded' ? 'bg-green-100 text-green-700' :
                            assignment.submissionStatus === 'submitted' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {assignment.submissionStatus.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{assignment.description}</p>
                        
                        {/* Assignment Details */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            Due: {assignment.dueDate} at {assignment.dueTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target size={12} />
                            Max Score: {assignment.maxScore}
                          </span>
                        </div>

                        {/* Attachments */}
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-2">Attachments:</p>
                          <div className="space-y-1">
                            {assignment.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <Paperclip size={12} className="text-gray-400" />
                                <span className="text-gray-600">{attachment.name}</span>
                                <span className="text-gray-400">({attachment.size})</span>
                                <button className="text-[#FF6B35] hover:text-[#E55A2B]">
                                  <Download size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Submission Area */}
                      <div className="p-4">
                        {assignment.submissionStatus === 'not_submitted' && (
                          <div>
                            <div 
                              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                isDragOver ? 'border-[#FF6B35] bg-[#FF6B35]/5' : 'border-gray-300 hover:border-gray-400'
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                            >
                              <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600 mb-1">Drag and drop your files here</p>
                              <p className="text-xs text-gray-500 mb-3">or</p>
                              <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileUpload(e.target.files)}
                                className="hidden"
                                id={`file-upload-${assignment.id}`}
                              />
                              <label 
                                htmlFor={`file-upload-${assignment.id}`}
                                className="inline-block px-3 py-1 bg-[#FF6B35] text-white text-xs rounded-lg hover:bg-[#E55A2B] cursor-pointer transition-colors"
                              >
                                Browse Files
                              </label>
                            </div>
                            
                            {uploadedFiles.length > 0 && (
                              <div className="mt-4 space-y-2">
                                <p className="text-xs font-medium text-gray-700">Uploaded Files:</p>
                                {uploadedFiles.map((file) => (
                                  <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                                    <div className="flex items-center gap-2">
                                      <FileText size={12} className="text-gray-400" />
                                      <span className="text-gray-700">{file.name}</span>
                                      <span className="text-gray-500">({file.size})</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {file.uploadStatus === 'uploading' ? (
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                      ) : (
                                        <CheckCircle size={12} className="text-green-500" />
                                      )}
                                      <button className="text-red-500 hover:text-red-700">
                                        <X size={12} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                              Submit Assignment
                            </button>
                          </div>
                        )}

                        {assignment.submissionStatus === 'submitted' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-blue-600" />
                                <span className="text-sm text-blue-800">Submitted on {assignment.submittedAt}</span>
                              </div>
                            </div>
                            
                            {/* Status Indicators */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <Lock size={14} className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-600">Plagiarism Check</p>
                                  <span className={`text-xs font-medium ${getPlagiarismStatusColor(assignment.plagiarismStatus)}`}>
                                    {assignment.plagiarismStatus.replace('_', ' ').toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <Award size={14} className="text-gray-400" />
                                <div>
                                  <p className="text-xs text-gray-600">Grading Status</p>
                                  <span className={`text-xs font-medium ${getGradingStatusColor(assignment.gradingStatus)}`}>
                                    {assignment.gradingStatus.replace('_', ' ').toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {assignment.submissionStatus === 'graded' && (
                          <div className="space-y-3">
                            {/* Grade Display */}
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Award size={20} className="text-green-600" />
                                  <span className="text-sm font-semibold text-green-800">Assignment Graded</span>
                                </div>
                                <div className="text-right">
                                  <p className="text-2xl font-bold text-green-800">{assignment.score}/{assignment.maxScore}</p>
                                  <p className="text-xs text-green-600">Graded on {assignment.gradedAt}</p>
                                </div>
                              </div>
                              
                              {assignment.feedback && (
                                <div className="mt-3 p-3 bg-white rounded">
                                  <p className="text-xs font-medium text-gray-700 mb-1">Instructor Feedback:</p>
                                  <p className="text-sm text-gray-600">{assignment.feedback}</p>
                                </div>
                              )}
                            </div>
                            
                            {/* Status Indicators */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <CheckCircle size={14} className="text-green-600" />
                                <div>
                                  <p className="text-xs text-gray-600">Plagiarism Check</p>
                                  <span className="text-xs font-medium text-green-600">PASSED</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <TrendingUp size={14} className="text-green-600" />
                                <div>
                                  <p className="text-xs text-gray-600">Performance</p>
                                  <span className="text-xs font-medium text-green-600">
                                    {assignment.score >= 90 ? 'Excellent' : assignment.score >= 80 ? 'Good' : 'Satisfactory'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <button className="w-full py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                              View Submission Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Content */}
            {activeTab === 'notes' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[#011F5B] mb-2">Lecture Notes</h3>
                  <p className="text-xs text-gray-600 mb-4">Take notes during the class</p>
                </div>
                
                <textarea
                  placeholder="Start typing your notes here..."
                  className="w-full h-full min-h-[300px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent text-sm resize-none"
                  defaultValue="React Hooks - Key Points:

1. useState - Managing state in functional components
2. useEffect - Side effects and lifecycle
3. Custom hooks - Reusable logic

Important: Remember to clean up effects to prevent memory leaks."
                />
                
                <button className="w-full mt-4 py-2 px-4 bg-[#011F5B] text-white rounded-lg hover:bg-[#003262] transition-colors text-sm">
                  Save Notes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Participants Panel */}
        {isParticipantsOpen && (
          <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[#011F5B]">Participants</h3>
                <button onClick={() => setIsParticipantsOpen(false)}>
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-xs text-gray-600">{participants.length} in class</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-[#011F5B] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{participant.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{participant.role}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!participant.isMuted ? (
                      <Mic size={14} className="text-green-600" />
                    ) : (
                      <MicOff size={14} className="text-gray-400" />
                    )}
                    {participant.handRaised && (
                      <Hand size={14} className="text-yellow-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Attendance Summary */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <h4 className="text-xs font-semibold text-[#011F5B] mb-2">Attendance</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Present:</span>
                  <span className="font-medium text-green-600">{attendance.present}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Absent:</span>
                  <span className="font-medium text-red-600">{attendance.absent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Attendance:</span>
                  <span className="font-medium text-[#011F5B]">{attendance.percentage}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VirtualClassroomPage