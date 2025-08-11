'use client';
import { createContext, useState } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
};

type UserLocationContextType = {
  userLocation: Coordinates | null;
  setUserLocation: (location: Coordinates) => void;
};

export const userLocationContext = createContext<UserLocationContextType>({
  userLocation: null,
  setUserLocation: () => {},
});

export function UserLocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  return (
    <userLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </userLocationContext.Provider>
  );
}
