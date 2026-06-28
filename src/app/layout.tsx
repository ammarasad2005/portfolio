import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Ammar Asad — Builder in Islamabad",
  description:
    "Builder in Islamabad, Pakistan. Full-stack web, agentic AI, mobile. CS student at FAST-NUCES Islamabad. Building for communities I'm part of.",
  keywords: [
    "Muhammad Ammar Asad",
    "Ammar Asad",
    "builder",
    "full-stack web",
    "agentic AI",
    "TypeScript",
    "React",
    "Next.js",
    "Islamabad",
    "Pakistan",
    "FAST-NUCES",
    "portfolio",
  ],
  authors: [{ name: "Muhammad Ammar Asad" }],
  openGraph: {
    title: "Muhammad Ammar Asad — Builder in Islamabad",
    description:
      "Builder in Islamabad, Pakistan. Full-stack web, agentic AI, mobile. Building for communities I'm part of.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ammar Asad — Builder in Islamabad",
    description:
      "Builder in Islamabad, Pakistan. Full-stack web, agentic AI, mobile.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
