"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import api from '@/services/api';

export default function MarketSnapshot() {
    const [prices, setPrices] = useState<any>({});

    // Top 5 markets for snapshot
    const snapshotMarkets = [
        { symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change: 2.5, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029' },
        { symbol: 'ETH', name: 'Ethereum', price: 3450.20, change: -1.2, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
        { symbol: 'SOL', name: 'Solana', price: 145.80, change: 5.6, logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029' },
        { symbol: 'BNB', name: 'BNB', price: 590.10, change: 0.8, logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029' },
        { symbol: 'XRP', name: 'XRP', price: 0.58, change: -0.5, logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029' },
    ];

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await api.get('/trade/prices');
                if (res.data && res.data.data) {
                    setPrices(res.data.data);
                }
            } catch (error) {
                // Ignore API failures for snapshot
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 10000);
        return () => clearInterval(interval);
    }, []);

    const displayMarkets = snapshotMarkets.map(market => {
        const livePrice = prices[market.symbol];
        return {
            ...market,
            price: livePrice ? livePrice : market.price,
        };
    });

    return (
        <section className="py-20 bg-[#020617] relative">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Trends</span>
                        </h2>
                        <p className="text-slate-400 max-w-xl">
                            Stay on top of the crypto markets. Real-time prices for top coins, all in one place.
                        </p>
                    </div>
                    <Link href="/market" className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors text-white font-medium whitespace-nowrap">
                        View All Markets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {displayMarkets.map((market, index) => (
                        <motion.div
                            key={market.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 transition-colors group cursor-pointer relative overflow-hidden"
                        >
                            <Link href={`/dashboard/trade?pair=${market.symbol}-USDT`} className="absolute inset-0 z-10"></Link>

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <img src={market.logo} alt={market.name} className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <div className="font-bold">{market.symbol}</div>
                                        <div className="text-xs text-slate-500">{market.name}</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-2xl font-bold mb-2">
                                    ${market.price.toLocaleString(undefined, { minimumFractionDigits: market.price < 1 ? 4 : 2, maximumFractionDigits: market.price < 1 ? 4 : 2 })}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${market.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {market.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                    {Math.abs(market.change).toFixed(2)}%
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
