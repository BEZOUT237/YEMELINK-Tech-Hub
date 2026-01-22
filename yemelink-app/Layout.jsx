import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function Layout({ children, currentPageName }) {
  const hideNavFooter = ['Splash'].includes(currentPageName);
  
  return (
    <div className="min-h-screen bg-[#0a0f1a] font-inter">
      <ScrollToTop />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        :root {
          --color-primary: #00bcd4;
          --color-primary-dark: #0097a7;
          --color-background: #0a0f1a;
          --color-surface: #111827;
          --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        * {
          font-family: var(--font-sans);
        }
        
        body {
          background-color: var(--color-background);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0f1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #374151;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Selection color */
        ::selection {
          background: rgba(0, 188, 212, 0.3);
          color: white;
        }
        
        /* Animation classes */
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 188, 212, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 188, 212, 0.6); }
        }
        
        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #00bcd4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Glass effect */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
      
      {!hideNavFooter && <Navbar />}
      
      <main className={!hideNavFooter ? 'pt-16 md:pt-20' : ''}>
        {children}
      </main>
      
      {!hideNavFooter && <Footer />}
    </div>
  );
}