import type { Metadata } from "next";
import { Syne, Poppins } from "next/font/google";
import "./globals.css";
import { FaroSetup } from "@/components/FaroSetup";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lisa | Développeuse Fullstack",
  description: "Portfolio de Lisa, Développeuse Fullstack avec 3 ans d'expérience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${syne.variable} ${poppins.variable} antialiased`}>
        <FaroSetup />
        {children}
      </body>
    </html>
  );
}
