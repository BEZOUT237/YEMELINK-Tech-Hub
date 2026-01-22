import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, FolderOpen, Users, MessageSquare, Bot, User, ShoppingBag } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/9b04ae3dc_ymelinklogo.jpg';

const navLinks = [
  { name: 'Home', href: 'Home', icon: Home },
  { name: 'Services', href: 'Services', icon: Briefcase },
  { name: 'Portfolio', href: 'Portfolio', icon: FolderOpen },
  { name: 'Community', href: 'Community', icon: Users },
  { name: 'Blog', href: 'Blog', icon: MessageSquare },
  { name: 'AI Assistant', href: 'AIAssistant', icon: Bot },
  { name: 'Store', href: 'Store', icon: ShoppingBag },
  { name: 'About', href: 'About', icon: User },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f1a]/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="YEMELINK" className="h-10 w-10 rounded-lg object-cover" />
            <span className="text-xl font-bold text-white hidden sm:block">YEMELINK</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={createPageUrl(link.href)}
                className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <GradientButton size="sm">
                Get a Quote
              </GradientButton>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={createPageUrl(link.href)}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link to={createPageUrl('Contact')} onClick={() => setIsOpen(false)}>
                  <GradientButton className="w-full">
                    Get a Quote
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}