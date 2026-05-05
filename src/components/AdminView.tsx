import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Plus, Image as ImageIcon, LayoutDashboard, Settings, ListPlus, Loader2, CheckCircle2, Search, Edit2, Trash2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImage } from '../lib/cloudinary';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export const AdminView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'form' | 'manage'>('dashboard');
  const [formType, setFormType] = useState<string>('Service');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [remoteItems, setRemoteItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeScreen === 'manage') {
      const collectionName = formType.toLowerCase() + 's';
      const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
      const unsub = onSnapshot(q, (snap) => {
        setRemoteItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      }, (error) => {
        console.error("Firestore Listen Error:", error);
      });
      return unsub;
    }
  }, [activeScreen, formType]);

  const stats = [
    { label: 'Total Users', value: '12.4k', change: '+12%' },
    { label: 'Monthly Sales', value: '45.2k', change: '+5%' },
    { label: 'Service Requests', value: '890', change: '+24%' },
  ];

  const handleOpenForm = (type: string, existingItem?: any) => {
    setFormType(type);
    if (existingItem) {
      setEditingId(existingItem.id);
      setTitle(existingItem.title || existingItem.name || '');
      setDescription(existingItem.description || '');
      setPrice(existingItem.price?.toString() || '');
      setCategory(existingItem.category || '');
      setPreviewUrl(existingItem.image || null);
    } else {
      setEditingId(null);
      resetForm();
    }
    setActiveScreen('form');
    setSuccess(false);
  };

  const handleOpenManage = (type: string) => {
    setFormType(type);
    setActiveScreen('manage');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setCategory('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = previewUrl;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const collectionName = formType.toLowerCase() + 's';
      const data = {
        title: title || (formType === 'Product' ? '' : title),
        name: formType === 'Product' ? title : '',
        description,
        price: price ? parseFloat(price) : null,
        category,
        image: imageUrl || '',
        updatedAt: serverTimestamp(),
        author: 'sam'
      };

      try {
        if (editingId) {
          await updateDoc(doc(db, collectionName, editingId), data);
        } else {
          await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp()
          });
        }
      } catch (err) {
        handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, collectionName);
      }

      setSuccess(true);
      setTimeout(() => {
        setActiveScreen('dashboard');
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save. Check your connection or credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      const collectionName = formType.toLowerCase() + 's';
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, collectionName);
      }
    }
  };

  if (activeScreen === 'manage') {
    return (
      <div className="flex flex-col gap-6 px-6 py-6 pb-24 min-h-screen bg-slate-50">
        <header className="flex items-center gap-4">
          <button onClick={() => setActiveScreen('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-display font-bold text-slate-800">Manage {formType}s</h2>
        </header>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${formType}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" 
          />
        </div>

        <div className="flex flex-col gap-3">
          {remoteItems.filter(item => (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
            <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                <img src={item.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{item.title || item.name}</h4>
                <p className="text-xs text-slate-400 truncate">{item.category}</p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleOpenForm(formType, item)}
                  className="p-2 text-brand-primary hover:bg-brand-primary/5 rounded-xl transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          {remoteItems.length === 0 && (
            <div className="py-20 text-center text-slate-400">
               <p className="text-sm font-medium">No {formType}s found in the database.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeScreen === 'form') {
    return (
      <div className="flex flex-col gap-6 px-6 py-6 pb-24 min-h-screen bg-slate-50">
        <header className="flex items-center gap-4">
          <button onClick={() => setActiveScreen('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-display font-bold text-slate-800">Add {formType}</h2>
        </header>

        {success ? (
          <div className="bg-white rounded-[40px] p-12 flex flex-col items-center justify-center text-center shadow-xl">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} />
             </div>
             <h3 className="text-2xl font-display font-bold text-slate-800 mb-2">Saved!</h3>
             <p className="text-slate-500 text-sm">The {formType} has been added to Salé-App.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[40px] p-8 shadow-xl shadow-brand-primary/5 space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Title / Name</span>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" 
                  placeholder={`Enter ${formType} title`} 
                />
              </label>
              
              {formType === 'Product' && (
                <label className="block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Price (MAD)</span>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" 
                    placeholder="0.00" 
                  />
                </label>
              )}

              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Category</span>
                <input 
                  type="text" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10" 
                  placeholder="e.g. Kitchen, Health, Sports" 
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Description</span>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 min-h-[120px]" 
                  placeholder="Detailed description..."
                ></textarea>
              </label>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-2 text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden"
              >
                {previewUrl ? (
                  <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                ) : (
                  <>
                    <ImageIcon size={32} strokeWidth={1} />
                    <span className="text-xs font-semibold">Upload Image Cover</span>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-brand-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                `Save ${formType}`
              )}
            </button>
          </form>
        )}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Content Management</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {['Service', 'Product', 'Event', 'Post'].map((type) => (
             <div key={type} className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-4">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                      <ListPlus size={20} />
                    </div>
                    <span className="font-bold text-slate-800">{type}s</span>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={() => handleOpenForm(type)}
                  className="bg-brand-primary text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all"
                 >
                   <Plus size={14} /> Add New
                 </button>
                 <button 
                  onClick={() => handleOpenManage(type)}
                  className="bg-slate-50 text-slate-600 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                 >
                   <Settings size={14} /> Manage
                 </button>
               </div>
             </div>
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
