'use client';

import React from 'react';
import { toast } from 'sonner';

const dummyBookings = [
  {
    id: 'B001',
    date: '2025-07-15',
    customer: 'Rahul Sharma',
    destination: 'Connaught Place, Delhi',
  },
  {
    id: 'B002',
    date: '2025-07-16',
    customer: 'Priya Desai',
    destination: 'MG Road, Bengaluru',
  },
];

const CancelBookings = () => {
  const handleCancel = (bookingId: string) => {
    toast.success(`Booking ${bookingId} cancelled.`);
    // later: call API here
  };

  return (
    <div className="mt-4 space-y-4">
      {dummyBookings.map((booking) => (
        <div
          key={booking.id}
          className="border border-gray-300 p-4 rounded-md flex justify-between items-center bg-white shadow-sm"
        >
          <div>
            <p className="font-semibold">{booking.customer}</p>
            <p className="text-sm text-gray-600">{booking.destination}</p>
            <p className="text-xs text-gray-500">{booking.date}</p>
          </div>
          <button
            onClick={() => handleCancel(booking.id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default CancelBookings;
