'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/libs/AuthContext';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (activeTab === 'login') {
      if (!email || !password) {
        setError('Veuillez remplir tous les champs');
        setIsLoading(false);
        return;
      }
      const success = await signIn(email, password);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } else {
      if (!name || !email || !password) {
        setError('Veuillez remplir tous les champs');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        setIsLoading(false);
        return;
      }
      const success = await signUp(email, password, name);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Cet email est déjà utilisé');
      }
    }
    setIsLoading(false);
  };

  const features = [
    { icon: '📧', title: 'Email marketing', desc: 'Automatisation avancée' },
    { icon: '🔄', title: 'Segmentation', desc: 'Ciblage intelligent' },
    { icon: '🤖', title: 'IA intégrée', desc: 'Sans code requis' },
    { icon: '📊', title: 'Automatisation', desc: 'Marketing auto' },
    { icon: '📝', title: 'Formulaires', desc: 'Signup & popups' },
    { icon: '📈', title: 'Analytics', desc: 'Tests A/B avancés' },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ==================== LEFT SIDE - FORM ==================== */}
      <div className="w-full lg:w-[45%] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 p-6 lg:p-12 flex flex-col">
        
        {/* Header avec logo */}
        <div className="flex items-center gap-3 mb-auto">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Workflow Weaver</span>
        </div>

        {/* Formulaire centré */}
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-sm">
            
            {/* Titre */}
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center lg:text-left">
              {activeTab === 'register' ? 'Créez un compte gratuit' : 'Connexion à votre compte'}
            </h1>

            {/* Message d'erreur */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-300/50 text-white text-sm text-center">
                ⚠️ {error}
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Champ Nom (inscription uniquement) */}
              {activeTab === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-orange-400 focus:outline-none transition-all"
                    placeholder="Prénom Nom"
                  />
                </div>
              )}

              {/* Champ Email */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-orange-400 focus:outline-none transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 border-2 border-transparent focus:border-orange-400 focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Bouton Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-base uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Chargement...
                  </span>
                ) : (
                  activeTab === 'register' ? 'Créer mon compte' : 'Se connecter'
                )}
              </button>
            </form>

            {/* Lien connexion/inscription */}
            <p className="mt-6 text-center text-white/90">
              {activeTab === 'register' ? (
                <>
                  Déjà un compte ?{' '}
                  <button 
                    onClick={() => { setActiveTab('login'); setError(''); }}
                    className="font-semibold underline hover:no-underline"
                  >
                    Connectez-vous
                  </button>
                </>
              ) : (
                <>
                  Pas encore de compte ?{' '}
                  <button 
                    onClick={() => { setActiveTab('register'); setError(''); }}
                    className="font-semibold underline hover:no-underline"
                  >
                    Inscrivez-vous
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/20">
          <Link href="/" className="text-white/70 hover:text-white text-sm flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* ==================== RIGHT SIDE - FEATURES ==================== */}
      <div className="hidden lg:flex w-[55%] bg-white p-12 flex-col justify-center">
        <div className="max-w-xl mx-auto">
          
          {/* Badge */}
          <div className="inline-block px-4 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium mb-4">
            Plateforme d'automatisation
          </div>
          
          {/* Titre principal */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            <span className="text-orange-500">Marketing automation</span>
            <br />
            pour votre business
          </h2>
          
          {/* Description */}
          <p className="text-gray-600 text-lg mb-10">
            Automatisez vos workflows et développez votre activité avec notre plateforme intuitive.
          </p>

          {/* Grille de fonctionnalités */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-cyan-200 hover:bg-cyan-50/50 transition-all cursor-default"
              >
                <span className="text-3xl mb-2">{feature.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{feature.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Avantages */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Gratuit pour commencer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Sans carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-600 text-sm">Annulation possible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
