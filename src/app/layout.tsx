import type { Metadata } from "next";
import { Bruno_Ace_SC, Italianno, Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { BackToTop } from "@/components/common/back-to-top";
import { Navbar } from "@/components/common/navbar";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { SkipLink } from "@/components/common/skip-link";
import { ThemeProvider } from "@/components/common/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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

const siteUrl = "https://prism-bits.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prism Bits — Open-source UI Bits & Components",
    template: "%s | Prism Bits",
  },
  description:
    "Beautiful, production-ready open-source UI bits you can copy, customize, and ship in React, Tailwind CSS, and more.",
  keywords: [
    "React components",
    "Tailwind CSS",
    "UI library",
    "Open source components",
    "Design system",
    "Framer Motion animations",
  ],
  authors: [{ name: "Prism Bits Contributors" }],
  creator: "Prism Bits",
  publisher: "Prism Bits",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Prism Bits — Open-source UI Bits & Components",
    description:
      "Beautiful, production-ready open-source UI bits you can copy, customize, and ship.",
    siteName: "Prism Bits",
    images: [
      {
        url: "/prism-bits-icon.png",
        width: 512,
        height: 512,
        alt: "Prism Bits Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prism Bits — Open-source UI Bits & Components",
    description:
      "Beautiful, production-ready open-source UI bits you can copy, customize, and ship.",
    images: ["/prism-bits-icon.png"],
  },
  icons: {
    icon: "/prism-bits-icon.png?v=2",
    shortcut: "/prism-bits-icon.png?v=2",
    apple: "/prism-bits-icon.png?v=2",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prism Bits",
  url: siteUrl,
  description:
    "Beautiful open-source UI bits you can copy, customize, and ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${montserrat.variable} ${italianno.variable} ${brunoAce.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SkipLink />
          <ScrollProgress />
          <Navbar />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
