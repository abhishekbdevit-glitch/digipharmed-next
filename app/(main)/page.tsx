'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => { router.replace('/pci/dashboard'); }, []);
  return (
    <div className="flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <div className="text-4xl mb-3">💊</div>
        <div className="font-medium text-color-secondary">Loading DIGI-PHARMed Admin Portal…</div>
      </div>
    </div>
  );
}
