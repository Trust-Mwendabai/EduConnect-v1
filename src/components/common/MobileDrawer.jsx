import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Home, BookOpen, Users, ShoppingCart, User, Settings, LogOut, Bell, ChevronRight } from 'lucide-react'

const MobileDrawer = ({ isOpen, onClose, userRole = 'guest', userData = {} }) => {
  const location = useLocation()

  const getMenuSections = () => {
    const sections = []

    if (userRole !== 'guest') {
      sections.push({
        title: 'My Account',
        items: [
          { name: 'Dashboard', path: '/dashboard', icon: User },
          { name: 'Profile', path: '/profile', icon: User },
          { name: 'Settings', path: '/settings', icon: Settings },
          { name: 'Notifications', path: '/notifications', icon: Bell }
        ]
      })
    }

    const roleSpecificItems = {
      student: [
        { name: 'My Courses', path: '/courses', icon: BookOpen },
        { name: 'Assignments', path: '/assignments', icon: BookOpen },
        { name: 'LMS Dashboard', path: '/lms', icon: BookOpen }
      ],
      guardian: [
        { name: 'Guardian Portal', path: '/guardian', icon: Users },
        { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart }
      ],
      instructor: [
        { name: 'Instructor Dashboard', path: '/instructor', icon: User },
        { name: 'My Courses', path: '/instructor/courses', icon: BookOpen },
        { name: 'Analytics', path: '/instructor/analytics', icon: Settings }
      ]
    }

    if (userRole !== 'guest' && roleSpecificItems[userRole]) {
      sections.push({
        title: 'My Learning',
        items: roleSpecificItems[userRole]
      })
    }

    sections.push({
      title: 'Explore',
      items: [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Courses', path: '/courses', icon: BookOpen },
        { name: 'Features', path: '/features', icon: BookOpen },
        { name: 'About', path: '/about', icon: User },
        { name: 'Contact', path: '/contact', icon: User }
      ]
    })

    if (userRole === 'guest') {
      sections.push({
        title: 'Portals',
        items: [
          { name: 'Student Dashboard', path: '/lms', icon: User },
          { name: 'Guardian Portal', path: '/guardian', icon: Users },
          { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart }
        ]
      })
    }

    return sections
  }

  const menuSections = getMenuSections()

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <span className="text-lg font-bold text-gray-800">EduConnect</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          {userRole !== 'guest' && (
            <div className="px-4 py-3 bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-semibold">{userData.name || 'User'}</div>
                  <div className="text-sm text-white/80 capitalize">{userRole}</div>
                </div>
              </div>
            </div>
          )}

          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                      location.pathname === item.path ? 'bg-[#011F5B]/10 text-[#011F5B] border-r-3 border-[#011F5B]' : 'text-gray-700'
                    }`}
                  >
                    <item.icon size={18} className={location.pathname === item.path ? 'text-[#011F5B]' : 'text-gray-400'} />
                    <span className="flex-1 font-medium">{item.name}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {userRole !== 'guest' && (
            <div className="px-4 py-4 border-t border-gray-200">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}

          {userRole === 'guest' && (
            <div className="px-4 py-4 border-t border-gray-200 space-y-3">
              <Link 
                to="/login" 
                onClick={onClose}
                className="block w-full px-6 py-3 text-center text-[#011F5B] border border-[#011F5B] rounded-lg font-medium hover:bg-[#011F5B]/10 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                onClick={onClose}
                className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileDrawer
