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
  { id: '1', title: 'Birth Certificate', description: 'Request a digital copy of your birth certificate.', icon: 'File', category: 'government' },
  { id: '2', title: 'Marriage Permit', description: 'Information and application for marriage permits.', icon: 'ClipboardCheck', category: 'government' },
  { id: '3', title: 'Local Taxes', description: 'Pay your municipal taxes online.', icon: 'CreditCard', category: 'government' },
];

export const TRANSPORT_ROUTES: Route[] = [
  { id: 'b1', type: 'bus', line: 'Bus L1', from: 'Sidi Bouzid', to: 'City Center', schedule: ['08:00', '09:00', '10:00'], eta: '5 mins' },
  { id: 't1', type: 'taxi', line: 'Grand Taxi', from: 'El Jadida', to: 'Casablanca', schedule: ['On Demand'], eta: 'Ready' },
];

export const EVENTS: EventItem[] = [
  { 
    id: 'e1', 
    title: 'Jawhara Festival', 
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', 
    date: 'Aug 15-20', 
    location: 'El Jadida Beach',
    description: 'International music and arts festival celebrate Moroccan heritage.'
  },
  { 
    id: 'e2', 
    title: 'Art Exhibition', 
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800', 
    date: 'Jun 10', 
    location: 'Cité Portugaise',
    description: 'Local artists showcasing contemporary Moroccan works.'
  }
];

export const SOCIAL_POSTS: Post[] = [
  { 
    id: 'p1', 
    author: 'Mehdi Alami', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehdi', 
    content: 'The new promenade at Mazagan is looking amazing! Great spot for evening walks.', 
    likes: 42, 
    comments: 5, 
    timestamp: '2h ago' 
  },
  { 
    id: 'p2', 
    author: 'Sara Benani', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara', 
    content: 'Quick question: Is the municipal library open on Sundays?', 
    likes: 12, 
    comments: 8, 
    timestamp: '5h ago' 
  },
];

export const HEALTH_SERVICES: ServiceItem[] = [
  { id: 'h1', title: 'Find a Doctor', description: 'Schedule appointment with top specialists.', icon: 'Stethoscope', category: 'healthcare' },
  { id: 'h2', title: 'Pharmacies', description: 'Find 24/7 pharmacies on duty.', icon: 'Pill', category: 'healthcare' },
  { id: 'h3', title: 'Medical History', description: 'Access your records and lab results.', icon: 'Activity', category: 'healthcare' },
];

export const EDU_CENTERS: ServiceItem[] = [
  { id: 'ed1', title: 'Chouaib Doukkali University', description: 'Official student portal and registrations.', icon: 'School', category: 'education' },
  { id: 'ed2', title: 'French Institute', description: 'Language courses and cultural library.', icon: 'BookOpen', category: 'education' },
  { id: 'ed3', title: 'Coding Bootcamp', description: 'New tech training center in Mazagan.', icon: 'Code', category: 'education' },
];

export const PRODUCTS: Product[] = [
  { id: 'pr1', name: 'Handmade Tagine', price: 150, image: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?auto=format&fit=crop&q=80&w=400', description: 'Traditional ceramic tagine made by local Safi artisans.', category: 'Kitchen' },
  { id: 'pr2', name: 'Leather Satchel', price: 450, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400', description: 'Genuine leather satchel from the old medina.', category: 'Fashion' },
];
