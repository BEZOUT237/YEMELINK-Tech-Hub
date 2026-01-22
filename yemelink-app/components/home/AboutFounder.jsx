import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';

const FOUNDER_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/6b02c160b_stephane-yemelijpg.png';

export default function AboutFounder() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/20">
                <img 
                  src={FOUNDER_IMAGE} 
                  alt="Stéphane Yemeli - CEO" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-transparent" />
                
                {/* Name badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <GlassCard animate={false} hover={false} className="p-4">
                    <h3 className="text-white font-bold text-lg">Stéphane Yemeli</h3>
                    <p className="text-cyan-400 text-sm">Founder & CEO</p>
                  </GlassCard>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">Meet the Founder</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                Passionate About Digital Innovation
              </h2>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Hi, I'm Stéphane Yemeli, the founder of YEMELINK. With over 2 years of hands-on experience 
              in web development, mobile applications, and digital marketing, I've dedicated myself to 
              helping businesses and entrepreneurs transform their digital presence.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              My mission is simple: deliver high-quality digital solutions that drive real results. 
              Whether you're a startup looking to establish your online presence or an established 
              business seeking to innovate, I'm here to make your vision a reality.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:yemelink@gmail.com">
                <GradientButton size="sm" icon={Mail}>
                  Email Me
                </GradientButton>
              </a>
              <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
                <GradientButton variant="secondary" size="sm" icon={Phone}>
                  WhatsApp
                </GradientButton>
              </a>
              <a href="https://www.linkedin.com/company/105687625" target="_blank" rel="noopener noreferrer">
                <GradientButton variant="ghost" size="sm" icon={Linkedin}>
                  LinkedIn
                </GradientButton>
              </a>
            </div>
            
            {/* Quick links */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-gray-500 text-sm mb-3">Explore more:</p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://arkigai-group.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  arkigai-group.com
                </a>
                <a 
                  href="https://linktr.ee/YEMELINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  linktr.ee/YEMELINK
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}