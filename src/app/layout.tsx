import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransistPro - Smart Transport Solutions",
  description:
    "TransistPro helps you manage and book transport trips efficiently with modern web technology.",
  authors: [{ name: "Rahman Dev" }],
  openGraph: {
    title: "TransistPro - Smart Transport Solutions",
    description:
      "TransistPro helps you manage and book transport trips efficiently with modern web technology.",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}