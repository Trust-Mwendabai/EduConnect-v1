import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react'

function EmailVerificationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email || 'your email'
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Simulate auto-verification check (in real app, this would check URL params)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    
    if (token) {
      setIsVerifying(true)
      // Simulate verification
      setTimeout(() => {
        setIsVerifying(false)
        setIsVerified(true)
        setMessage({ 
          type: 'success', 
          text: 'Your email has been verified successfully!' 
        })
      }, 2000)
    }
  }, [])

  const handleResend = () => {
    setIsResending(true)
    setMessage({ type: '', text: '' })
    
    setTimeout(() => {
      setIsResending(false)
      setMessage({ 
        type: 'success', 
        text: 'Verification email has been resent. Please check your inbox.' 
      })
    }, 1500)
  }

  const handleContinue = () => {
    navigate('/lms')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {isVerifying ? (
            // Verifying State
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                <RefreshCw className="text-blue-600 animate-spin" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Verifying Your Email
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                Please wait while we verify your email address...
              </p>
            </div>
          ) : isVerified ? (
            // Verified State
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-600" size={56} />
              </div>
              <h1 className="text-3xl font-bold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                Email Verified!
              </h1>
              <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                Your email has been successfully verified. You can now access all features of EduConnect.
              </p>

              {message.text && (
                <div className="mb-6 p-4 rounded-xl flex items-start gap-3 bg-green-50 border border-green-200">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-sm font-medium text-green-800" style={{ fontFamily: 'var(--font-body)' }}>
                    {message.text}
                  </p>
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Continue to Dashboard
                <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            // Awaiting Verification State
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-6">
                  <Mail className="text-white" size={40} />
                </div>
                <h1 className="text-3xl font-bold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  Verify Your Email
                </h1>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
                  We've sent a verification link to:
                </p>
                <p className="text-lg font-semibold text-[#011F5B] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                  {email}
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Click the link in the email to verify your account and get started.
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

              {/* Instructions */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="font-semibold text-blue-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    What to do next:
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800" style={{ fontFamily: 'var(--font-body)' }}>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">1.</span>
                      <span>Check your email inbox for a message from EduConnect</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">2.</span>
                      <span>Click the verification link in the email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">3.</span>
                      <span>You'll be automatically redirected to your dashboard</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-900" style={{ fontFamily: 'var(--font-body)' }}>
                    <strong>Didn't receive the email?</strong> Check your spam or junk folder, or click the button below to resend.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="w-full py-3 px-4 border-2 border-[#FF6B35] text-[#FF6B35] font-semibold rounded-xl hover:bg-[#FF6B35] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isResending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={20} />
                      Resend Verification Email
                    </>
                  )}
                </button>

                <Link
                  to="/login"
                  className="block w-full py-3 px-4 text-center text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Back to Login
                </Link>
              </div>

              {/* Help Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Having trouble?{' '}
                  <Link to="/help" className="text-[#FF6B35] hover:text-[#E55A2B] font-medium transition-colors">
                    Contact Support
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationPage