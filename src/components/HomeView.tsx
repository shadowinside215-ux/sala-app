import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, EVENTS } from '../data';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';

interface HomeViewProps {
  onCategorySelect: (category: Category) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onCategorySelect }) => {
  return (
    <div className="flex flex-col gap-8 pb-24">
      {/* Featured Banner */}
      <section className="px-6">
        <div className="relative h-48 rounded-3xl overflow-hidden shadow-xl shadow-brand-primary/10">
          <img 
            src="https://images.unsplash.com/photo-1539112521612-58e578f7e217?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="El Jadida Coastline"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
            <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-widest mb-1">Featured Event</span>
            <h2 className="text-white text-lg font-bold font-display leading-tight mb-2">Summer Beats Festival at the Cité Portugaise</h2>
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit">Book Now</button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-slate-800">Explore Services</h3>
          <button className="text-brand-primary text-xs font-semibold">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = (LucideIcons as any)[cat.icon];
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategorySelect(cat.id)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`p-4 rounded-2xl ${cat.color} transition-transform duration-200 shadow-sm shadow-black/5`}>
                  {IconComponent && <IconComponent size={22} />}
                </div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight uppercase tracking-tight">
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Local Events / Stories */}
      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-slate-800">Happening This Week</h3>
          <button className="text-brand-primary text-xs font-semibold">Calendar</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {EVENTS.map((event) => (
            <motion.div 
              key={event.id}
              className="flex-shrink-0 w-64 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
            >
              <img src={event.image} alt={event.title} className="h-32 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase">{event.date}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase">{event.location}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{event.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
