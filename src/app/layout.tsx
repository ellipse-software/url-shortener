import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const noto = Noto_Sans({ subsets: ["latin"] });

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
  maximumScale: 1,
  minimumScale: 1,
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
          noto.className
        )}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
