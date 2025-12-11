import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FileText, CheckCircle, AlertCircle, Scale, UserCheck, Ban } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      icon: UserCheck,
      title: 'Acceptance of Terms',
      content: 'By accessing and using EduConnect, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.'
    },
    {
      icon: CheckCircle,
      title: 'User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use.'
    },
    {
      icon: FileText,
      title: 'Intellectual Property',
      content: 'All content on EduConnect, including text, graphics, logos, and software, is the property of EduConnect or its content suppliers and is protected by intellectual property laws.'
    },
    {
      icon: Scale,
      title: 'User Conduct',
      content: 'You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair the service. Harassment, abuse, or violation of others\' rights is strictly prohibited.'
    },
    {
      icon: Ban,
      title: 'Prohibited Activities',
      content: 'Users may not engage in unauthorized access, data mining, interference with platform operations, or any activity that violates applicable laws or regulations.'
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: 'EduConnect shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the platform.'
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Terms of Service
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Please read these terms carefully before using our platform.
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
              Agreement to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              These Terms of Service constitute a legally binding agreement between you and EduConnect regarding your use of our platform and services.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
            </p>
          </div>

          <div className="grid gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        {section.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mt-8">
            <h3 className="text-2xl font-bold text-[#011F5B] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Governing Law
            </h3>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms 
              shall be resolved through binding arbitration or in the courts of appropriate jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}