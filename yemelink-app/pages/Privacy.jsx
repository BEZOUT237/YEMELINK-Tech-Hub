import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

export default function Privacy() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <GlassCard className="p-8 prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-400 mb-4">
              YEMELINK ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2>
            <p className="text-gray-400 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Project requirements and business information</li>
              <li>Usage data and analytics</li>
              <li>Communication history</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-400 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Provide and improve our services</li>
              <li>Communicate with you about projects and inquiries</li>
              <li>Send relevant updates and marketing communications (with your consent)</li>
              <li>Analyze and improve our website and services</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Protection</h2>
            <p className="text-gray-400 mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Your Rights (GDPR)</h2>
            <p className="text-gray-400 mb-4">Under GDPR, you have the right to:</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Cookies</h2>
            <p className="text-gray-400 mb-4">
              We use cookies and similar technologies to improve your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-400 mb-4">
              We may use third-party services (analytics, payment processors) that have their own privacy policies. 
              We encourage you to review their policies.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Contact Us</h2>
            <p className="text-gray-400 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none text-gray-400 space-y-2">
              <li>Email: yemelink@gmail.com</li>
              <li>WhatsApp: +90 505 740 4314</li>
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}