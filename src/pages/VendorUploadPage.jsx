import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Upload, 
  FileText, 
  Video, 
  FileAudio, 
  FileCode, 
  Image, 
  Archive, 
  Folder, 
  Plus, 
  X, 
  Check, 
  AlertCircle, 
  Clock, 
  Eye, 
  Download, 
  Share2, 
  Star, 
  DollarSign, 
  Users, 
  Calendar, 
  Tag, 
  Settings, 
  Save, 
  Trash2, 
  Edit3, 
  Copy, 
  MoreVertical,
  BarChart3,
  TrendingUp,
  Package,
  BookOpen,
  Zap,
  Target,
  Award
} from 'lucide-react'

function VendorUploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [productType, setProductType] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)

  // Product form data
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    difficulty: 'beginner',
    language: 'english',
    estimatedHours: '',
    prerequisites: [],
    learningObjectives: [],
    thumbnail: null,
    previewVideo: null
  })

  const categories = [
    { id: 'programming', name: 'Programming & Development' },
    { id: 'design', name: 'Design & Creative' },
    { id: 'business', name: 'Business & Entrepreneurship' },
    { id: 'marketing', name: 'Marketing & Sales' },
    { id: 'database', name: 'Database & Data Science' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'web', name: 'Web Development' },
    { id: 'other', name: 'Other' }
  ]

  const productTypes = [
    { id: 'course', name: 'Full Course', icon: BookOpen, description: 'Complete course with multiple lessons' },
    { id: 'video', name: 'Video Series', icon: Video, description: 'Video tutorials and lectures' },
    { id: 'document', name: 'Document/PDF', icon: FileText, description: 'PDF guides, ebooks, and documentation' },
    { id: 'audio', name: 'Audio Content', icon: FileAudio, description: 'Audio lectures, podcasts, and tutorials' },
    { id: 'code', name: 'Code Examples', icon: FileCode, description: 'Source code, projects, and examples' },
    { id: 'bundle', name: 'Resource Bundle', icon: Archive, description: 'Multiple files and resources' }
  ]

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending'
    }))
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('video/')) return Video
    if (fileType.startsWith('audio/')) return FileAudio
    if (fileType.startsWith('image/')) return Image
    if (fileType.includes('pdf') || fileType.includes('document')) return FileText
    if (fileType.includes('zip') || fileType.includes('rar')) return Archive
    if (fileType.includes('javascript') || fileType.includes('python') || fileType.includes('code')) return FileCode
    return FileText
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const nextStep = () => {
    if (uploadStep < 4) {
      setUploadStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (uploadStep > 1) {
      setUploadStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    simulateUpload()
    setTimeout(() => {
      alert('Product uploaded successfully!')
      setUploadStep(1)
      setProductData({
        title: '',
        description: '',
        price: '',
        category: '',
        tags: [],
        difficulty: 'beginner',
        language: 'english',
        estimatedHours: '',
        prerequisites: [],
        learningObjectives: [],
        thumbnail: null,
        previewVideo: null
      })
      setUploadedFiles([])
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Upload New Product</h1>
              <p className="text-white/80">Share your knowledge and earn from your expertise</p>
            </div>
            <Link 
              to="/vendor/dashboard"
              className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { id: 1, label: 'Product Type', icon: Package },
              { id: 2, label: 'Basic Info', icon: FileText },
              { id: 3, label: 'Upload Files', icon: Upload },
              { id: 4, label: 'Review & Submit', icon: Check }
            ].map((step, index) => {
              const IconComponent = step.icon
              const isActive = uploadStep === step.id
              const isCompleted = uploadStep > step.id
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#FF6B35] text-white' :
                      isCompleted ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`text-sm mt-2 ${
                      isActive ? 'text-[#FF6B35] font-medium' :
                      isCompleted ? 'text-green-600 font-medium' :
                      'text-gray-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`flex-1 h-1 mx-4 ${
                      uploadStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Product Type */}
        {uploadStep === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Product Type</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productTypes.map(type => {
                  const IconComponent = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => {
                        setProductType(type.id)
                        nextStep()
                      }}
                      className={`p-6 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                        productType === type.id
                          ? 'border-[#FF6B35] bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          productType === type.id ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Basic Information */}
        {uploadStep === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                  <input
                    type="text"
                    value={productData.title}
                    onChange={(e) => setProductData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a compelling title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (ZMW) *</label>
                  <input
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    rows={4}
                    value={productData.description}
                    onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your product in detail..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                  <select
                    value={productData.difficulty}
                    onChange={(e) => setProductData(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={productData.language}
                    onChange={(e) => setProductData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                    <option value="portuguese">Portuguese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                  <input
                    type="text"
                    value={productData.estimatedHours}
                    onChange={(e) => setProductData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                    placeholder="e.g., 10 hours, 2 weeks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="react, javascript, web development"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors"
                >
                  Next: Upload Files
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Upload Files */}
        {uploadStep === 3 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Files</h2>
              
              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</h3>
                <p className="text-gray-600 mb-4">Support for PDF, MP4, MP3, ZIP, and image files (Max 500MB per file)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.mp4,.mp3,.zip,.rar,.jpg,.jpeg,.png,.gif,.doc,.docx,.ppt,.pptx"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors"
                >
                  Select Files
                </button>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map(file => {
                      const IconComponent = getFileIcon(file.type)
                      return (
                        <div key={file.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {file.status === 'uploading' && (
                              <div className="w-24">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-[#FF6B35] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            {file.status === 'completed' && (
                              <Check className="w-5 h-5 text-green-500" />
                            )}
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Thumbnail</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Upload a thumbnail image (Recommended: 1280x720px)</p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Choose Thumbnail
                  </button>
                </div>
              </div>

              {/* Preview Video */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Video (Optional)</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Upload a short preview video (Max 2 minutes)</p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Choose Preview Video
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors"
                >
                  Next: Review & Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {uploadStep === 4 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Review & Submit</h2>
              
              {/* Product Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{productData.title || 'Untitled Product'}</h4>
                    <p className="text-gray-600 mb-4">{productData.description || 'No description provided'}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{productTypes.find(t => t.id === productType)?.name || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">ZMW {productData.price || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{categories.find(c => c.id === productData.category)?.name || 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium capitalize">{productData.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Files ({uploadedFiles.length})</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {uploadedFiles.map(file => {
                        const IconComponent = getFileIcon(file.type)
                        return (
                          <div key={file.id} className="flex items-center gap-2 text-sm">
                            <IconComponent className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{file.name}</span>
                            <span className="text-gray-500">({formatFileSize(file.size)})</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-[#FF6B35] h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  <span className="text-sm text-gray-600">
                    I agree to the terms and conditions, including content guidelines and revenue sharing policy.
                  </span>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isUploading}
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? 'Submitting...' : 'Submit Product'}
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

export default VendorUploadPage
