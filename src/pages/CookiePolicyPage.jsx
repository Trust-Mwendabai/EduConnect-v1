import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Cookie, Settings, BarChart3, Target, Shield, Info } from 'lucide-react'

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the platform to function properly. These cannot be disabled.',
      examples: 'Authentication, security, load balancing'
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      examples: 'Language preferences, region settings, customization'
    },
    {
      icon: BarChart3,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our platform.',
      examples: 'Page views, session duration, user behavior'
    },
    {
      icon: Target,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
      examples: 'Ad targeting, conversion tracking, remarketing'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Cookie Policy
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Learn about how we use cookies and similar technologies on our platform.
            </p>
            <p className="text-sm text-white/70 mt-4">Last Updated: January 15, 2025</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#011F5B] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              What Are Cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              Cookies are small text files that are placed on your device when you visit our platform. They help us provide you with a better experience by remembering your preferences and understanding how you use our services.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period or until you delete them).
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#011F5B] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Types of Cookies We Use
          </h2>

          <div className="grid gap-6 mb-8">
            {cookieTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {type.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                        {type.description}
                      </p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                          <span className="font-semibold">Examples:</span> {type.examples}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-[#011F5B] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Managing Your Cookie Preferences
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-body)' }}>
              You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some features may no longer be fully functional.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="font-semibold">Browser Settings:</span> Most browsers allow you to refuse or accept cookies through their settings.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="font-semibold">Cookie Consent Tool:</span> Use our cookie consent banner to customize your preferences.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
                  <span className="font-semibold">Third-Party Opt-Out:</span> Visit opt-out pages of third-party advertising networks.
                </p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-xl shadow-md p-8 text-white">
            <div className="flex items-start gap-4">
              <Info className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Need More Information?
                </h3>
                <p className="mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  If you have questions about our use of cookies or other technologies, please contact our support team.
                </p>
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}