import { Inter } from "next/font/google";

// Styles
import "./globals.css";

// Components
import Navbar from "@/components/common/Navbar";
import HuddleContextProvider from "@/components/ClientComponents/HuddleContextProvider";
import { cn } from "@/utils/helpers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chora-club",
  description: "meeting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen relative font-inter", inter.className)}>
        {/* <Navbar /> */}
        <SpeedInsights />
        <HuddleContextProvider>{children}</HuddleContextProvider>
      </body>
    </html>
  );
}
