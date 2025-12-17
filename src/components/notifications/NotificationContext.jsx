import React, { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'announcement',
      title: 'System Maintenance Scheduled',
      message: 'The EduConnect platform will undergo maintenance on Saturday.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      category: 'system'
    },
    {
      id: 2,
      type: 'success',
      title: 'Assignment Submitted Successfully',
      message: 'Your Advanced React Development assignment has been submitted.',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      category: 'assignments'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Payment Reminder',
      message: 'Your monthly tuition payment is due in 3 days.',
      time: '6 hours ago',
      read: true,
      priority: 'high',
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
      time: '1 day ago',
      read: true,
      priority: 'medium',
      category: 'courses',
      action: {
        label: 'View Course',
        onClick: () => console.log('Navigate to course')
      }
    },
    {
      id: 5,
      type: 'info',
      title: 'New Message from Instructor',
      message: 'Dr. Sarah Johnson sent you a message regarding your React project.',
      time: '3 days ago',
      read: false,
      priority: 'medium',
      category: 'messages',
      action: {
        label: 'View Message',
        onClick: () => console.log('Navigate to messages')
      }
    }
  ])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      time: 'Just now'
    }
    setNotifications(prev => [newNotification, ...prev])
  }

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
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Toast notification functions
  const showSuccess = (message) => {
    addNotification({
      type: 'success',
      title: 'Success',
      message,
      priority: 'low'
    })
  }

  const showError = (message) => {
    addNotification({
      type: 'error',
      title: 'Error',
      message,
      priority: 'high'
    })
  }

  const showWarning = (message) => {
    addNotification({
      type: 'warning',
      title: 'Warning',
      message,
      priority: 'medium'
    })
  }

  const showInfo = (message) => {
    addNotification({
      type: 'info',
      title: 'Information',
      message,
      priority: 'low'
    })
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
