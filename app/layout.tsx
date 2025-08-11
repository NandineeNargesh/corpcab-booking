import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import NavBar from "./components/NavBar";
import ClientWrapper from "./context/ClientWrapper";
import { Toaster } from "sonner"; 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cab Booking Portal",
  description: "A Next.js app with MapTiler, Clerk, and custom markers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ userButton: { elements: { rootBox: "hidden" } } }}>
      <html lang="en">
        <body className={`${inter.variable} ${roboto.variable} antialiased`}>
          <ClientWrapper>
            <NavBar />
            {children}
            <Toaster position="top-center" richColors />
          </ClientWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
