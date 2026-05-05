import React, { useState } from 'react';
import { ArrowLeft, Plus, Image as ImageIcon, LayoutDashboard, Settings, ListPlus } from 'lucide-react';

export const AdminView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'form'>('dashboard');
  const [formType, setFormType] = useState<string>('');

  const stats = [
    { label: 'Total Users', value: '12.4k', change: '+12%' },
    { label: 'Monthly Sales', value: '45.2k', change: '+5%' },
    { label: 'Service Requests', value: '890', change: '+24%' },
  ];

  const handleOpenForm = (type: string) => {
    setFormType(type);
    setActiveScreen('form');
  };

  if (activeScreen === 'form') {
    return (
      <div className="flex flex-col gap-6 px-6 py-6 pb-24 min-h-screen bg-slate-50">
        <header className="flex items-center gap-4">
          <button onClick={() => setActiveScreen('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-display font-bold text-slate-800">Add {formType}</h2>
        </header>

        <form className="bg-white rounded-[40px] p-8 shadow-xl shadow-brand-primary/5 space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Title</span>
              <input type="text" className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" placeholder={`Enter ${formType} title`} />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Description</span>
              <textarea className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 min-h-[120px]" placeholder="Detailed description..."></textarea>
            </label>
            <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ImageIcon size={32} strokeWidth={1} />
              <span className="text-xs font-semibold">Upload Image Cover</span>
            </div>
          </div>
          <button type="button" onClick={() => setActiveScreen('dashboard')} className="w-full h-16 bg-brand-primary text-white font-bold rounded-2xl">
            Save {formType}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-6 py-6 pb-24 min-h-screen bg-slate-50">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-display font-bold text-slate-800">Manager Panel</h2>
        </div>
        <button className="p-2 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-600">
          <Settings size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
             <div className="flex items-end justify-between">
               <h4 className="text-3xl font-display font-bold text-brand-primary">{stat.value}</h4>
               <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
           {['Service', 'Product', 'Event', 'Post'].map((type) => (
             <button 
               key={type}
               onClick={() => handleOpenForm(type)}
               className="bg-brand-primary text-white p-6 rounded-[32px] flex flex-col gap-3 shadow-lg shadow-brand-primary/20 group hover:-translate-y-1 transition-transform"
             >
               <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                 <Plus size={24} />
               </div>
               <span className="font-bold text-sm tracking-tight">Add {type}</span>
             </button>
           ))}
        </div>
      </div>
      
      <div className="p-6 bg-slate-900 rounded-[40px] text-white flex items-center justify-between">
        <div>
          <h4 className="font-display font-bold">System Status</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">All services operational</p>
        </div>
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
      </div>
    </div>
  );
};
