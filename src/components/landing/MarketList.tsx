"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Search, ArrowRight, Star } from 'lucide-react';
import api from '@/services/api';

export default function MarketList() {
    const [prices, setPrices] = useState<any>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<string[]>([]);

    // Fallback static data if API fails to bring initial richness
    const staticMarkets = [
        { symbol: 'BTC', name: 'Bitcoin', price: 64230.50, change: 2.5, volume: '24.5B', marketCap: '1.2T', logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029' },
        { symbol: 'ETH', name: 'Ethereum', price: 3450.20, change: -1.2, volume: '12.1B', marketCap: '400B', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
        { symbol: 'SOL', name: 'Solana', price: 145.80, change: 5.6, volume: '3.2B', marketCap: '65B', logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029' },
        { symbol: 'BNB', name: 'BNB', price: 590.10, change: 0.8, volume: '1.5B', marketCap: '88B', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029' },
        { symbol: 'XRP', name: 'XRP', price: 0.58, change: -0.5, volume: '800M', marketCap: '32B', logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029' },
        { symbol: 'TRX', name: 'TRON', price: 0.12, change: 1.1, volume: '400M', marketCap: '10B', logo: 'https://cryptologos.cc/logos/tron-trx-logo.svg?v=029' },
        { symbol: 'ADA', name: 'Cardano', price: 0.45, change: -2.1, volume: '350M', marketCap: '16B', logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029' },
        { symbol: 'AVAX', name: 'Avalanche', price: 35.60, change: 4.2, volume: '600M', marketCap: '13B', logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029' },
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.15, change: 8.5, volume: '1.2B', marketCap: '21B', logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029' },
        { symbol: 'DOT', name: 'Polkadot', price: 7.20, change: 0.3, volume: '250M', marketCap: '10B', logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029' },
        { symbol: 'LINK', name: 'Chainlink', price: 14.50, change: -1.8, volume: '450M', marketCap: '8B', logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029' },
        { symbol: 'MATIC', name: 'Polygon', price: 0.75, change: 1.5, volume: '300M', marketCap: '7B', logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029' },
    ];

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // If the user's backend is running, try to fetch real prices to overlay on static data
                const res = await api.get('/trade/prices');
                if (res.data && res.data.data) {
                    setPrices(res.data.data);
                }
            } catch (error) {
                // Silently fallback
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 10000); // 10s poll
        return () => clearInterval(interval);
    }, []);

    const toggleFavorite = (symbol: string) => {
        if (favorites.includes(symbol)) {
            setFavorites(favorites.filter(f => f !== symbol));
        } else {
            setFavorites([...favorites, symbol]);
        }
    };

    // Merge static info with live prices if available
    const displayMarkets = staticMarkets.map(market => {
        const livePrice = prices[market.symbol];
        return {
            ...market,
            price: livePrice ? livePrice : market.price,
            // You can also add mock calculations for live change if needed
        };
    }).filter(market =>
        market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="relative z-10 w-full" id="markets">
            {/* Header Section */}
            <div className="pt-12 pb-12 relative overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                            Cryptocurrency <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Markets</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10">
                            Track real-time prices, volume, and market capitalization for top cryptocurrencies. Sign up to trade instantly.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto mb-12">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl text-white rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all shadow-xl shadow-black/50"
                                placeholder="Search coins, e.g. Bitcoin, ETH..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Markets List Section */}
            <div className="container mx-auto px-6 pb-24 relative z-10">
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 text-sm font-medium text-slate-400 bg-slate-900/60 uppercase tracking-wider">
                                    <th className="py-5 px-6 opacity-0 w-12">Fav</th>
                                    <th className="py-5 px-6">Asset</th>
                                    <th className="py-5 px-6 text-right">Price</th>
                                    <th className="py-5 px-6 text-right hidden sm:table-cell">24h Change</th>
                                    <th className="py-5 px-6 text-right hidden md:table-cell">24h Volume</th>
                                    <th className="py-5 px-6 text-right hidden lg:table-cell">Market Cap</th>
                                    <th className="py-5 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayMarkets.map((market, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
                                        key={market.symbol}
                                        className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="py-4 px-6">
                                            <button
                                                onClick={() => toggleFavorite(market.symbol)}
                                                className="text-slate-500 hover:text-yellow-400 transition-colors"
                                            >
                                                <Star className={`w-5 h-5 ${favorites.includes(market.symbol) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                            </button>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-800 p-2 flex items-center justify-center border border-slate-700">
                                                    <img src={market.logo} alt={market.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-green-400 transition-colors">{market.name}</div>
                                                    <div className="text-sm text-slate-500 font-medium">{market.symbol}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right font-semibold text-white">
                                            ${market.price.toLocaleString(undefined, { minimumFractionDigits: market.price < 1 ? 4 : 2, maximumFractionDigits: market.price < 1 ? 4 : 2 })}
                                        </td>
                                        <td className="py-4 px-6 text-right hidden sm:table-cell">
                                            <div className={`inline-flex items-center gap-1 font-medium px-2.5 py-1 rounded-full text-sm ${market.change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {market.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                                {Math.abs(market.change).toFixed(2)}%
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right text-slate-300 hidden md:table-cell font-medium">
                                            ${market.volume}
                                        </td>
                                        <td className="py-4 px-6 text-right text-slate-300 hidden lg:table-cell font-medium">
                                            ${market.marketCap}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <Link href={`/dashboard/trade?pair=${market.symbol}-USDT`} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600/10 text-green-400 font-medium hover:bg-green-600 hover:text-white transition-all transform group-hover:scale-105">
                                                Trade
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {displayMarkets.length === 0 && (
                            <div className="py-16 text-center text-slate-500">
                                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="text-lg">No markets found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section at bottom */}
                <div className="mt-16 bg-gradient-to-r from-blue-900/40 to-green-900/40 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px]"></div>
                    <div className="relative z-10 mb-6 md:mb-0 max-w-xl">
                        <h3 className="text-3xl font-bold mb-4">Ready to start trading?</h3>
                        <p className="text-slate-300 text-lg">Join MINEXCOINS today and get access to our advanced trading platform, low fees, and top-tier security.</p>
                    </div>
                    <Link href="/auth/register" className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-black rounded-full font-bold shadow-lg shadow-white/20 hover:scale-105 transition-transform flex items-center gap-2">
                        Create Account <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
