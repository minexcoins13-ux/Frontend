'use client';
import { motion } from 'framer-motion';
import { Coins, Wallet, LineChart, Building2 } from 'lucide-react';
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const products = [
    {
        icon: <LineChart className="w-10 h-10 text-blue-400" />,
        title: "Spot & Margin Trading",
        description: "Access hundreds of cryptocurrencies with high liquidity and low fees. Trade with up to 100x leverage on our powerful matching engine."
    },
    {
        icon: <Wallet className="w-10 h-10 text-purple-400" />,
        title: "Secure Wallet",
        description: "Store your assets safely with our multi-signature cold storage technology. Your keys, your crypto, fully protected."
    },
    {
        icon: <Coins className="w-10 h-10 text-yellow-400" />,
        title: "MINEX Earn",
        description: "Put your crypto to work. Stake your assets and earn industry-leading APY% rewards paid out daily."
    },
    {
        icon: <Building2 className="w-10 h-10 text-green-400" />,
        title: "Institutional Services",
        description: "Tailored solutions for institutions, including OTC trading, custody services, and dedicated account management."
    }
];

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Ecosystem</span>
                    </motion.h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16">
                        Everything you need to build your financial future in the digital asset economy.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {products.map((product, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all hover:bg-slate-800/50 text-left"
                            >
                                <div className="mb-6 bg-slate-800/50 w-20 h-20 rounded-xl flex items-center justify-center">
                                    {product.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{product.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent -z-10"></div>
            </section>

            <Footer />
        </main>
    );
}
