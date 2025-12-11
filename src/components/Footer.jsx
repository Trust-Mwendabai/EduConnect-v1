import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#011F5B] to-[#00416A] text-white">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1 text-2xl font-bold mb-4">
              <span className="text-white">Edu</span>
              <span className="text-[#FF6B35]">Connect</span>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Empowering learners worldwide with quality education and expert guidance. 
              Join our community and transform your future.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-[#FF6B35] transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-[#FF6B35] transition-all duration-300 hover:-translate-y-1" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-[#FF6B35] transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-[#FF6B35] transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Browse Courses</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">About Us</Link></li>
              <li><Link to="/instructors" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Become Instructor</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Help Center</Link></li>
              <li><Link to="/blog" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Blog</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">FAQ</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-[#FF6B35] hover:translate-x-1 inline-block transition-all duration-200">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to get the latest updates and course offerings.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-[#FF6B35] focus:bg-white/15 transition-all duration-300"
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-white/70 text-sm">
            © 2025 EduConnect. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">Terms of Service</Link>
            <Link to="/cookies" className="text-white/70 hover:text-[#FF6B35] transition-colors duration-200">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer