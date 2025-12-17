import React, { useState, useEffect, createContext, useContext } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Bell, BellRing, Mail, MessageSquare, Calendar, DollarSign, BookOpen, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GradientCard, gradients } from '../common/GradientStyles'

// Notification Context
const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [banners, setBanners] = useState([])

  const addNotification = (notification) => {
    const id = Date.now().toString()
    const newNotification = { ...notification, id }
    setNotifications(prev => [...prev, newNotification])

    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const addBanner = (banner) => {
    const id = Date.now().toString()
    const newBanner = { ...banner, id }
    setBanners(prev => [...prev, newBanner])
    return id
  }

  const removeBanner = (id) => {
    setBanners(prev => prev.filter(b => b.id !== id))
  }

  const showSuccess = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      icon: CheckCircle,
      ...options
    })
  }

  const showError = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      icon: AlertCircle,
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      icon: AlertTriangle,
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      icon: Info,
      ...options
    })
  }

  const value = {
    notifications,
    banners,
    addNotification,
    removeNotification,
    addBanner,
    removeBanner,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
      <BannerContainer />
    </NotificationContext.Provider>
  )
}

// Toast Notification Component
const ToastNotification = ({ notification, onRemove }) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      text: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800'
    }
  }

  const style = typeStyles[notification.type] || typeStyles.info
  const IconComponent = notification.icon || Info

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      className={`${style.bg} ${style.border} border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md`}
    >
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className={`font-medium ${style.text}`}>{notification.message}</p>
          {notification.description && (
            <p className={`text-sm ${style.text} opacity-80 mt-1`}>{notification.description}</p>
          )}
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className={`p-1 rounded hover:bg-black/10 transition-colors ${style.text} opacity-60 hover:opacity-100`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {notification.action && (
        <div className="mt-3">
          <button
            onClick={notification.action.onClick}
            className={`text-sm font-medium ${style.text} hover:underline`}
          >
            {notification.action.label}
          </button>
        </div>
      )}
    </motion.div>
  )
}

// Toast Container
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map(notification => (
          <div key={notification.id} className="pointer-events-auto">
            <ToastNotification
              notification={notification}
              onRemove={removeNotification}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Banner Component
const Banner = ({ banner, onRemove }) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      text: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800'
    }
  }

  const style = typeStyles[banner.type] || typeStyles.info
  const IconComponent = banner.icon || Info

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`${style.bg} ${style.border} border-b`}
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconComponent className={`w-5 h-5 ${style.icon}`} />
            <div>
              <p className={`font-medium ${style.text}`}>{banner.message}</p>
              {banner.description && (
                <p className={`text-sm ${style.text} opacity-80`}>{banner.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {banner.action && (
              <button
                onClick={banner.action.onClick}
                className={`text-sm font-medium ${style.text} hover:underline`}
              >
                {banner.action.label}
              </button>
            )}
            <button
              onClick={() => onRemove(banner.id)}
              className={`p-1 rounded hover:bg-black/10 transition-colors ${style.text} opacity-60 hover:opacity-100`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Banner Container
const BannerContainer = () => {
  const { banners, removeBanner } = useNotifications()

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <AnimatePresence>
        {banners.map(banner => (
          <Banner key={banner.id} banner={banner} onRemove={removeBanner} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Alert Component
export const Alert = ({ type, title, message, icon, dismissible, onDismiss, children }) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      text: 'text-yellow-800'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800'
    }
  }

  const style = typeStyles[type] || typeStyles.info
  const IconComponent = icon || (type === 'success' ? CheckCircle : type === 'error' ? AlertCircle : type === 'warning' ? AlertTriangle : Info)

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <IconComponent className={`w-5 h-5 ${style.icon} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && <p className={`font-semibold ${style.text} mb-1`}>{title}</p>}
          {message && <p className={`${style.text}`}>{message}</p>}
          {children}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`p-1 rounded hover:bg-black/10 transition-colors ${style.text} opacity-60 hover:opacity-100`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// Notification Center Component
export const NotificationCenter = ({ isOpen, onClose }) => {
  const { notifications, removeNotification } = useNotifications()
  const [activeTab, setActiveTab] = useState('all')

  const sampleNotifications = [
    {
      id: '1',
      type: 'success',
      title: 'Assignment Submitted',
      message: 'Your Math assignment has been successfully submitted.',
      time: '2 minutes ago',
      icon: BookOpen,
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'New Course Available',
      message: 'Advanced Physics is now available for enrollment.',
      time: '1 hour ago',
      icon: BookOpen,
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Payment Due Soon',
      message: 'Your monthly tuition payment is due in 3 days.',
      time: '3 hours ago',
      icon: DollarSign,
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Assignment Failed',
      message: 'Failed to submit your History assignment. Please try again.',
      time: '5 hours ago',
      icon: AlertCircle,
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: 'New Message',
      message: 'You have a new message from your instructor.',
      time: '1 day ago',
      icon: MessageSquare,
      read: true
    }
  ]

  const allNotifications = [...notifications, ...sampleNotifications]

  const filteredNotifications = allNotifications.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  const markAsRead = (id) => {
    // In a real app, this would update the notification in the database
    console.log('Mark as read:', id)
  }

  const clearAll = () => {
    // In a real app, this would clear all notifications
    console.log('Clear all notifications')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                <p className="text-sm text-gray-600">Stay updated with your learning journey</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All', count: allNotifications.length },
              { id: 'unread', label: 'Unread', count: allNotifications.filter(n => !n.read).length },
              { id: 'success', label: 'Success' },
              { id: 'warning', label: 'Warnings' },
              { id: 'error', label: 'Errors' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#011F5B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      notification.type === 'success' ? 'bg-green-100' :
                      notification.type === 'error' ? 'bg-red-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      <notification.icon className={`w-5 h-5 ${
                        notification.type === 'success' ? 'text-green-600' :
                        notification.type === 'error' ? 'text-red-600' :
                        notification.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={clearAll}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white rounded-lg hover:shadow-md transition-shadow"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default {
  NotificationProvider,
  useNotifications,
  Alert,
  NotificationCenter
}
