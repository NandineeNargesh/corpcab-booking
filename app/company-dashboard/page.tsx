// app/company-dashboard/page.tsx

//  Do NOT add "use client" here
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import CompanyTabs from "./components/CompanyTabs";

export default async function CompanyDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <CompanyTabs />
      </Suspense>
    </main>
  );
}



