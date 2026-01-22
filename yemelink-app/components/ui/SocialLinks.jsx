import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Linkedin, BookOpen } from 'lucide-react';

const socialLinks = [
  { icon: Youtube, href: 'https://www.youtube.com/@YEMELINK2000', label: 'YouTube', color: 'hover:text-red-500' },
  { icon: Instagram, href: 'https://www.instagram.com/yemelink2000', label: 'Instagram', color: 'hover:text-pink-500' },
  { icon: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ), href: 'https://www.tiktok.com/@yemelink', label: 'TikTok', color: 'hover:text-white' },
  { icon: BookOpen, href: 'https://yemelink.blogspot.com', label: 'Blog', color: 'hover:text-orange-500' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/105687625/admin/dashboard', label: 'LinkedIn', color: 'hover:text-blue-500' },
];

export default function SocialLinks({ size = 'default', className = '' }) {
  const iconSize = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const containerSize = size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`${containerSize} flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color} hover:border-cyan-500/30 hover:bg-white/10`}
          title={social.label}
        >
          <social.icon className={iconSize} />
        </motion.a>
      ))}
    </div>
  );
}