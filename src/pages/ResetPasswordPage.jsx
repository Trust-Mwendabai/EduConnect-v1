import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle, AlertCircle, Check } from 'lucide-react'

function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setMessage({ type: '', text: '' })
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setMessage({ 
        type: 'success', 
        text: 'Password reset successful! Redirecting to login...' 
      })
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }, 1500)
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
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Reset Password
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              Create a new secure password for your account
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a strong password"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        req.met ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        <Check 
                          size={12} 
                          className={req.met ? 'text-green-600' : 'text-gray-400'} 
                        />
                      </div>
                      <span className={req.met ? 'text-green-700 font-medium' : 'text-gray-600'} style={{ fontFamily: 'var(--font-body)' }}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {errors.password && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your new password"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle size={14} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900" style={{ fontFamily: 'var(--font-body)' }}>
              <strong>Security Tip:</strong> Choose a strong, unique password that you don't use for other accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage