import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react'

const stats = [
  { icon: Users, value: '50,000+', label: 'Active Students' },
  { icon: Globe, value: '150+', label: 'Countries' },
  { icon: Award, value: '1,000+', label: 'Courses' },
  { icon: Heart, value: '98%', label: 'Satisfaction Rate' }
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from course content to student support.'
  },
  {
    icon: Heart,
    title: 'Student-Centric',
    description: 'Our students are at the heart of everything. We design experiences that truly help them succeed.'
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Quality education should be accessible to everyone, everywhere, at any time.'
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We continuously innovate to provide the best learning experience using cutting-edge technology.'
  }
]

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Co-Founder',
    image: 'sarah-mitchell',
    bio: 'Former educator with 15 years of experience in online learning'
  },
  {
    name: 'David Chen',
    role: 'CTO & Co-Founder',
    image: 'david-chen',
    bio: 'Tech innovator passionate about making education accessible'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Content',
    image: 'emily-rodriguez',
    bio: 'Curriculum designer with expertise in instructional design'
  },
  {
    name: 'Michael Johnson',
    role: 'Head of Community',
    image: 'michael-johnson',
    bio: 'Community builder dedicated to student success'
  }
]

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[--color-navy-blue] via-[--color-navy-blue-light] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              About <span className="text-[--color-warm-orange]">EduConnect</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Empowering learners worldwide to achieve their dreams through quality education
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://picsum.photos/600/400?random=20"
                alt="Our mission"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-[--color-warm-orange]" />
                  <h2 className="text-3xl font-bold text-[--color-navy-blue]">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To democratize education by providing accessible, high-quality learning experiences 
                  that empower individuals to achieve their personal and professional goals. We believe 
                  that everyone deserves access to world-class education, regardless of their location 
                  or background.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-[--color-warm-orange]" />
                  <h2 className="text-3xl font-bold text-[--color-navy-blue]">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become the world's most trusted and innovative online learning platform, 
                  transforming lives through education and creating a global community of lifelong 
                  learners who drive positive change in their communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-[--color-light-blue]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[--color-warm-orange] to-[--color-warm-orange-light] flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-[--color-navy-blue] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-navy-blue] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at EduConnect
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-2xl hover:bg-[--color-light-blue] transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[--color-warm-orange] to-[--color-warm-orange-light] flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[--color-light-blue]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-navy-blue] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate educators and innovators dedicated to your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/300?u=${member.image}`}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[--color-warm-orange] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-[--color-navy-blue] to-[--color-navy-blue-lighter] text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-white/90">
              Be part of a global movement that's transforming education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="/signup" className="px-8 py-4 bg-gradient-to-r from-[--color-warm-orange] to-[--color-warm-orange-light] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Get Started Today
              </a>
              <a href="/contact" className="px-8 py-4 bg-white text-[--color-navy-blue] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage