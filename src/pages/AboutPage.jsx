import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Target, Eye, Heart, Award, Users, Globe, MapPin } from 'lucide-react'

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
    name: 'Trust Muhau Mwendabai',
    role: 'CEO',
    image: 'team-template',
    bio: 'Visionary leader with expertise in educational technology and business strategy'
  },
  {
    name: 'Ngubu Kambanja',
    role: 'COO',
    image: 'team-template',
    bio: 'Operations expert ensuring smooth delivery of educational services'
  },
  {
    name: 'Brian Mungalu',
    role: 'Chief Educational Researcher',
    image: 'team-template',
    bio: 'Chief Educational Researcher managing stakeholder partnerships'
  },
  {
    name: 'Mirriam Mwale',
    role: 'Secretary',
    image: 'team-template',
    bio: 'Female administrative professional keeping operations organized'
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
                <p className="text-gray-600 leading-relaxed mt-4">
                  <strong>Pulsar IT Solutions Limited</strong> is the driving force behind EduConnect, 
                  bringing cutting-edge educational technology solutions to learners across Zambia and Africa.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-[--color-warm-orange]" />
                  <h2 className="text-3xl font-bold text-[--color-navy-blue]">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To become Africa's most trusted and innovative online learning platform, 
                  transforming lives through education and creating a regional community of lifelong 
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

      {/* Location Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[--color-navy-blue] mb-4">
              Based in Lusaka, Zambia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proudly serving learners across Africa and beyond from our headquarters in the heart of Zambia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[--color-warm-orange] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-2">Strategic Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Located in Lusaka, Zambia's vibrant capital city, we're positioned at the crossroads of African education and innovation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Globe className="w-6 h-6 text-[--color-warm-orange] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-2">Regional Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our Zambia headquarters enables us to serve learners across Southern Africa with localized content and support.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-[--color-warm-orange] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[--color-navy-blue] mb-2">Local Community</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Deeply rooted in Zambian educational values while maintaining global standards of excellence.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[--color-navy-blue]/10 to-[--color-warm-orange]/10 rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=27.8%2C-15.5%2C29.0%2C-15.2&layer=mapnik&marker=28.2877%2C-15.4337"
                    className="w-full h-full border-0 rounded-xl"
                    title="Map of Lusaka, Zambia"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="mt-6 text-center">
                  <h4 className="text-xl font-bold text-[--color-navy-blue] mb-2">Lusaka, Zambia</h4>
                  <p className="text-gray-600">
                    The educational and innovation hub of Southern Africa
                  </p>
                </div>
              </div>
            </div>
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
              Be part of a regional movement that's transforming education across Africa
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