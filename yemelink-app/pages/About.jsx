import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Target, Heart, Zap, Users, Award, Globe, ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import StatCounter from '@/components/ui/StatCounter';
import SocialLinks from '@/components/ui/SocialLinks';

const FOUNDER_IMAGE = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/6b02c160b_stephane-yemelijpg.png';
const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6928a38e053f07bf2c3976ff/9b04ae3dc_ymelinklogo.jpg';

const values = [
  { icon: Target, title: 'Excellence', description: 'We strive for perfection in every project we deliver' },
  { icon: Heart, title: 'Passion', description: 'We love what we do and it shows in our work' },
  { icon: Zap, title: 'Innovation', description: 'We embrace new technologies and creative solutions' },
  { icon: Users, title: 'Collaboration', description: 'We work closely with clients to achieve their vision' }
];

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
                About YEMELINK
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Your Trusted
                <span className="gradient-text"> Digital Partner</span>
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                YEMELINK is a tech & digital media company dedicated to helping businesses and entrepreneurs 
                transform their digital presence. We specialize in web development, mobile apps, graphic design, 
                and digital marketing solutions.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                Founded with a mission to deliver high-quality digital solutions at accessible prices, 
                we've helped numerous clients across the globe bring their ideas to life.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to={createPageUrl('Contact')}>
                  <GradientButton icon={ArrowRight}>
                    Work With Us
                  </GradientButton>
                </Link>
                <Link to={createPageUrl('Portfolio')}>
                  <GradientButton variant="secondary">
                    View Our Work
                  </GradientButton>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-2xl" />
              <img 
                src={LOGO_URL} 
                alt="YEMELINK" 
                className="relative w-full max-w-md mx-auto rounded-3xl border border-white/10"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-16">
          <GlassCard className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCounter value="2" suffix="+" label="Years Experience" delay={0} />
              <StatCounter value="16" suffix="" label="Projects Completed" delay={200} />
              <StatCounter value="16" suffix="" label="Happy Clients" delay={400} />
              <StatCounter value="6" suffix="" label="Services Offered" delay={600} />
            </div>
          </GlassCard>
        </section>
        
        {/* Values */}
        <section className="py-16">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide everything we do"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard key={value.title} delay={index * 0.1} className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
        
        {/* Founder */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/20">
                <img 
                  src={FOUNDER_IMAGE} 
                  alt="Stéphane Yemeli" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div>
                <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">Founder & CEO</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Stéphane Yemeli</h2>
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                I'm Stéphane Yemeli, the founder of YEMELINK. With a passion for technology and digital innovation, 
                I started YEMELINK to help businesses and entrepreneurs transform their online presence.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                With over 2 years of hands-on experience in web development, mobile applications, and digital marketing, 
                I've dedicated myself to delivering high-quality solutions that drive real results.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                My mission is simple: to make professional digital services accessible to everyone, 
                regardless of their budget or technical background.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="mailto:yemelink@gmail.com">
                  <GradientButton size="sm" icon={Mail}>
                    Email Me
                  </GradientButton>
                </a>
                <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
                  <GradientButton variant="secondary" size="sm" icon={Phone}>
                    WhatsApp
                  </GradientButton>
                </a>
              </div>
              
              <div className="pt-4">
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Links */}
        <section className="py-16">
          <GlassCard className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Connect With Us</h3>
            <p className="text-gray-400 mb-6">Find us on all platforms</p>
            
            <div className="flex justify-center mb-6">
              <SocialLinks size="lg" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
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
          </GlassCard>
        </section>
      </div>
    </div>
  );
}