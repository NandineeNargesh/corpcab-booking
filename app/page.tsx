

"use client";

import { useState, useEffect } from "react";
import { userLocationContext } from "context/UserLocationContext";
import Booking from "components/Booking/Booking";
import MapTilerMap from "components/Map/MapTilerMap";

export default function ClientHome() {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 const [userLocation, setUserLocation] = useState<any>();

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Failed to get location:", err.message);
      },
      { timeout: 10000 }
    );
  }, []);

  return (
    <div className="overflow-y-visible">
      <userLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <div className="grid grid-cols-1 sm:grid-2 md:grid-cols-3 gap-4">
          <div className="order-2 md:order-1">
            <Booking />
          </div>
          <div className="order-1 md:order-2 col-span-1 md:col-span-2 h-full">
            <MapTilerMap />
          </div>
        </div>
      </userLocationContext.Provider>
    </div>
  );
}
