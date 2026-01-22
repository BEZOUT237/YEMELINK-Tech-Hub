import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import AboutFounder from '@/components/home/AboutFounder';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <AboutFounder />
      <CTASection />
    </div>
  );
}