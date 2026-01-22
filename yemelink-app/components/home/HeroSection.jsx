import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import StatCounter from '../ui/StatCounter';
import SocialLinks from '../ui/SocialLinks';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/9b04ae3dc_ymelinklogo.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-30" style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Your Digital Partner
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              <span className="gradient-text">YEMELINK</span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-300">Online Products & Services</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-400 max-w-xl"
            >
              We transform your ideas into powerful digital solutions. From stunning websites to mobile apps, 
              we deliver excellence in every pixel and line of code.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to={createPageUrl('Contact')}>
                <GradientButton size="lg" icon={ArrowRight}>
                  Request a Quote
                </GradientButton>
              </Link>
              <Link to={createPageUrl('Portfolio')}>
                <GradientButton variant="secondary" size="lg" icon={Play}>
                  View Our Work
                </GradientButton>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
            >
              <StatCounter value="2" suffix="+" label="Years Experience" delay={500} />
              <StatCounter value="16" suffix="" label="Projects Done" delay={700} />
              <StatCounter value="16" suffix="" label="Happy Clients" delay={900} />
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-4"
            >
              <p className="text-gray-500 text-sm mb-3">Connect with us</p>
              <SocialLinks />
            </motion.div>
          </div>
          
          {/* Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              
              {/* Logo container */}
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-float">
                <img 
                  src={LOGO_URL} 
                  alt="YEMELINK Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}