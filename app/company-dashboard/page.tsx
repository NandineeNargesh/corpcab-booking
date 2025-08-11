// app/company-dashboard/page.tsx


import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanyTabs from "./components/CompanyTabs";

export default async function CompanyDashboard() {
  const { userId } = await auth();

  // If not logged in, send to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <CompanyTabs />
    </main>
  );
}



