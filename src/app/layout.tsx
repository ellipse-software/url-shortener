import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
          "flex flex-col items-center justify-center h-screen text-foreground" +
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
