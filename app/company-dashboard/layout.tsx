'use client';

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; // Tailwind helper: merges classNames
import { Suspense } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "sonner";

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  const tab = useSearchParams().get("tab") || "bookings";
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    toast.info("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully!");
      router.push('/sign-in');
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-[700px] bg-gray-50 flex">
      <aside className="w-full md:w-60 bg-white border-r shadow-md p-4 sticky top-0 md:relative flex-shrink-0 flex flex-col">
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
      </aside>

      <main className=" p-6 flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading content...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}