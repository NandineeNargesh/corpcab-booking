"use client";

import { useSearchParams } from "next/navigation";
import BookingsTab from "./components/BookingsTab";
import CancelledTab from "./components/CancelledTab";
import InvoicesTab from "./components/InvoicesTab";
import LiveMapTab from "./components/LiveMapTab";
import NewBookingTab from "./components/NewBookingTab";

export default function ClientCompanyDashboard() {
  const tab = useSearchParams().get("tab") || "bookings";

  return (
    <>
      {tab === "bookings" && <BookingsTab />}
      {tab === "new" && <NewBookingTab />}
      {tab === "map" && <LiveMapTab />}
      {tab === "invoices" && <InvoicesTab />}
      {tab === "cancelled" && <CancelledTab />}
    </>
  );
}
