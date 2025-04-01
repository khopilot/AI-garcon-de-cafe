import type { Metadata } from "next";
import type { Viewport } from 'next';
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "AI Garçon de Café",
  description: "Une expérience de café parisien avec un garçon de café IA",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://ai-garcon-cafe.vercel.app"),
  icons: {
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icons/icon-192x192.png"],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/icon-192x192.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AI Garçon",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ai-garcon-cafe.vercel.app",
    title: "AI Garçon de Café",
    description: "Une expérience de café parisien avec un garçon de café IA",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "AI Garçon de Café Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Garçon de Café",
    description: "Une expérience de café parisien avec un garçon de café IA",
    images: ["/icons/icon-512x512.png"],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#722F37',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="mask-icon" href="/icons/icon-192x192.png" color="#722F37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#722F37" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-[100dvh] overflow-x-hidden bg-background text-foreground font-sans">
        <div className="min-h-[100dvh] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <p>© {new Date().getFullYear()} AI Garçon de Café - Une expérience parisienne authentique</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
