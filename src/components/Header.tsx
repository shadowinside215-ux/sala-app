import React from 'react';
import { Search, Bell, MapPin } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 z-40 border-b border-slate-50">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col lg:hidden">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
              <MapPin size={10} className="text-brand-secondary" /> Salé, Morocco
            </span>
            <h1 className="text-xl font-display font-bold tracking-tight text-brand-primary">Sale-App</h1>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-lg font-display font-bold text-slate-800">Welcome Back, Omar</h2>
            <p className="text-xs text-slate-400 font-medium tracking-tight">Stay connected with your city.</p>
          </div>
          <button className="relative p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="relative group max-w-md lg:max-w-none">
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
