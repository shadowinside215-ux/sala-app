import React from 'react';
import { Home, Compass, MessageSquare, User, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'social', icon: MessageSquare, label: 'Social' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 pb-safe-area shadow-lg z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-brand-primary' : 'text-slate-400'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-50' : ''}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
