'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-radial-gradient">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium">
                        Secure, Scalable, & Fast
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        MINEXCOINS Crypto <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                            Wallet
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Experience the next generation of crypto trading. Buy, sell, and manage your portfolio with institutional-grade security and real-time market insights.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/auth/register" className="group relative px-8 py-4 bg-green-600 rounded-full text-white font-semibold overflow-hidden transition-all hover:scale-105 shadow-lg shadow-green-600/30">
                            <span className="relative z-10 flex items-center">
                                Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>
                        <Link href="/market" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white font-medium backdrop-blur-sm">
                            View Markets
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                        <button className="bg-black border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                        </button>
                        {/* Using a placeholder for App Store as direct SVG URL might not be stable, but text based button is fine usually */}
                        <button className="bg-black border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition text-white">
                            <div className="text-left">
                                <div className="text-xs text-gray-400">Download on the</div>
                                <div className="text-xl font-bold leading-none">App Store</div>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Floating 3D-like Elements (CSS Only for simplicity, or images) */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-1/4 left-[10%] hidden md:block"
            >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 shadow-2xl shadow-yellow-500/20 flex items-center justify-center text-3xl">₿</div>
            </motion.div>
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/3 right-[10%] hidden md:block"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full shadow-2xl shadow-blue-500/20 flex items-center justify-center text-3xl">Ξ</div>
            </motion.div>
        </section>
    );
}
