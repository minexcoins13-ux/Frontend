import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import MarketSnapshot from "@/components/landing/MarketSnapshot";
import Features from "@/components/landing/Features";
import AppDownload from "@/components/landing/AppDownload";
import SwapSection from "@/components/landing/SwapSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <Hero />
      <MarketSnapshot />
      <Features />
      <SwapSection />
      <AppDownload />
      <Footer />
    </main>
  );
}
