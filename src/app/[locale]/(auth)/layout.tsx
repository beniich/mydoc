'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/libs/AuthContext';

export default function AuthLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Skip redirect for sign-in and sign-up pages
    const isAuthPage = window.location.pathname.includes('/sign-in') || 
                       window.location.pathname.includes('/sign-up');
    
    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 mb-4 animate-pulse">
            <span className="text-3xl">🔧</span>
          </div>
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  return <>{props.children}</>;
}
