import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import GoogleProvider from "@/components/GoogleProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MINEXCOINS",
  description: "Secure Crypto Trading Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleProvider>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
