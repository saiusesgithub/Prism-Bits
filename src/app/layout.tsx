import type { Metadata } from "next";
import { Bruno_Ace_SC, Inter, Italianno } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/common/navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const brunoAce = Bruno_Ace_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Prism Bits",
  description: "Beautiful open-source UI bits you can copy, customize, and ship.",
  icons: {
    icon: "/prism-bits-icon.png?v=2",
    shortcut: "/prism-bits-icon.png?v=2",
    apple: "/prism-bits-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${italianno.variable} ${brunoAce.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
