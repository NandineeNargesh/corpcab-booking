'use client';
import { Marker } from 'react-map-gl/maplibre';
import { useContext } from 'react';
import { SourceCoordinateContext } from '@/context/SourceCordiContext';
import { DestinationCoordinateContext } from '@/context/DestinationCordiContext';

const Markers = () => {
  const { sourceCoordinates } = useContext(SourceCoordinateContext);
  const { destinationCoordinates } = useContext(DestinationCoordinateContext);

  return (
    <  >
      {sourceCoordinates && (
        <Marker longitude={sourceCoordinates[0]} latitude={sourceCoordinates[1]}>
          {/* <div className="w-3 h-3 bg-green-500 rounded-full"
          
          /> */}
          <img src="./pinb.png" alt="" className='w-10 h-10' />
        </Marker>
      )}
      {destinationCoordinates && (
        <Marker longitude={destinationCoordinates[0]} latitude={destinationCoordinates[1]}>
          {/* <div className="w-3 h-3 bg-red-500 rounded-full" />
           */}
            <img src="./pin.png" alt="" className='w-7 h-7 ' />
      
        </Marker>
      )}
    </>
  );
};

export default Markers;