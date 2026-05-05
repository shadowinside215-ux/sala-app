import { Category, ServiceItem, EventItem, Post, Product, Route } from './types';

export const CATEGORIES: { id: Category; name: string; icon: string; description: string; color: string }[] = [
  { id: 'government', name: 'Government', icon: 'FileText', description: 'Permits & Documents', color: 'bg-blue-100 text-blue-600' },
  { id: 'transportation', name: 'Transport', icon: 'Bus', description: 'Bus & Taxi Routes', color: 'bg-orange-100 text-orange-600' },
  { id: 'healthcare', name: 'Health', icon: 'HeartPulse', description: 'Clinics & Doctors', color: 'bg-rose-100 text-rose-600' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', description: 'Schools & Centers', color: 'bg-indigo-100 text-indigo-600' },
  { id: 'ecommerce', name: 'Shopping', icon: 'ShoppingBag', description: 'Local Products', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'culture', name: 'Culture', icon: 'Palette', description: 'History & Arts', color: 'bg-amber-100 text-amber-600' },
  { id: 'social', name: 'Social', icon: 'Users', description: 'Community Feed', color: 'bg-violet-100 text-violet-600' },
  { id: 'entertainment', name: 'Events', icon: 'Ticket', description: 'Movies & Parks', color: 'bg-pink-100 text-pink-600' },
];

export const GOV_SERVICES: ServiceItem[] = [
  { id: '1', title: 'Birth Certificate', description: 'Request a digital copy of your birth certificate in Salé.', icon: 'File', category: 'government' },
  { id: '2', title: 'Marriage Permit', description: 'Information and application for marriage permits in Salé.', icon: 'ClipboardCheck', category: 'government' },
  { id: '3', title: 'Local Taxes', description: 'Pay your municipal taxes for Salé online.', icon: 'CreditCard', category: 'government' },
];

export const TRANSPORT_ROUTES: Route[] = [
  { id: 'b1', type: 'bus', line: 'Tramway T1', from: 'Hay Karima', to: 'University Terminal', schedule: ['06:00', '07:00', '08:00'], eta: '4 mins' },
  { id: 't1', type: 'taxi', line: 'Grand Taxi', from: 'Salé El Jadida', to: 'Rabat City', schedule: ['On Demand'], eta: 'Ready' },
];

export const EVENTS: EventItem[] = [
  { 
    id: 'e1', 
    title: 'Mawazine Festival - Salé Stage', 
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', 
    date: 'Jun 20-28', 
    location: 'Salé Waterfront',
    description: 'International music festival featuring legendary artists on the Salé stage.'
  },
  { 
    id: 'e2', 
    title: 'Bouregreg Art Fair', 
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800', 
    date: 'Jul 05', 
    location: 'Marina de Salé',
    description: 'Local artisans and contemporary painters showcasing their work by the Marina.'
  },
  {
    id: 'e3',
    title: 'Salé Candlelight Procession',
    image: 'https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800',
    date: 'Mouloud',
    location: 'Medina of Salé',
    description: 'The historic annual candle procession of Salé celebrating spiritual heritage.'
  }
];

export const SOCIAL_POSTS: Post[] = [
  { 
    id: 'p1', 
    author: 'Yassir Mansouri', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yassir', 
    content: 'The new tram extension is making my commute from Salé El Jadida so much easier!', 
    likes: 56, 
    comments: 12, 
    timestamp: '1h ago' 
  },
  { 
    id: 'p2', 
    author: 'Amina Radi', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina', 
    content: 'Does anyone know the opening hours for the Grand Mosque library?', 
    likes: 24, 
    comments: 4, 
    timestamp: '4h ago' 
  },
];

export const HEALTH_SERVICES: ServiceItem[] = [
  { id: 'h1', title: 'Find a Specialist', description: 'Schedule appointment with doctors in Salé.', icon: 'Stethoscope', category: 'healthcare' },
  { id: 'h2', title: 'Night Pharmacies', description: 'Find pharmacies on duty tonight in Salé.', icon: 'Pill', category: 'healthcare' },
  { id: 'h3', title: 'Medical Records', description: 'Access your health documents securely.', icon: 'Activity', category: 'healthcare' },
];

export const EDU_CENTERS: ServiceItem[] = [
  { id: 'ed1', title: 'Mohammed V University', description: 'Salé faculties and student services.', icon: 'School', category: 'education' },
  { id: 'ed2', title: 'ENSAM Salé', description: 'Engineering school portal.', icon: 'BookOpen', category: 'education' },
  { id: 'ed3', title: 'Language Institute', description: 'English and French courses in Salé El Jadida.', icon: 'Code', category: 'education' },
];

export const PRODUCTS: Product[] = [
  { id: 'pr1', name: 'Salé Traditional Pottery', price: 120, image: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?auto=format&fit=crop&q=80&w=400', description: 'Authentic pottery from the Oulja artisan complex.', category: 'Decor' },
  { id: 'pr2', name: 'Hand-woven Berber Rug', price: 1200, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400', description: 'Traditional rugs woven by local Salé cooperatives.', category: 'Home' },
];
