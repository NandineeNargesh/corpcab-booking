// app/company-dashboard/components/ClientSidebar.tsx
"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";
import React from "react";

export default function ClientSidebar() {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "bookings";
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    toast.info("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully!");
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">🚖 Company Dashboard</h1>
        <nav className="flex flex-col gap-4">
          <Link
            href="/company-dashboard?tab=bookings"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100 transition-colors",
              tab === "bookings" && "bg-gray-200 font-semibold"
            )}
          >
            📋 Bookings
          </Link>

          <Link
            href="/company-dashboard?tab=new"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100 transition-colors",
              tab === "new" && "bg-gray-200 font-semibold"
            )}
          >
            ➕ New Booking
          </Link>

          <Link
            href="/company-dashboard?tab=map"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100 transition-colors",
              tab === "map" && "bg-gray-200 font-semibold"
            )}
          >
            🗺️ Live Map
          </Link>

          <Link
            href="/company-dashboard?tab=invoices"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100 transition-colors",
              tab === "invoices" && "bg-gray-200 font-semibold"
            )}
          >
            🧾 Invoices
          </Link>

          <Link
            href="/company-dashboard?tab=cancelled"
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-100 transition-colors",
              tab === "cancelled" && "bg-gray-200 font-semibold"
            )}
          >
            ❌ Cancel Booking
          </Link>
        </nav>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50 transition-colors font-semibold"
        >
          → Logout
        </button>
      </div>
    </div>
  );
}
