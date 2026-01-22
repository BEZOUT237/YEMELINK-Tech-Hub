import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Bot } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[#0a0f1a]/80" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Ready to Start Your
            <span className="gradient-text"> Digital Journey?</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Let's collaborate and build something amazing together. Get in touch for a free consultation 
            or chat with our AI assistant for instant guidance.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to={createPageUrl('Contact')}>
              <GradientButton size="lg" icon={ArrowRight}>
                Request a Quote
              </GradientButton>
            </Link>
            <Link to={createPageUrl('AIAssistant')}>
              <GradientButton variant="secondary" size="lg" icon={Bot}>
                Chat with AI
              </GradientButton>
            </Link>
            <Link to={createPageUrl('Community')}>
              <GradientButton variant="outline" size="lg" icon={MessageSquare}>
                Join Community
              </GradientButton>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-8 flex flex-wrap justify-center gap-8 text-gray-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Fast Response
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
              Free Consultation
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              Expert Support
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}