import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, ExternalLink, Trash2, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/ui/GlassCard';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function FeedItem({ post, user, onUpdate, onDelete, isAdmin }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = async () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
      // In real app, delete like record
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      await base44.entities.Like.create({
        post_id: post.id,
        user_email: user?.email || 'anonymous'
      });
    }
    
    await base44.entities.Post.update(post.id, {
      likes_count: liked ? likesCount - 1 : likesCount + 1
    });
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'YEMELINK Community Post',
        text: post.content,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(`${post.content}\n\n${window.location.href}`);
      toast.success('Link copied to clipboard!');
    }
  };
  
  const handleDelete = async () => {
    await base44.entities.Post.delete(post.id);
    toast.success('Post deleted');
    onDelete?.(post.id);
  };
  
  const handlePin = async () => {
    await base44.entities.Post.update(post.id, { pinned: !post.pinned });
    toast.success(post.pinned ? 'Post unpinned' : 'Post pinned');
    onUpdate?.();
  };
  
  return (
    <GlassCard className="p-6" animate={false}>
      {/* Pinned Badge */}
      {post.pinned && (
        <div className="flex items-center gap-2 text-cyan-400 text-sm mb-4 pb-4 border-b border-white/10">
          <Pin className="w-4 h-4" />
          Pinned Post
        </div>
      )}
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
            {post.author_avatar ? (
              <img src={post.author_avatar} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              post.author_name?.[0]?.toUpperCase() || 'U'
            )}
          </div>
          <div>
            <p className="text-white font-medium">{post.author_name || 'Anonymous'}</p>
            <p className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        {(isAdmin || user?.email === post.created_by) && (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#0a0f1a] border-white/10">
              {isAdmin && (
                <DropdownMenuItem onClick={handlePin} className="text-white hover:bg-white/10">
                  <Pin className="w-4 h-4 mr-2" />
                  {post.pinned ? 'Unpin' : 'Pin'} Post
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete} className="text-red-400 hover:bg-white/10">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Content */}
      <p className="text-gray-300 mb-4 whitespace-pre-wrap">{post.content}</p>
      
      {/* Media */}
      {post.media_url && (
        <div className="mb-4 rounded-xl overflow-hidden">
          {post.type === 'video' ? (
            <video src={post.media_url} controls className="w-full max-h-96 object-cover" />
          ) : (
            <img src={post.media_url} alt="" className="w-full max-h-96 object-cover" />
          )}
        </div>
      )}
      
      {/* Link Preview */}
      {post.link_url && (
        <a 
          href={post.link_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 bg-white/5 rounded-xl text-cyan-400 hover:bg-white/10 transition-all mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="truncate">{post.link_url}</span>
        </a>
      )}
      
      {/* Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-white/10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </motion.button>
        
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments_count || 0}</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </GlassCard>
  );
}