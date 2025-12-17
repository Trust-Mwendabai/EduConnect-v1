import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Check, GraduationCap, BookOpen, Shield, Users, Store, AlertCircle, CheckCircle } from 'lucide-react'
import axios from 'axios';
import { form } from 'framer-motion/m';

function SignupPage() {
  const BASE_URL = "http://192.168.74.234/educonnect/educonnect-backend/";
  const [step, setStep] = useState(1) // 1: Role Selection, 2: Form
  const [selectedRole, setSelectedRole] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: GraduationCap,
      description: 'Access courses, assignments, and learning materials',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'lecturer',
      name: 'Lecturer',
      icon: BookOpen,
      description: 'Create courses, manage students, and grade assignments',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: Shield,
      description: 'Manage platform, users, and system settings',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'guardian',
      name: 'Guardian',
      icon: Users,
      description: 'Monitor student progress and communicate with teachers',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'vendor',
      name: 'Vendor',
      icon: Store,
      description: 'Sell courses and educational materials',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
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

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    setTimeout(() => {
      setStep(2)
    }, 300)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
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
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    // Create the payload matching PHP expected keys
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: selectedRole, // Critical: Backend requires this
      phone: "" // Optional, but helps avoid undefined errors
    };

    try {
      const res = await axios.post(`${BASE_URL}register.php`, payload);
      
      if (res.data.success) {
        setMessage({ type: 'success', text: res.data.message });
        setTimeout(() => {
          navigate('/verify-email', { state: { email: formData.email } });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      // Capture the error message sent by PHP
      const errorMsg = err.response?.data?.error || "Registration failed. Please try again.";
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#011F5B] via-[#003262] to-[#00416A] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => {
            if (step === 2) {
              setStep(1)
              setSelectedRole('')
            } else {
              navigate('/')
            }
          }}
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{step === 2 ? 'Back to Role Selection' : 'Back to Home'}</span>
        </button>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {step === 1 ? (
            // Role Selection Step
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-4">
                  <User className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Choose Your Role
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Select how you'll be using EduConnect
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        selectedRole === role.id
                          ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-14 h-14 bg-gradient-to-r ${role.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {role.name}
                      </h3>
                      <p className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                        {role.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              <div className="text-center mt-8">
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#FF6B35] hover:text-[#E55A2B] font-bold transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            // Form Step
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-2xl mb-4">
                  {React.createElement(roles.find(r => r.id === selectedRole)?.icon || User, { className: "text-white", size: 32 })}
                </div>
                <h1 className="text-3xl font-bold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  Create {roles.find(r => r.id === selectedRole)?.name} Account
                </h1>
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Fill in your details to get started
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    {errors.firstName && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle size={14} />
                        <span>{errors.firstName}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-[#FF6B35] focus:border-[#FF6B35] transition-all ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    {errors.lastName && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle size={14} />
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

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
                    Confirm Password
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
                      placeholder="Confirm your password"
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

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-[#FF6B35] border-gray-300 rounded focus:ring-[#FF6B35]"
                    />
                    <span className="text-sm text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#FF6B35] hover:text-[#E55A2B] font-medium transition-colors">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-[#FF6B35] hover:text-[#E55A2B] font-medium transition-colors">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle size={14} />
                      <span>{errors.agreeToTerms}</span>
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
                      Creating Account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium" style={{ fontFamily: 'var(--font-body)' }}>Or sign up with</span>
                </div>
              </div>

              {/* Social Signup */}
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

              {/* Sign In Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#FF6B35] hover:text-[#E55A2B] font-bold transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupPage
