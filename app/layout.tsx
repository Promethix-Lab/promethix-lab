import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NewsletterProvider } from "@/components/newsletter/newsletter-provider";
import { Starfield } from "@/components/starfield";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";
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
    "We build, launch, and grow software products every single day.Some become businesses. Some get acquired. Every one starts with solving a real problem.",
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
        <SmoothScrollProvider>
            <NewsletterProvider>
              <Starfield />
              <Header />
              <main>{children}</main>
              <Footer />
            </NewsletterProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
