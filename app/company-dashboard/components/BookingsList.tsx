'use client';

import { useEffect, useState } from 'react';

type Booking = {
  id: string;
  customer: string;
  source: string;
  destination: string;
  date: string;
};

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Temporary mock - replace with fetch from backend later
  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">All Bookings</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Customer</th>
            <th className="p-2">Source</th>
            <th className="p-2">Destination</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">No bookings yet</td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="p-2">{booking.customer}</td>
                <td className="p-2">{booking.source}</td>
                <td className="p-2">{booking.destination}</td>
                <td className="p-2">{booking.date}</td>
                <td className="p-2 space-x-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded text-white">Edit</button>
                  <button className="bg-red-600 px-2 py-1 rounded text-white">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
