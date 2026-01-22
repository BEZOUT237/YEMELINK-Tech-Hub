import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import SocialLinks from '@/components/ui/SocialLinks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const services = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App Development' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'other', label: 'Other' }
];

const budgets = [
  { value: '< $500', label: 'Less than $500' },
  { value: '$500 - $1000', label: '$500 - $1,000' },
  { value: '$1000 - $5000', label: '$1,000 - $5,000' },
  { value: '$5000+', label: '$5,000+' }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Get service from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, service }));
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    await base44.entities.QuoteRequest.create(formData);
    
    // Send email notification
    await base44.integrations.Core.SendEmail({
      to: 'yemelink@gmail.com',
      subject: `New Quote Request: ${formData.service}`,
      body: `
        New quote request received:
        
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Service: ${formData.service}
        Budget: ${formData.budget}
        
        Message:
        ${formData.message}
      `
    });
    
    setLoading(false);
    setSubmitted(true);
    toast.success('Your request has been submitted successfully!');
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Request Submitted!</h2>
          <p className="text-gray-400 mb-6">
            Thank you for reaching out! We'll get back to you within 24 hours. 
            For urgent inquiries, feel free to WhatsApp us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
              <GradientButton icon={MessageSquare}>
                WhatsApp Us
              </GradientButton>
            </a>
            <GradientButton 
              variant="secondary" 
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
              }}
            >
              Submit Another
            </GradientButton>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Have a project in mind? Let's discuss how we can help you achieve your goals"
        />
        
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:yemelink@gmail.com"
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">yemelink@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/905057404314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">WhatsApp</p>
                    <p className="text-white group-hover:text-green-400 transition-colors">+90 505 740 4314</p>
                  </div>
                </a>
                
                <a 
                  href="https://linktr.ee/YEMELINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">All Links</p>
                    <p className="text-white group-hover:text-purple-400 transition-colors">linktr.ee/YEMELINK</p>
                  </div>
                </a>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
              <SocialLinks />
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Quick Response</h3>
              <p className="text-gray-400 text-sm mb-4">
                Need immediate assistance? Chat with us on WhatsApp for instant support.
              </p>
              <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
                <GradientButton className="w-full" icon={MessageSquare}>
                  Start WhatsApp Chat
                </GradientButton>
              </a>
            </GlassCard>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Request a Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Service Needed *</label>
                    <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0f1a] border-white/10">
                        {services.map((s) => (
                          <SelectItem key={s.value} value={s.value} className="text-white hover:bg-white/10">
                            {s.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Budget Range</label>
                  <Select value={formData.budget} onValueChange={(v) => setFormData({ ...formData, budget: v })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select your budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0f1a] border-white/10">
                      {budgets.map((b) => (
                        <SelectItem key={b.value} value={b.value} className="text-white hover:bg-white/10">
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Project Details *</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, goals, and timeline..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                  />
                </div>
                
                <GradientButton 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  loading={loading}
                  icon={Send}
                >
                  Submit Request
                </GradientButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}