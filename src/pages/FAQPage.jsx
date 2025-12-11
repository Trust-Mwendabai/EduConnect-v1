import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Get Started" button on the homepage, fill in your details including name, email, and password, then verify your email address to activate your account.'
        },
        {
          question: 'Is EduConnect free to use?',
          answer: 'EduConnect offers both free and premium courses. Basic access to the platform is free, but some advanced courses and features require a paid subscription.'
        },
        {
          question: 'What devices can I use to access EduConnect?',
          answer: 'EduConnect is accessible on desktop computers, laptops, tablets, and smartphones through any modern web browser. We also offer mobile apps for iOS and Android.'
        }
      ]
    },
    {
      category: 'Courses & Learning',
      questions: [
        {
          question: 'How do I enroll in a course?',
          answer: 'Browse the course catalog, click on a course you\'re interested in, review the details, and click the "Enroll" button. For paid courses, you\'ll need to complete the payment process first.'
        },
        {
          question: 'Can I access courses offline?',
          answer: 'Yes, many courses offer downloadable materials and videos that you can access offline through our mobile apps. Look for the download icon next to course materials.'
        },
        {
          question: 'How long do I have access to a course?',
          answer: 'Once enrolled, you have lifetime access to most courses, including all future updates. Some specialized programs may have time-limited access as specified in the course details.'
        },
        {
          question: 'Do I get a certificate upon completion?',
          answer: 'Yes, you receive a certificate of completion for each course you finish. Certificates can be downloaded, shared on LinkedIn, or added to your resume.'
        }
      ]
    },
    {
      category: 'Payments & Billing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Some regions may have additional local payment options.'
        },
        {
          question: 'What is your refund policy?',
          answer: 'We offer a 30-day money-back guarantee for all paid courses. If you\'re not satisfied, contact our support team within 30 days of purchase for a full refund.'
        },
        {
          question: 'Can I get a receipt for my purchase?',
          answer: 'Yes, receipts are automatically sent to your registered email address after each purchase. You can also download receipts from your account dashboard under Payment History.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
        },
        {
          question: 'Videos are not playing. What should I do?',
          answer: 'First, check your internet connection. Clear your browser cache, try a different browser, or disable browser extensions. If the problem persists, contact our technical support team.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your account settings by clicking on your profile icon, then select "Edit Profile". Update your information and click "Save Changes" to apply the updates.'
        }
      ]
    },
    {
      category: 'Account Management',
      questions: [
        {
          question: 'Can I change my email address?',
          answer: 'Yes, go to Account Settings > Profile, enter your new email address, and verify it through the confirmation email we send to your new address.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Contact our support team to request account deletion. Please note that this action is permanent and cannot be undone. All your course progress and certificates will be lost.'
        },
        {
          question: 'Can I have multiple accounts?',
          answer: 'Each person should have only one account. If you need separate accounts for personal and professional use, please contact our support team for guidance.'
        }
      ]
    }
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Find quick answers to common questions about EduConnect.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
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

      {/* FAQ Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-[#011F5B] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`
                  const isOpen = openIndex === index
                  
                  return (
                    <div 
                      key={questionIndex} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg font-semibold text-[#011F5B] pr-4" style={{ fontFamily: 'var(--font-heading)' }}>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#FF6B35] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                No FAQs found matching your search. Try different keywords.
              </p>
            </div>
          )}

          {/* Still Have Questions */}
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-xl shadow-md p-8 text-white text-center mt-12">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Still Have Questions?
            </h3>
            <p className="mb-6 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              Can't find the answer you're looking for? Our support team is here to help.
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