/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
      <div className="max-w-md mx-auto relative min-h-screen pb-20 sm:shadow-2xl bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={isAdmin ? 'admin' : (selectedCategory || activeTab)}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {!isAdmin && !selectedCategory && (
          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
