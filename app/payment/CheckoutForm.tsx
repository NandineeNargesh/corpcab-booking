'use client';

import { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CheckoutForm({ amount }: { amount: number }) {
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
          toast.success('✅ Payment initialized');
        } else {
          toast.error('❌ Could not create payment intent');
        }
      } catch (err) {
        console.error('Error creating PaymentIntent:', err);
        toast.error('❌ Failed to initialize payment');
      }
    };

    createPaymentIntent();
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 FORM SUBMITTED');

    if (!stripe || !elements || !clientSecret) {
      toast.error('❌ Payment not ready');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error('❌ Card input not found');
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      toast.error(`❌ ${result.error.message}`);
    } else if (result.paymentIntent?.status === 'succeeded') {
      toast.success('✅ Payment successful!');
      setTimeout(() => {
        router.push('/success');
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
     <div className="p-2 border rounded">
  <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
</div>
<button
  type="button"
  onClick={handleSubmit}
  disabled={!stripe || !clientSecret}
  className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700"
>
  Pay ₹{amount}
</button>


    </form>
  );
}
