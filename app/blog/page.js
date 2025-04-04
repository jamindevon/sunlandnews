'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/stories');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 