import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye, Download, Filter, Search, Tag } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import SectionTitle from '@/components/ui/SectionTitle';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'web-template', label: 'Web Templates' },
  { value: 'branding-kit', label: 'Branding Kits' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'design-template', label: 'Design Templates' },
  { value: 'marketing-tool', label: 'Marketing Tools' },
  { value: 'content-pack', label: 'Content Packs' }
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('-created_date', 100),
    initialData: []
  });

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Digital Store" 
          subtitle="Premium templates, tools, and resources to elevate your brand"
        />

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          <GradientButton variant="secondary" className="md:w-auto">
            <ShoppingCart className="w-5 h-5" />
            Cart ({cart.length})
          </GradientButton>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === cat.value
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <GlassCard key={i} className="h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Tag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col" hover={false}>
                  <div className="relative">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                    {product.popular && (
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 border-0">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1">{product.description}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.sales_count || 0} sales)</span>
                    </div>

                    {product.features && product.features.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {product.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
                      </div>
                      <div className="flex gap-2">
                        {product.demo_url && (
                          <GradientButton 
                            size="sm" 
                            variant="secondary"
                            onClick={() => window.open(product.demo_url, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </GradientButton>
                        )}
                        <GradientButton size="sm" onClick={() => addToCart(product)}>
                          <ShoppingCart className="w-4 h-4" />
                        </GradientButton>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}