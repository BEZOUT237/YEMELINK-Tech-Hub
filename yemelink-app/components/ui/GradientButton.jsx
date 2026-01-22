import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function GradientButton({ 
  children, 
  variant = 'primary', 
  size = 'default',
  className,
  disabled,
  loading,
  icon: Icon,
  ...props 
}) {
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    ghost: "bg-transparent hover:bg-white/10 text-cyan-400",
    outline: "bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "relative font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </motion.button>
  );
}