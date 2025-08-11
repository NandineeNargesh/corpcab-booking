'use client';

import CarsList from 'data/CarsList';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { SourceCoordinateContext } from '@/context/SourceCordiContext';
import { DestinationCoordinateContext } from '@/context/DestinationCordiContext';

function Cars({ distanceInKm }: { distanceInKm: number }) {
  const [selectedCar, setSelectedCar] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const { sourceCoordinates } = React.useContext(SourceCoordinateContext);
  const { destinationCoordinates } = React.useContext(DestinationCoordinateContext);

  // 🚀 Fetch route from MapTiler
  const getRouteData = async (source: number[], destination: number[]) => {
    const url = `https://api.maptiler.com/directions/v2/routing/driving/${source[0]},${source[1]};${destination[0]},${destination[1]}?key=YOUR_MAPTILER_KEY`;
    const res = await fetch(url);
    const data = await res.json();
    const dist = data?.routes?.[0]?.distance || 0; // meters
    setDistance(dist / 1000); // convert to km
  };

  useEffect(() => {
    if (sourceCoordinates && destinationCoordinates) {
      getRouteData(sourceCoordinates, destinationCoordinates);
    }
  }, [sourceCoordinates, destinationCoordinates]);

  // 💰 Calculate fare
  const getCost = (chargesPerKm: number, baseFare: number) => {
    if (!distanceInKm) return '0';
    return Math.max(baseFare, baseFare + distanceInKm * chargesPerKm).toFixed(0);
  };
useEffect(() => {
  if (selectedCar !== null) {
    sessionStorage.setItem('selectedCar', JSON.stringify(CarsList[selectedCar])); // e.g., { name: "Mini", rate: 15 }
  }
}, [selectedCar]);

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-[18px] p-1 pl-2 ">Select Car</h2>

      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 overflow-y-auto  pl-4 pr-4"
        style={{ maxHeight: 'calc(100% - 2rem)' }}
      >
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between cursor-pointer hover:font-semibold hover:scale-98 border border-gray-300 rounded-xl p-3 h-[190px] transform transition-transform duration-500 hover:bg-blue-50 shadow-sm hover:shadow-gray-400 ${
              index === selectedCar ? 'bg-blue-100 scale-98 border-2 border-indigo-500 font-semibold' : ''
            }`}
            onClick={() => {
              setSelectedCar(index);
              sessionStorage.setItem('selectedCarIndex', index.toString());
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={90}
              height={90}
              className="w-full h-[80px] object-contain mb-1"
            />
            <div>
              <h2 className="text-base hover:text-blue-950">{item.name}</h2>
              <h6 className="text-gray-600 text-sm">{item.description}</h6>
            </div>
            <span className="text-right text-gray-800 font-semibold">
              ₹{getCost(item.chargesPerKm, item.baseFare)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
