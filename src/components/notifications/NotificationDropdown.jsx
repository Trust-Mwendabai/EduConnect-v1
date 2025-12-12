import React, { useState, useRef, useEffect } from 'react'
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
  Clock,
  Eye,
  Trash2,
  ChevronRight
} from 'lucide-react'

const NotificationDropdown = ({ notifications, onMarkAsRead, onDelete, onViewAll }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
      case 'success': return 'text-green-600 bg-green-100'
      case 'error': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      case 'announcement': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
    if (notification.action?.onClick) {
      notification.action.onClick()
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-[#FF6B35] transition-colors duration-200"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-5 h-5" />
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.slice(0, 5).map(notification => {
                  const IconComponent = getNotificationIcon(notification.type)
                  const colorClass = getNotificationColor(notification.type)
                  
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`text-sm font-medium line-clamp-1 ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {notification.time}
                                </span>
                                {notification.priority === 'high' && (
                                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                                    High
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onMarkAsRead(notification.id)
                                  }}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                                  title="Mark as read"
                                >
                                  <Eye className="w-3 h-3 text-gray-400" />
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDelete(notification.id)
                                }}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  onViewAll()
                  setIsOpen(false)
                }}
                className="w-full text-center text-sm text-[#011F5B] hover:text-[#FF6B35] font-medium transition-colors flex items-center justify-center gap-1"
              >
                View All Notifications
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationDropdown
