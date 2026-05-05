import React from 'react';
import { User, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react';

export const ProfileView: React.FC<{ onAdminSwitch: () => void }> = ({ onAdminSwitch }) => {
  const sections = [
    { title: 'Information', items: [
      { id: '1', label: 'Personal details', icon: User },
      { id: '2', label: 'Payment methods', icon: CreditCard },
      { id: '3', label: 'Security & Privacy', icon: Shield },
    ]},
    { title: 'Support', items: [
      { id: '4', label: 'Help center', icon: HelpCircle },
      { id: '5', label: 'Sale-App for business', icon: Settings },
    ]}
  ];

  return (
    <div className="flex flex-col gap-8 px-6 pb-24">
      <header className="flex items-center gap-4 py-4">
        <div className="w-20 h-20 rounded-[32px] bg-brand-primary p-0.5 shadow-xl shadow-brand-primary/20">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" className="w-full h-full rounded-[30px] bg-white" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-800">Omar Belkhir</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Member since 2024</p>
          <button 
            onClick={onAdminSwitch}
            className="mt-2 text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em] border-b-2 border-brand-secondary pb-0.5"
          >
            Switch to Admin Panel
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{section.title}</h3>
            <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${
                      idx !== section.items.length - 1 ? 'border-b border-slate-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center">
                        <Icon size={20} />
                      </div>
                      <span className="font-semibold text-slate-700">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <button className="flex items-center justify-center gap-2 p-5 bg-rose-50 text-rose-600 font-bold rounded-[32px] hover:bg-rose-100 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
