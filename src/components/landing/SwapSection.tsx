'use client';
import { ArrowDownUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SwapSection() {
    return (
        <section className="py-24 relative">
            {/* Background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] -z-10"></div>

            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 order-2 lg:order-1">
                    {/* Mock Swap UI */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 max-w-md mx-auto rounded-3xl p-6 border border-slate-800 shadow-2xl relative"
                    >
                        <div className="flex justify-between items-center mb-6 text-slate-400 text-sm">
                            <span>Swap</span>
                            <span>Slippage 0.5%</span>
                        </div>

                        {/* From Token */}
                        <div className="bg-slate-800/50 p-4 rounded-2xl mb-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400 text-sm">You pay</span>
                                <span className="text-slate-400 text-sm">Balance: 2.45 ETH</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-3xl font-bold text-white">1.0</span>
                                <button className="bg-slate-700 hover:bg-slate-600 rounded-full px-3 py-1.5 flex items-center gap-2 text-white font-medium transition">
                                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                                    ETH
                                </button>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex justify-center -my-3 relative z-10">
                            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 cursor-pointer hover:scale-110 transition">
                                <ArrowDownUp className="text-blue-500 w-5 h-5" />
                            </div>
                        </div>

                        {/* To Token */}
                        <div className="bg-slate-800/50 p-4 rounded-2xl mt-2 mb-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-400 text-sm">You receive</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-3xl font-bold text-white">2,850.45</span>
                                <button className="bg-slate-700 hover:bg-slate-600 rounded-full px-3 py-1.5 flex items-center gap-2 text-white font-medium transition">
                                    <div className="w-6 h-6 rounded-full bg-green-500"></div>
                                    USDT
                                </button>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-600/20">
                            Connect Wallet
                        </button>
                    </motion.div>
                </div>

                <div className="lg:w-1/2 order-1 lg:order-2">
                    <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                    >
                        All-in-one <br />
                        decentralized <span className="text-white">crypto Wallet</span>
                    </motion.h2>
                    <p className="text-slate-400 text-lg mb-8">
                        Swap tokens instantly with the best rates across multiple exchanges. No hidden fees, just pure DeFi power.
                    </p>
                    <ul className="space-y-4 mb-10 text-slate-300">
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Best exchange rates
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Multi-chain support
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            Non-custodial & secure
                        </li>
                    </ul>
                    <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition text-white font-medium">
                        Explore DeFi
                    </button>
                </div>
            </div>
        </section>
    );
}
