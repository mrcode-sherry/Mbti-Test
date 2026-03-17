'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// ✅ Wrap component with Suspense
function GoogleAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';

    if (email) {
      // Build the user object
      const user = { name, email, provider: 'google' };

      // Save in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Trigger storage event so Navbar / other listeners update
      window.dispatchEvent(new Event('storage'));

      // Redirect user
      router.replace('/');
    } else {
      router.replace('/login');
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium text-gray-600">
        Signing you in with Google...
      </p>
    </div>
  );
}

export default function GoogleAuthSuccess() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    }>
      <GoogleAuthContent />
    </Suspense>
  );
}
