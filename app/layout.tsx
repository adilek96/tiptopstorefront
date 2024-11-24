import type { Metadata } from "next";
import "./globals.css";
import StoreHeader from "@/components/StoreHeader";
import Footer from "@/components/Footer";
import SnowfallEffect from "../components/SnowfallEffect";
import { Montserrat } from "next/font/google";
import { CartProvider } from "@/providers/CartProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TipTop - онлайн магазин подарков и сувениров в Азербайджане",
  description:
    "TipTop - онлайн магазин подарков, сувениров, декоративного освещения в Азербайджане",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden ${montserrat.className}`}>
        <CartProvider>
          <StoreHeader />

          <main className="relative">
            <SnowfallEffect />
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
