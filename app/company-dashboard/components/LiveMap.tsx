'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import your existing Map component
const MapTilerMap = dynamic(() => import('@/components/Map/MapTilerMap'), { ssr: false });

const LiveMap = () => {
  return (
    <div className="h-[500px]  w-full mt-4 rounded overflow-hidden shadow">
      <MapTilerMap />
    </div>
  );
};

export default LiveMap;
