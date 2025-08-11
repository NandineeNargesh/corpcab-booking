// app/company-dashboard/layout.tsx
import React, { Suspense } from "react";
import ClientSidebar from "./components/ClientSidebar";

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[700px] bg-gray-50 flex">
      <aside className="w-full md:w-60 bg-white border-r shadow-md p-4 sticky top-0 md:relative flex-shrink-0 flex flex-col">
        {/* ClientSidebar contains all client-only hooks (useSearchParams, useClerk, etc.) */}
        <Suspense fallback={<div>Loading navigation...</div>}>
          <ClientSidebar />
        </Suspense>
      </aside>

      <main className="p-6 flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading content...</div>}>{children}</Suspense>
      </main>
    </div>
  );
}
