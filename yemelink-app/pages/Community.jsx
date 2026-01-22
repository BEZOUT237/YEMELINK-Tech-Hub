import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Users, TrendingUp, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PostComposer from '@/components/community/PostComposer';
import FeedItem from '@/components/community/FeedItem';
import GlassCard from '@/components/ui/GlassCard';
import SectionTitle from '@/components/ui/SectionTitle';
import GradientButton from '@/components/ui/GradientButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Community() {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const loadUser = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        const userData = await base44.auth.me();
        setUser(userData);
      }
    };
    loadUser();
  }, []);
  
  const { data: posts = [], isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => base44.entities.Post.list('-created_date', 50)
  });
  
  // Sort: pinned first, then by date
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.created_date) - new Date(a.created_date);
  });
  
  const handlePostCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };
  
  const handlePostDeleted = (postId) => {
    queryClient.setQueryData(['posts'], (old) => old.filter(p => p.id !== postId));
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm mb-4"
          >
            <Users className="w-4 h-4" />
            Community Feed
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Conversation
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Share ideas, ask questions, and connect with fellow entrepreneurs and creators
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <GlassCard className="p-4 text-center" animate={false}>
            <div className="text-2xl font-bold text-cyan-400">{posts.length}</div>
            <div className="text-gray-500 text-sm">Posts</div>
          </GlassCard>
          <GlassCard className="p-4 text-center" animate={false}>
            <div className="text-2xl font-bold text-green-400">
              {posts.reduce((acc, p) => acc + (p.likes_count || 0), 0)}
            </div>
            <div className="text-gray-500 text-sm">Likes</div>
          </GlassCard>
          <GlassCard className="p-4 text-center" animate={false}>
            <div className="text-2xl font-bold text-purple-400">16+</div>
            <div className="text-gray-500 text-sm">Members</div>
          </GlassCard>
        </div>
        
        {/* Composer */}
        {user ? (
          <div className="mb-8">
            <PostComposer user={user} onPostCreated={handlePostCreated} />
          </div>
        ) : (
          <GlassCard className="p-6 mb-8 text-center" animate={false}>
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <p className="text-white font-medium mb-2">Join the community</p>
            <p className="text-gray-400 text-sm mb-4">Sign in to share posts and interact with others</p>
            <GradientButton onClick={() => base44.auth.redirectToLogin()}>
              Sign In
            </GradientButton>
          </GlassCard>
        )}
        
        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
        
        {/* Feed */}
        <div className="space-y-6">
          {isLoading ? (
            // Skeleton Loaders
            Array(3).fill(0).map((_, i) => (
              <GlassCard key={i} className="p-6" animate={false}>
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="space-y-2">
                    <Skeleton className="w-24 h-4 bg-white/10" />
                    <Skeleton className="w-16 h-3 bg-white/10" />
                  </div>
                </div>
                <Skeleton className="w-full h-20 bg-white/10 mb-4" />
                <div className="flex gap-4">
                  <Skeleton className="w-16 h-6 bg-white/10" />
                  <Skeleton className="w-16 h-6 bg-white/10" />
                </div>
              </GlassCard>
            ))
          ) : sortedPosts.length === 0 ? (
            <GlassCard className="p-12 text-center" animate={false}>
              <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">No posts yet</h3>
              <p className="text-gray-400">Be the first to share something with the community!</p>
            </GlassCard>
          ) : (
            sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FeedItem 
                  post={post} 
                  user={user}
                  isAdmin={user?.role === 'admin'}
                  onUpdate={handlePostCreated}
                  onDelete={handlePostDeleted}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}