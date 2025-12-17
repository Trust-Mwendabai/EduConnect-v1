import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Calendar, Clock, DollarSign, Bell, TrendingUp, Award, AlertCircle, CheckCircle, PlayCircle, FileText, Target, Brain, Lightbulb, BarChart3, Users, Video, Download, Star, ChevronRight, X, Info, CreditCard, Check, User, Home, ShoppingCart, GraduationCap, MessageSquare, Settings, LogOut, Menu, ChevronLeft, Search, Bot, Accessibility, Sparkles, Send, Plus, Hash, UserPlus, MoreVertical, Smartphone, Building, Upload } from 'lucide-react'
import AICompanion from '../components/ai/AICompanion'
import AccessibilityPanel from '../components/accessibility/AccessibilityPanel'
import { NotificationProvider, useNotifications } from '../components/notifications/NotificationSystem'

function LMSDashboardPage() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [activeSection, setActiveSection] = useState('overview')
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAICompanion, setShowAICompanion] = useState(false)
  const [showAccessibility, setShowAccessibility] = useState(false)
  const [messageView, setMessageView] = useState('personal') // 'personal' or 'groups'
  const [groupChats, setGroupChats] = useState([
    {
      id: 1,
      name: 'React Study Group',
      description: 'Advanced React Development students',
      members: 12,
      lastMessage: 'Anyone up for a study session tomorrow?',
      lastMessageTime: '10 min ago',
      unreadCount: 3,
      course: 'Advanced React Development',
      type: 'study'
    },
    {
      id: 2,
      name: 'Data Science Team',
      description: 'Machine Learning project collaboration',
      members: 8,
      lastMessage: 'I uploaded the dataset to Google Drive',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      course: 'Data Science Fundamentals',
      type: 'project'
    },
    {
      id: 3,
      name: 'UI/UX Designers',
      description: 'Design feedback and resources sharing',
      members: 15,
      lastMessage: 'Check out this new Figma plugin!',
      lastMessageTime: '2 hours ago',
      unreadCount: 1,
      course: 'UI/UX Design Principles',
      type: 'discussion'
    },
    {
      id: 4,
      name: 'General Student Lounge',
      description: 'All students general discussion',
      members: 45,
      lastMessage: 'Who\'s attending the workshop tomorrow?',
      lastMessageTime: '3 hours ago',
      unreadCount: 0,
      course: 'General',
      type: 'social'
    }
  ])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [groupMessages, setGroupMessages] = useState([
    {
      groupId: 1,
      messages: [
        {
          id: 1,
          sender: 'Alex Thompson',
          message: 'Hey everyone! I\'m stuck on the Redux middleware concept. Can someone help?',
          time: '2 hours ago',
          isOwn: false
        },
        {
          id: 2,
          sender: 'Sarah Johnson',
          message: 'I can help! Redux middleware is like a pipeline for actions. Think of it as processing steps.',
          time: '1 hour 45 min ago',
          isOwn: false
        },
        {
          id: 3,
          sender: 'You',
          message: 'Thanks Sarah! That makes more sense now.',
          time: '1 hour 30 min ago',
          isOwn: true
        },
        {
          id: 4,
          sender: 'Mike Chen',
          message: 'Anyone up for a study session tomorrow?',
          time: '10 min ago',
          isOwn: false
        }
      ]
    }
  ])
  const [newGroupMessage, setNewGroupMessage] = useState('')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    course: '',
    type: 'study'
  })
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Dr. Sarah Johnson',
      subject: 'React Development - Module 3 Assignment',
      message: 'Your latest assignment on advanced state management was excellent! Consider exploring Redux patterns for your next project.',
      time: '1 hour ago',
      unread: true,
      course: 'Advanced React Development',
      type: 'instructor'
    },
    {
      id: 2,
      sender: 'Teaching Assistant',
      subject: 'Data Science Lab Session',
      message: 'Reminder: Tomorrow\'s lab session on machine learning algorithms will be in Computer Lab 2 at 10 AM.',
      time: '3 hours ago',
      unread: true,
      course: 'Data Science Fundamentals',
      type: 'announcement'
    },
    {
      id: 3,
      sender: 'Michael Chen',
      subject: 'UI/UX Design Feedback',
      message: 'Great progress on your user research project! The wireframes look professional. Let\'s discuss the color scheme in our next session.',
      time: '1 day ago',
      unread: false,
      course: 'UI/UX Design Principles',
      type: 'instructor'
    },
    {
      id: 4,
      sender: 'LMS System',
      subject: 'Course Material Update',
      message: 'New video lectures for React hooks have been uploaded to your course materials section.',
      time: '2 days ago',
      unread: false,
      course: 'Advanced React Development',
      type: 'system'
    },
    {
      id: 5,
      sender: 'Academic Advisor',
      subject: 'Progress Meeting',
      message: 'Let\'s schedule a meeting to discuss your academic progress and upcoming course selections for next semester.',
      time: '3 days ago',
      unread: false,
      course: 'General',
      type: 'advisor'
    }
  ])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [newMessage, setNewMessage] = useState({
    recipient: '',
    subject: '',
    message: ''
  })

  const activeCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Advanced State Management',
      nextClass: 'Today, 2:00 PM',
      grade: 'A-',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      nextLesson: 'Machine Learning Basics',
      nextClass: 'Tomorrow, 10:00 AM',
      grade: 'B+',
      color: 'green'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      progress: 85,
      totalLessons: 16,
      completedLessons: 14,
      nextLesson: 'User Research Methods',
      nextClass: 'Friday, 3:00 PM',
      grade: 'A',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategy',
      instructor: 'Alex Thompson',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: 'SEO Optimization',
      nextClass: 'Monday, 11:00 AM',
      grade: 'B',
      color: 'orange'
    }
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: 'React Project Submission',
      course: 'Advanced React Development',
      dueDate: '2024-05-20',
      dueTime: '11:59 PM',
      priority: 'high',
      type: 'project',
      estimatedTime: '4 hours'
    },
    {
      id: 2,
      title: 'Data Analysis Quiz',
      course: 'Data Science Fundamentals',
      dueDate: '2024-05-18',
      dueTime: '2:00 PM',
      priority: 'medium',
      type: 'quiz',
      estimatedTime: '1 hour'
    },
    {
      id: 3,
      title: 'Design Portfolio Update',
      course: 'UI/UX Design Principles',
      dueDate: '2024-05-22',
      dueTime: '5:00 PM',
      priority: 'low',
      type: 'portfolio',
      estimatedTime: '3 hours'
    },
    {
      id: 4,
      title: 'Marketing Campaign Proposal',
      course: 'Digital Marketing Strategy',
      dueDate: '2024-05-25',
      dueTime: '11:59 PM',
      priority: 'medium',
      type: 'proposal',
      estimatedTime: '5 hours'
    }
  ]

  const upcomingClasses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      time: 'Today, 2:00 PM - 3:30 PM',
      type: 'live',
      room: 'Virtual Room A',
      topic: 'Advanced State Management'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      time: 'Tomorrow, 10:00 AM - 11:30 AM',
      type: 'lecture',
      room: 'Science Lab 2',
      topic: 'Machine Learning Basics'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Michael Chen',
      time: 'Friday, 3:00 PM - 4:30 PM',
      type: 'workshop',
      room: 'Design Studio',
      topic: 'User Research Methods'
    }
  ]

  const attendanceData = {
    overall: 92,
    thisMonth: 95,
    lastMonth: 88,
    bySubject: [
      { subject: 'Advanced React Development', rate: 95 },
      { subject: 'Data Science Fundamentals', rate: 90 },
      { subject: 'UI/UX Design Principles', rate: 98 },
      { subject: 'Digital Marketing Strategy', rate: 85 }
    ]
  }

  const financialStatus = {
    tuitionBalance: 2850.00,
    nextPaymentDue: '2024-06-01',
    paymentStatus: 'partial',
    clearanceStatus: 'pending',
    totalPaid: 1800.00,
    totalDue: 4650.00,
    recentPayments: [
      { date: '2024-05-01', amount: 600.00, status: 'completed', method: 'Mobile Money' },
      { date: '2024-04-01', amount: 600.00, status: 'completed', method: 'Bank Transfer' },
      { date: '2024-03-01', amount: 600.00, status: 'completed', method: 'Mobile Money' }
    ]
  }
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    bankAccount: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    transactionId: ''
  })
  const [paymentStep, setPaymentStep] = useState(1) // 1: method, 2: details, 3: confirm, 4: processing
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'React Hooks Implementation',
      course: 'Advanced React Development',
      description: 'Build a comprehensive application using React Hooks including useState, useEffect, and custom hooks.',
      dueDate: '2024-06-15',
      dueTime: '11:59 PM',
      priority: 'high',
      estimatedTime: '3 hours',
      status: 'pending',
      type: 'coding',
      submissionType: 'code',
      maxScore: 100,
      attachments: ['requirements.pdf', 'starter-code.zip'],
      instructions: 'Create a task management application using React Hooks. The application should include: 1) Task creation and deletion, 2) Task filtering, 3) Local storage persistence, 4) Custom hook for API calls.',
      submittedAt: null,
      grade: null,
      feedback: null
    },
    {
      id: 2,
      title: 'Data Analysis Report',
      course: 'Data Science Fundamentals',
      description: 'Analyze the provided dataset and create a comprehensive report with visualizations.',
      dueDate: '2024-06-18',
      dueTime: '5:00 PM',
      priority: 'medium',
      estimatedTime: '4 hours',
      status: 'submitted',
      type: 'report',
      submissionType: 'document',
      maxScore: 100,
      attachments: ['dataset.csv', 'template.docx'],
      instructions: 'Analyze the sales dataset and create a report including: 1) Data cleaning process, 2) Statistical analysis, 3) Visualizations using matplotlib/seaborn, 4) Business insights and recommendations.',
      submittedAt: '2024-06-16',
      grade: 85,
      feedback: 'Good analysis and visualization. Consider adding more statistical tests for better insights.'
    },
    {
      id: 3,
      title: 'UI/UX Case Study',
      course: 'UI/UX Design Principles',
      description: 'Create a complete case study for a mobile app redesign project.',
      dueDate: '2024-06-20',
      dueTime: '3:00 PM',
      priority: 'medium',
      estimatedTime: '5 hours',
      status: 'in_progress',
      type: 'design',
      submissionType: 'portfolio',
      maxScore: 100,
      attachments: ['brief.pdf', 'brand-guidelines.png'],
      instructions: 'Redesign the food delivery app interface. Include: 1) User research findings, 2) Wireframes, 3) High-fidelity mockups, 4) Prototype, 5) Design rationale.',
      submittedAt: null,
      grade: null,
      feedback: null
    },
    {
      id: 4,
      title: 'Machine Learning Model',
      course: 'Data Science Fundamentals',
      description: 'Build and evaluate a machine learning model for the given classification problem.',
      dueDate: '2024-06-25',
      dueTime: '11:59 PM',
      priority: 'low',
      estimatedTime: '6 hours',
      status: 'pending',
      type: 'coding',
      submissionType: 'jupyter',
      maxScore: 100,
      attachments: ['problem-statement.pdf', 'sample-data.csv'],
      instructions: 'Build a classification model to predict customer churn. Include: 1) Data preprocessing, 2) Feature engineering, 3) Model training and evaluation, 4) Hyperparameter tuning, 5) Model interpretation.',
      submittedAt: null,
      grade: null,
      feedback: null
    }
  ])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [assignmentStep, setAssignmentStep] = useState(1) // 1: overview, 2: work, 3: submit, 4: confirmation
  const [assignmentWork, setAssignmentWork] = useState({
    textContent: '',
    codeContent: '',
    files: [],
    notes: ''
  })
  const [submissionFiles, setSubmissionFiles] = useState([])

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (message.unread) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, unread: false } : m
      ))
    }
  }

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      const newReply = {
        id: messages.length + 1,
        sender: 'You',
        subject: `Re: ${selectedMessage.subject}`,
        message: replyText,
        time: 'Just now',
        unread: false,
        course: selectedMessage.course,
        type: 'reply'
      }
      setMessages([newReply, ...messages])
      setReplyText('')
      showSuccess('Reply sent successfully!')
    }
  }

  const handleCompose = () => {
    if (newMessage.recipient.trim() && newMessage.subject.trim() && newMessage.message.trim()) {
      const composedMessage = {
        id: messages.length + 1,
        sender: 'You',
        subject: newMessage.subject,
        message: newMessage.message,
        time: 'Just now',
        unread: false,
        course: 'General',
        type: 'sent'
      }
      setMessages([composedMessage, ...messages])
      setNewMessage({ recipient: '', subject: '', message: '' })
      setShowCompose(false)
      showSuccess('Message sent successfully!')
    }
  }

  const markAsRead = (messageId) => {
    setMessages(messages.map(m => 
      m.id === messageId ? { ...m, unread: false } : m
    ))
  }

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(m => m.id !== messageId))
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null)
    }
    showWarning('Message deleted')
  }

  const handleGroupClick = (group) => {
    setSelectedGroup(group)
    setMessageView('groups')
    // Mark group messages as read
    setGroupChats(groupChats.map(g => 
      g.id === group.id ? { ...g, unreadCount: 0 } : g
    ))
  }

  const handleSendGroupMessage = () => {
    if (newGroupMessage.trim() && selectedGroup) {
      const newMessage = {
        id: Date.now(),
        sender: 'You',
        message: newGroupMessage,
        time: 'Just now',
        isOwn: true
      }
      
      setGroupMessages(prev => ({
        ...prev,
        [selectedGroup.id]: {
          messages: [...(prev[selectedGroup.id]?.messages || []), newMessage]
        }
      }))
      
      // Update group's last message
      setGroupChats(groupChats.map(g => 
        g.id === selectedGroup.id 
          ? { ...g, lastMessage: newGroupMessage, lastMessageTime: 'Just now' }
          : g
      ))
      
      setNewGroupMessage('')
      showSuccess('Message sent to group')
    }
  }

  const handleCreateGroup = () => {
    if (newGroup.name.trim() && newGroup.description.trim()) {
      const createdGroup = {
        id: groupChats.length + 1,
        name: newGroup.name,
        description: newGroup.description,
        members: 1,
        lastMessage: 'Group created',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        course: newGroup.course,
        type: newGroup.type
      }
      
      setGroupChats([createdGroup, ...groupChats])
      setNewGroup({ name: '', description: '', course: '', type: 'study' })
      setShowCreateGroup(false)
      showSuccess('Group created successfully!')
    }
  }

  const leaveGroup = (groupId) => {
    setGroupChats(groupChats.filter(g => g.id !== groupId))
    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null)
    }
    showWarning('You left the group')
  }

  const handlePaymentInitiate = () => {
    setShowPaymentModal(true)
    setPaymentStep(1)
    setPaymentMethod('')
    setPaymentAmount('')
    setPaymentDetails({
      phoneNumber: '',
      bankAccount: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      transactionId: ''
    })
  }

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method)
    setPaymentStep(2)
  }

  const handlePaymentDetailsSubmit = () => {
    setPaymentStep(3)
  }

  const handlePaymentConfirm = () => {
    setPaymentStep(4)
    
    // Simulate payment processing
    setTimeout(() => {
      const newPayment = {
        date: new Date().toISOString().split('T')[0],
        amount: parseFloat(paymentAmount),
        status: 'completed',
        method: paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)
      }
      
      // Update financial status
      const updatedStatus = {
        ...financialStatus,
        totalPaid: financialStatus.totalPaid + parseFloat(paymentAmount),
        tuitionBalance: financialStatus.tuitionBalance - parseFloat(paymentAmount),
        recentPayments: [newPayment, ...financialStatus.recentPayments]
      }
      
      // Check if fully paid
      if (updatedStatus.tuitionBalance <= 0) {
        updatedStatus.clearanceStatus = 'cleared'
        updatedStatus.tuitionBalance = 0
      }
      
      // Update state (in real app, this would be an API call)
      showSuccess(`Payment of K${paymentAmount} completed successfully!`)
      setShowPaymentModal(false)
      setPaymentStep(1)
    }, 3000)
  }

  const handlePaymentCancel = () => {
    setShowPaymentModal(false)
    setPaymentStep(1)
    setPaymentMethod('')
    setPaymentAmount('')
    setPaymentDetails({
      phoneNumber: '',
      bankAccount: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      transactionId: ''
    })
  }

  const validatePaymentDetails = () => {
    if (paymentMethod === 'mobile_money' && !paymentDetails.phoneNumber) {
      showError('Please enter your phone number')
      return false
    }
    if (paymentMethod === 'bank_transfer' && !paymentDetails.bankAccount) {
      showError('Please enter your bank account number')
      return false
    }
    if (paymentMethod === 'credit_card' && (!paymentDetails.cardNumber || !paymentDetails.cardExpiry || !paymentDetails.cardCVV)) {
      showError('Please complete all card details')
      return false
    }
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      showError('Please enter a valid payment amount')
      return false
    }
    if (parseFloat(paymentAmount) > financialStatus.tuitionBalance) {
      showError('Payment amount exceeds balance due')
      return false
    }
    return true
  }

  const handleAssignmentStart = (assignment) => {
    setSelectedAssignment(assignment)
    setShowAssignmentModal(true)
    setAssignmentStep(1)
    setAssignmentWork({
      textContent: '',
      codeContent: '',
      files: [],
      notes: ''
    })
    setSubmissionFiles([])
  }

  const handleAssignmentWork = () => {
    setAssignmentStep(2)
  }

  const handleAssignmentSubmit = () => {
    setAssignmentStep(3)
  }

  const handleAssignmentConfirm = () => {
    // Update assignment status to submitted
    const updatedAssignments = assignments.map(assignment => 
      assignment.id === selectedAssignment.id 
        ? {
            ...assignment,
            status: 'submitted',
            submittedAt: new Date().toISOString().split('T')[0]
          }
        : assignment
    )
    setAssignments(updatedAssignments)
    
    showSuccess('Assignment submitted successfully!')
    setShowAssignmentModal(false)
    setAssignmentStep(1)
    setSelectedAssignment(null)
  }

  const handleAssignmentCancel = () => {
    setShowAssignmentModal(false)
    setAssignmentStep(1)
    setSelectedAssignment(null)
    setAssignmentWork({
      textContent: '',
      codeContent: '',
      files: [],
      notes: ''
    })
    setSubmissionFiles([])
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setSubmissionFiles([...submissionFiles, ...files])
  }

  const removeFile = (index) => {
    setSubmissionFiles(submissionFiles.filter((_, i) => i !== index))
  }

  const getAssignmentStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'bg-green-100 text-green-700'
      case 'in_progress': return 'bg-blue-100 text-blue-700'
      case 'overdue': return 'bg-red-100 text-red-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  const getAssignmentTypeIcon = (type) => {
    switch(type) {
      case 'coding': return <FileText className="w-5 h-5" />
      case 'report': return <FileText className="w-5 h-5" />
      case 'design': return <Target className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  const aiSuggestions = [
    {
      id: 1,
      type: 'study',
      title: 'Focus on React Hooks',
      description: 'Based on your recent quiz performance, spend extra time reviewing useEffect and custom hooks',
      priority: 'high',
      course: 'Advanced React Development',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      type: 'time',
      title: 'Optimize Study Schedule',
      description: 'Your peak performance hours are 10 AM - 12 PM. Schedule difficult topics during this time',
      priority: 'medium',
      course: 'General',
      estimatedTime: '30 minutes'
    },
    {
      id: 3,
      type: 'review',
      title: 'Review Data Science Basics',
      description: 'You have 3 assignments due next week. Start with the Data Analysis Quiz tomorrow',
      priority: 'high',
      course: 'Data Science Fundamentals',
      estimatedTime: '1 hour'
    },
    {
      id: 4,
      type: 'resource',
      title: 'Additional Practice Resources',
      description: 'We found 5 new practice exercises for React state management based on your learning patterns',
      priority: 'low',
      course: 'Advanced React Development',
      estimatedTime: '3 hours'
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'React Project Submission has been posted. Due in 3 days.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Posted',
      message: 'Your UI/UX Design portfolio has been graded. Score: 92%',
      time: '5 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'class',
      title: 'Class Schedule Change',
      message: 'Tomorrow\'s Data Science class moved to 11:00 AM',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Reminder',
      message: 'Tuition fee for June is due on June 1st',
      time: '2 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'announcement',
      title: 'System Maintenance',
      message: 'LMS will be unavailable this weekend for scheduled maintenance',
      time: '3 days ago',
      read: true,
      priority: 'low'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCourseColor = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-500'
      case 'green': return 'bg-green-500'
      case 'purple': return 'bg-purple-500'
      case 'orange': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'assignment': return <FileText className="w-5 h-5" />
      case 'grade': return <Award className="w-5 h-5" />
      case 'class': return <Calendar className="w-5 h-5" />
      case 'payment': return <DollarSign className="w-5 h-5" />
      case 'announcement': return <Bell className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const sidebarItems = [
    { id: 'home', label: 'Back to Home', icon: Home },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'classroom', label: 'Virtual Classroom', icon: Video },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#011F5B] text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-lg flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">EduConnect</h2>
              <p className="text-xs text-blue-200">Student Portal</p>
            </div>
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
                      setActiveSection(item.id)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    item.id === 'home'
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : activeSection === item.id
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
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
            <div className="flex-1">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-blue-200">Student ID: STU001</p>
            </div>
            <button className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <LogOut size={18} />
            </button>
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
                  {activeSection === 'overview' ? 'Dashboard Overview' : 
                   activeSection === 'courses' ? 'My Courses' :
                   activeSection === 'assignments' ? 'Assignments' :
                   activeSection === 'marketplace' ? 'Marketplace' :
                   activeSection === 'classroom' ? 'Virtual Classroom' :
                   activeSection === 'messages' ? 'Messages' :
                   activeSection === 'payments' ? 'Payments' : 'Settings'}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>Learning Overview</span>
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
                <button 
                  onClick={() => setShowAICompanion(true)}
                  className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                  title="AI Learning Companion"
                >
                  <Bot size={20} />
                </button>
                <button 
                  onClick={() => setShowAccessibility(true)}
                  className="p-2 text-gray-600 hover:text-[#011F5B] transition-colors"
                  title="Accessibility Settings"
                >
                  <Accessibility size={20} />
                </button>
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

      {/* Dynamic Content Based on Active Section */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === 'overview' && (
            <div>
              {/* Overview Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-blue-600 font-medium">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{activeCourses.length}</h3>
                  <p className="text-gray-600 text-sm">Courses</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">This Week</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{upcomingAssignments.filter(a => new Date(a.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}</h3>
                  <p className="text-gray-600 text-sm">Assignments Due</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-sm text-green-600 font-medium">+5%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">{attendanceData.overall}%</h3>
                  <p className="text-gray-600 text-sm">Attendance Rate</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      financialStatus.clearanceStatus === 'cleared' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {financialStatus.clearanceStatus}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#011F5B]">${financialStatus.tuitionBalance}</h3>
                  <p className="text-gray-600 text-sm">Balance Due</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map(notification => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[#011F5B] mb-6">AI Study Assistant</h2>
                  <div className="space-y-4">
                    {aiSuggestions.slice(0, 3).map(suggestion => (
                      <div key={suggestion.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Brain className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{suggestion.course} • {suggestion.estimatedTime}</span>
                              <button className="text-[#FF6B35] text-sm font-medium hover:text-[#E55A2B]">
                                Apply Suggestion
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'courses' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">My Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCourses.map(course => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${getCourseColor(course.color)} rounded-lg flex items-center justify-center`}>
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{course.grade}</span>
                        <p className="text-xs text-gray-500">Current Grade</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={getCourseColor(course.color) + " h-2 rounded-full transition-all duration-300"}
                          style={{ width: course.progress + "%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <PlayCircle className="w-4 h-4" />
                          <span>Next: {course.nextLesson}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{course.nextClass}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        Continue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'assignments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#011F5B]">Assignments</h2>
                <div className="flex gap-2 text-sm">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {assignments.filter(a => a.status === 'pending').length} Pending
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {assignments.filter(a => a.status === 'in_progress').length} In Progress
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {assignments.filter(a => a.status === 'submitted').length} Submitted
                  </span>
                </div>
              </div>

              {/* Assignment Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">{assignments.length}</span>
                  </div>
                  <p className="text-sm text-gray-600">Total Assignments</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-yellow-600" />
                    <span className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.status === 'pending').length}</span>
                  </div>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <span className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.status === 'in_progress').length}</span>
                  </div>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{assignments.filter(a => a.status === 'submitted').length}</span>
                  </div>
                  <p className="text-sm text-gray-600">Submitted</p>
                </div>
              </div>

              {/* Assignment List */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-[#011F5B]">All Assignments</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${
                              assignment.type === 'coding' ? 'bg-blue-100 text-blue-600' :
                              assignment.type === 'design' ? 'bg-purple-100 text-purple-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {getAssignmentTypeIcon(assignment.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                              <p className="text-sm text-gray-600">{assignment.course}</p>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-700 mb-3">{assignment.description}</p>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Due: {assignment.dueDate} at {assignment.dueTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Est: {assignment.estimatedTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority} priority
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getAssignmentStatusColor(assignment.status)}`}>
                              {assignment.status.replace('_', ' ')}
                            </span>
                            {assignment.submittedAt && (
                              <span className="text-xs text-gray-500">Submitted: {assignment.submittedAt}</span>
                            )}
                            {assignment.grade && (
                              <span className="text-xs font-medium text-green-600">Grade: {assignment.grade}%</span>
                            )}
                          </div>
                          
                          {assignment.feedback && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                <strong>Feedback:</strong> {assignment.feedback}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4">
                          {assignment.status === 'submitted' ? (
                            <button
                              onClick={() => handleAssignmentStart(assignment)}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              View Submission
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAssignmentStart(assignment)}
                              className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                              {assignment.status === 'in_progress' ? 'Continue' : 'Start Assignment'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Assignment Modal */}
          {showAssignmentModal && selectedAssignment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#011F5B]">
                      {assignmentStep === 1 && 'Assignment Overview'}
                      {assignmentStep === 2 && 'Work on Assignment'}
                      {assignmentStep === 3 && 'Submit Assignment'}
                      {assignmentStep === 4 && 'Confirmation'}
                    </h3>
                    <button
                      onClick={handleAssignmentCancel}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Step 1: Assignment Overview */}
                  {assignmentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedAssignment.title}</h4>
                        <p className="text-gray-600 mb-4">{selectedAssignment.course}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="text-sm">Due: {selectedAssignment.dueDate} at {selectedAssignment.dueTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span className="text-sm">Estimated time: {selectedAssignment.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-gray-500" />
                            <span className="text-sm">Max score: {selectedAssignment.maxScore} points</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <span className="text-sm">Type: {selectedAssignment.type}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Description</h5>
                        <p className="text-gray-700">{selectedAssignment.description}</p>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Instructions</h5>
                        <p className="text-gray-700 whitespace-pre-line">{selectedAssignment.instructions}</p>
                      </div>

                      {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Attachments</h5>
                          <div className="space-y-2">
                            {selectedAssignment.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <Download className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{attachment}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={handleAssignmentWork}
                          className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Start Working
                        </button>
                        <button
                          onClick={handleAssignmentCancel}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Work on Assignment */}
                  {assignmentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Work on: {selectedAssignment.title}</h4>
                        
                        {selectedAssignment.type === 'coding' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Code Solution</label>
                            <textarea
                              value={assignmentWork.codeContent}
                              onChange={(e) => setAssignmentWork({...assignmentWork, codeContent: e.target.value})}
                              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] font-mono text-sm"
                              placeholder="// Write your code here..."
                            />
                          </div>
                        )}
                        
                        {(selectedAssignment.type === 'report' || selectedAssignment.type === 'design') && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Content</label>
                            <textarea
                              value={assignmentWork.textContent}
                              onChange={(e) => setAssignmentWork({...assignmentWork, textContent: e.target.value})}
                              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="Write your assignment content here..."
                            />
                          </div>
                        )}
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                          <textarea
                            value={assignmentWork.notes}
                            onChange={(e) => setAssignmentWork({...assignmentWork, notes: e.target.value})}
                            className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            placeholder="Add any notes or comments..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                            <p className="text-xs text-gray-500">PDF, DOC, ZIP, images up to 10MB</p>
                          </label>
                        </div>
                        
                        {submissionFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {submissionFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm text-gray-700">{file.name}</span>
                                <button
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setAssignmentStep(1)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleAssignmentSubmit}
                          className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Submit Assignment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Submit Assignment */}
                  {assignmentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Review Your Submission</h4>
                        
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Assignment: {selectedAssignment.title}</h5>
                          <p className="text-sm text-gray-600">Course: {selectedAssignment.course}</p>
                          <p className="text-sm text-gray-600">Due: {selectedAssignment.dueDate} at {selectedAssignment.dueTime}</p>
                        </div>

                        {(assignmentWork.textContent || assignmentWork.codeContent) && (
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">Content Preview</h5>
                            <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                              <p className="text-sm text-gray-700">
                                {assignmentWork.textContent || assignmentWork.codeContent}
                              </p>
                            </div>
                          </div>
                        )}

                        {submissionFiles.length > 0 && (
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">Files to Submit</h5>
                            <div className="space-y-2">
                              {submissionFiles.map((file, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-gray-700">{file.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            Please review your submission carefully. Once submitted, you will not be able to make changes.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setAssignmentStep(2)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleAssignmentConfirm}
                          className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Confirm Submission
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'marketplace' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Marketplace</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600 mb-4">Browse courses and learning materials from our marketplace.</p>
                <Link to="/marketplace" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <ShoppingCart size={16} />
                  Visit Full Marketplace
                </Link>
              </div>
            </div>
          )}

          {activeSection === 'classroom' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Virtual Classroom</h2>
              <div className="space-y-4">
                {upcomingClasses.map(class_ => (
                  <div key={class_.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Video className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{class_.title}</h3>
                          <p className="text-sm text-gray-600">{class_.instructor}</p>
                          <p className="text-sm text-gray-500">Topic: {class_.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{class_.time}</p>
                        <p className="text-sm text-gray-600">{class_.room}</p>
                        <Link to={`/classroom/${class_.id}`} className="mt-2 inline-block px-3 py-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white text-sm rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                          Join Class
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'messages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Messages</h2>
                <div className="flex gap-3">
                  {messageView === 'groups' && (
                    <button
                      onClick={() => setShowCreateGroup(!showCreateGroup)}
                      className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Create Group
                    </button>
                  )}
                  <button
                    onClick={() => setShowCompose(!showCompose)}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Compose
                  </button>
                </div>
              </div>

              {/* Message Type Toggle */}
              <div className="bg-white rounded-xl shadow-sm p-2 flex gap-2">
                <button
                  onClick={() => setMessageView('personal')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    messageView === 'personal'
                      ? 'bg-[#011F5B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Personal Messages
                </button>
                <button
                  onClick={() => setMessageView('groups')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    messageView === 'groups'
                      ? 'bg-[#011F5B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Group Chats
                </button>
              </div>

              {showCompose && messageView === 'personal' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-[#011F5B] mb-4">New Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                      <input
                        type="text"
                        value={newMessage.recipient}
                        onChange={(e) => setNewMessage({...newMessage, recipient: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter recipient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        value={newMessage.subject}
                        onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Type your message here..."
                        rows="4"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCompose}
                        className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Send Message
                      </button>
                      <button
                        onClick={() => setShowCompose(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {showCreateGroup && messageView === 'groups' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Create New Group</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                      <input
                        type="text"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Enter group name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={newGroup.description}
                        onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Describe the group purpose"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                      <input
                        type="text"
                        value={newGroup.course}
                        onChange={(e) => setNewGroup({...newGroup, course: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                        placeholder="Associated course (optional)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        value={newGroup.type}
                        onChange={(e) => setNewGroup({...newGroup, type: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      >
                        <option value="study">Study Group</option>
                        <option value="project">Project Team</option>
                        <option value="discussion">Discussion</option>
                        <option value="social">Social</option>
                      </select>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCreateGroup}
                        className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Create Group
                      </button>
                      <button
                        onClick={() => setShowCreateGroup(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Messages/Groups List */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-[#011F5B]">
                        {messageView === 'personal' ? 'Inbox' : 'Group Chats'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {messageView === 'personal' 
                          ? `${messages.filter(m => m.unread).length} unread messages`
                          : `${groupChats.filter(g => g.unreadCount > 0).length} groups with unread messages`
                        }
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {messageView === 'personal' ? (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            onClick={() => handleMessageClick(message)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                            } ${message.unread ? 'bg-blue-50' : ''}`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`font-medium text-sm ${message.unread ? 'text-[#011F5B] font-semibold' : 'text-gray-900'}`}>
                                    {message.sender}
                                  </h4>
                                  {message.unread && (
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                  )}
                                </div>
                                <p className={`text-sm mb-1 ${message.unread ? 'text-[#011F5B] font-medium' : 'text-gray-700'}`}>
                                  {message.subject}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{message.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        groupChats.map((group) => (
                          <div
                            key={group.id}
                            onClick={() => handleGroupClick(group)}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Hash className="w-4 h-4 text-gray-500" />
                                  <h4 className="font-medium text-sm text-gray-900">{group.name}</h4>
                                  {group.unreadCount > 0 && (
                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                      {group.unreadCount}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{group.description}</p>
                                <p className="text-xs text-gray-600 truncate">{group.lastMessage}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-gray-400">{group.lastMessageTime}</p>
                                  <span className="text-xs text-gray-500">•</span>
                                  <p className="text-xs text-gray-500">{group.members} members</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Message/Group Detail */}
                <div className="lg:col-span-2">
                  {messageView === 'personal' && selectedMessage ? (
                    <div className="bg-white rounded-xl shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-[#011F5B]">{selectedMessage.subject}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-sm text-gray-600">From: <span className="font-medium">{selectedMessage.sender}</span></p>
                              <p className="text-sm text-gray-600">{selectedMessage.time}</p>
                            </div>
                            {selectedMessage.course && (
                              <p className="text-sm text-gray-600 mt-1">Course: <span className="font-medium">{selectedMessage.course}</span></p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            {selectedMessage.unread && (
                              <button
                                onClick={() => markAsRead(selectedMessage.id)}
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                Mark as Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(selectedMessage.id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                        
                        {/* Reply Section */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-[#011F5B] mb-3">Reply</h4>
                          <div className="space-y-3">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="Type your reply here..."
                              rows="3"
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={handleReply}
                                className="px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                              >
                                Send Reply
                              </button>
                              <button
                                onClick={() => setReplyText('')}
                                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : messageView === 'groups' && selectedGroup ? (
                    <div className="bg-white rounded-xl shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-3">
                              <Hash className="w-5 h-5 text-gray-500" />
                              <h3 className="text-lg font-semibold text-[#011F5B]">{selectedGroup.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{selectedGroup.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-sm text-gray-600">{selectedGroup.members} members</p>
                              <p className="text-sm text-gray-600">Course: <span className="font-medium">{selectedGroup.course}</span></p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => leaveGroup(selectedGroup.id)}
                              className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              Leave Group
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Group Messages */}
                      <div className="p-6 h-96 overflow-y-auto">
                        {groupMessages[selectedGroup.id]?.messages?.map((msg) => (
                          <div
                            key={msg.id}
                            className={`mb-4 ${msg.isOwn ? 'text-right' : 'text-left'}`}
                          >
                            <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.isOwn
                                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="font-medium text-sm mb-1">{msg.sender}</p>
                              <p className="text-sm">{msg.message}</p>
                              <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-gray-500'}`}>{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Group Message Input */}
                      <div className="p-6 border-t border-gray-200">
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={newGroupMessage}
                            onChange={(e) => setNewGroupMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendGroupMessage()}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            placeholder="Type a message..."
                          />
                          <button
                            onClick={handleSendGroupMessage}
                            className="px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {messageView === 'personal' ? 'Select a message' : 'Select a group chat'}
                      </h3>
                      <p className="text-gray-600">
                        {messageView === 'personal' 
                          ? 'Choose a message from the inbox to read'
                          : 'Choose a group chat to start messaging'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Payments</h2>
              
              {/* Payment Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">K{financialStatus.totalDue.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Total Tuition</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">K{financialStatus.totalPaid.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Amount Paid</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                    <span className="text-2xl font-bold text-gray-900">K{financialStatus.tuitionBalance.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Balance Due</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-8 h-8 text-purple-600" />
                    <span className={`text-2xl font-bold ${
                      financialStatus.clearanceStatus === 'cleared' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {financialStatus.clearanceStatus === 'cleared' ? 'Cleared' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Clearance Status</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Next Payment Due</span>
                    <span className="font-medium text-gray-900">{financialStatus.nextPaymentDue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Payment Status</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      financialStatus.paymentStatus === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {financialStatus.paymentStatus === 'completed' ? 'Fully Paid' : 'Partial Payment'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handlePaymentInitiate}
                    disabled={financialStatus.tuitionBalance <= 0}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      financialStatus.tuitionBalance <= 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    {financialStatus.tuitionBalance <= 0 ? 'Fully Paid' : 'Make Payment'}
                  </button>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-[#011F5B] mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Method</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialStatus.recentPayments.map((payment, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-900">{payment.date}</td>
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">K{payment.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{payment.method}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payment Modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-[#011F5B]">
                      {paymentStep === 1 && 'Select Payment Method'}
                      {paymentStep === 2 && 'Payment Details'}
                      {paymentStep === 3 && 'Confirm Payment'}
                      {paymentStep === 4 && 'Processing Payment'}
                    </h3>
                    <button
                      onClick={handlePaymentCancel}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Step 1: Payment Method Selection */}
                  {paymentStep === 1 && (
                    <div className="space-y-4">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Amount Due: K{financialStatus.tuitionBalance.toLocaleString()}</p>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                          placeholder="Enter payment amount"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <button
                          onClick={() => handlePaymentMethodSelect('mobile_money')}
                          className="w-full p-4 border border-gray-300 rounded-lg hover:border-[#FF6B35] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Mobile Money</p>
                              <p className="text-sm text-gray-600">MTN, Airtel, Zamtel</p>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePaymentMethodSelect('bank_transfer')}
                          className="w-full p-4 border border-gray-300 rounded-lg hover:border-[#FF6B35] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Building className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Bank Transfer</p>
                              <p className="text-sm text-gray-600">Direct bank deposit</p>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handlePaymentMethodSelect('credit_card')}
                          className="w-full p-4 border border-gray-300 rounded-lg hover:border-[#FF6B35] transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Credit/Debit Card</p>
                              <p className="text-sm text-gray-600">Visa, Mastercard</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Details */}
                  {paymentStep === 2 && (
                    <div className="space-y-4">
                      {paymentMethod === 'mobile_money' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={paymentDetails.phoneNumber}
                              onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="0977123456"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Money Provider</label>
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            >
                              <option>MTN Mobile Money</option>
                              <option>Airtel Money</option>
                              <option>Zamtel Money</option>
                            </select>
                          </div>
                        </>
                      )}

                      {paymentMethod === 'bank_transfer' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
                            <input
                              type="text"
                              value={paymentDetails.bankAccount}
                              onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="Account number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                            <select
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                            >
                              <option>Zanaco</option>
                              <option>Stanbic</option>
                              <option>First National Bank</option>
                              <option>ABS</option>
                            </select>
                          </div>
                        </>
                      )}

                      {paymentMethod === 'credit_card' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                            <input
                              type="text"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                              <input
                                type="text"
                                value={paymentDetails.cardExpiry}
                                onChange={(e) => setPaymentDetails({...paymentDetails, cardExpiry: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                              <input
                                type="text"
                                value={paymentDetails.cardCVV}
                                onChange={(e) => setPaymentDetails({...paymentDetails, cardCVV: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => setPaymentStep(1)}
                          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={validatePaymentDetails() ? handlePaymentDetailsSubmit : undefined}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirmation */}
                  {paymentStep === 3 && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-medium">K{paymentAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Method:</span>
                            <span className="font-medium">{paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Remaining Balance:</span>
                            <span className="font-medium">K{(financialStatus.tuitionBalance - parseFloat(paymentAmount)).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          Please confirm all payment details are correct before proceeding. This action cannot be undone.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setPaymentStep(2)}
                          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handlePaymentConfirm}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Processing */}
                  {paymentStep === 4 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600 mb-2">Processing your payment...</p>
                      <p className="text-sm text-gray-500">Please do not close this window</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-[#011F5B] mb-6">Settings</h2>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <p className="text-gray-600">Your settings and preferences will appear here.</p>
              </div>
            </div>
          )}
        </div>
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
    </div>
  )
}

// Wrapper component with NotificationProvider
const LMSDashboardPageWrapper = () => (
  <NotificationProvider>
    <LMSDashboardPage />
  </NotificationProvider>
)

export default LMSDashboardPageWrapper;
