'use client';
import { createContext, useState } from 'react';

type ContextType = {
  sourceCoordinates: [number, number] | null;
  setSourceCoordinates: (coords: [number, number]) => void;
};

export const SourceCoordinateContext = createContext<ContextType>({
  sourceCoordinates: null,
  setSourceCoordinates: () => {},
});

export function SourceCoordinateProvider({ children }: { children: React.ReactNode }) {
  const [sourceCoordinates, setSourceCoordinates] = useState<[number, number] | null>(null);

  return (
    <SourceCoordinateContext.Provider value={{ sourceCoordinates, setSourceCoordinates }}>
      {children}
    </SourceCoordinateContext.Provider>
  );
}

