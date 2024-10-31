import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "An open source link shortener.",
  description:
    "A url shortener that respects your privacy and deployed on your own infrastructure. Built on Cloudflare KV and Workers. Serverlessly deployed. Privacy as standard.",
  openGraph: {
    images: [
      {
        url: "https://storage.ellipse.software/url.png",
        width: 1699,
        height: 465,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#2266EF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "cursor-default selection:bg-[#2266EF]/70 selection:text-foreground/70  text-foreground",
          inter.className
        )}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
