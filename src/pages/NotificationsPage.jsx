import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Bell, 
  BellRing, 
  X, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Calendar, 
  DollarSign, 
  BookOpen, 
  User, 
  MessageSquare,
  Megaphone,
  Star,
  Heart,
  Share2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  EyeOff,
  Trash2,
  Archive,
  Settings,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff
} from 'lucide-react'
import { useNotifications } from '../components/notifications/NotificationSystem'

function NotificationsPage() {
  const { showSuccess, showError, showWarning, showInfo } = useNotifications()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNotifications, setSelectedNotifications] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    announcements: true,
    assignments: true,
    payments: true,
    grades: true,
    messages: true,
    system: true
  })

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'announcement',
      title: 'System Maintenance Scheduled',
      message: 'The EduConnect platform will undergo maintenance on Saturday, January 20th from 2:00 AM to 6:00 AM CAT. Please save your work and log out before this time.',
      description: 'Essential system updates and performance improvements will be implemented during this maintenance window.',
      time: '2 hours ago',
      date: '2024-01-15',
      read: false,
      priority: 'high',
      icon: Megaphone,
      category: 'system',
      action: {
        label: 'Learn More',
        onClick: () => console.log('Learn more about maintenance')
      }
    },
    {
      id: 2,
      type: 'success',
      title: 'Assignment Submitted Successfully',
      message: 'Your Advanced React Development assignment has been submitted and is now being graded.',
      description: 'Assignment: React Hooks Implementation - Submitted on time',
      time: '4 hours ago',
      date: '2024-01-15',
      read: false,
      priority: 'medium',
      icon: CheckCircle,
      category: 'assignments'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment Reminder',
      message: 'Your monthly tuition payment of ZMW 2,500 is due in 3 days.',
      description: 'Course: Advanced React Development - Due date: January 18, 2024',
      time: '6 hours ago',
      date: '2024-01-15',
      read: true,
      priority: 'high',
      icon: DollarSign,
      category: 'payments',
      action: {
        label: 'Pay Now',
        onClick: () => console.log('Navigate to payment')
      }
    },
    {
      id: 4,
      type: 'info',
      title: 'New Course Available',
      message: 'Machine Learning Fundamentals is now open for enrollment.',
      description: 'Start your journey into AI and machine learning with our comprehensive course.',
      time: '1 day ago',
      date: '2024-01-14',
      read: true,
      priority: 'medium',
      icon: BookOpen,
      category: 'courses',
      action: {
        label: 'View Course',
        onClick: () => console.log('Navigate to course')
      }
    },
    {
      id: 5,
      type: 'error',
      title: 'Assignment Submission Failed',
      message: 'Failed to submit your Database Management assignment. Please try again.',
      description: 'Error: File size exceeds limit. Please compress your submission.',
      time: '2 days ago',
      date: '2024-01-13',
      read: true,
      priority: 'high',
      icon: AlertCircle,
      category: 'assignments',
      action: {
        label: 'Retry Submission',
        onClick: () => console.log('Retry assignment submission')
      }
    },
    {
      id: 6,
      type: 'info',
      title: 'New Message from Instructor',
      message: 'Dr. Sarah Johnson sent you a message regarding your React project.',
      description: 'Subject: Great progress on your custom hooks implementation!',
      time: '3 days ago',
      date: '2024-01-12',
      read: false,
      priority: 'medium',
      icon: MessageSquare,
      category: 'messages',
      action: {
        label: 'View Message',
        onClick: () => console.log('Navigate to messages')
      }
    },
    {
      id: 7,
      type: 'success',
      title: 'Quiz Completed',
      message: 'You scored 85% on the React Hooks quiz!',
      description: 'Great job! You can now review your answers and feedback.',
      time: '4 days ago',
      date: '2024-01-11',
      read: true,
      priority: 'low',
      icon: Star,
      category: 'grades',
      action: {
        label: 'View Results',
        onClick: () => console.log('Navigate to quiz results')
      }
    },
    {
      id: 8,
      type: 'announcement',
      title: 'Holiday Schedule Update',
      message: 'Please note the updated class schedule for the upcoming holidays.',
      description: 'Classes will resume on January 22, 2024. Enjoy your break!',
      time: '5 days ago',
      date: '2024-01-10',
      read: true,
      priority: 'medium',
      icon: Calendar,
      category: 'system'
    }
  ])

  // Announcements section
  const [announcements] = useState([
    {
      id: 1,
      title: 'EduConnect 2.0 Launch',
      message: 'We are excited to announce the launch of EduConnect 2.0 with enhanced features and improved user experience.',
      type: 'feature',
      priority: 'high',
      date: '2024-01-15',
      author: 'Admin Team',
      read: false,
      banner: true
    },
    {
      id: 2,
      title: 'New Payment Methods Available',
      message: 'We now support mobile money payments through MTN Mobile Money and Airtel Money.',
      type: 'payment',
      priority: 'medium',
      date: '2024-01-14',
      author: 'Finance Team',
      read: false,
      banner: true
    },
    {
      id: 3,
      title: 'Study Room Feature Live',
      message: 'Collaborative study rooms are now available for real-time group learning sessions.',
      type: 'feature',
      priority: 'medium',
      date: '2024-01-13',
      author: 'Development Team',
      read: true,
      banner: false
    }
  ])

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.read) ||
                      notification.type === activeTab ||
                      notification.category === activeTab
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    setSelectedNotifications(prev => {
      const newSet = new Set(prev)
      newSet.delete(id)
      return newSet
    })
  }

  const toggleSelection = (id) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.has(n.id)))
    setSelectedNotifications(new Set())
    showSuccess('Selected notifications deleted')
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'error': return AlertCircle
      case 'warning': return AlertTriangle
      case 'info': return Info
      case 'announcement': return Megaphone
      default: return Bell
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600 border-green-200'
      case 'error': return 'bg-red-100 text-red-600 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-600 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-600 border-blue-200'
      case 'announcement': return 'bg-purple-100 text-purple-600 border-purple-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Notifications & Announcements</h1>
              <p className="text-white/80">Stay updated with important updates and announcements</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-sm mt-1">{unreadCount} unread</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Announcements Banner */}
        <div className="mb-6 space-y-3">
          {announcements.filter(a => a.banner).map(announcement => (
            <div key={announcement.id} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">{announcement.title}</h3>
                      <p className="text-purple-800 mb-2">{announcement.message}</p>
                      <div className="flex items-center gap-4 text-sm text-purple-600">
                        <span>{announcement.author}</span>
                        <span>•</span>
                        <span>{announcement.date}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-purple-100 rounded transition-colors">
                      <X className="w-4 h-4 text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35] w-full"
                />
              </div>
              
              {/* Filters */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Mark All Read
                </button>
              )}
              {selectedNotifications.size > 0 && (
                <button
                  onClick={deleteSelected}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete Selected ({selectedNotifications.size})
                </button>
              )}
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['all', 'unread', 'announcements', 'assignments', 'payments', 'grades', 'messages', 'system'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveTab(filter)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === filter
                        ? 'bg-[#011F5B] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'all', label: 'All Notifications', count: notifications.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'announcement', label: 'Announcements', count: notifications.filter(n => n.type === 'announcement').length },
              { id: 'assignments', label: 'Assignments', count: notifications.filter(n => n.category === 'assignments').length },
              { id: 'payments', label: 'Payments', count: notifications.filter(n => n.category === 'payments').length },
              { id: 'grades', label: 'Grades', count: notifications.filter(n => n.category === 'grades').length },
              { id: 'messages', label: 'Messages', count: notifications.filter(n => n.category === 'messages').length },
              { id: 'system', label: 'System', count: notifications.filter(n => n.category === 'system').length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#011F5B] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            filteredNotifications.map(notification => {
              const IconComponent = getNotificationIcon(notification.type)
              const colorClass = getNotificationColor(notification.type)
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${
                    !notification.read ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedNotifications.has(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${colorClass}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            {notification.priority === 'high' && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">High Priority</span>
                            )}
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          {notification.description && (
                            <p className="text-sm text-gray-500 mb-3">{notification.description}</p>
                          )}
                          
                          {/* Action Button */}
                          {notification.action && (
                            <button
                              onClick={notification.action.onClick}
                              className="px-3 py-1 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF8C61] transition-colors mr-3"
                            >
                              {notification.action.label}
                            </button>
                          )}
                          
                          {/* Meta Info */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </span>
                            <span className="capitalize">{notification.category}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Announcements Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Announcements</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 mb-3">{announcement.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>{announcement.author}</span>
                        <span>•</span>
                        <span>{announcement.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Heart className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotificationsPage
