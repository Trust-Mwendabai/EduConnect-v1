import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Briefcase, MapPin, Clock, DollarSign, Users, Heart, Zap, Target, TrendingUp, Coffee } from 'lucide-react'

export default function CareersPage() {
  const positions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      description: 'Build beautiful and responsive user interfaces for our learning platform.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Lead product strategy and development for our core platform features.'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70k - $100k',
      description: 'Create intuitive and engaging user experiences for millions of learners.'
    },
    {
      title: 'Content Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$65k - $95k',
      description: 'Develop and execute content strategies to grow our brand and community.'
    },
    {
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      description: 'Analyze learning data to improve student outcomes and platform performance.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$55k - $75k',
      description: 'Help our users succeed and ensure they have an amazing experience.'
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance for you and your family'
    },
    {
      icon: Zap,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Professional development budget and clear career progression paths'
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with talented, passionate people who care about education'
    },
    {
      icon: Coffee,
      title: 'Work-Life Balance',
      description: 'We believe in sustainable work practices and avoiding burnout'
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Make a real difference in the lives of millions of learners worldwide'
    }
  ]

  const values = [
    {
      title: 'Learner-Centric',
      description: 'We put learners first in everything we do'
    },
    {
      title: 'Innovation',
      description: 'We embrace new ideas and technologies'
    },
    {
      title: 'Collaboration',
      description: 'We work together to achieve great things'
    },
    {
      title: 'Excellence',
      description: 'We strive for quality in all our work'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#011F5B] to-[#00416A] pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Join Our Team
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
              Help us transform education and empower millions of learners worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container-custom py-16">
        <h2 className="text-3xl font-bold text-[#011F5B] mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Our Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-[#011F5B] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {value.title}
              </h3>
              <p className="text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <h2 className="text-3xl font-bold text-[#011F5B] mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Benefits & Perks
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#011F5B] to-[#00416A] rounded-lg flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl font-bold text-[#011F5B] mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Open Positions
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {positions.map((position, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#011F5B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {position.title}
                  </h3>
                  <p className="text-gray-600 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                    {position.description}
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                  Apply Now
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{position.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{position.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{position.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{position.salary}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] rounded-xl shadow-md p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Don't See a Perfect Fit?
            </h3>
            <p className="mb-6 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              We're always looking for talented people. Send us your resume and let us know how you can contribute.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-3 bg-white text-[#FF6B35] font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}