"use client";

import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Lazy-loaded components for better performance
const BookingsList = dynamic(() => import("./BookingsList"), { ssr: false });
const NewBookingForm = dynamic(() => import("./NewBookingForm"), { ssr: false });
const LiveMap = dynamic(() => import("./LiveMap"), { ssr: false });
const Invoices = dynamic(() => import("./Invoices"), { ssr: false });
const CancelBookings = dynamic(() => import("./CancelBookings"), { ssr: false });

export default function CompanyTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tab = searchParams.get("tab") || "bookings";

  const handleTabChange = (value: string) => {
    // Replace the history entry instead of adding a new one
    router.replace(`${pathname}?tab=${value}`);
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4 flex flex-wrap gap-2">
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="new">New Booking</TabsTrigger>
        <TabsTrigger value="map">Live Map</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="bookings">
        <BookingsList />
      </TabsContent>
      <TabsContent value="new">
        <NewBookingForm />
      </TabsContent>
      <TabsContent value="map">
        <LiveMap />
      </TabsContent>
      <TabsContent value="invoices">
        <Invoices />
      </TabsContent>
      <TabsContent value="cancelled">
        <CancelBookings />
      </TabsContent>
    </Tabs>
  );
}
