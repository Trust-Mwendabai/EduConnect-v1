import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { 
  Download,
  FileText,
  Video,
  Image,
  FileAudio,
  FileCode,
  Folder,
  Search,
  Filter,
  Upload,
  Eye,
  Star,
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
  Grid3x3,
  List,
  SortAsc,
  MoreVertical,
  Share2,
  Heart,
  Bookmark,
  File,
  FileVideo,
  Music,
  Archive,
  FileSpreadsheet,
  FilePlus
} from 'lucide-react'

function StudyMaterialsPage() {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [selectedMaterials, setSelectedMaterials] = useState(new Set())

  const [categories] = useState([
    { id: 'all', name: 'All Materials', icon: Folder, color: 'bg-gray-100 text-gray-700' },
    { id: 'videos', name: 'Video Lectures', icon: Video, color: 'bg-blue-100 text-blue-700' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'bg-green-100 text-green-700' },
    { id: 'presentations', name: 'Presentations', icon: FileSpreadsheet, color: 'bg-orange-100 text-orange-700' },
    { id: 'audio', name: 'Audio Materials', icon: FileAudio, color: 'bg-purple-100 text-purple-700' },
    { id: 'code', name: 'Code Examples', icon: FileCode, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'images', name: 'Images & Graphics', icon: Image, color: 'bg-pink-100 text-pink-700' },
    { id: 'archives', name: 'Archives', icon: Archive, color: 'bg-yellow-100 text-yellow-700' }
  ])

  const [materials] = useState([
    {
      id: 1,
      title: 'React Hooks Deep Dive',
      description: 'Comprehensive video tutorial covering advanced React hooks patterns',
      type: 'video',
      category: 'videos',
      course: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      duration: '2h 15min',
      size: '1.2 GB',
      uploadDate: '2024-01-15',
      views: 342,
      downloads: 89,
      rating: 4.9,
      tags: ['react', 'hooks', 'advanced'],
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
      url: '/materials/react-hooks-deep-dive.mp4'
    },
    {
      id: 2,
      title: 'Database Design Principles',
      description: 'Complete guide to relational database design and normalization',
      type: 'document',
      category: 'documents',
      course: 'Database Management',
      instructor: 'Prof. Michael Chen',
      pages: 45,
      size: '2.5 MB',
      uploadDate: '2024-01-14',
      views: 187,
      downloads: 67,
      rating: 4.7,
      tags: ['database', 'sql', 'design'],
      url: '/materials/database-design.pdf'
    },
    {
      id: 3,
      title: 'CSS Grid Layout Workshop',
      description: 'Hands-on workshop for mastering CSS Grid Layout',
      type: 'video',
      category: 'videos',
      course: 'Web Design Fundamentals',
      instructor: 'Ms. Emily Davis',
      duration: '1h 45min',
      size: '890 MB',
      uploadDate: '2024-01-13',
      views: 256,
      downloads: 78,
      rating: 4.8,
      tags: ['css', 'grid', 'layout'],
      url: '/materials/css-grid-workshop.mp4'
    },
    {
      id: 4,
      title: 'JavaScript Algorithms Collection',
      description: 'Common algorithms implemented in JavaScript with explanations',
      type: 'code',
      category: 'code',
      course: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      files: 23,
      size: '450 KB',
      uploadDate: '2024-01-12',
      views: 145,
      downloads: 92,
      rating: 4.6,
      tags: ['javascript', 'algorithms', 'code'],
      url: '/materials/js-algorithms.zip'
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      description: 'Essential principles for creating user-friendly interfaces',
      type: 'presentation',
      category: 'presentations',
      course: 'Web Design Fundamentals',
      instructor: 'Ms. Emily Davis',
      slides: 67,
      size: '15.3 MB',
      uploadDate: '2024-01-11',
      views: 298,
      downloads: 84,
      rating: 4.5,
      tags: ['design', 'ui', 'ux'],
      url: '/materials/ui-ux-principles.pptx'
    },
    {
      id: 6,
      title: 'Podcast: Database Trends 2024',
      description: 'Discussion on latest database technologies and trends',
      type: 'audio',
      category: 'audio',
      course: 'Database Management',
      instructor: 'Prof. Michael Chen',
      duration: '45min',
      size: '42 MB',
      uploadDate: '2024-01-10',
      views: 89,
      downloads: 34,
      rating: 4.4,
      tags: ['database', 'trends', 'podcast'],
      url: '/materials/database-trends.mp3'
    },
    {
      id: 7,
      title: 'React Component Library',
      description: 'Reusable React components with documentation',
      type: 'code',
      category: 'code',
      course: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      files: 45,
      size: '1.8 MB',
      uploadDate: '2024-01-09',
      views: 178,
      downloads: 103,
      rating: 4.8,
      tags: ['react', 'components', 'library'],
      url: '/materials/react-components.zip'
    },
    {
      id: 8,
      title: 'Color Theory & Typography',
      description: 'Visual design fundamentals covering color theory and typography',
      type: 'document',
      category: 'documents',
      course: 'Web Design Fundamentals',
      instructor: 'Ms. Emily Davis',
      pages: 32,
      size: '8.7 MB',
      uploadDate: '2024-01-08',
      views: 234,
      downloads: 76,
      rating: 4.7,
      tags: ['design', 'color', 'typography'],
      url: '/materials/color-theory.pdf'
    }
  ])

  const getFileIcon = (type) => {
    switch (type) {
      case 'video': return <FileVideo className="w-6 h-6" />
      case 'document': return <FileText className="w-6 h-6" />
      case 'presentation': return <FileSpreadsheet className="w-6 h-6" />
      case 'audio': return <Music className="w-6 h-6" />
      case 'code': return <FileCode className="w-6 h-6" />
      case 'image': return <Image className="w-6 h-6" />
      default: return <File className="w-6 h-6" />
    }
  }

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-700'
      case 'document': return 'bg-green-100 text-green-700'
      case 'presentation': return 'bg-orange-100 text-orange-700'
      case 'audio': return 'bg-purple-100 text-purple-700'
      case 'code': return 'bg-indigo-100 text-indigo-700'
      case 'image': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatFileSize = (size) => {
    return size
  }

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const toggleMaterialSelection = (materialId) => {
    setSelectedMaterials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(materialId)) {
        newSet.delete(materialId)
      } else {
        newSet.add(materialId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-[#011F5B] via-[#011F5B] to-[#00416A] text-white">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-2">Study Materials</h1>
          <p className="text-white/80">Access course materials, lectures, and resources</p>
        </div>
      </section>

      <div className="container-custom py-8 flex-1">
        {/* Filters and Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35] w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name</option>
                <option value="size">File Size</option>
              </select>
              
              {/* View Mode */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-[#011F5B] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#011F5B] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Upload */}
              <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#011F5B] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Materials Actions */}
        {selectedMaterials.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium">
                {selectedMaterials.size} materials selected
              </span>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Download All
                </button>
                <button className="px-4 py-2 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  Add to Collection
                </button>
                <button 
                  onClick={() => setSelectedMaterials(new Set())}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Materials Grid */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMaterials.map(material => (
              <div key={material.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                {/* Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.has(material.id)}
                    onChange={() => toggleMaterialSelection(material.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                
                {/* Thumbnail/Preview */}
                <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  {material.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 p-2 rounded-lg ${getFileTypeColor(material.type)}`}>
                    {getFileIcon(material.type)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>
                  
                  {/* Metadata */}
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center justify-between">
                      <span>{material.course}</span>
                      <span>{material.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{formatFileSize(material.size)}</span>
                      <span>{material.uploadDate}</span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {material.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {material.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{material.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {material.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {material.downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        {material.rating}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Bookmark className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Share2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Type</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Course</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Size</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Rating</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.map(material => (
                    <tr key={material.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.has(material.id)}
                          onChange={() => toggleMaterialSelection(material.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <h4 className="font-medium text-gray-900">{material.title}</h4>
                          <p className="text-sm text-gray-600">{material.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium ${getFileTypeColor(material.type)}`}>
                          {getFileIcon(material.type)}
                          <span className="capitalize">{material.type}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{material.course}</td>
                      <td className="p-4 text-sm text-gray-600">{formatFileSize(material.size)}</td>
                      <td className="p-4 text-sm text-gray-600">{material.uploadDate}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{material.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <button className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF8C61] transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default StudyMaterialsPage
