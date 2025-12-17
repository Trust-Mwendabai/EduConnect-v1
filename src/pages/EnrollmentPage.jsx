import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin, CheckCircle, AlertCircle, Clock, BookOpen, Users, Star, Shield, FileText } from 'lucide-react'

export default function EnrollmentPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [course, setCourse] = useState(null)
  const [enrollmentData, setEnrollmentData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: 'Lusaka',
      country: 'Zambia'
    },
    payment: {
      method: 'mobile_money',
      provider: 'mtn',
      phoneNumber: '',
      accountNumber: ''
    },
    agreement: {
      termsAccepted: false,
      privacyAccepted: false,
      refundPolicyAccepted: false
    }
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')
    if (savedCourse) {
      setCourse(JSON.parse(savedCourse))
    } else {
      navigate('/courses')
    }
  }, [navigate])

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!enrollmentData.personalInfo.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!enrollmentData.personalInfo.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!enrollmentData.personalInfo.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(enrollmentData.personalInfo.email)) {
        newErrors.email = 'Email is invalid'
      }
      if (!enrollmentData.personalInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }
    }
    
    if (step === 2) {
      if (!enrollmentData.payment.phoneNumber.trim()) {
        newErrors.paymentPhone = 'Phone number is required'
      }
      if (enrollmentData.payment.method === 'bank_transfer' && !enrollmentData.payment.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsProcessing(true)
    
    // Simulate enrollment processing
    setTimeout(() => {
      // Save enrollment data
      const enrollmentRecord = {
        ...enrollmentData,
        course: course,
        enrollmentDate: new Date().toISOString(),
        enrollmentId: `ENR${Date.now()}`
      }
      localStorage.setItem('enrollmentRecord', JSON.stringify(enrollmentRecord))
      
      setIsProcessing(false)
      setCurrentStep(4) // Success step
    }, 3000)
  }

  const handleInputChange = (section, field, value) => {
    setEnrollmentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Payment Details', icon: CreditCard },
    { id: 3, title: 'Review & Confirm', icon: FileText },
    { id: 4, title: 'Enrollment Complete', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[--color-navy-blue] to-[--color-navy-blue-light] text-white py-8">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/courses')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold">Course Enrollment</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-3xl">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep >= step.id
              const isCurrent = currentStep === step.id
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isCurrent ? 'bg-[--color-warm-orange] text-white' :
                    isActive ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`font-medium text-sm ${isCurrent ? 'text-white' : isActive ? 'text-white/80' : 'text-white/60'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Course Summary */}
      <div className="bg-white border-b">
        <div className="container-custom py-6">
          <div className="flex items-center gap-6">
            <img src={course.image} alt={course.title} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[--color-navy-blue]">{course.title}</h2>
              <p className="text-gray-600">by {course.instructor}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-bold text-[--color-warm-orange]">ZMW {course.price}</span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  {course.rating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 container-custom py-8">
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[--color-navy-blue] mb-6">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={enrollmentData.personalInfo.firstName}
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange] ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={enrollmentData.personalInfo.lastName}
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange] ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={enrollmentData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={enrollmentData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange] ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+260 XXX XXX XXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={enrollmentData.personalInfo.dateOfBirth}
                    onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={enrollmentData.personalInfo.address}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange]"
                    placeholder="Street address"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[--color-navy-blue] mb-6">Payment Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleInputChange('payment', 'method', 'mobile_money')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        enrollmentData.payment.method === 'mobile_money' 
                          ? 'border-[--color-warm-orange] bg-[--color-warm-orange]/10' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Phone className="w-6 h-6 mx-auto mb-2 text-[--color-warm-orange]" />
                      <p className="font-medium">Mobile Money</p>
                      <p className="text-sm text-gray-600">MTN, Airtel, Zamtel</p>
                    </button>
                    
                    <button
                      onClick={() => handleInputChange('payment', 'method', 'bank_transfer')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        enrollmentData.payment.method === 'bank_transfer' 
                          ? 'border-[--color-warm-orange] bg-[--color-warm-orange]/10' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-[--color-warm-orange]" />
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-gray-600">Direct bank deposit</p>
                    </button>
                  </div>
                </div>
                
                {enrollmentData.payment.method === 'mobile_money' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Money Provider</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['mtn', 'airtel', 'zamtel'].map(provider => (
                        <button
                          key={provider}
                          onClick={() => handleInputChange('payment', 'provider', provider)}
                          className={`p-3 border-2 rounded-lg capitalize transition-all ${
                            enrollmentData.payment.provider === provider 
                              ? 'border-[--color-warm-orange] bg-[--color-warm-orange]/10' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {enrollmentData.payment.method === 'mobile_money' ? 'Mobile Money Number' : 'Account Number'} *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.payment.method === 'mobile_money' ? enrollmentData.payment.phoneNumber : enrollmentData.payment.accountNumber}
                    onChange={(e) => handleInputChange('payment', enrollmentData.payment.method === 'mobile_money' ? 'phoneNumber' : 'accountNumber', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[--color-warm-orange] ${
                      errors.paymentPhone || errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={enrollmentData.payment.method === 'mobile_money' ? '+260 XXX XXX XXX' : 'Enter account number'}
                  />
                  {(errors.paymentPhone || errors.accountNumber) && (
                    <p className="text-red-500 text-sm mt-1">{errors.paymentPhone || errors.accountNumber}</p>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Secure Payment</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Your payment information is encrypted and secure. We never store your payment details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-[--color-navy-blue] mb-6">Review & Confirm</h3>
              
              <div className="space-y-6">
                {/* Course Summary */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold text-[--color-navy-blue] mb-4">Course Details</h4>
                  <div className="flex items-center gap-4">
                    <img src={course.image} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-600">by {course.instructor}</p>
                      <p className="text-lg font-bold text-[--color-warm-orange]">ZMW {course.price}</p>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information Summary */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold text-[--color-navy-blue] mb-4">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">{enrollmentData.personalInfo.firstName} {enrollmentData.personalInfo.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{enrollmentData.personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium">{enrollmentData.personalInfo.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-medium">{enrollmentData.personalInfo.city}, {enrollmentData.personalInfo.country}</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Summary */}
                <div className="border-b pb-6">
                  <h4 className="font-semibold text-[--color-navy-blue] mb-4">Payment Method</h4>
                  <div className="flex items-center gap-3">
                    {enrollmentData.payment.method === 'mobile_money' ? (
                      <Phone className="w-5 h-5 text-[--color-warm-orange]" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-[--color-warm-orange]" />
                    )}
                    <div>
                      <p className="font-medium capitalize">
                        {enrollmentData.payment.method === 'mobile_money' ? 'Mobile Money' : 'Bank Transfer'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {enrollmentData.payment.method === 'mobile_money' ? 
                          `${enrollmentData.payment.provider} - ${enrollmentData.payment.phoneNumber}` :
                          `Account: ${enrollmentData.payment.accountNumber}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Terms and Conditions */}
                <div>
                  <h4 className="font-semibold text-[--color-navy-blue] mb-4">Terms & Conditions</h4>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enrollmentData.agreement.termsAccepted}
                        onChange={(e) => handleInputChange('agreement', 'termsAccepted', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the Terms and Conditions of EduConnect
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enrollmentData.agreement.privacyAccepted}
                        onChange={(e) => handleInputChange('agreement', 'privacyAccepted', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I have read and accept the Privacy Policy
                      </span>
                    </label>
                    
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enrollmentData.agreement.refundPolicyAccepted}
                        onChange={(e) => handleInputChange('agreement', 'refundPolicyAccepted', e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I understand the 30-day refund policy
                      </span>
                    </label>
                  </div>
                </div>
                
                {/* Total Amount */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-[--color-warm-orange]">ZMW {course.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!enrollmentData.agreement.termsAccepted || !enrollmentData.agreement.privacyAccepted || !enrollmentData.agreement.refundPolicyAccepted || isProcessing}
                  className="px-8 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Complete Enrollment'}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-[--color-navy-blue] mb-4">Enrollment Successful!</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  Your enrollment in <strong>{course.title}</strong> has been successfully processed.
                </p>
                <p className="text-green-700 text-sm mt-2">
                  Enrollment ID: ENR{Date.now()}
                </p>
              </div>
              
              <div className="text-left space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Confirmation Email</p>
                    <p className="font-medium">Sent to {enrollmentData.personalInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Student Dashboard</p>
                    <p className="font-medium">Access your course materials</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Course Access</p>
                    <p className="font-medium">Available immediately</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Browse More Courses
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
