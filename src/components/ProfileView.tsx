import React, { useState, useEffect } from 'react';
import { User, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Settings, Lock, Mail } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User as FirebaseUser, signInWithEmailAndPassword } from 'firebase/auth';

export const ProfileView: React.FC<{ onAdminSwitch: () => void }> = ({ onAdminSwitch }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [emailMode, setEmailMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
      setError('Google sign-in failed');
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'sam' && password === 'sam2006') {
      onAdminSwitch();
      setShowLogin(false);
    } else {
      setError('Invalid staff credentials');
    }
  };

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
    <div className="flex flex-col gap-8 px-6 pb-24 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 py-8">
        <div className="w-24 h-24 rounded-[40px] bg-brand-primary p-0.5 shadow-2xl shadow-brand-primary/20">
          <img 
            src={currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid || 'Guest'}`} 
            className="w-full h-full rounded-[38px] bg-white object-cover" 
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-display font-bold text-slate-800">{currentUser?.displayName || 'Guest User'}</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            {currentUser ? `Salé Citizen since ${new Date(currentUser.metadata.creationTime!).getFullYear()}` : 'Welcome to Salé-App'}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            {currentUser ? (
               <button 
                onClick={() => setShowLogin(true)}
                className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-brand-secondary hover:text-white transition-all"
              >
                Staff Access
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleGoogleSignIn}
                  className="bg-white border border-slate-200 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-3" /> Gmail Login
                </button>
                <button 
                  onClick={() => setEmailMode(true)}
                  className="bg-brand-primary text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest hover:bg-brand-primary/90 transition-all flex items-center gap-2"
                >
                  <Mail size={12} /> Email Login
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogin || (emailMode && !currentUser) ? (
        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Lock className="text-brand-secondary" size={24} />
              <h3 className="text-xl font-display font-bold text-slate-800">
                {showLogin ? 'Admin Portal' : 'Citizen Login'}
              </h3>
            </div>
            <button 
              onClick={() => { setShowLogin(false); setEmailMode(false); }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={showLogin ? handleAdminAuth : handleEmailSignIn} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Email / Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all" 
                placeholder={showLogin ? "Staff ID" : "your@email.com"} 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all" 
                placeholder="••••••••" 
              />
            </div>
            {error && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider text-center bg-rose-50 py-2 rounded-xl">{error}</p>}
            <button 
              type="submit"
              className="w-full h-16 bg-brand-primary text-white font-bold rounded-3xl shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              {showLogin ? 'Enter Staff Panel' : 'Sign In'}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-[0.3em] px-2">{section.title}</h3>
              <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm">
                {section.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id}
                      className={`w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${
                        idx !== section.items.length - 1 ? 'border-b border-slate-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-[20px] bg-slate-50 text-slate-400 flex items-center justify-center">
                          <Icon size={20} />
                        </div>
                        <span className="font-bold text-slate-700">{item.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-slate-200" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {currentUser && (
            <button 
              onClick={() => auth.signOut()}
              className="flex items-center justify-center gap-3 p-6 bg-rose-50 text-rose-600 font-bold rounded-[40px] hover:bg-rose-100 transition-colors shadow-sm"
            >
              <LogOut size={20} />
              Sign Out from Device
            </button>
          )}
        </div>
      )}
    </div>
  );
};
