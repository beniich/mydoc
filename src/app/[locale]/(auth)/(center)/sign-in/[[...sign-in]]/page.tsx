'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/libs/AuthContext';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        if (!email || !password) {
          throw new Error('Veuillez remplir tous les champs');
        }
        const success = await signIn(email, password);
        if (success) {
          router.push('/dashboard');
        } else {
          throw new Error('Email ou mot de passe incorrect');
        }
      } else {
        if (!email || !password) {
          throw new Error('Veuillez remplir tous les champs');
        }
        if (password.length < 6) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères');
        }
        // Use part of email as name if not provided (to match simplified UI)
        const effectiveName = name || email.split('@')[0] || '';
        
        const success = await signUp(email, password, effectiveName);
        if (success) {
          // User asked for immediate payment upon subscription
          // Redirect to dashboard with a query or to a pricing page if it existed
          // For now, consistent with request, we assume subscription is next step
          router.push('/dashboard'); 
        } else {
          throw new Error('Cet email est déjà utilisé');
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsLoading(true);
      const success = await signInWithGoogle();
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Erreur lors de la connexion Google');
      }
    } catch {
      setError('Erreur lors de la connexion Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#fcfbf9] py-12 sm:px-6 lg:px-8 font-sans">
      
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center gap-3 mb-8">
        {/* Simple Cloud Icon matching the 'Cloud Industrie' style */}
        <div className="text-orange-500">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.132 20.177 10.244 17.819 10.037C17.653 7.279 15.356 5 12.5 5C9.8 5 7.6 6.99 7.21 9.605C4.305 10.126 2 12.56 2 15.5C2 18.537 4.463 21 7.5 21H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight text-gray-900">Cloud Industrie</span>
        
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Bienvenue</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Connectez-vous ou créez un compte</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentification</h2>
          <p className="text-gray-500 mb-8 text-sm">Accédez à votre espace Cloud Industrie</p>

          {/* Tabs */}
          <div className="flex bg-gray-100/80 p-1.5 rounded-xl mb-8 relative">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 z-10 ${
                activeTab === 'login' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 z-10 ${
                activeTab === 'register' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Inscription
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 border border-red-100">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Register only) - keeping it conditioned but maybe hidden if user prefers simple */}
             {activeTab === 'register' && (
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Nom complet</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all"
                    placeholder="Votre nom"
                  />
               </div>
             )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all"
                placeholder="votre@email.com"
              />
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-4"
            >
              {isLoading ? 'Chargement...' : (activeTab === 'login' ? 'Se connecter' : "S'inscrire")}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OU CONTINUER AVEC</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
             {/* GitHub Button Removed as requested */}
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center gap-2 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
