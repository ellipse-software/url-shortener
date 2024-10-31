import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
