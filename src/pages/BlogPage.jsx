import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { BookOpen, Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['all', 'education', 'technology', 'tips', 'news', 'success-stories']

  const blogPosts = [
    {
      id: 1,
      title: '10 Effective Study Techniques for Online Learning',
      excerpt: 'Discover proven strategies to maximize your learning potential in a digital environment.',
      author: 'Dr. Sarah Johnson',
      date: 'January 10, 2025',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Future of Education: AI and Personalized Learning',
      excerpt: 'How artificial intelligence is transforming the way we learn and teach.',
      author: 'Michael Chen',
      date: 'January 8, 2025',
      category: 'technology',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Success Story: From Student to Tech Leader',
      excerpt: 'Meet Emma Rodriguez, who transformed her career through online education.',
      author: 'Alex Thompson',
      date: 'January 5, 2025',
      category: 'success-stories',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Building Better Learning Habits in 2025',
      excerpt: 'Start the new year right with these evidence-based learning strategies.',
      author: 'Dr. Emily Rodriguez',
      date: 'January 1, 2025',
      category: 'education',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'EduConnect Platform Update: New Features',
      excerpt: 'Explore the latest enhancements to improve your learning experience.',
      author: 'Product Team',
      date: 'December 28, 2024',
      category: 'news',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      readTime: '4 min read'
    },
    {
      id: 6,
      title: 'Mastering Time Management as an Online Student',
      excerpt: 'Practical tips to balance your studies with work and personal life.',
      author: 'Jessica Williams',
      date: 'December 25, 2024',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
      readTime: '6 min read'
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              EduConnect Blog
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Insights, tips, and stories to enhance your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article 
              key={post.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#011F5B] text-sm font-medium rounded-full">
                    {post.category.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#011F5B] mb-3 line-clamp-2 hover:text-[#FF6B35] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3" style={{ fontFamily: 'var(--font-body)' }}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-[#FF6B35] font-medium hover:text-[#E55A2B] transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-xl shadow-md p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-6" style={{ fontFamily: 'var(--font-body)' }}>
              Get the latest articles and insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                style={{ fontFamily: 'var(--font-body)' }}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}