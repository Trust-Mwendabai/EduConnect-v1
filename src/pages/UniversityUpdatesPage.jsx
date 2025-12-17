import React, { useState } from 'react'
import {
  Bell,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  ExternalLink,
  Filter,
  Search,
  ChevronDown,
  Info,
  Star,
  TrendingUp,
  CreditCard,
  BanknoteIcon,
  CalendarDays,
  User,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Award,
  Target
} from 'lucide-react'

const UniversityUpdatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedAnnouncement, setExpandedAnnouncement] = useState(null)

  // Mock data for announcements
  const [announcements] = useState([
    {
      id: 1,
      title: 'Spring 2025 Semester Registration Now Open',
      category: 'academic',
      priority: 'high',
      date: '2024-12-15',
      author: 'Registrar Office',
      content: 'Registration for Spring 2025 semester is now open for all continuing and new students. Early bird discounts available until January 15th.',
      attachments: ['registration_guide.pdf', 'course_catalog.pdf'],
      read: false
    },
    {
      id: 2,
      title: 'Tuition Fee Update for 2025 Academic Year',
      category: 'fees',
      priority: 'high',
      date: '2024-12-10',
      author: 'Finance Department',
      content: 'The university board has approved a modest 3.5% increase in tuition fees for the 2025 academic year. This adjustment helps maintain our commitment to educational excellence while managing inflation impacts.',
      attachments: ['fee_schedule_2025.pdf', 'payment_options.pdf'],
      read: false
    },
    {
      id: 3,
      title: 'New Scholarship Programs Available',
      category: 'financial',
      priority: 'medium',
      date: '2024-12-08',
      author: 'Financial Aid Office',
      content: 'We are pleased to announce three new scholarship programs for deserving students. Applications are now open with deadlines varying by program.',
      attachments: ['scholarship_guide.pdf', 'application_forms.pdf'],
      read: true
    },
    {
      id: 4,
      title: 'Campus Security Enhancement Project',
      category: 'campus',
      priority: 'medium',
      date: '2024-12-05',
      author: 'Campus Security',
      content: 'New security cameras and access control systems will be installed across campus starting January 2025. This project enhances student safety.',
      attachments: ['security_plan.pdf'],
      read: true
    },
    {
      id: 5,
      title: 'Winter Break Schedule',
      category: 'academic',
      priority: 'low',
      date: '2024-12-01',
      author: 'Academic Affairs',
      content: 'University will be closed from December 20th to January 5th for winter break. Limited services will be available during this period.',
      attachments: ['academic_calendar.pdf'],
      read: true
    }
  ])

  // Fee structure data in Zambian Kwacha (ZMW)
  const [feeStructure] = useState({
    undergraduate: {
      tuition: {
        inState: 250000, // ZMW 250,000
        outOfState: 570000, // ZMW 570,000
        international: 704000 // ZMW 704,000
      },
      housing: {
        dormitory: 130000, // ZMW 130,000
        apartment: 170000 // ZMW 170,000
      },
      other: {
        technology: 10000, // ZMW 10,000
        studentServices: 6000, // ZMW 6,000
        healthInsurance: 24000 // ZMW 24,000
      }
    },
    graduate: {
      tuition: {
        inState: 370000, // ZMW 370,000
        outOfState: 704000, // ZMW 704,000
        international: 840000 // ZMW 840,000
      },
      housing: {
        dormitory: 150000, // ZMW 150,000
        apartment: 190000 // ZMW 190,000
      },
      other: {
        technology: 15000, // ZMW 15,000
        studentServices: 8000, // ZMW 8,000
        healthInsurance: 36000 // ZMW 36,000
      }
    },
    paymentDeadlines: [
      { semester: 'Spring 2025', deadline: '2025-01-15', lateFee: 5000 }, // ZMW 5,000
      { semester: 'Summer 2025', deadline: '2025-05-15', lateFee: 5000 }, // ZMW 5,000
      { semester: 'Fall 2025', deadline: '2025-08-15', lateFee: 5000 } // ZMW 5,000
    ]
  })

  const categories = [
    { id: 'all', name: 'All Updates', icon: Bell, color: 'blue' },
    { id: 'academic', name: 'Academic', icon: BookOpen, color: 'green' },
    { id: 'fees', name: 'Fees & Payments', icon: DollarSign, color: 'orange' },
    { id: 'financial', name: 'Financial Aid', icon: CreditCard, color: 'purple' },
    { id: 'campus', name: 'Campus Life', icon: GraduationCap, color: 'red' }
  ]

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'academic': return 'bg-blue-100 text-blue-700'
      case 'fees': return 'bg-orange-100 text-orange-700'
      case 'financial': return 'bg-purple-100 text-purple-700'
      case 'campus': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#011F5B] via-[#00416A] to-[#011F5B] rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#011F5B]">University Updates</h1>
                <p className="text-sm text-gray-600">Important announcements and fee information for guardians</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/'} 
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 text-gray-700"
            >
              <ArrowRight size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]"
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#011F5B]"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(announcement.category)}`}>
                          {categories.find(cat => cat.id === announcement.category)?.name || announcement.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority.toUpperCase()}
                        </span>
                        {!announcement.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-[#011F5B] mb-3">{announcement.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{announcement.content}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {announcement.author}
                        </span>
                      </div>
                      <button
                        onClick={() => setExpandedAnnouncement(expandedAnnouncement === announcement.id ? null : announcement.id)}
                        className="text-[#011F5B] hover:text-[#00416A] text-sm font-medium flex items-center gap-1"
                      >
                        {expandedAnnouncement === announcement.id ? 'Show Less' : 'Read More'}
                        <ChevronDown className={`w-4 h-4 transform transition-transform ${expandedAnnouncement === announcement.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {expandedAnnouncement === announcement.id && announcement.attachments.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                        <div className="space-y-2">
                          {announcement.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-700">{attachment}</span>
                              </div>
                              <button className="text-[#011F5B] hover:text-[#00416A] p-1">
                                <Download size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Updates</span>
                  <span className="font-semibold text-[#011F5B]">{announcements.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Unread</span>
                  <span className="font-semibold text-red-600">{announcements.filter(a => !a.read).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Priority</span>
                  <span className="font-semibold text-orange-600">{announcements.filter(a => a.priority === 'high').length}</span>
                </div>
              </div>
            </div>

            {/* Fee Information Card */}
            <div className="bg-gradient-to-br from-[#011F5B] to-[#00416A] rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6" />
                <h3 className="font-semibold">Fee Information</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Undergraduate (In-State)</span>
                  <span className="font-semibold">ZMW {feeStructure.undergraduate.tuition.inState.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Undergraduate (Out-of-State)</span>
                  <span className="font-semibold">ZMW {feeStructure.undergraduate.tuition.outOfState.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <p className="text-sm opacity-90 mb-2">Next Payment Deadline</p>
                  <p className="font-semibold">{feeStructure.paymentDeadlines[0].semester}</p>
                  <p className="text-sm opacity-90">{feeStructure.paymentDeadlines[0].deadline}</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-white text-[#011F5B] py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Complete Fee Schedule
              </button>
            </div>

            {/* Important Contacts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6">
              <h3 className="font-semibold text-[#011F5B] mb-4">Important Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Finance Office</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Registrar Office</p>
                    <p className="text-gray-600">registrar@university.edu</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Student Services</p>
                    <p className="text-gray-600">Admin Building, Room 101</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversityUpdatesPage
