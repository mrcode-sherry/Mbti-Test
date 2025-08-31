'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';

    if (email) {
      // matches your current app: localStorage "user" is what Navbar and flows read
      const user = { name, email, provider: 'google' };
      localStorage.setItem('user', JSON.stringify(user));
      // let other listeners (Navbar) update
      window.dispatchEvent(new Event('storage'));

      // You can change this to wherever you want to land users
      router.replace('/');
    } else {
      router.replace('/login');
    }
  }, [router, searchParams]);

  // Simple "holding" UI if you want (or keep null)
  return null;
}
