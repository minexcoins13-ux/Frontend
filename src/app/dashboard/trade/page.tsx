"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

export default function TradePage() {
    const [prices, setPrices] = useState<any>({});
    const [trades, setTrades] = useState<any[]>([]);
    const [selectedPair, setSelectedPair] = useState('BTC/USDT');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('BUY');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchPrices = async () => {
        try {
            const res = await api.get('/trade/prices');
            setPrices(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await api.get('/trade/history');
            setTrades(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPrices();
        fetchHistory();
        const interval = setInterval(fetchPrices, 5000); // Update every 5s
        return () => clearInterval(interval);
    }, []);

    const handleTrade = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/trade/execute', {
                pair: selectedPair,
                type,
                amount: parseFloat(amount)
            });
            setMessage(`${type} order placed successfully!`);
            setAmount('');
            fetchHistory();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Trade failed');
        }
    };

    const currentPrice = selectedPair.startsWith('BTC') ? prices.BTC : prices.ETH;
    const base = selectedPair.split('/')[0];
    const quote = selectedPair.split('/')[1];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Spot Trading</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Market List / Chart Placeholder */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Price Header */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold flex items-center">
                                {selectedPair}
                                <span className="ml-4 text-xl text-blue-400">${currentPrice?.toFixed(2)}</span>
                            </h2>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSelectedPair('BTC/USDT')}
                                className={`px-4 py-2 rounded-lg transition ${selectedPair === 'BTC/USDT' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                            >
                                BTC/USDT
                            </button>
                            <button
                                onClick={() => setSelectedPair('ETH/USDT')}
                                className={`px-4 py-2 rounded-lg transition ${selectedPair === 'ETH/USDT' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                            >
                                ETH/USDT
                            </button>
                        </div>
                    </div>

                    {/* Simple Chart Placeholder */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-64 flex items-center justify-center text-slate-500">
                        [ Trading Chart Placeholder - Live Price: {currentPrice?.toFixed(2)} ]
                    </div>

                    {/* Trade History */}
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h3 className="font-bold mb-4">Recent Trades</h3>
                        <table className="w-full text-left">
                            <thead className="text-slate-500 border-b border-slate-800">
                                <tr>
                                    <th className="pb-2">Pair</th>
                                    <th className="pb-2">Type</th>
                                    <th className="pb-2">Price</th>
                                    <th className="pb-2">Amount</th>
                                    <th className="pb-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trades.map((trade) => (
                                    <tr key={trade.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                        <td className="py-3">{trade.pair}</td>
                                        <td className={`py-3 ${trade.type === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>{trade.type}</td>
                                        <td className="py-3">${trade.price.toFixed(2)}</td>
                                        <td className="py-3">{trade.amount.toFixed(6)}</td>
                                        <td className="py-3">${(trade.price * trade.amount).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Form */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-fit">
                    <h3 className="text-xl font-bold mb-6">Place Order</h3>

                    <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setType('BUY')}
                            className={`flex-1 py-2 rounded-md font-bold transition ${type === 'BUY' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Buy {base}
                        </button>
                        <button
                            onClick={() => setType('SELL')}
                            className={`flex-1 py-2 rounded-md font-bold transition ${type === 'SELL' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Sell {base}
                        </button>
                    </div>

                    {message && <div className={`p-3 rounded mb-4 text-sm ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{message}</div>}

                    <form onSubmit={handleTrade} className="space-y-4">
                        <div>
                            <label className="block text-slate-400 mb-1 text-sm">Price ({quote})</label>
                            <input
                                type="text"
                                value={currentPrice?.toFixed(2) || 'Loading...'}
                                disabled
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-1 text-sm">Amount ({base})</label>
                            <input
                                type="number"
                                step="0.000001"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                placeholder={`0.00 ${base}`}
                                required
                            />
                        </div>

                        <div className="py-2 flex justify-between text-sm text-slate-400">
                            <span>Fee (0.2%)</span>
                            <span>${((parseFloat(amount) || 0) * currentPrice * 0.002).toFixed(2)}</span>
                        </div>
                        <div className="py-2 flex justify-between font-bold border-t border-slate-800 pt-4">
                            <span>Total ({quote})</span>
                            <span>${((parseFloat(amount) || 0) * currentPrice).toFixed(2)}</span>
                        </div>

                        <button
                            type="submit"
                            className={`w-full font-bold py-3 rounded-lg transition mt-4 ${type === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
                        >
                            {type} {base}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
