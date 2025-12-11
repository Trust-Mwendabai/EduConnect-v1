import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Shield, Lock, Eye, FileText, Database, Users } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, including name, email address, and educational information. We also automatically collect certain information about your device when you use our services.'
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your learning experience.'
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We may share your information with service providers, educational institutions, and as required by law.'
    },
    {
      icon: Eye,
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can also opt-out of certain data collection and marketing communications.'
    },
    {
      icon: FileText,
      title: 'Policy Updates',
      content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.'
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Privacy Policy
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              At EduConnect, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              By using EduConnect, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
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

          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-xl shadow-md p-8 mt-8 text-white">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Questions About Privacy?
            </h3>
            <p className="mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}