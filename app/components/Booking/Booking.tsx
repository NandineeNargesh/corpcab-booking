'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AutocompleteAddress from './AutocompleteAddress';
import Cars from './Cars';
import Cards from './Cards';
import { toast } from 'sonner'; // ✅ Sonner import

function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const height = window.innerHeight * 0.72;
    setScreenHeight(height);
  }, []);

  useEffect(() => {
    sessionStorage.removeItem('selectedCarIndex');
    sessionStorage.setItem('selectedCar', JSON.stringify(Cars));

  }, []);

  return (
    <div className="p-5 pt-1">
      <h2 className="text-[20px] p-1 font-semibold">Booking</h2>

      <div
        className="p-3 border-gray-200 border-[1px] shadow-sm shadow-gray-200 rounded-md overflow-y-auto"
        style={{ height: screenHeight }}
      >
       <AutocompleteAddress
  onSourceSelect={(coords) => {
    console.log("Source selected:", coords);
  }}
  onDestinationSelect={(coords) => {
    console.log("Destination selected:", coords);
  }}
/>

        <Cards />

        <div className="pl-5 pr-5">
    
<button
  className="w-full bg-blue-950 mt-4 p-3 rounded-lg text-white hover:bg-blue-900 font-bold hover:text-white hover:scale-98 transform transition-transform-all duration-800 cursor-pointer"
  onClick={() => {
  const selectedCarString = sessionStorage.getItem('selectedCar');
  const distance = sessionStorage.getItem('distance');
  const duration = sessionStorage.getItem('duration');

  if (!selectedCarString) {
    toast.error('🚫 Please select a car first');
    return;
  }

  let selectedCar;
  try {
    selectedCar = JSON.parse(selectedCarString);
  } catch (error) {
    toast.error('❌ Invalid car data. Please reselect the car.');
    return;
  }

  const totalFare = Math.round(
    selectedCar.baseFare + selectedCar.chargesPerKm * parseFloat(distance || '0')
  );

  router.push(
    `/payment?car=${encodeURIComponent(
      JSON.stringify(selectedCar)
    )}&fare=${totalFare}&distance=${distance}&duration=${duration}`
  );
}}

>
  Book
</button>




        </div>
      </div>
    </div>
  );
}

export default Booking;
