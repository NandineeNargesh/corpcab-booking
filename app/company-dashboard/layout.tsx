"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils"; // Tailwind helper: merges classNames

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const tab = useSearchParams().get("tab") || "bookings";

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="w-full md:w-60 bg-white border-r shadow-md p-4 fixed h-screen">
        <h1 className="text-2xl font-bold mb-6">🚖 Company Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <Link
            href="/company-dashboard/bookings?tab=bookings"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100",
              tab === "bookings" && "bg-gray-200 font-semibold"
            )}
          >
            📋 Bookings
          </Link>
          <Link
            href="/company-dashboard/bookings?tab=new"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100",
              tab === "new" && "bg-gray-200 font-semibold"
            )}
          >
            ➕ New Booking
          </Link>
          <Link
            href="/company-dashboard/bookings?tab=map"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100",
              tab === "map" && "bg-gray-200 font-semibold"
            )}
          >
            🗺️ Live Map
          </Link>
          <Link
            href="/company-dashboard/bookings?tab=invoices"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100",
              tab === "invoices" && "bg-gray-200 font-semibold"
            )}
          >
            🧾 Invoices
          </Link>
          <Link
            href="/company-dashboard/bookings?tab=cancelled"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100",
              tab === "cancelled" && "bg-gray-200 font-semibold"
            )}
          >
            ❌ Cancel Booking
          </Link>
        </nav>
      </aside>

      <main className="ml-0 md:ml-60 p-6">{children}</main>
    </div>
  );
}

