import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, PenTool, Megaphone, FileText, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SectionTitle from '../ui/SectionTitle';
import GradientButton from '../ui/GradientButton';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    titleFr: 'Développement Web Full Stack',
    description: 'Sites, platforms, SaaS solutions',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    titleFr: 'Applications Mobiles',
    description: 'High-performance Android apps',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    titleFr: 'Design Graphique',
    description: 'Logos, UI/UX, brand identity',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: PenTool,
    title: 'Content Creation',
    titleFr: 'Création de Contenu',
    description: 'Engaging texts, visuals & videos',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    titleFr: 'Marketing Digital',
    description: 'Growth strategies & social media',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: FileText,
    title: 'Copywriting',
    titleFr: 'Copywriting Persuasif',
    description: 'Words that sell and inspire',
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function ServicesPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Our Services" 
          subtitle="Comprehensive digital solutions tailored to elevate your business and bring your vision to life"
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={service.title} delay={index * 0.1} className="p-6 group">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-cyan-400 text-sm mb-2">{service.titleFr}</p>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to={createPageUrl('Services')}>
            <GradientButton variant="outline" icon={ArrowRight}>
              Explore All Services
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}