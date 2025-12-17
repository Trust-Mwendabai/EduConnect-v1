import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin, AlertCircle, CheckCircle, Upload, FileText } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../common/GradientStyles'

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  priority: z.enum(['low', 'medium', 'high'])
})

const assignmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  dueDate: z.string().min(1, 'Due date is required'),
  course: z.string().min(1, 'Please select a course'),
  file: z.any().optional()
})

// Styled Input Component
const StyledInput = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  icon: Icon, 
  error, 
  register, 
  required = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className={`w-full pl-${Icon ? '10' : '4'} pr-${type === 'password' ? '12' : '4'} py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]/20 transition-all ${
            error 
              ? 'border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 focus:border-[#011F5B]'
          }`}
          {...register(name)}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )
}

// Styled Textarea Component
const StyledTextarea = ({ 
  label, 
  name, 
  placeholder, 
  error, 
  register, 
  required = false,
  rows = 4,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]/20 transition-all resize-none ${
            error 
              ? 'border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 focus:border-[#011F5B]'
          }`}
          {...register(name)}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )
}

// Styled Select Component
const StyledSelect = ({ 
  label, 
  name, 
  options, 
  placeholder, 
  error, 
  register, 
  required = false,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#011F5B]/20 transition-all ${
          error 
            ? 'border-red-500 focus:ring-red-500/20' 
            : 'border-gray-300 focus:border-[#011F5B]'
        }`}
        {...register(name)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )
}

// File Upload Component
const FileUpload = ({ 
  label, 
  name, 
  error, 
  register, 
  required = false,
  accept = '*/*',
  multiple = false,
  ...props 
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      setFiles(prev => multiple ? [...prev, ...droppedFiles] : droppedFiles.slice(0, 1))
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => multiple ? [...prev, ...selectedFiles] : selectedFiles.slice(0, 1))
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-[#011F5B] bg-[#011F5B]/10'
            : 'border-gray-300 hover:border-gray-400'
        } ${error ? 'border-red-500' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...register(name)}
          {...props}
        />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-700 font-medium mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          {multiple ? 'Select one or more files' : 'Select a file'}
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  )
}

// Login Form
export const LoginForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  return (
    <GradientCard gradient={gradients.light} className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <StyledInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          register={register}
          error={errors.email}
          required
        />

        <StyledInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          icon={Lock}
          register={register}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 text-[#011F5B] rounded focus:ring-[#011F5B]" />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-sm text-[#011F5B] hover:text-[#FF6B35] transition-colors">
            Forgot password?
          </a>
        </div>

        <GradientButton
          gradient={gradients.primary}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </GradientButton>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-[#011F5B] hover:text-[#FF6B35] font-medium transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </GradientCard>
  )
}

// Signup Form
export const SignupForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema)
  })

  return (
    <GradientCard gradient={gradients.light} className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join our learning community</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StyledInput
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            icon={User}
            register={register}
            error={errors.firstName}
            required
          />

          <StyledInput
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            icon={User}
            register={register}
            error={errors.lastName}
            required
          />
        </div>

        <StyledInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          register={register}
          error={errors.email}
          required
        />

        <StyledInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          icon={Phone}
          register={register}
          error={errors.phone}
          required
        />

        <StyledInput
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          icon={Lock}
          register={register}
          error={errors.password}
          required
        />

        <StyledInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          icon={Lock}
          register={register}
          error={errors.confirmPassword}
          required
        />

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register('terms')}
            className="w-4 h-4 text-[#011F5B] rounded focus:ring-[#011F5B] mt-1"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-[#011F5B] hover:text-[#FF6B35] transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#011F5B] hover:text-[#FF6B35] transition-colors">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.terms.message}</span>
          </div>
        )}

        <GradientButton
          gradient={gradients.primary}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </GradientButton>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-[#011F5B] hover:text-[#FF6B35] font-medium transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </GradientCard>
  )
}

// Contact Form
export const ContactForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  return (
    <GradientCard gradient={gradients.light} className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
          <p className="text-gray-600">We'd love to hear from you</p>
        </div>

        <StyledInput
          label="Your Name"
          name="name"
          placeholder="Enter your full name"
          icon={User}
          register={register}
          error={errors.name}
          required
        />

        <StyledInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          register={register}
          error={errors.email}
          required
        />

        <StyledSelect
          label="Subject"
          name="subject"
          placeholder="Select a subject"
          options={[
            { value: 'general', label: 'General Inquiry' },
            { value: 'support', label: 'Technical Support' },
            { value: 'billing', label: 'Billing Question' },
            { value: 'feedback', label: 'Feedback' }
          ]}
          register={register}
          error={errors.subject}
          required
        />

        <StyledSelect
          label="Priority"
          name="priority"
          placeholder="Select priority"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
          ]}
          register={register}
          error={errors.priority}
          required
        />

        <StyledTextarea
          label="Message"
          name="message"
          placeholder="Tell us more about your inquiry..."
          register={register}
          error={errors.message}
          required
          rows={6}
        />

        <GradientButton
          gradient={gradients.primary}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </GradientButton>
      </form>
    </GradientCard>
  )
}

// Assignment Submission Form
export const AssignmentForm = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(assignmentSchema)
  })

  return (
    <GradientCard gradient={gradients.light} className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit Assignment</h2>
          <p className="text-gray-600">Upload your completed assignment</p>
        </div>

        <StyledInput
          label="Assignment Title"
          name="title"
          placeholder="Enter assignment title"
          register={register}
          error={errors.title}
          required
        />

        <StyledSelect
          label="Course"
          name="course"
          placeholder="Select a course"
          options={[
            { value: 'math', label: 'Mathematics' },
            { value: 'science', label: 'Science' },
            { value: 'english', label: 'English' },
            { value: 'history', label: 'History' }
          ]}
          register={register}
          error={errors.course}
          required
        />

        <StyledInput
          label="Due Date"
          name="dueDate"
          type="date"
          register={register}
          error={errors.dueDate}
          required
        />

        <StyledTextarea
          label="Description"
          name="description"
          placeholder="Describe your assignment..."
          register={register}
          error={errors.description}
          required
          rows={4}
        />

        <FileUpload
          label="Assignment File"
          name="file"
          register={register}
          error={errors.file}
          accept=".pdf,.doc,.docx,.txt"
        />

        <GradientButton
          gradient={gradients.primary}
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            'Submit Assignment'
          )}
        </GradientButton>
      </form>
    </GradientCard>
  )
}

export default {
  StyledInput,
  StyledTextarea,
  StyledSelect,
  FileUpload,
  LoginForm,
  SignupForm,
  ContactForm,
  AssignmentForm
}
