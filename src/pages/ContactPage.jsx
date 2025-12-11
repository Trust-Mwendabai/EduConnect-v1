import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react'
import { ContactForm } from '../components/forms/StyledForms'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'pulsarionitsolutions@gmail.com',
    subdetails: 'We reply within 24 hours'
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+260 777 342 846',
    subdetails: 'Mon-Fri, 8AM-5PM CAT (Zambia Time)'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: 'Lusaka, Zambia',
    subdetails: 'By appointment only'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Monday - Friday: 8AM - 5PM',
    subdetails: 'Saturday: 9AM - 1PM (CAT)'
  }
]

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer: 'Simply browse our course catalog, select the course you want, and click "Enroll Now". You can pay securely and start learning immediately.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes! We offer a 30-day money-back guarantee. If you\'re not satisfied with a course, contact us within 30 days for a full refund.'
  },
  {
    question: 'Are the certificates recognized?',
    answer: 'Yes, our certificates are recognized by many employers and institutions. Each certificate includes a unique verification code.'
  },
  {
    question: 'Can I access courses offline?',
    answer: 'Yes! Our mobile app allows you to download course videos and materials for offline access.'
  }
]

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[--color-navy-blue] via-[--color-navy-blue-light] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Get in <span className="text-[--color-warm-orange]">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-[--color-light-blue]">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[--color-warm-orange] to-[--color-warm-orange-light] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-800 font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-sm text-gray-600">
                    {info.subdetails}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[--color-navy-blue] mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <ContactForm onSubmit={(data) => {
                console.log('Contact form submitted:', data)
                alert('Thank you for contacting us! We\'ll get back to you soon.')
              }} />
            </div>
            
            {/* Map & Additional Info */}
            <div className="space-y-8">
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-64 lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
              </div>
              
              <div className="bg-[--color-light-blue] p-8 rounded-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <Clock className="w-6 h-6 text-[--color-warm-orange] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[--color-navy-blue] mb-2">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-600 text-sm">Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p className="text-gray-600 text-sm">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-[--color-warm-orange] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-[--color-navy-blue] mb-2">Live Chat</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Need immediate assistance? Our support team is available via live chat.
                    </p>
                    <button className="px-6 py-2 bg-[--color-warm-orange] text-white font-medium rounded-lg hover:bg-[--color-warm-orange-dark] transition-colors duration-300">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-[--color-light-blue]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-navy-blue] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[--color-navy-blue] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage