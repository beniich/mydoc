'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to sign-in page which has both tabs
    router.replace('/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  );
}
