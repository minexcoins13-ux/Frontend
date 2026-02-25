"use client";

import { useBinanceTicker } from '@/hooks/useBinanceTicker';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LiveTicker() {
    const { prices } = useBinanceTicker(['BTC', 'ETH', 'SOL', 'BNB']);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {['BTC', 'ETH', 'SOL', 'BNB'].map(symbol => {
                const data = prices[symbol];
                if (!data) return (
                    <div key={symbol} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center justify-between animate-pulse">
                        <div className="w-full">
                            <div className="h-4 bg-slate-800 rounded w-16 mb-2"></div>
                            <div className="h-6 bg-slate-800 rounded w-24"></div>
                        </div>
                    </div>
                );
                return (
                    <div key={symbol} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-slate-400 text-sm font-bold">{symbol}/USDT</h3>
                            <p className="text-xl text-white font-bold">${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className={`flex items-center text-sm font-bold ${data.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {data.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            {Math.abs(data.change).toFixed(2)}%
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
