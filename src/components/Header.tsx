import React from 'react';
import { Search, Bell, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 z-40">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
              <MapPin size={10} className="text-brand-secondary" /> El Jadida, Morocco
            </span>
            <h1 className="text-xl font-display font-bold tracking-tight text-brand-primary">Sale-App</h1>
          </div>
          <button className="relative p-2 bg-slate-100 rounded-full text-slate-600">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search services, places, products..." 
            className="w-full bg-slate-100 border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>
    </header>
  );
};
