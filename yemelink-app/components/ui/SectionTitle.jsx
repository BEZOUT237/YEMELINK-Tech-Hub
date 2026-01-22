import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ title, subtitle, centered = true, light = false }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-4 ${centered ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}