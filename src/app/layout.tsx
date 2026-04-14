import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Professional Portfolio",
  description: "Portfolio of a seasoned Data Engineer, Software Developer, and Cloud Engineer.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import CosmosBackground from "@/components/CosmosBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-transparent text-neutral-900 dark:text-neutral-100 selection:bg-blue-500 selection:text-white flex flex-col transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CosmosBackground />
          <Navigation />
          <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
