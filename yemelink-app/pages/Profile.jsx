import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Settings, LogOut, Edit2, Save, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', bio: '' });
  
  useEffect(() => {
    const loadUser = async () => {
      const isAuth = await base44.auth.isAuthenticated();
      if (isAuth) {
        const userData = await base44.auth.me();
        setUser(userData);
        setFormData({ full_name: userData.full_name || '', bio: userData.bio || '' });
      }
      setLoading(false);
    };
    loadUser();
  }, []);
  
  const { data: userPosts = [] } = useQuery({
    queryKey: ['userPosts', user?.email],
    queryFn: () => base44.entities.Post.filter({ created_by: user?.email }, '-created_date', 10),
    enabled: !!user?.email
  });
  
  const handleSave = async () => {
    await base44.auth.updateMe(formData);
    setUser({ ...user, ...formData });
    setEditing(false);
    toast.success('Profile updated!');
  };
  
  const handleLogout = async () => {
    await base44.auth.logout();
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="p-8 text-center max-w-md">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
          <p className="text-gray-400 mb-6">Please sign in to view your profile</p>
          <GradientButton onClick={() => base44.auth.redirectToLogin()}>
            Sign In
          </GradientButton>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <GlassCard className="p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {editing ? (
                <div className="space-y-4">
                  <Input
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Write a short bio..."
                    className="bg-white/5 border-white/10 text-white resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <GradientButton size="sm" onClick={handleSave} icon={Save}>
                      Save
                    </GradientButton>
                    <GradientButton size="sm" variant="secondary" onClick={() => setEditing(false)} icon={X}>
                      Cancel
                    </GradientButton>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white mb-2">{user.full_name || 'Anonymous User'}</h1>
                  <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  {user.created_date && (
                    <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
                      <Calendar className="w-4 h-4" />
                      Joined {format(new Date(user.created_date), 'MMMM yyyy')}
                    </p>
                  )}
                  {user.bio && <p className="text-gray-400 mt-4">{user.bio}</p>}
                </>
              )}
            </div>
            
            {!editing && (
              <div className="flex gap-2">
                <GradientButton size="sm" variant="secondary" onClick={() => setEditing(true)} icon={Edit2}>
                  Edit
                </GradientButton>
              </div>
            )}
          </div>
        </GlassCard>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <GlassCard className="p-6 text-center" animate={false}>
            <div className="text-3xl font-bold text-cyan-400">{userPosts.length}</div>
            <div className="text-gray-500">Posts</div>
          </GlassCard>
          <GlassCard className="p-6 text-center" animate={false}>
            <div className="text-3xl font-bold text-green-400">
              {userPosts.reduce((acc, p) => acc + (p.likes_count || 0), 0)}
            </div>
            <div className="text-gray-500">Total Likes</div>
          </GlassCard>
        </div>
        
        {/* Recent Posts */}
        <GlassCard className="p-6" animate={false}>
          <h3 className="text-xl font-semibold text-white mb-4">Your Recent Posts</h3>
          {userPosts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No posts yet. Share something with the community!</p>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="p-4 bg-white/5 rounded-xl">
                  <p className="text-gray-300 line-clamp-2">{post.content}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{post.likes_count || 0} likes</span>
                    <span>{format(new Date(post.created_date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
        
        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <GradientButton variant="secondary" onClick={handleLogout} icon={LogOut}>
            Sign Out
          </GradientButton>
        </div>
      </div>
    </div>
  );
}