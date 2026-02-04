import type { Metadata } from "next";
import { Kanit, Inter } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DesireHub | Premium Adult Entertainment",
  description: "The ultimate destination for premium adult content.",
};

import AgeGate from "@/components/ui/AgeGate";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} ${inter.variable} antialiased bg-midnight text-white`}
      >
        <AuthProvider>
          <AgeGate />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
