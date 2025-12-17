import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Search, Clock, Users, Star, BookOpen, Filter } from 'lucide-react'

const coursesData = [
  {
    id: 1,
    title: 'Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    category: 'Web Development',
    level: 'Beginner',
    duration: '65 hours',
    students: 45000,
    rating: 4.8,
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 2,
    title: 'Machine Learning A-Z',
    instructor: 'Kirill Eremenko',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '44 hours',
    students: 38000,
    rating: 4.9,
    price: 94.99,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 3,
    title: 'UI/UX Design Masterclass',
    instructor: 'Daniel Walter Scott',
    category: 'Design',
    level: 'All Levels',
    duration: '32 hours',
    students: 28000,
    rating: 4.7,
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 4,
    title: 'Python for Data Science',
    instructor: 'Jose Portilla',
    category: 'Data Science',
    level: 'Beginner',
    duration: '25 hours',
    students: 52000,
    rating: 4.8,
    price: 84.99,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 5,
    title: 'Digital Marketing Masterclass',
    instructor: 'Phil Ebiner',
    category: 'Marketing',
    level: 'All Levels',
    duration: '23 hours',
    students: 31000,
    rating: 4.6,
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop&auto=format'
  },
  {
    id: 6,
    title: 'React - The Complete Guide',
    instructor: 'Maximilian Schwarzmüller',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '48 hours',
    students: 42000,
    rating: 4.9,
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&auto=format'
  }
]

const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Marketing', 'Business']
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[--color-navy-blue] via-[--color-navy-blue-light] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Explore Our <span className="text-[--color-warm-orange]">Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Discover world-class courses taught by industry experts. Start learning today!
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-[--color-warm-orange] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-[--color-light-blue] border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[--color-navy-blue]" />
              <span className="font-semibold text-[--color-navy-blue]">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[--color-warm-orange] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Level Filter */}
            <div className="flex flex-wrap gap-2 ml-auto">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? 'bg-[--color-navy-blue] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding flex-grow">
        <div className="container-custom">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[--color-navy-blue]">{filteredCourses.length}</span> courses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[--color-warm-orange] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ${course.price}
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-[--color-warm-orange] font-medium">
                    <BookOpen className="w-4 h-4" />
                    {course.category}
                  </div>
                  
                  <h3 className="text-xl font-bold text-[--color-navy-blue] line-clamp-2 group-hover:text-[--color-warm-orange] transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm">
                    by {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {(course.students / 1000).toFixed(0)}k
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-[--color-warm-orange]">
                      <Star className="w-4 h-4 fill-current" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CoursesPage