import React from 'react'
import { Star } from 'lucide-react'

const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Software Developer',
    avatar: 'sarah-johnson',
    rating: 5,
    text: 'EduConnect transformed my career! The courses are comprehensive and the instructors are top-notch. I landed my dream job within 3 months of completing the program.'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Scientist',
    avatar: 'michael-chen',
    rating: 5,
    text: 'The quality of education here is exceptional. The platform is intuitive, and the community support is amazing. Highly recommend to anyone looking to upskill.'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    avatar: 'emily-rodriguez',
    rating: 5,
    text: 'Best investment in my education! The courses are well-structured, and I love how I can learn at my own pace. The certificates have real value in the industry.'
  }
]

function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#011F5B] mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied learners who achieved their goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-[#E8F4F8] p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="absolute top-4 left-4 text-8xl font-serif text-[#FF6B35] opacity-20 leading-none">
                "
              </div>
              
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-[#FF6B35] text-[#FF6B35]" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6 italic relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-[#011F5B]/10">
                <img 
                  src={`https://i.pravatar.cc/80?u=${testimonial.avatar}`}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-3 border-[#FF6B35] object-cover"
                />
                <div>
                  <div className="font-semibold text-[#011F5B] text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials