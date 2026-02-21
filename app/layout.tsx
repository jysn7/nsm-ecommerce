import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/global/NavbarWrapper";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kith | Curated Marketplace",
  description: "Discover a premium selection of handpicked goods from verified local sellers. Quality essentials and technical hardware curated for you.",
  keywords: ["marketplace", "curated goods", "local sellers", "premium essentials"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} font-sans antialiased`}
      >
        <NavbarWrapper />
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: { 
              background: 'white', 
              color: 'black', 
              border: '1px solid #e2e8f0' 
            },
            classNames: {
              title: 'text-black font-medium',
              description: 'text-zinc-900 font-normal',
              toast: 'rounded-xl shadow-lg p-4',
            }
          }}
        />
      </body>
    </html>
  );
}