'use client';

import AutoCompleteAddress from "@/components/Booking/AutocompleteAddress";
import MapTilerMap from "@/components/Map/MapTilerMap";
import { SourceCoordinateProvider } from "@/context/SourceCordiContext";
import { DestinationCoordinateProvider } from "@/context/DestinationCordiContext";

import React, { useState } from 'react';
import { toast } from 'sonner';

const NewBookingForm = () => {
  const [formData, setFormData] = useState({
    customer: '',
    source: '',
    destination: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Booking created for ${formData.customer}`);
    console.log(formData);
    setFormData({
      customer: '',
      source: '',
      destination: '',
      date: '',
    });
  };

  return (
    <SourceCoordinateProvider>
      <DestinationCoordinateProvider>
        <form onSubmit={handleSubmit} className="space-y-4  mt-4">
        <div className="pl-5 pr-5"> 
          <input
            type="text"
            name="customer"
            placeholder="Customer Name"
            value={formData.customer}
            onChange={handleChange}
            className="w-full  p-3   border rounded-md outline-none transition-all duration-300"
            required
          />
          </div>

          
          <AutoCompleteAddress
            onSourceSelect={(val) => setFormData((prev) => ({ ...prev, source: val }))}
            onDestinationSelect={(val) => setFormData((prev) => ({ ...prev, destination: val }))}
          />

          <div className="pl-5 pr-5">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none transition-all duration-300"
            required
          />
          </div>

          <div className="pl-5 pt-2 ">
          <button
            type="submit"
            className="bg-blue-900 text-white  py-2 px-4 rounded hover:bg-blue-800 hover:scale-105 cursor-pointer transition transform duration-400"
          >
            Create Booking
          </button>
          </div>
        </form>
      </DestinationCoordinateProvider>
    </SourceCoordinateProvider>
  );
};

export default NewBookingForm;
