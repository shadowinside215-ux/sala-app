import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Category, ServiceItem, Route, Product } from '../types';
import { GOV_SERVICES, TRANSPORT_ROUTES, HEALTH_SERVICES, EDU_CENTERS, PRODUCTS, CATEGORIES, EVENTS } from '../data';
import * as LucideIcons from 'lucide-react';

interface CategoryViewProps {
  categoryId: Category;
  onBack: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categoryId, onBack }) => {
  const categoryInfo = CATEGORIES.find(c => c.id === categoryId);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const renderContent = () => {
    switch (categoryId) {
      case 'government':
        return (
          <div className="flex flex-col gap-4">
            {GOV_SERVICES.map(service => (
              <ServiceCard key={service.id} item={service} onClick={() => setSelectedItem(service)} />
            ))}
          </div>
        );
      case 'healthcare':
        return (
          <div className="flex flex-col gap-4">
            {HEALTH_SERVICES.map(service => (
              <ServiceCard key={service.id} item={service} onClick={() => setSelectedItem(service)} />
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="flex flex-col gap-4">
            {EDU_CENTERS.map(service => (
              <ServiceCard key={service.id} item={service} onClick={() => setSelectedItem(service)} />
            ))}
          </div>
        );
      case 'culture':
      case 'entertainment':
        return (
          <div className="flex flex-col gap-4">
            {EVENTS.map(event => (
              <div 
                key={event.id}
                onClick={() => setSelectedItem(event)}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm"
              >
                <img src={event.image} className="h-40 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-brand-secondary bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{event.date}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">@ {event.location}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-slate-800">{event.title}</h4>
                </div>
              </div>
            ))}
          </div>
        );
      case 'transportation':
        return (
          <div className="flex flex-col gap-4">
            {TRANSPORT_ROUTES.map(route => (
              <RouteCard key={route.id} route={route} onClick={() => setSelectedItem(route)} />
            ))}
          </div>
        );
      case 'ecommerce':
        return (
          <div className="grid grid-cols-2 gap-4">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => setSelectedItem(product)} />
            ))}
          </div>
        );
      default:
        return (
          <div className="py-20 text-center text-slate-400">
            <LucideIcons.Construction size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">This module is coming soon to El Jadida.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center gap-4 z-40 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-display font-bold text-slate-800 capitalize leading-tight">{categoryInfo?.name}</h2>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-sans">{categoryInfo?.description}</p>
        </div>
      </header>

      <main className="px-6 py-6 pb-24">
        {renderContent()}
      </main>

      <AnimatePresence>
        {selectedItem && (
          <DetailModal 
            type={categoryId} 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ServiceCard: React.FC<{ item: ServiceItem; onClick: () => void }> = ({ item, onClick }) => {
  const Icon = (LucideIcons as any)[item.icon] || LucideIcons.File;
  return (
    <button onClick={onClick} className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm text-left">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-800">{item.title}</h4>
        <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
      </div>
    </button>
  );
};

const RouteCard: React.FC<{ route: Route; onClick: () => void }> = ({ route, onClick }) => {
  return (
    <button onClick={onClick} className="p-4 bg-white rounded-3xl border border-slate-100 shadow-sm text-left flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${route.type === 'bus' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
            {route.line}
          </div>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
            <Clock size={10} /> {route.eta}
          </span>
        </div>
        <LucideIcons.ChevronRight size={16} className="text-slate-300" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <LucideIcons.MapPin size={14} className="text-slate-300" /> {route.from}
        </div>
        <div className="w-1 h-3 border-l-2 border-dotted border-slate-200 ml-[6px]"></div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <LucideIcons.MapPin size={14} className="text-orange-500" /> {route.to}
        </div>
      </div>
    </button>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col gap-2 p-3 bg-white rounded-3xl border border-slate-100 shadow-sm text-left">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h4>
        <p className="text-[10px] font-bold text-emerald-600">{product.price} MAD</p>
      </div>
    </button>
  );
};

const DetailModal = ({ type, item, onClose }: { type: Category, item: any, onClose: () => void }) => {
  const [booked, setBooked] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const handleAction = () => {
    setBooked(true);
    setTimeout(onClose, 2000);
  };

  const renderForm = () => {
    if (type === 'healthcare') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Date & Time</h5>
            <div className="grid grid-cols-3 gap-2">
              {['09:00', '10:30', '14:00', '15:30', '17:00'].map(time => (
                <button key={time} className="py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold hover:bg-brand-primary hover:text-white transition-colors">{time}</button>
              ))}
            </div>
          </div>
          <input type="text" placeholder="Full Patient Name" className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm outline-none" />
        </div>
      );
    }
    
    if (type === 'ecommerce') {
       return (
         <div className="p-4 bg-slate-50 rounded-2xl">
            <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            <div className="flex items-center justify-between mt-4">
               <span className="text-sm font-bold text-slate-800">Available in stock</span>
               <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">12 units</span>
            </div>
         </div>
       );
    }

    return (
      <div className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Calendar size={10} /> Requirements
          </p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>• National ID Card (CNIE)</li>
            <li>• Proof of residence</li>
            <li>• Service fee: {item.price ? item.price : '30'} MAD</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-end sm:items-center justify-center p-0 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
      />
      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: 0 }} 
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white rounded-t-[40px] sm:rounded-[40px] overflow-hidden p-8 pb-12 shadow-2xl mt-auto"
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
        
        {booked ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">Confirmed!</h3>
            <p className="text-slate-500 text-sm max-w-[240px]">
              {type === 'ecommerce' ? 'Item added to your basket.' : 'Your request has been filed successfully. You\'ll receive updates shortly.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
               {item.image ? (
                  <img src={item.image} className="w-20 h-20 rounded-3xl object-cover" />
               ) : (
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                   {(LucideIcons as any)[item.icon] ? React.createElement((LucideIcons as any)[item.icon], { size: 28 }) : <LucideIcons.Info size={28} />}
                 </div>
               )}
               <div>
                  <h3 className="text-xl font-display font-bold text-slate-800 line-clamp-1">{item.title || item.name || item.line}</h3>
                  <p className="text-sm font-medium text-slate-500">{item.description || item.from + ' to ' + item.to}</p>
               </div>
            </div>
            
            {renderForm()}

            <button 
              onClick={handleAction}
              className="w-full h-16 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/95 transition-all active:scale-95"
            >
              {type === 'ecommerce' ? 'Add To Cart' : type === 'healthcare' ? 'Book Appointment' : 'Start Application'}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
