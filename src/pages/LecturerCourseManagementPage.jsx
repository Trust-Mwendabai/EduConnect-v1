import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Upload, FileText, Video, FolderOpen, Plus, Edit, Trash2, Save, X, ChevronRight, Search, Filter, Download, Eye, Clock, Users, Calendar, CheckCircle, AlertCircle, PlayCircle, File, Folder, PlusCircle, Edit3, Trash, Save as SaveIcon, ArrowRight, ArrowLeft, MoreVertical } from 'lucide-react'
import { GradientButton, GradientCard, gradients } from '../components/common/GradientStyles'

function LecturerCourseManagementPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeModule, setActiveModule] = useState(null)
  const [uploadModal, setUploadModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Advanced React Development',
      code: 'CS401',
      description: 'Master advanced React concepts including hooks, context, and performance optimization',
      students: 45,
      modules: 8,
      totalLessons: 24,
      completedLessons: 18,
      nextClass: 'Today, 2:00 PM',
      status: 'active',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      code: 'DS201',
      description: 'Introduction to data science concepts, Python programming, and statistical analysis',
      students: 38,
      modules: 6,
      totalLessons: 20,
      completedLessons: 12,
      nextClass: 'Tomorrow, 10:00 AM',
      status: 'active',
      color: 'green'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      code: 'DES301',
      description: 'Learn user interface design, user experience research, and design thinking',
      students: 32,
      modules: 5,
      totalLessons: 16,
      completedLessons: 14,
      nextClass: 'Friday, 3:00 PM',
      status: 'active',
      color: 'purple'
    }
  ]

  // Mock module data
  const modules = [
    {
      id: 1,
      title: 'Introduction to React Hooks',
      description: 'Understanding useState, useEffect, and custom hooks',
      lessons: 4,
      completedLessons: 3,
      order: 1,
      courseId: 1
    },
    {
      id: 2,
      title: 'State Management Patterns',
      description: 'Redux, Context API, and local state management',
      lessons: 3,
      completedLessons: 2,
      order: 2,
      courseId: 1
    },
    {
      id: 3,
      title: 'Performance Optimization',
      description: 'Memoization, code splitting, and lazy loading',
      lessons: 4,
      completedLessons: 1,
      order: 3,
      courseId: 1
    }
  ]

  // Mock lesson data
  const lessons = [
    {
      id: 1,
      title: 'Understanding useState Hook',
      description: 'Deep dive into React\'s useState hook',
      type: 'video',
      duration: '45 min',
      order: 1,
      moduleId: 1,
      resources: [
        { name: 'slides.pdf', type: 'pdf', size: '2.4 MB' },
        { name: 'code-examples.zip', type: 'zip', size: '1.2 MB' }
      ]
    },
    {
      id: 2,
      title: 'Working with useEffect',
      description: 'Managing side effects in React components',
      type: 'video',
      duration: '38 min',
      order: 2,
      moduleId: 1,
      resources: [
        { name: 'useeffect-guide.pdf', type: 'pdf', size: '1.8 MB' }
      ]
    },
    {
      id: 3,
      title: 'Custom Hooks Workshop',
      description: 'Building reusable custom hooks',
      type: 'workshop',
      duration: '60 min',
      order: 3,
      moduleId: 1,
      resources: [
        { name: 'workshop-files.zip', type: 'zip', size: '3.1 MB' },
        { name: 'custom-hooks-cheatsheet.pdf', type: 'pdf', size: '890 KB' }
      ]
    }
  ]

  const CourseList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <GradientButton gradient={gradients.primary}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Course
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`h-32 bg-gradient-to-r ${gradients[course.color]} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">{course.title}</h3>
                  <p className="text-white/80 text-sm">{course.code}</p>
                </div>
                <BookOpen className="w-8 h-8 text-white/50" />
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold text-gray-800">{course.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-800">{course.completedLessons}/{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next Class</span>
                  <span className="font-semibold text-gray-800">{course.nextClass}</span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-[#011F5B] to-[#00416A] h-2 rounded-full"
                  style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                ></div>
              </div>

              <GradientButton 
                gradient={gradients.primary}
                className="w-full"
                onClick={() => setSelectedCourse(course)}
              >
                Manage Course
              </GradientButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const CourseDetailView = () => {
    if (!selectedCourse) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{selectedCourse.title}</h2>
              <p className="text-gray-600">{selectedCourse.code}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GradientButton gradient={gradients.secondary}>
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </GradientButton>
            <GradientButton gradient={gradients.primary}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Materials
            </GradientButton>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GradientCard gradient={gradients.info}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Students</p>
                <p className="text-white text-2xl font-bold">{selectedCourse.students}</p>
              </div>
              <Users className="w-8 h-8 text-white/50" />
            </div>
          </GradientCard>

          <GradientCard gradient={gradients.success}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Modules</p>
                <p className="text-white text-2xl font-bold">{selectedCourse.modules}</p>
              </div>
              <FolderOpen className="w-8 h-8 text-white/50" />
            </div>
          </GradientCard>

          <GradientCard gradient={gradients.warning}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Total Lessons</p>
                <p className="text-white text-2xl font-bold">{selectedCourse.totalLessons}</p>
              </div>
              <BookOpen className="w-8 h-8 text-white/50" />
            </div>
          </GradientCard>

          <GradientCard gradient={gradients.primary}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Completed</p>
                <p className="text-white text-2xl font-bold">{selectedCourse.completedLessons}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-white/50" />
            </div>
          </GradientCard>
        </div>

        {/* Modules and Lessons */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Content</h3>
          
          <div className="space-y-4">
            {modules.map((module, index) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#011F5B]/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-[#011F5B]">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {module.completedLessons}/{module.lessons} lessons
                      </span>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                        activeModule === module.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>

                {activeModule === module.id && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="space-y-3">
                      {lessons
                        .filter(lesson => lesson.moduleId === module.id)
                        .map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-semibold text-gray-600">
                                {lessonIndex + 1}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-800">{lesson.title}</h5>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                {lesson.type === 'video' && <Video className="w-4 h-4" />}
                                {lesson.type === 'workshop' && <Users className="w-4 h-4" />}
                                {lesson.type === 'reading' && <FileText className="w-4 h-4" />}
                                <span>{lesson.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                                  <Edit className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                                  <Trash2 className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#011F5B] hover:bg-[#011F5B]/5 transition-colors">
                        <Plus className="w-4 h-4 text-gray-600 mx-auto" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const UploadModal = () => {
    if (!uploadModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Upload Course Materials</h3>
              <button
                onClick={() => setUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]">
                <option>Advanced React Development</option>
                <option>Data Science Fundamentals</option>
                <option>UI/UX Design Principles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Module</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]">
                <option>Introduction to React Hooks</option>
                <option>State Management Patterns</option>
                <option>Performance Optimization</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#011F5B] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                <p className="text-sm text-gray-500">Supported formats: PDF, DOC, PPT, MP4, ZIP</p>
                <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.zip" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">File Description</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B] h-24"
                placeholder="Describe the uploaded materials..."
              ></textarea>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setUploadModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <GradientButton gradient={gradients.primary} className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </GradientButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
                <p className="text-sm text-gray-600">Organize and manage your course content</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#011F5B]"
              >
                <option value="all">All Courses</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {selectedCourse ? <CourseDetailView /> : <CourseList />}
      </main>

      {/* Upload Modal */}
      <UploadModal />
    </div>
  )
}

export default LecturerCourseManagementPage
