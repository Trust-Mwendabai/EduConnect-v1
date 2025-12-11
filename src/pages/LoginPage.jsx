import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
    
    // Clear message
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
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
      
      // Simulate successful login
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
      
      setTimeout(() => {
        navigate('/lms')
      }, 1000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Welcome Back
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              Sign in to continue your learning journey
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Password
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
                  placeholder="Enter your password"
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
              {errors.password && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#FF6B35] border-gray-300 rounded focus:ring-[#FF6B35]"
                />
                <span className="ml-2 text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#FF6B35] hover:text-[#E55A2B] font-medium transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
                Forgot password?
              </Link>
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
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium" style={{ fontFamily: 'var(--font-body)' }}>Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'var(--font-heading)' }}>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: 'var(--font-heading)' }}>GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#FF6B35] hover:text-[#E55A2B] font-bold transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
