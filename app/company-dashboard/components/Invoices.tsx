'use client';

import React from 'react';

const dummyInvoices = [
  {
    id: 'INV001',
    date: '2025-07-01',
    amount: '₹500',
    customer: 'Ravi Kumar',
    status: 'Paid',
  },
  {
    id: 'INV002',
    date: '2025-07-10',
    amount: '₹750',
    customer: 'Anjali Mehra',
    status: 'Pending',
  },
];

const Invoices = () => {
  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow">
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-blue-950 text-white">
          <tr>
            <th className="p-3 text-left">Invoice ID</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyInvoices.map((invoice, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="p-3">{invoice.id}</td>
              <td className="p-3">{invoice.date}</td>
              <td className="p-3">{invoice.amount}</td>
              <td className="p-3">{invoice.customer}</td>
              <td className="p-3">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
