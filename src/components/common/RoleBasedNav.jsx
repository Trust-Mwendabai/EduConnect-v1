import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, User, BookOpen, Users, ShoppingCart, Settings, LogOut, Bell } from 'lucide-react'

const RoleBasedNav = ({ userRole = 'guest', userData = {} }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', path: '/', icon: null },
      { name: 'Courses', path: '/courses', icon: BookOpen },
      { name: 'Features', path: '/features', icon: null },
      { name: 'About', path: '/about', icon: null },
      { name: 'Contact', path: '/contact', icon: null }
    ]

    const roleSpecificItems = {
      student: [
        { name: 'Dashboard', path: '/dashboard', icon: User },
        { name: 'Assignments', path: '/assignments', icon: BookOpen },
        { name: 'LMS', path: '/lms', icon: BookOpen }
      ],
      guardian: [
        { name: 'Guardian Portal', path: '/guardian', icon: Users },
        { name: 'Marketplace', path: '/marketplace', icon: ShoppingCart }
      ],
      instructor: [
        { name: 'Instructor Dashboard', path: '/instructor', icon: User },
        { name: 'My Courses', path: '/instructor/courses', icon: BookOpen },
        { name: 'Analytics', path: '/instructor/analytics', icon: Settings }
      ],
      admin: [
        { name: 'Admin Dashboard', path: '/admin', icon: Settings },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Reports', path: '/admin/reports', icon: BookOpen }
      ]
    }

    if (userRole !== 'guest' && roleSpecificItems[userRole]) {
      return [...roleSpecificItems[userRole], ...baseItems.slice(2)]
    }

    return baseItems
  }

  const getPortalDropdown = () => {
    if (userRole === 'guest') {
      return [
        { name: 'Student Dashboard', path: '/lms' },
        { name: 'Guardian Portal', path: '/guardian' },
        { name: 'Marketplace', path: '/marketplace' }
      ]
    }
    return []
  }

  const navItems = getNavItems()
  const portalDropdown = getPortalDropdown()

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#011F5B] to-[#00416A] transition-all duration-300 ${isScrolled ? 'py-3 shadow-lg' : 'py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-white">Edu</span>
            <span className="text-[#FF6B35]">Connect</span>
          </Link>

          <div className={`md:flex gap-8 items-center ${isMobileMenuOpen ? 'flex' : 'hidden'} absolute md:relative top-[70px] md:top-0 left-0 right-0 md:left-auto md:right-auto bg-[#011F5B] md:bg-transparent flex-col md:flex-row p-6 md:p-0 gap-4 md:gap-8 shadow-lg md:shadow-none transition-all duration-300`}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group flex items-center gap-2 ${location.pathname === item.path ? 'text-[#FF6B35]' : ''}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.icon && <item.icon size={16} />}
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {portalDropdown.length > 0 && (
              <div className="relative">
                <button 
                  className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Portals
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {portalDropdown.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.path} 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex gap-4 items-center">
            {userRole !== 'guest' ? (
              <>
                <button className="text-white p-2 hover:text-[#FF6B35] transition-colors duration-200 relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B35] rounded-full"></span>
                </button>
                <div className="relative">
                  <button 
                    className="flex items-center gap-2 text-white font-medium hover:text-[#FF6B35] transition-colors duration-200"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  >
                    <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <ChevronDown size={16} />
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button 
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          // Handle logout
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <LogOut size={16} />
                          Logout
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200" style={{ fontFamily: 'var(--font-heading)' }}>
                  Login
                </Link>
                <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default RoleBasedNav
