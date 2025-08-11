// app/cancel/page.tsx
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900 p-4">
      <h1 className="text-3xl font-bold mb-4">❌ Payment Cancelled</h1>
      <p className="mb-6">Your payment was not completed. You can try again.</p>
      <Link href="/payment">
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-all">
          Try Again
        </button>
      </Link>
    </div>
  );
}
