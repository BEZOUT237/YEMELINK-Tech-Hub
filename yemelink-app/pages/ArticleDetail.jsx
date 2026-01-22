import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Demo article for fallback
const demoArticle = {
  id: '1',
  title: 'Getting Started with Web Development in 2024',
  content: `
# Introduction

Web development continues to evolve rapidly, and 2024 brings new tools, frameworks, and best practices. Whether you're a complete beginner or looking to update your skills, this guide will help you navigate the modern web development landscape.

## The Foundation: HTML, CSS, and JavaScript

Before diving into frameworks and libraries, it's crucial to have a solid understanding of the fundamentals:

### HTML (HyperText Markup Language)
HTML is the backbone of every web page. It provides the structure and content of your website.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Website</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

### CSS (Cascading Style Sheets)
CSS brings your HTML to life with colors, layouts, and animations.

### JavaScript
JavaScript adds interactivity and dynamic functionality to your websites.

## Modern Development Tools

Today's web developers use a variety of tools to streamline their workflow:

1. **Code Editors**: VS Code, Sublime Text
2. **Version Control**: Git and GitHub
3. **Package Managers**: npm, yarn
4. **Build Tools**: Webpack, Vite

## Next Steps

Once you're comfortable with the basics, consider learning:

- **React, Vue, or Angular** for building complex user interfaces
- **Node.js** for server-side JavaScript
- **TypeScript** for type-safe JavaScript

## Conclusion

Web development is an exciting and rewarding field. Start with the fundamentals, practice regularly, and don't be afraid to build projects. The best way to learn is by doing!

---

*Need help with your web development project? [Contact YEMELINK](/Contact) for professional assistance.*
  `,
  cover_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
  category: 'tutorial',
  tags: ['Web Development', 'Beginners', 'HTML/CSS', 'JavaScript'],
  read_time: 8,
  created_date: new Date().toISOString()
};

export default function ArticleDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  
  // In real app, fetch article by ID. Using demo for now.
  const article = demoArticle;
  
  const handleShare = async (platform) => {
    const url = window.location.href;
    const text = article.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`
    };
    
    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to={createPageUrl('Blog')} className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-4">
            {article.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(article.created_date), 'MMMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.read_time} min read
            </div>
          </div>
        </motion.div>
        
        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <img 
            src={article.cover_image} 
            alt={article.title}
            className="w-full rounded-2xl border border-white/10"
          />
        </motion.div>
        
        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-cyan max-w-none mb-12"
        >
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>,
              p: ({children}) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
              ul: ({children}) => <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">{children}</ol>,
              li: ({children}) => <li className="text-gray-300">{children}</li>,
              strong: ({children}) => <strong className="text-white font-semibold">{children}</strong>,
              em: ({children}) => <em className="text-cyan-400">{children}</em>,
              code: ({inline, children}) => inline ? (
                <code className="px-2 py-1 bg-white/10 rounded text-cyan-400 text-sm">{children}</code>
              ) : (
                <code className="block p-4 bg-[#0a0f1a] rounded-xl border border-white/10 text-gray-300 overflow-x-auto my-4">{children}</code>
              ),
              pre: ({children}) => <pre className="bg-[#0a0f1a] rounded-xl border border-white/10 overflow-x-auto my-4">{children}</pre>,
              hr: () => <hr className="border-white/10 my-8" />,
              a: ({href, children}) => <a href={href} className="text-cyan-400 hover:underline">{children}</a>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-4 bg-white/5 rounded-r-lg">
                  {children}
                </blockquote>
              )
            }}
          >
            {article.content}
          </ReactMarkdown>
        </motion.article>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="border-white/20 text-gray-400">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Share */}
        <GlassCard className="p-6" animate={false}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white font-medium">Share this article</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('copy')}
                className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/10 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </GlassCard>
        
        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Need help with your project?</h3>
          <Link to={createPageUrl('Contact')}>
            <GradientButton>Get in Touch</GradientButton>
          </Link>
        </div>
      </div>
    </div>
  );
}