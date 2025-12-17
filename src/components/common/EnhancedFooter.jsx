import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock, ChevronRight, Send, MessageCircle, HelpCircle } from 'lucide-react'

const EnhancedFooter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  const contactInfo = {
    email: 'support@educonnect.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education Street, Learning City, LC 12345',
    hours: 'Mon-Fri: 9AM-6PM EST'
  }

  const quickLinks = {
    'For Students': [
      { name: 'Browse Courses', path: '/courses' },
      { name: 'Student Dashboard', path: '/lms' },
      { name: 'Assignments', path: '/assignments' },
      { name: 'Study Resources', path: '/resources' }
    ],
    'For Parents': [
      { name: 'Guardian Portal', path: '/guardian' },
      { name: 'Progress Tracking', path: '/guardian/progress' },
      { name: 'Payment Options', path: '/payment' },
      { name: 'Support Center', path: '/help' }
    ],
    'Resources': [
      { name: 'Help Center', path: '/help' },
      { name: 'Blog', path: '/blog' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Community Forum', path: '/community' }
    ],
    'Company': [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Partners', path: '/partners' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-br from-[#011F5B] via-[#00416A] to-[#011F5B] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="inline-flex items-center gap-2 text-3xl font-bold">
                <span className="text-white">Edu</span>
                <span className="text-[#FF6B35]">Connect</span>
              </Link>
              
              <p className="text-white/80 leading-relaxed max-w-md">
                Empowering learners worldwide with quality education and expert guidance. 
                Join our community and transform your future through innovative learning experiences.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm">{contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Phone className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm">{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm">{contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-sm">{contactInfo.hours}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-[#FF6B35] transition-all duration-300 hover:-translate-y-1 group"
                    aria-label={social.name}
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Sections */}
            {Object.entries(quickLinks).map(([category, links], index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200 text-sm"
                      >
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-white/10 pt-12 pb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                <p className="text-white/80 mb-6">
                  Get the latest updates on courses, features, and educational resources delivered to your inbox.
                </p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-[#FF6B35] focus:bg-white/15 transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubscribed ? (
                    <>
                      <span className="text-green-300">Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <MessageCircle size={16} />
                <span>Live Chat</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <HelpCircle size={16} />
                <span>Help Center</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Send size={16} />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © 2025 EduConnect. All rights reserved. Made with ❤️ for learners worldwide.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default EnhancedFooter
