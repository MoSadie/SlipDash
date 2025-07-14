import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  variable: "--font-atkinson-hyperlegible",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlipDash",
  description: "A companion web app for Slipstream: Rogue Space, using SlipInfo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${atkinsonHyperlegible.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
