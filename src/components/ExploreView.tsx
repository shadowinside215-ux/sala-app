import React from 'react';
import { MapPin, Star, MoreHorizontal } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const places = [
    { name: 'Cité Portugaise', category: 'Historic Site', rating: 4.8, img: 'https://images.unsplash.com/photo-1596740645062-870634676646?auto=format&fit=crop&q=80&w=400' },
    { name: 'Sidi Bouzid Beach', category: 'Beach', rating: 4.7, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mazagan Golf', category: 'Leisure', rating: 4.9, img: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="flex flex-col gap-6 px-6 pb-24">
      <header className="flex items-center justify-between">
         <h2 className="text-2xl font-display font-bold text-slate-800">Explore El Jadida</h2>
         <button className="text-slate-400"><MoreHorizontal /></button>
      </header>
      
      <div className="flex flex-col gap-6">
        {places.map((place) => (
          <div key={place.name} className="relative h-64 rounded-[40px] overflow-hidden group shadow-lg">
            <img src={place.img} alt={place.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
               <div className="flex items-center gap-2 mb-1">
                 <span className="text-[10px] font-bold text-brand-secondary bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full uppercase">
                   {place.category}
                 </span>
                 <div className="flex items-center gap-0.5 text-amber-400">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">{place.rating}</span>
                 </div>
               </div>
               <h3 className="text-white text-xl font-display font-bold">{place.name}</h3>
               <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
                 <MapPin size={10} /> View on map
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
