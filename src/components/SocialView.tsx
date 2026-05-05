import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { SOCIAL_POSTS } from '../data';

export const SocialView: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-6 pb-24">
      <header className="flex items-center justify-between">
         <h2 className="text-2xl font-display font-bold text-slate-800">Community</h2>
         <button className="w-10 h-10 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
           <Plus size={20} />
         </button>
      </header>

      <div className="flex flex-col gap-6">
        {SOCIAL_POSTS.map((post) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-2xl bg-slate-100" />
              <div>
                <h4 className="text-sm font-bold text-slate-800">{post.author}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.timestamp}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {post.content}
            </p>
            <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
               <button className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase group">
                 <Heart size={18} className="group-hover:text-rose-500 transition-colors" /> {post.likes}
               </button>
               <button className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase group">
                 <MessageCircle size={18} className="group-hover:text-blue-500 transition-colors" /> {post.comments}
               </button>
               <button className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase ml-auto group">
                 <Share2 size={18} className="group-hover:text-amber-500 transition-colors" /> Share
               </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
