import React, { useState, useRef } from 'react'
import { X, AlertTriangle, CheckCircle, Upload, FileText, CreditCard, DollarSign, Shield, Clock, User, Mail, Phone, Lock, Eye, EyeOff, Trash2, Download, Share2, Wallet } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../common/GradientStyles'

// Base Modal Component
const BaseModal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Confirmation Modal
export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // warning, danger, info, success
  icon = null
}) => {
  const typeStyles = {
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      button: gradients.warning
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      button: gradients.error
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      button: gradients.info
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      button: gradients.success
    }
  }

  const style = typeStyles[type] || typeStyles.warning
  const IconComponent = icon || (type === 'danger' ? Trash2 : AlertTriangle)

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${style.bg} ${style.border} border`}>
          <div className="flex items-start gap-3">
            <IconComponent className={`w-6 h-6 ${style.icon} flex-shrink-0 mt-1`} />
            <div>
              <p className="text-gray-800">{message}</p>
              {type === 'danger' && (
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <GradientButton
            gradient={style.button}
            onClick={onConfirm}
          >
            {confirmText}
          </GradientButton>
        </div>
      </div>
    </BaseModal>
  )
}

// Upload Modal
export const UploadModal = ({ 
  isOpen, 
  onClose, 
  onUpload, 
  title = 'Upload File',
  acceptedTypes = '*/*',
  maxFileSize = 10 * 1024 * 1024, // 10MB
  multiple = false
}) => {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB.`)
        return false
      }
      return true
    })

    if (multiple) {
      setFiles(prev => [...prev, ...validFiles])
    } else {
      setFiles(validFiles.slice(0, 1))
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    try {
      await onUpload(files)
      setFiles([])
      onClose()
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="space-y-6">
        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-[#011F5B] bg-[#011F5B]/10'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Maximum file size: {maxFileSize / 1024 / 1024}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">Selected Files:</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <GradientButton
            gradient={gradients.primary}
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload {files.length > 1 ? `${files.length} Files` : 'File'}
              </>
            )}
          </GradientButton>
        </div>
      </div>
    </BaseModal>
  )
}

// Payment Modal
export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  onPayment, 
  amount = 0,
  description = 'Payment',
  currency = 'USD'
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    billingAddress: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSavedCards, setShowSavedCards] = useState(false)

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    try {
      await onPayment(formData, paymentMethod)
      onClose()
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const savedCards = [
    { id: 1, last4: '1234', brand: 'Visa', expiry: '12/25' },
    { id: 2, last4: '5678', brand: 'Mastercard', expiry: '09/24' }
  ]

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Payment Details" size="lg">
      <div className="space-y-6">
        {/* Order Summary */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{description}</span>
            <span className="text-2xl font-bold text-gray-800">
              {currency} {amount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Shield className="w-4 h-4" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-800">Payment Method</h4>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-3 border rounded-lg transition-colors ${
                paymentMethod === 'card'
                  ? 'border-[#011F5B] bg-[#011F5B]/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`p-3 border rounded-lg transition-colors ${
                paymentMethod === 'bank'
                  ? 'border-[#011F5B] bg-[#011F5B]/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <DollarSign className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Bank</span>
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`p-3 border rounded-lg transition-colors ${
                paymentMethod === 'wallet'
                  ? 'border-[#011F5B] bg-[#011F5B]/10'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Wallet className="w-6 h-6 mx-auto mb-1" />
              <span className="text-sm">Wallet</span>
            </button>
          </div>
        </div>

        {/* Card Details Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            {/* Saved Cards */}
            {savedCards.length > 0 && (
              <div>
                <button
                  onClick={() => setShowSavedCards(!showSavedCards)}
                  className="text-sm text-[#011F5B] hover:text-[#FF6B35] transition-colors"
                >
                  {showSavedCards ? 'Enter new card' : 'Use saved card'}
                </button>
                
                {showSavedCards && (
                  <div className="space-y-2 mt-3">
                    {savedCards.map(card => (
                      <label key={card.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="savedCard" value={card.id} className="text-[#011F5B]" />
                        <div className="flex-1">
                          <p className="font-medium">{card.brand} ending in {card.last4}</p>
                          <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* New Card Form */}
            {!showSavedCards && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                    maxLength="19"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        const formatted = value.length >= 3 ? `${value.slice(0, 2)}/${value.slice(2, 4)}` : value
                        setFormData(prev => ({ ...prev, expiryDate: formatted }))
                      }}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                      maxLength="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                      maxLength="4"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <GradientButton
            gradient={gradients.success}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Pay {currency} {amount.toFixed(2)}
              </>
            )}
          </GradientButton>
        </div>
      </div>
    </BaseModal>
  )
}

// Success Modal
export const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = 'Success!',
  message = 'Your action was completed successfully.',
  buttonText = 'OK',
  icon = CheckCircle
}) => {
  const IconComponent = icon

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <IconComponent className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-gray-700">{message}</p>
        <GradientButton gradient={gradients.success} onClick={onClose} className="w-full">
          {buttonText}
        </GradientButton>
      </div>
    </BaseModal>
  )
}

export default {
  ConfirmModal,
  UploadModal,
  PaymentModal,
  SuccessModal
}
