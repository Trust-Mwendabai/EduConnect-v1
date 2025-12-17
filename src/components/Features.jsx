import React from 'react'
import { Target, Users, Smartphone, Award, MessageCircle, TrendingUp, ShoppingCart } from 'lucide-react'

const featuresData = [
  {
    id: 1,
    icon: Target,
    title: 'Personalized Learning',
    description: 'AI-powered recommendations tailored to your learning style and goals. Get courses that match your interests and skill level.'
  },
  {
    id: 2,
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals and certified educators with years of real-world experience in their fields.'
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: 'Course Marketplace',
    description: 'Browse and purchase premium courses from expert instructors. Access high-quality content with lifetime access and certificates.'
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'Learn Anywhere',
    description: 'Access your courses on any device - desktop, tablet, or mobile. Learn at your own pace, anytime, anywhere.'
  },
  {
    id: 5,
    icon: Award,
    title: 'Certificates',
    description: 'Earn recognized certificates upon course completion to showcase your skills and boost your career prospects.'
  },
  {
    id: 6,
    icon: MessageCircle,
    title: 'Community Support',
    description: 'Join a vibrant community of learners. Collaborate, discuss, and grow together with peers worldwide.'
  },
  {
    id: 7,
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics and insights. Stay motivated with achievement badges.'
  }
]

function Features() {
  return (
    <section className="section-padding bg-[#E8F4F8]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#011F5B] mb-4">
            Why Choose EduConnect?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={feature.id} 
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                <div className="mb-4 inline-block">
                  <IconComponent className="w-12 h-12 text-[#FF6B35] group-hover:scale-110 transition-transform duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold text-[#011F5B] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features