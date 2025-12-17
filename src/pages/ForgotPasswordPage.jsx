import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [emailSent, setEmailSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validateEmail = () => {
    const newErrors = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateEmail()) {
      return
    }
    
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
      setMessage({ 
        type: 'success', 
        text: 'Password reset instructions have been sent to your email address.' 
      })
    }, 1500)
  }

  const handleResend = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setMessage({ 
        type: 'success', 
        text: 'Email resent successfully!' 
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back to Login */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-4">
                  <Mail className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Forgot Password?
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors({})
                      }}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                  {errors.email && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={40} />
                </div>
                <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Check Your Email
                </h1>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  We've sent password reset instructions to:
                </p>
                <p className="text-lg font-semibold text-[#011F5B] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {email}
                </p>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                  message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  ) : (
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  )}
                  <p className={`text-sm font-medium ${
                    message.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`} style={{ fontFamily: 'var(--font-body)' }}>
                    {message.text}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900" style={{ fontFamily: 'var(--font-body)' }}>
                    <strong>Didn't receive the email?</strong> Check your spam folder or click the button below to resend.
                  </p>
                </div>

                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="w-full py-3 px-4 border-2 border-[#FF6B35] text-[#FF6B35] font-semibold rounded-xl hover:bg-[#FF6B35] hover:text-white transition-all duration-300 disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isLoading ? 'Resending...' : 'Resend Email'}
                </button>

                <Link
                  to="/login"
                  className="block w-full py-3 px-4 text-center text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}

          {/* Help Text */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'var(--font-body)' }}>
              Need help? Contact our{' '}
              <Link to="/help" className="text-[#FF6B35] hover:text-[#E55A2B] font-medium transition-colors">
                support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage