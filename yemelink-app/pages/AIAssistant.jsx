import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw, MessageSquare, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ReactMarkdown from 'react-markdown';

const suggestedPrompts = [
  "What services does YEMELINK offer?",
  "How much does a website cost?",
  "Can you help with mobile app development?",
  "What's the process for starting a project?",
  "Tell me about digital marketing services"
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm YEMELINK's AI assistant. I can help you learn about our services, get project estimates, and answer your questions about web development, mobile apps, design, and digital marketing. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;
    
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    const systemContext = `You are YEMELINK's friendly AI assistant. YEMELINK is a tech & digital media company founded by Stéphane Yemeli.

Services offered:
- Web Development (Full Stack): $500+ for basic, $1500+ standard, $5000+ premium
- Mobile App Development (Android): $1000+ MVP, $3000+ standard, $10000+ enterprise
- Graphic Design: $150+ logo, $500+ brand package, $2000+ full identity
- Content Creation: $50+/article, $200+/month social, $800+/month full service
- Digital Marketing: $300+/month starter, $800+/month growth, $2000+/month scale
- Copywriting: $200+/page web copy, $500+ sales page, $1500+ full package

Contact: yemelink@gmail.com, WhatsApp: +905057404314
Portfolio: arkigai-group.com, linktr.ee/YEMELINK
Stats: 2+ years experience, 16 projects, 16 happy clients

Be helpful, professional, and encourage users to request a quote or contact via WhatsApp for detailed discussions. Keep responses concise but informative.`;
    
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `${systemContext}\n\nUser: ${text}\n\nRespond helpfully and naturally:`,
    });
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleNewChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hello! I'm YEMELINK's AI assistant. How can I help you today?"
      }
    ]);
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Bot className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Assistant</h1>
          <p className="text-gray-400">Get instant answers about our services, pricing, and more</p>
        </div>
        
        {/* Chat Container */}
        <GlassCard className="p-0 overflow-hidden" animate={false}>
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                      : 'bg-white/5 border border-white/10'
                  }`}>
                    <ReactMarkdown
                      components={{
                        p: ({children}) => <p className="text-gray-300 text-sm leading-relaxed">{children}</p>,
                        strong: ({children}) => <strong className="text-white">{children}</strong>,
                        ul: ({children}) => <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 mt-2">{children}</ul>,
                        li: ({children}) => <li>{children}</li>,
                        a: ({href, children}) => <a href={href} className="text-cyan-400 hover:underline">{children}</a>
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="px-6 pb-4">
              <p className="text-gray-500 text-sm mb-3">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(prompt)}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              <button
                onClick={handleNewChat}
                className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title="New chat"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 resize-none pr-12 min-h-[48px] max-h-[120px]"
                  rows={1}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Need personalized assistance? Talk to a human!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/905057404314" target="_blank" rel="noopener noreferrer">
              <GradientButton icon={MessageSquare}>
                Chat on WhatsApp
              </GradientButton>
            </a>
            <Link to={createPageUrl('Contact')}>
              <GradientButton variant="secondary" icon={ArrowRight}>
                Request a Quote
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}