import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Calendar, Clock, Upload, Save, X, Plus, Trash2, Eye, Download, AlertCircle, CheckCircle, Users, BookOpen, Award, Target, Settings, ArrowLeft, Search, Filter } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'

function LecturerAssignmentCreationPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    type: 'assignment',
    maxMarks: 100,
    passingMarks: 50,
    dueDate: '',
    dueTime: '23:59',
    allowedFileTypes: ['pdf', 'doc', 'docx'],
    maxFileSize: 10,
    instructions: '',
    rubric: '',
    autoGrade: false,
    showResults: 'immediate'
  })

  const [attachments, setAttachments] = useState([])
  const [rubricCriteria, setRubricCriteria] = useState([
    { id: 1, name: 'Content Quality', weight: 30, description: 'Accuracy and depth of content' },
    { id: 2, name: 'Structure', weight: 20, description: 'Organization and flow' },
    { id: 3, name: 'Research', weight: 25, description: 'Quality of sources and research' },
    { id: 4, name: 'Presentation', weight: 25, description: 'Clarity and formatting' }
  ])
  const [previewMode, setPreviewMode] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')

  // Mock course data
  const courses = [
    { id: 1, title: 'Advanced React Development', code: 'CS401', students: 45 },
    { id: 2, title: 'Data Science Fundamentals', code: 'DS201', students: 38 },
    { id: 3, title: 'UI/UX Design Principles', code: 'DES301', students: 32 }
  ]

  const assignmentTypes = [
    { id: 'assignment', name: 'Assignment', icon: FileText },
    { id: 'quiz', name: 'Quiz', icon: Target },
    { id: 'project', name: 'Project', icon: BookOpen },
    { id: 'presentation', name: 'Presentation', icon: Users }
  ]

  const fileTypes = [
    { id: 'pdf', name: 'PDF Document', extensions: '.pdf' },
    { id: 'doc', name: 'Word Document', extensions: '.doc, .docx' },
    { id: 'ppt', name: 'PowerPoint', extensions: '.ppt, .pptx' },
    { id: 'image', name: 'Image', extensions: '.jpg, .png, .gif' },
    { id: 'zip', name: 'Archive', extensions: '.zip, .rar' },
    { id: 'video', name: 'Video', extensions: '.mp4, .avi, .mov' }
  ]

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.title || formData.description) {
        // Simulate auto-save
        setAutoSaveStatus('saving')
        setTimeout(() => setAutoSaveStatus('saved'), 1000)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setAutoSaveStatus('unsaved')
  }

  const handleFileTypeToggle = (fileType) => {
    setFormData(prev => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes.includes(fileType)
        ? prev.allowedFileTypes.filter(type => type !== fileType)
        : [...prev.allowedFileTypes, fileType]
    }))
  }

  const addRubricCriteria = () => {
    const newCriteria = {
      id: Date.now(),
      name: '',
      weight: 0,
      description: ''
    }
    setRubricCriteria(prev => [...prev, newCriteria])
  }

  const updateRubricCriteria = (id, field, value) => {
    setRubricCriteria(prev =>
      prev.map(criteria =>
        criteria.id === id ? { ...criteria, [field]: value } : criteria
      )
    )
  }

  const removeRubricCriteria = (id) => {
    setRubricCriteria(prev => prev.filter(criteria => criteria.id !== id))
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type.split('/')[1] || 'unknown'
    }))
    setAttachments(prev => [...prev, ...newAttachments])
  }

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id))
  }

  const AssignmentForm = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
              placeholder="Enter assignment title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
            <select
              value={formData.courseId}
              onChange={(e) => handleInputChange('courseId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title} ({course.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] h-32"
            placeholder="Provide a detailed description of the assignment..."
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {assignmentTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleInputChange('type', type.id)}
                className={`p-3 border rounded-lg transition-all ${
                  formData.type === type.id
                    ? 'border-[#011F5B] bg-[#011F5B]/10 text-[#011F5B]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <type.icon className="w-5 h-5 mx-auto mb-2" />
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Marking Scheme */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Marking Scheme</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Marks</label>
            <input
              type="number"
              value={formData.maxMarks}
              onChange={(e) => handleInputChange('maxMarks', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
              min="1"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passing Marks</label>
            <input
              type="number"
              value={formData.passingMarks}
              onChange={(e) => handleInputChange('passingMarks', parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
              min="1"
              max={formData.maxMarks}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Show Results</label>
            <select
              value={formData.showResults}
              onChange={(e) => handleInputChange('showResults', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            >
              <option value="immediate">Immediately</option>
              <option value="after_deadline">After deadline</option>
              <option value="manual">Manually</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Rubric Criteria</h4>
            <button
              onClick={addRubricCriteria}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-[#011F5B] text-white rounded-lg hover:bg-[#00416A] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criteria
            </button>
          </div>

          <div className="space-y-3">
            {rubricCriteria.map(criteria => (
              <div key={criteria.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={criteria.name}
                    onChange={(e) => updateRubricCriteria(criteria.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#011F5B] mb-2"
                    placeholder="Criteria name"
                  />
                  <input
                    type="text"
                    value={criteria.description}
                    onChange={(e) => updateRubricCriteria(criteria.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#011F5B]"
                    placeholder="Description"
                  />
                </div>
                <div className="w-24">
                  <input
                    type="number"
                    value={criteria.weight}
                    onChange={(e) => updateRubricCriteria(criteria.id, 'weight', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#011F5B]"
                    placeholder="Weight %"
                    min="0"
                    max="100"
                  />
                </div>
                <button
                  onClick={() => removeRubricCriteria(criteria.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deadline Settings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Deadline Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Due Time *</label>
            <input
              type="time"
              value={formData.dueTime}
              onChange={(e) => handleInputChange('dueTime', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            />
          </div>
        </div>
      </div>

      {/* File Restrictions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">File Restrictions</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Maximum File Size (MB)</label>
          <input
            type="number"
            value={formData.maxFileSize}
            onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fileTypes.map(type => (
              <label key={type.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.allowedFileTypes.includes(type.id)}
                  onChange={() => handleFileTypeToggle(type.id)}
                  className="w-4 h-4 text-[#011F5B] rounded focus:ring-[#011F5B]"
                />
                <div>
                  <div className="font-medium text-gray-800">{type.name}</div>
                  <div className="text-xs text-gray-500">{type.extensions}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Assignment Materials</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#011F5B] transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
          <p className="text-sm text-gray-500 mb-4">Upload assignment instructions, templates, or reference materials</p>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#011F5B] text-white rounded-lg hover:bg-[#00416A] transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Choose Files
          </label>
        </div>

        {attachments.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-800 mb-2">Uploaded Files</h4>
            <div className="space-y-2">
              {attachments.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-800">{file.name}</div>
                      <div className="text-sm text-gray-500">{file.size}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAttachment(file.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Instructions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Instructions</h3>
        <textarea
          value={formData.instructions}
          onChange={(e) => handleInputChange('instructions', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] h-32"
          placeholder="Provide any additional instructions or guidelines for students..."
        />
      </div>
    </div>
  )

  const AssignmentPreview = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#011F5B]/10 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#011F5B]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{formData.title || 'Untitled Assignment'}</h2>
            <p className="text-gray-600">
              {courses.find(c => c.id === parseInt(formData.courseId))?.title || 'No course selected'}
            </p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-700">
            {formData.description || 'No description provided'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Assignment Details</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><strong>Type:</strong> {formData.type}</li>
              <li><strong>Maximum Marks:</strong> {formData.maxMarks}</li>
              <li><strong>Passing Marks:</strong> {formData.passingMarks}</li>
              <li><strong>Due Date:</strong> {formData.dueDate || 'Not set'} at {formData.dueTime}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">File Requirements</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><strong>Max File Size:</strong> {formData.maxFileSize} MB</li>
              <li><strong>Allowed Types:</strong> {formData.allowedFileTypes.join(', ')}</li>
            </ul>
          </div>
        </div>

        {formData.instructions && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Additional Instructions</h4>
            <p className="text-gray-700">{formData.instructions}</p>
          </div>
        )}

        {rubricCriteria.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">Evaluation Rubric</h4>
            <div className="space-y-2">
              {rubricCriteria.map(criteria => (
                <div key={criteria.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-gray-800">{criteria.name}</div>
                    <div className="text-sm text-gray-600">{criteria.description}</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{criteria.weight}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {attachments.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Assignment Materials</h4>
            <div className="space-y-2">
              {attachments.map(file => (
                <div key={file.id} className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>{file.name} ({file.size})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/lecturer/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Create Assignment</h1>
                <p className="text-sm text-gray-600">Design and configure a new assignment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {autoSaveStatus === 'saved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {autoSaveStatus === 'saving' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                {autoSaveStatus === 'unsaved' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                <span>{autoSaveStatus === 'saved' ? 'All changes saved' : autoSaveStatus === 'saving' ? 'Saving...' : 'Unsaved changes'}</span>
              </div>
              
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  previewMode
                    ? 'bg-[#011F5B] text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                {previewMode ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {previewMode ? <AssignmentPreview /> : <AssignmentForm />}
        
        {!previewMode && (
          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <GradientButton gradient={gradients.primary}>
              <Save className="w-4 h-4 mr-2" />
              Publish Assignment
            </GradientButton>
          </div>
        )}
      </main>
    </div>
  )
}

export default LecturerAssignmentCreationPage
