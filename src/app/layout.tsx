import type { Metadata } from "next";
import type { Viewport } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: "spEAchT Realtime Agents",
  description: "A demo app from spEAchT.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased min-h-[100dvh] overflow-x-hidden bg-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
