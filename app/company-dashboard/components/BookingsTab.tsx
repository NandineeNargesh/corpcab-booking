"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Booking {
  _id: string;
  customer: string;
  source: string;
  destination: string;
  date: string;
}

export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/bookings"); // change if your backend is deployed
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">All Bookings</h2>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <strong>Customer:</strong> {booking.customer}
              </p>
              <p>
                <strong>From:</strong> {booking.source}
              </p>
              <p>
                <strong>To:</strong> {booking.destination}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
