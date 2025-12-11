import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { HelpCircle, Search, BookOpen, Video, MessageCircle, FileText, Users, Settings, CreditCard, GraduationCap } from 'lucide-react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using EduConnect',
      articles: 12
    },
    {
      icon: GraduationCap,
      title: 'Courses & Learning',
      description: 'Information about courses and assignments',
      articles: 18
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      description: 'Payment methods and billing questions',
      articles: 8
    },
    {
      icon: Users,
      title: 'Account Management',
      description: 'Manage your profile and settings',
      articles: 10
    },
    {
      icon: Video,
      title: 'Technical Support',
      description: 'Troubleshooting and technical issues',
      articles: 15
    },
    {
      icon: Settings,
      title: 'Platform Features',
      description: 'Explore all platform capabilities',
      articles: 20
    }
  ]

  const popularArticles = [
    'How do I reset my password?',
    'How to enroll in a course?',
    'Understanding the grading system',
    'How to contact my instructor?',
    'Payment methods and refund policy',
    'Accessing course materials',
    'Setting up notifications',
    'Using the virtual classroom'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Help Center
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Find answers to your questions and get the support you need.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] text-gray-900"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold text-[#011F5B] mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                      {category.description}
                    </p>
                    <span className="text-sm text-[#FF6B35] font-medium">
                      {category.articles} articles
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Popular Articles */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#011F5B] mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Popular Articles
          </h2>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <FileText className="w-5 h-5 text-[#011F5B] group-hover:text-[#FF6B35] transition-colors" />
                  <span className="text-gray-700 group-hover:text-[#011F5B] transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                    {article}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-xl shadow-md p-8 text-white text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Still Need Help?
            </h3>
            <p className="mb-6 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              Our support team is here to assist you with any questions or concerns.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}