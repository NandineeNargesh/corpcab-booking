'use client';

// Make sure UserLocationProvider is exported from UserLocationContext
import { UserLocationProvider } from '@/context/UserLocationContext';
import { SourceCoordinateProvider } from '@/context/SourceCordiContext';
import { DestinationCoordinateProvider } from '@/context/DestinationCordiContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <UserLocationProvider>
      <SourceCoordinateProvider>
        <DestinationCoordinateProvider>
          {children}
        </DestinationCoordinateProvider>
      </SourceCoordinateProvider>
    </UserLocationProvider>
  );
}
