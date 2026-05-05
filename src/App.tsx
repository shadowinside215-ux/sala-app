/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Home, Compass, MessageSquare, User } from 'lucide-react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { SocialView } from './components/SocialView';
import { ProfileView } from './components/ProfileView';
import { ExploreView } from './components/ExploreView';
import { AdminView } from './components/AdminView';
import { Category } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Auto-scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedCategory, isAdmin]);

  const renderContent = () => {
    if (isAdmin) {
      return <AdminView onBack={() => setIsAdmin(false)} />;
    }

    if (selectedCategory) {
      return (
        <CategoryView 
          categoryId={selectedCategory} 
          onBack={() => setSelectedCategory(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <>
            <Header />
            <HomeView onCategorySelect={setSelectedCategory} />
          </>
        );
      case 'explore':
        return (
          <div className="pt-6">
            <ExploreView />
          </div>
        );
      case 'social':
        return (
          <div className="pt-6">
            <SocialView />
          </div>
        );
      case 'profile':
        return (
          <div className="pt-6">
            <ProfileView onAdminSwitch={() => setIsAdmin(true)} />
          </div>
        );
      default:
        return <HomeView onCategorySelect={setSelectedCategory} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-primary selection:text-white">
      <div className="max-w-6xl mx-auto relative min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr] bg-slate-50 overflow-hidden sm:shadow-2xl">
        {/* Desktop Sidebar */}
        {!isAdmin && !selectedCategory && (
          <aside className="hidden lg:flex flex-col gap-8 p-8 border-r border-slate-100 bg-white">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                 Salé El Jadida, Morocco
              </span>
              <h1 className="text-2xl font-display font-bold tracking-tight text-brand-primary">Sale-App</h1>
            </div>
            
            <nav className="flex flex-col gap-2">
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'explore', icon: Compass, label: 'Explore' },
                { id: 'social', icon: MessageSquare, label: 'Social' },
                { id: 'profile', icon: User, label: 'Profile' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                      isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-bold text-sm tracking-tight">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto p-6 bg-slate-50 rounded-3xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Weather</p>
              <div className="flex items-center justify-between">
                 <span className="text-2xl font-display font-bold text-slate-800">22°C</span>
                 <span className="text-xs font-bold text-slate-500">Sunny</span>
              </div>
            </div>
          </aside>
        )}

        <main className="relative min-h-screen pb-20 lg:pb-0 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={isAdmin ? 'admin' : (selectedCategory || activeTab)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {!isAdmin && !selectedCategory && (
          <div className="lg:hidden">
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}
