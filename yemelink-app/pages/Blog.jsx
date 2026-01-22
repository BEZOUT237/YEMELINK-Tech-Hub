import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Clock, Tag, ArrowRight, BookOpen, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Demo articles (will be replaced by database)
const demoArticles = [
  {
    id: '1',
    title: 'Getting Started with Web Development in 2024',
    slug: 'getting-started-web-development-2024',
    excerpt: 'Learn the essential skills and tools you need to start your web development journey this year.',
    cover_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    category: 'tutorial',
    tags: ['Web Development', 'Beginners', 'HTML/CSS'],
    read_time: 8,
    published: true,
    created_date: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Building a Successful Digital Marketing Strategy',
    slug: 'digital-marketing-strategy',
    excerpt: 'Discover the key components of an effective digital marketing strategy for small businesses.',
    cover_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    category: 'tips',
    tags: ['Marketing', 'Strategy', 'Business'],
    read_time: 6,
    published: true,
    created_date: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Mobile App Development: Native vs Cross-Platform',
    slug: 'native-vs-cross-platform',
    excerpt: 'A comprehensive comparison to help you choose the right approach for your mobile app project.',
    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'tutorial',
    tags: ['Mobile', 'Android', 'Development'],
    read_time: 10,
    published: true,
    created_date: new Date().toISOString()
  },
  {
    id: '4',
    title: 'The Power of Good UI/UX Design',
    slug: 'power-of-ui-ux-design',
    excerpt: 'Why investing in quality design can make or break your digital product.',
    cover_image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    category: 'case-study',
    tags: ['Design', 'UX', 'UI'],
    read_time: 5,
    published: true,
    created_date: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Content Creation Tips for Social Media',
    slug: 'content-creation-social-media',
    excerpt: 'Practical tips to create engaging content that resonates with your audience.',
    cover_image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80',
    category: 'tips',
    tags: ['Content', 'Social Media', 'Marketing'],
    read_time: 7,
    published: true,
    created_date: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Copywriting That Converts: A Beginner Guide',
    slug: 'copywriting-that-converts',
    excerpt: 'Master the art of persuasive writing to boost your conversion rates.',
    cover_image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    category: 'tutorial',
    tags: ['Copywriting', 'Marketing', 'Sales'],
    read_time: 9,
    published: true,
    created_date: new Date().toISOString()
  }
];

const categories = [
  { id: 'all', label: 'All Articles' },
  { id: 'tutorial', label: 'Tutorials' },
  { id: 'tips', label: 'Tips & Tricks' },
  { id: 'case-study', label: 'Case Studies' },
  { id: 'news', label: 'News' }
];

const categoryColors = {
  tutorial: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  tips: 'bg-green-500/20 text-green-400 border-green-500/30',
  'case-study': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  news: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const dbArticles = await base44.entities.Article.filter({ published: true }, '-created_date');
      return dbArticles.length > 0 ? dbArticles : demoArticles;
    }
  });
  
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Blog & Tutorials" 
          subtitle="Learn from our articles, tutorials, and case studies on web development, design, and digital marketing"
        />
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <GlassCard key={i} className="overflow-hidden" animate={false}>
                <Skeleton className="aspect-video bg-white/10" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-full bg-white/10" />
                  <Skeleton className="h-4 w-2/3 bg-white/10" />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">No articles found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={createPageUrl('ArticleDetail') + `?id=${article.id}`}>
                  <GlassCard className="overflow-hidden group h-full" animate={false}>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={article.cover_image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={`border ${categoryColors[article.category] || 'bg-gray-500/20 text-gray-400'}`}>
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {article.read_time} min read
                        </div>
                        <span className="text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}