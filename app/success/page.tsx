// app/success/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Clear any sessionStorage if needed
    sessionStorage.removeItem('selectedCarIndex');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">🎉 Payment Successful!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your cab has been booked successfully. You&apos;ll receive a confirmation shortly.
        </p>
        <button
          className="bg-blue-900 hover:bg-blue-700 cursor-pointer text-white font-semibold px-6 py-3 rounded"
          onClick={() => router.push('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
