import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

export default function Terms() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <GlassCard className="p-8 prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-400 mb-4">
              By accessing or using YEMELINK's services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of these terms, you may not access our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Services</h2>
            <p className="text-gray-400 mb-4">
              YEMELINK provides digital services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Web development and design</li>
              <li>Mobile application development</li>
              <li>Graphic design services</li>
              <li>Digital marketing and content creation</li>
              <li>Copywriting services</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Project Terms</h2>
            <p className="text-gray-400 mb-4">
              All projects are subject to a separate agreement that outlines specific deliverables, 
              timelines, and payment terms. Final pricing will be provided after project consultation.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
              <li>Payment schedules will be agreed upon before project commencement</li>
              <li>A deposit may be required for larger projects</li>
              <li>All prices are subject to change based on project scope</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-400 mb-4">
              Upon full payment, clients receive ownership rights to the final deliverables. 
              YEMELINK retains the right to display work in our portfolio unless otherwise agreed.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Revisions</h2>
            <p className="text-gray-400 mb-4">
              The number of revision rounds included in a project will be specified in the project agreement. 
              Additional revisions may incur extra charges.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-400 mb-4">
              YEMELINK shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of our services.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Termination</h2>
            <p className="text-gray-400 mb-4">
              Either party may terminate a project with written notice. In case of termination, 
              payment for completed work will be required.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-400 mb-4">
              We reserve the right to modify these terms at any time. 
              Changes will be effective immediately upon posting on this page.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Contact</h2>
            <p className="text-gray-400 mb-4">
              For questions about these Terms of Service, contact us:
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