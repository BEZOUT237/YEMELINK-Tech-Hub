import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import SocialLinks from '../ui/SocialLinks';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/9b04ae3dc_ymelinklogo.jpg';

export default function Footer() {
  return (
    <footer className="bg-[#060a12] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="YEMELINK" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <h3 className="text-xl font-bold text-white">YEMELINK</h3>
                <p className="text-cyan-400 text-sm">Online Products & Services</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted tech partner for web development, mobile apps, design, and digital marketing solutions.
            </p>
            <SocialLinks />
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={createPageUrl(item)} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile Apps', 'Graphic Design', 'Digital Marketing', 'Content Creation'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:yemelink@gmail.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  yemelink@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/905057404314" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +90 505 740 4314
                </a>
              </li>
              <li>
                <a 
                  href="https://linktr.ee/YEMELINK" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  linktr.ee/YEMELINK
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} YEMELINK. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to={createPageUrl('Privacy')} className="text-gray-500 hover:text-gray-400 text-sm">
              Privacy Policy
            </Link>
            <Link to={createPageUrl('Terms')} className="text-gray-500 hover:text-gray-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}