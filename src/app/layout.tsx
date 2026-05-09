import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";

import AppMainScroll from "@/components/layout/AppMainScroll/AppMainScroll";
import SiteNav from "@/components/layout/SiteNav/SiteNav";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable}`}
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="app-body" style={{ backgroundColor: 'var(--color-background)' }}>
        <Suspense fallback={null}>
          <AppMainScroll />
        </Suspense>
        <SiteNav />
        <main className="app-main">
          <div className="page-container">{children}</div>
        </main>
        
      </body>
    </html>
  );
}
