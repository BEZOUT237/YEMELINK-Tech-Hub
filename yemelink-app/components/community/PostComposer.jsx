import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Link2, Video, X, Send, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function PostComposer({ user, onPostCreated }) {
  const [content, setContent] = useState('');
  const [type, setType] = useState('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMediaInput, setShowMediaInput] = useState(false);
  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setMediaUrl(file_url);
    setType(file.type.startsWith('video') ? 'video' : 'image');
    setUploading(false);
    toast.success('Media uploaded successfully!');
  };
  
  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Please write something!');
      return;
    }
    
    setLoading(true);
    
    const postData = {
      content,
      type,
      media_url: mediaUrl || null,
      link_url: linkUrl || null,
      author_name: user?.full_name || 'Anonymous',
      author_avatar: user?.avatar_url || null,
      likes_count: 0,
      comments_count: 0
    };
    
    await base44.entities.Post.create(postData);
    
    setContent('');
    setMediaUrl('');
    setLinkUrl('');
    setType('text');
    setShowMediaInput(false);
    setLoading(false);
    
    toast.success('Post published!');
    onPostCreated?.();
  };
  
  return (
    <GlassCard className="p-6" animate={false}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {user?.full_name?.[0]?.toUpperCase() || 'U'}
        </div>
        
        <div className="flex-1 space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something with the community..."
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none min-h-[100px]"
          />
          
          {/* Media Preview */}
          <AnimatePresence>
            {mediaUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                {type === 'video' ? (
                  <video src={mediaUrl} controls className="rounded-xl max-h-64 w-full object-cover" />
                ) : (
                  <img src={mediaUrl} alt="Upload" className="rounded-xl max-h-64 w-full object-cover" />
                )}
                <button
                  onClick={() => { setMediaUrl(''); setType('text'); }}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Link Input */}
          <AnimatePresence>
            {showMediaInput && type === 'link' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Paste a link URL..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all">
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Image className="w-5 h-5" />}
              </label>
              
              <label className="cursor-pointer p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all">
                <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
                <Video className="w-5 h-5" />
              </label>
              
              <button
                onClick={() => { setShowMediaInput(!showMediaInput); setType('link'); }}
                className={`p-2 rounded-lg transition-all ${showMediaInput && type === 'link' ? 'text-cyan-400 bg-white/10' : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'}`}
              >
                <Link2 className="w-5 h-5" />
              </button>
            </div>
            
            <GradientButton 
              size="sm" 
              onClick={handleSubmit}
              loading={loading}
              disabled={!content.trim()}
              icon={Send}
            >
              Post
            </GradientButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}