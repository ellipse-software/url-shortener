import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "url shortener",
  description: "url shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          " cursor-default selection:bg-[#2266EF]/70 selection:text-foreground/70  text-foreground" +
          " " +
          inter.className
        }
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
