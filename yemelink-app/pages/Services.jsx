import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Smartphone, Palette, PenTool, Megaphone, FileText, 
  Check, ArrowRight, MessageSquare, X 
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const SERVICES_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/abd6e7c1f_yemelinkservices.jpg';

const services = [
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Development',
    titleFr: 'Développement Web Full Stack',
    shortDesc: 'Sites, platforms, SaaS solutions',
    description: 'We build stunning, high-performance websites and web applications tailored to your business needs. From simple landing pages to complex SaaS platforms, we deliver solutions that drive results.',
    features: [
      'Custom website design & development',
      'E-commerce platforms',
      'SaaS applications',
      'CMS integration (WordPress, Strapi)',
      'API development & integration',
      'Performance optimization'
    ],
    pricing: ['Basic: $500+', 'Standard: $1,500+', 'Premium: $5,000+'],
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'mobile-app',
    icon: Smartphone,
    title: 'Mobile Apps',
    titleFr: 'Applications Mobiles Android',
    shortDesc: 'High-performance Android apps',
    description: 'Transform your ideas into powerful mobile applications. We specialize in Android development, creating intuitive and feature-rich apps that users love.',
    features: [
      'Native Android development',
      'Cross-platform solutions',
      'UI/UX design for mobile',
      'App store optimization',
      'Push notifications',
      'Backend integration'
    ],
    pricing: ['MVP: $1,000+', 'Standard: $3,000+', 'Enterprise: $10,000+'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'graphic-design',
    icon: Palette,
    title: 'Graphic Design',
    titleFr: 'Design Graphique',
    shortDesc: 'Logos, UI/UX, brand identity',
    description: 'Create a memorable brand identity with our professional design services. From logos to complete visual identities, we craft designs that resonate with your audience.',
    features: [
      'Logo design & branding',
      'UI/UX design',
      'Social media graphics',
      'Marketing materials',
      'Brand guidelines',
      'Print design'
    ],
    pricing: ['Logo: $150+', 'Brand Package: $500+', 'Full Identity: $2,000+'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'content-creation',
    icon: PenTool,
    title: 'Content Creation',
    titleFr: 'Création de Contenu',
    shortDesc: 'Engaging texts, visuals & videos',
    description: 'Engage your audience with compelling content. We create everything from blog posts to video content that tells your brand story and drives engagement.',
    features: [
      'Blog writing & articles',
      'Video production',
      'Social media content',
      'Email newsletters',
      'Infographics',
      'Content strategy'
    ],
    pricing: ['Articles: $50+/piece', 'Social Pack: $200+/month', 'Full Service: $800+/month'],
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'digital-marketing',
    icon: Megaphone,
    title: 'Digital Marketing',
    titleFr: 'Marketing Digital & Réseaux Sociaux',
    shortDesc: 'Growth strategies & social media',
    description: 'Grow your online presence with data-driven marketing strategies. We help you reach the right audience and convert them into loyal customers.',
    features: [
      'Social media management',
      'SEO optimization',
      'Paid advertising (Google, Meta)',
      'Email marketing',
      'Analytics & reporting',
      'Growth hacking'
    ],
    pricing: ['Starter: $300+/month', 'Growth: $800+/month', 'Scale: $2,000+/month'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'copywriting',
    icon: FileText,
    title: 'Copywriting',
    titleFr: 'Copywriting Persuasif',
    shortDesc: 'Words that sell and inspire',
    description: 'Words matter. Our persuasive copywriting services help you communicate your value proposition clearly and compellingly to drive conversions.',
    features: [
      'Website copy',
      'Sales pages & landing pages',
      'Ad copy',
      'Product descriptions',
      'Email sequences',
      'Brand messaging'
    ],
    pricing: ['Web Copy: $200+/page', 'Sales Page: $500+', 'Full Package: $1,500+'],
    color: 'from-indigo-500 to-purple-500'
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Our Services" 
                subtitle="Comprehensive digital solutions to transform your business and accelerate growth"
                centered={false}
              />
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to={createPageUrl('Contact')}>
                  <GradientButton icon={ArrowRight}>
                    Get Started
                  </GradientButton>
                </Link>
                <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
                  <GradientButton variant="secondary" icon={MessageSquare}>
                    WhatsApp Us
                  </GradientButton>
                </a>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-20 blur-xl" />
              <img 
                src={SERVICES_IMAGE} 
                alt="YEMELINK Services" 
                className="relative rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-24 bg-[#060a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <GlassCard 
                key={service.id} 
                delay={index * 0.1} 
                className="p-6 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-cyan-400 text-sm mb-3">{service.titleFr}</p>
                <p className="text-gray-400 text-sm mb-4">{service.shortDesc}</p>
                
                <ul className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="text-cyan-400 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${selectedService.color} flex items-center justify-center`}>
                    <selectedService.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl text-white">{selectedService.title}</DialogTitle>
                    <p className="text-cyan-400">{selectedService.titleFr}</p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <p className="text-gray-400">{selectedService.description}</p>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">What's Included</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Pricing</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.pricing.map((price, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400">
                        {price}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link to={createPageUrl('Contact') + `?service=${selectedService.id}`}>
                    <GradientButton icon={ArrowRight}>
                      Request This Service
                    </GradientButton>
                  </Link>
                  <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
                    <GradientButton variant="secondary" icon={MessageSquare}>
                      Chat on WhatsApp
                    </GradientButton>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Not Sure What You Need?
            </h2>
            <p className="text-gray-400 text-lg">
              Let's discuss your project and find the perfect solution together. Free consultation included!
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to={createPageUrl('Contact')}>
                <GradientButton size="lg" icon={ArrowRight}>
                  Book Free Consultation
                </GradientButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}