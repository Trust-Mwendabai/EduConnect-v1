import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import NotificationDropdown from './notifications/NotificationDropdown'
import { useNotifications } from './notifications/NotificationContext'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()
  
  const { notifications, markAsRead, deleteNotification } = useNotifications()

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

  const handleViewAllNotifications = () => {
    navigate('/notifications')
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#011F5B] to-[#00416A] transition-all duration-300 ${isScrolled ? 'py-3 shadow-lg' : 'py-4'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1 text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-white">Edu</span>
            <span className="text-[#FF6B35]">Connect</span>
          </Link>

          <div className={`md:flex gap-8 items-center ${isMobileMenuOpen ? 'flex' : 'hidden'} absolute md:relative top-[70px] md:top-0 left-0 right-0 md:left-auto md:right-auto bg-[#011F5B] md:bg-transparent flex-col md:flex-row p-6 md:p-0 gap-4 md:gap-8 shadow-lg md:shadow-none transition-all duration-300`}>
            <Link to="/" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group" style={{ fontFamily: 'var(--font-heading)' }}>
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Dropdown Menu */}
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
                  <Link 
                    to="/lms" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Student Dashboard
                  </Link>
                  <Link 
                    to="/guardian" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Guardian Portal
                  </Link>
                  <Link 
                    to="/vendor" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Vendor Dashboard
                  </Link>
                  <Link 
                    to="/admin" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Admin Portal
                  </Link>
                  <Link 
                    to="/marketplace" 
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#011F5B] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Marketplace
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/courses" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group" style={{ fontFamily: 'var(--font-heading)' }}>
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/features" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group" style={{ fontFamily: 'var(--font-heading)' }}>
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group" style={{ fontFamily: 'var(--font-heading)' }}>
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200 relative group" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B35] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <NotificationDropdown 
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
              onViewAll={handleViewAllNotifications}
            />
            <Link to="/login" className="text-white font-medium hover:text-[#FF6B35] transition-colors duration-200" style={{ fontFamily: 'var(--font-heading)' }}>
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              Get Started
            </Link>
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

export default Navbar