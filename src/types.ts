export type Category = 'government' | 'transportation' | 'healthcare' | 'education' | 'culture' | 'social' | 'ecommerce' | 'entertainment';

export interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon: string;
  category: Category;
  image?: string;
}

export interface EventItem {
  id?: string;
  title: string;
  image: string;
  date: string;
  location: string;
  description: string;
}

export interface Post {
  id?: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string | any;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Route {
  id?: string;
  type: 'bus' | 'taxi';
  line: string;
  from: string;
  to: string;
  schedule: string[];
  eta: string;
}
