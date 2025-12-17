import React, { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle, AlertCircle, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react'
import axios from 'axios'

function EmailVerificationPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // States
  const email = location.state?.email || 'your email'
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Refs for auto-focusing inputs
  const inputRefs = useRef([])

  // Handle OTP Input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp]
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle backspace to move focus back
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Submit OTP to PHP Backend
  const handleVerify = async (e) => {
    e.preventDefault()
    const finalCode = otp.join('')
    
    if (finalCode.length < 6) {
      setMessage({ type: 'error', text: 'Please enter all 6 digits.' })
      return
    }

    setIsVerifying(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await axios.post('http://192.168.74.234/educonnect/educonnect-backend/verify_code.php', {
        email: email,
        code: finalCode
      })

      console.log(response.data);
      if (response.data.success) {
        setIsVerified(true)
        setMessage({ type: 'success', text: 'Account verified successfully!' })
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Invalid verification code. Please try again.' 
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setMessage({ type: '', text: '' })
    
    try {
      // Logic for resending goes here (calling your register or a resend script)
      await axios.post('http://192.168.74.234/educonnect/educonnect-backend/resend_otp.php', { email })
      setMessage({ type: 'success', text: 'A new code has been sent to your email.' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to resend code. Try again later.' })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 overflow-hidden">
          
          {isVerified ? (
            /* --- SUCCESS STATE --- */
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-600" size={56} />
              </div>
              <h1 className="text-3xl font-bold text-[#011F5B] mb-3">Verified!</h1>
              <p className="text-gray-600 mb-8">
                Your account is ready. You can now access the EduConnect Learning Management System.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-4 px-4 bg-[#FF6B35] text-white font-bold rounded-xl shadow-lg hover:bg-[#E55A2B] transition-all flex items-center justify-center gap-2"
              >
                Go to Login <ArrowRight size={20} />
              </button>
            </div>
          ) : (
            /* --- OTP INPUT STATE --- */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-[#011F5B] rounded-2xl mb-4">
                  <ShieldCheck size={40} />
                </div>
                <h1 className="text-2xl font-bold text-[#011F5B]">Check Your Email</h1>
                <p className="text-gray-500 mt-2">
                  We've sent a 6-digit code to <br />
                  <span className="font-semibold text-gray-800">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#FF6B35] focus:ring-1 focus:ring-[#FF6B35] outline-none transition-all"
                    />
                  ))}
                </div>

                {message.text && (
                  <div className={`p-4 rounded-xl flex items-start gap-3 ${
                    message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <p className="text-sm font-medium">{message.text}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying || otp.includes('')}
                  className="w-full py-4 bg-[#011F5B] text-white font-bold rounded-xl hover:bg-[#003262] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isVerifying ? <RefreshCw className="animate-spin" /> : 'Verify Account'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-[#FF6B35] font-bold hover:underline disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend New Code'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationPage