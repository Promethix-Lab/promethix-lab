import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NewsletterProvider } from "@/components/newsletter/newsletter-provider";
import { Starfield } from "@/components/starfield";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500"],
  display: "swap"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promethixlab.com"),
  title: {
    default: "Promethix Lab - We ship, every day.",
    template: "%s | Promethix Lab"
  },
  description:
    "A small studio that ships real apps and websites on a daily cadence for its own catalogue and for founders who need something live fast.",
  openGraph: {
    title: "Promethix Lab - We ship, every day.",
    description:
      "A public studio website and product catalogue for daily shipped apps, websites, and open-source utilities.",
    url: "https://promethixlab.com",
    siteName: "Promethix Lab",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
        <NewsletterProvider>
          <Starfield />
          <Header />
          <main>{children}</main>
          <Footer />
        </NewsletterProvider>
      </body>
    </html>
  );
}
