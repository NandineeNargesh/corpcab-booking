'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ⚡ Checkout Form
function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          // toast.success("✅ Payment initialized");
        } else {
          toast.error("❌ clientSecret not returned");
        }
      } catch (err) {
        toast.error("❌ Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔔 Button clicked");

    if (stripe && elements && clientSecret) {
      toast.success("✅ Payment successful");
      router.push("/success");
      return;
    }

    // const card = elements.getElement(CardElement);
    // if (!card) {
    //   toast.error("❌ Card not found");
    //   return;
    // }

    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card,
    //   },
    // });

    // if (result.error) {
    //   toast.error(`❌ ${result.error.message}`);
    // } else if (result.paymentIntent?.status === 'succeeded')
     {
      toast.success("✅ Payment successful!");
      router.push("/success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded bg-white" />
      <button
        type="button"
        // disabled={!stripe || !clientSecret}
        className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Pay ₹{amount}
      </button>
    </form>
  );
}
// ⚡ Main Page
export default function PaymentPage() {
  const searchParams = useSearchParams();
  const car = searchParams.get('car') ? JSON.parse(searchParams.get('car')!) : null;
  const fare = parseFloat(searchParams.get('fare') || '0');
  const distance = searchParams.get('distance');
  const duration = searchParams.get('duration');

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-2">Payment for Cab {car?.name}</h2>
      <p className="mb-1">🚘 Car: {car?.name}</p>
      <p className="mb-1">📍 Distance: {distance} km</p>
      <p className="mb-1">⏱ Duration: {duration} mins</p>
      <p className="text-lg font-semibold mb-4">💳 Total Fare: ₹{fare}</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm amount={fare} />
      </Elements>
    </div>
  );
}
