'use client';
import { createContext, useState } from 'react';

type ContextType = {
  destinationCoordinates: [number, number] | null;
  setDestinationCoordinates: (coords: [number, number]) => void;
};

export const DestinationCoordinateContext = createContext<ContextType>({
  destinationCoordinates: null,
  setDestinationCoordinates: () => {},
});

export function DestinationCoordinateProvider({ children }: { children: React.ReactNode }) {
  const [destinationCoordinates, setDestinationCoordinates] = useState<[number, number] | null>(null);

  return (
    <DestinationCoordinateContext.Provider value={{ destinationCoordinates, setDestinationCoordinates }}>
      {children}
    </DestinationCoordinateContext.Provider>
  );
}
