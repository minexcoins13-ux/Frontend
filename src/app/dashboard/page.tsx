"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Wallet, TrendingUp, History } from 'lucide-react';
import { useBinanceTicker } from '@/hooks/useBinanceTicker';
import api from '@/services/api';

export default function Dashboard() {
    const { user } = useAuth();
    const [wallets, setWallets] = useState<any[]>([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const { prices } = useBinanceTicker(wallets.map(w => w.currency).filter(c => c !== 'USDT'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const walletRes = await api.get('/wallet');
                setWallets(walletRes.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Calculate dynamic total balance whenever prices or wallets change
    useEffect(() => {
        let total = 0;
        wallets.forEach((w: any) => {
            if (w.currency === 'USDT') {
                total += w.balance;
            } else {
                total += w.balance * (prices[w.currency]?.price || 0);
            }
        });
        setTotalBalance(total);
    }, [wallets, prices]);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
                <p className="text-slate-400">Here's what's happening with your portfolio today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400">Total Balance</h3>
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Wallet className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-slate-400">Active Wallets</h3>
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{wallets.length}</p>
                </div>
            </div>

            {/* Wallets List */}
            <h2 className="text-xl font-bold mb-4">Your Assets</h2>
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">Currency</th>
                            <th className="p-4">Balance</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet: any) => (
                            <tr key={wallet.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                <td className="p-4 font-bold">
                                    <div className="flex items-center gap-2">
                                        {wallet.currency}
                                        {wallet.currency !== 'USDT' && prices[wallet.currency] && (
                                            <span className="text-xs font-normal text-slate-500">
                                                ~${prices[wallet.currency].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div>{wallet.balance.toFixed(8)}</div>
                                    <div className="text-sm text-slate-500">
                                        ≈ ${wallet.currency === 'USDT' ? wallet.balance.toFixed(2) : (wallet.balance * (prices[wallet.currency]?.price || 0)).toFixed(2)}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {/* Placeholder actions */}
                                    <span className="text-blue-400 text-sm cursor-pointer hover:underline">Receive</span>
                                </td>
                            </tr>
                        ))}
                        {wallets.length === 0 && (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-slate-500">No wallets found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
