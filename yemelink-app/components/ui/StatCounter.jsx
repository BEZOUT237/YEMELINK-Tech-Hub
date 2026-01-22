import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const numValue = parseInt(value.replace(/\D/g, ''));
      const duration = 2000;
      const steps = 60;
      const stepValue = numValue / steps;
      let current = 0;
      
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          current += stepValue;
          if (current >= numValue) {
            setCount(numValue);
            clearInterval(interval);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        {count}{suffix}
      </div>
      <div className="text-gray-400 mt-2 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}