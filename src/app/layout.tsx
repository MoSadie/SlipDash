import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  variable: "--font-atkinson-hyperlegible",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SlipDash",
  description: "A compainion web app for Slipstream: Rogue Space, using SlipInfo",
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
        {children}
      </body>
    </html>
  );
}
