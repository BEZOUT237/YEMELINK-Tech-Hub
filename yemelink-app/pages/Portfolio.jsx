import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Filter } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import SocialLinks from '@/components/ui/SocialLinks';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'YEMELINK AI Automation Agency',
    shortTitle: 'YEMELINK.AAA',
    category: 'web',
    description: 'A cutting-edge AI automation agency platform showcasing our capabilities in artificial intelligence and workflow automation solutions.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    liveUrl: 'https://symphonious-pony-88095a.netlify.app',
    technologies: ['React', 'AI/ML', 'Automation', 'Netlify'],
    client: 'YEMELINK',
    testimonial: 'Our flagship AI automation showcase demonstrating modern web capabilities.'
  },
  {
    id: 2,
    title: 'Networker Platform',
    shortTitle: 'Networker (Lovable)',
    category: 'web',
    description: 'A professional networking platform built to connect entrepreneurs, freelancers, and business professionals.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    liveUrl: 'https://preview--networker.lovable.app/',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Lovable'],
    client: 'YEMELINK',
    testimonial: 'Built with modern technologies for seamless networking experiences.'
  },
  {
    id: 3,
    title: 'Networker App',
    shortTitle: 'Networker (Softr)',
    category: 'web',
    description: 'Alternative networker application built on Softr platform, demonstrating our versatility with no-code solutions.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    liveUrl: 'https://networker.softr.app/',
    technologies: ['Softr', 'Airtable', 'No-Code'],
    client: 'YEMELINK',
    testimonial: 'Rapid development with no-code tools for quick market validation.'
  },
  {
    id: 4,
    title: 'Arkigai Group',
    shortTitle: 'Arkigai Group',
    category: 'web',
    description: 'Corporate website for Arkigai Group, featuring modern design and comprehensive business information.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    liveUrl: 'https://arkigai-group.com',
    technologies: ['Web Design', 'SEO', 'Responsive'],
    client: 'Arkigai Group',
    testimonial: 'Professional corporate presence with excellent user experience.'
  },
  {
    id: 5,
    title: 'YEMELINK Hub',
    shortTitle: 'Linktree Hub',
    category: 'marketing',
    description: 'Central hub connecting all YEMELINK social platforms and resources in one convenient location.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    liveUrl: 'https://linktr.ee/YEMELINK',
    technologies: ['Linktree', 'Social Media', 'Marketing'],
    client: 'YEMELINK',
    testimonial: 'Centralized link management for improved social media presence.'
  },
  {
    id: 6,
    title: 'E-Commerce Platform',
    shortTitle: 'Online Store',
    category: 'web',
    description: 'Full-featured e-commerce solution with payment integration, inventory management, and analytics.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    liveUrl: '#',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    client: 'Confidential',
    testimonial: 'Increased online sales by 150% within the first quarter.'
  }
];

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'design', label: 'Design' },
  { id: 'marketing', label: 'Marketing' }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);
  
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Our Portfolio" 
            subtitle="Explore our latest projects and see how we've helped businesses transform their digital presence"
          />
        </div>
      </section>
      
      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <GlassCard 
                    animate={false}
                    className="overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60" />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                          View Project
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2">{project.shortTitle}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-white/5 text-gray-400 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      
      {/* Connect Section */}
      <section className="py-24 bg-[#060a12]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white">Connect With Us</h2>
            <p className="text-gray-400">
              Follow us on social media to stay updated with our latest projects and insights
            </p>
            <div className="flex justify-center">
              <SocialLinks size="lg" />
            </div>
            
            {/* External Links */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <a 
                href="https://arkigai-group.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                arkigai-group.com
              </a>
              <a 
                href="https://linktr.ee/YEMELINK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                linktr.ee/YEMELINK
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <p className="text-gray-400">{selectedProject.description}</p>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedProject.testimonial && (
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-400 italic">"{selectedProject.testimonial}"</p>
                    <p className="text-cyan-400 text-sm mt-2">— {selectedProject.client}</p>
                  </div>
                )}
                
                {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <GradientButton icon={ExternalLink} className="w-full">
                      View Live Project
                    </GradientButton>
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}