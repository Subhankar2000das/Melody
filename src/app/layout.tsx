import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Melody",
  description: "Music App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );}