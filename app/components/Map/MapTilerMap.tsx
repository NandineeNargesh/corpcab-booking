'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Map, { MapRef, Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

import { userLocationContext } from '@/context/UserLocationContext';
import { SourceCoordinateContext } from '@/context/SourceCordiContext';
import { DestinationCoordinateContext } from '@/context/DestinationCordiContext';
import Markers from './Markers';
import Cars from '../Booking/Cars';


function MapTilerMap() {
  const { userLocation, setUserLocation } = useContext(userLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(SourceCoordinateContext);
  const { destinationCoordinates, setDestinationCoordinates } = useContext(DestinationCoordinateContext);

  const [clickCount, setClickCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '', fare: '' });


  
  const mapRef = useRef<MapRef | null>(null);

  // ✅ Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("✅ User Location:", coords);
          setUserLocation(coords);
        },
        (error) => {
          console.error('❌ Error getting user location:', error);
        }
      );
    }
  }, [setUserLocation]);

  // ✅ Click to manually set source/destination
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = (event: any) => {
    const { lng, lat } = event.lngLat;
    if (clickCount % 2 === 0) {
      setSourceCoordinates([lng, lat]);
    } else {
      setDestinationCoordinates([lng, lat]);
    }
    setClickCount((prev) => prev + 1);
  };

  // ✅ Fly to source
  useEffect(() => {
    if (mapRef.current && sourceCoordinates) {
      mapRef.current.flyTo({
        center: sourceCoordinates,
        zoom: 14,
        essential: true,
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);

  // ✅ Fly to destination
  useEffect(() => {
    if (mapRef.current && destinationCoordinates) {
      mapRef.current.flyTo({
        center: destinationCoordinates,
        zoom: 15,
        essential: true,
        duration: 2500,
      });
    }
  }, [destinationCoordinates]);

  // ✅ Fetch route + fare info
  useEffect(() => {
    const fetchRoute = async () => {
      if (sourceCoordinates && destinationCoordinates) {
        try {
          console.log("📍 Fetching route...");
          const res = await fetch(`/api/get-route?source=${sourceCoordinates.join(',')}&destination=${destinationCoordinates.join(',')}`);
          const data = await res.json();
          if (res.ok) {
  console.log("✅ Route API response:", data);
  setRouteGeoJSON(data.route);
  setRouteInfo({
    distance: data.distanceInKm,
    duration: data.durationInMin,
    fare: data.fare,
  });

  // 🔁 Save to sessionStorage for payment page
  sessionStorage.setItem("fare", data.fare);
  sessionStorage.setItem("distance", data.distanceInKm);
  sessionStorage.setItem("duration", data.durationInMin);


} else {
            console.error('❌ Route API error:', data.error);
          }
        } catch (error) {
          console.error('❌ Fetch route failed:', error);
        }
      }
    };

    fetchRoute();
  }, [sourceCoordinates, destinationCoordinates]);


  
useEffect(() => {
  if (routeGeoJSON) {
    console.log("🧪 Final routeGeoJSON:", routeGeoJSON);
  }
}, [routeGeoJSON]);

  return (
   <div className="p-1 w-full h-full grid overflow-y-hidden md:overflow-y-scroll transition-all duration-500 ease-in-out">
  
  {/* 🗺️ Map Section */}
  <div
    className={`order-1  transition-all duration-700 ease-in-out ${
      routeInfo.distance ? 'h-[60vh]' : 'h-[90vh]'
    }`}
  >
    <h2 className="text-[20px] font-bold mb-1">Map</h2>

    {/* 🚗 Fare Info (Desktop Only) */}
    {routeInfo.distance && (
      <div className="absolute p-2 rounded-md opacity-80 z-20 right-[20px] hidden md:block text-md font-medium bg-blue-950 text-white">
        🚗 Distance: {routeInfo.distance} km | ⏱ Duration: {routeInfo.duration} mins
      </div>
    )}

    {/* 🧭 Map */}
    {userLocation && (
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          zoom: 13.8,
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
        style={{ width: '100%', height: '95%', borderRadius: 15 }}
        onClick={handleMapClick}
      >
        <Markers />
        {routeGeoJSON && console.log("🧪 Final GeoJSON:", routeGeoJSON)}

      {routeGeoJSON?.geometry?.coordinates?.length > 1 && (
  <Source id="route" type="geojson" data={routeGeoJSON}>
    <Layer
      id="route-line"
      type="line"
      layout={{
        'line-join': 'round',
        'line-cap': 'round',
      }}
      paint={{
        'line-color': '#3b82f6',
        'line-width': 5,
        'line-opacity': 0.9,
      }}
    />
  </Source>
)}

   

      </Map>
    )}
  </div>

  {/* 🚘 Cars Section */}
  {routeInfo.distance && (
    <div className="order-2 mt-1 transition-transform duration-700 ease-in-out transform animate-slide-up">
      <Cars distanceInKm={parseFloat(routeInfo.distance)} />
    </div>
  )}
</div>




  );

}

export default MapTilerMap;
