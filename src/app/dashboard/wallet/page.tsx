"use client";

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { RefreshCw, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, LogOut } from 'lucide-react';
import WalletModal from '@/components/WalletModal';

export default function WalletPage() {
    const [wallets, setWallets] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('deposit');
    const [loading, setLoading] = useState(true);

    // Wallet Connect State
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    // Form States
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USDT');
    const [txid, setTxid] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [walletRes, txRes] = await Promise.all([
                api.get('/wallet'),
                api.get('/wallet/transactions')
            ]);
            setWallets(walletRes.data.data);
            setTransactions(txRes.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Check local storage for connected wallet
        const savedWallet = localStorage.getItem('connectedWallet');
        if (savedWallet) {
            setConnectedWallet(savedWallet);
            setWalletAddress('0x71C...9A23'); // Mock address
        }
    }, []);

    const handleConnectWallet = (walletName: string) => {
        setConnectedWallet(walletName);
        setWalletAddress('0x71C...9A23'); // Mock address
        localStorage.setItem('connectedWallet', walletName);
        setIsWalletModalOpen(false);
    };

    const handleDisconnectWallet = () => {
        setConnectedWallet(null);
        setWalletAddress(null);
        localStorage.removeItem('connectedWallet');
    };

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/wallet/deposit', { amount, currency, txid });
            setMessage('Deposit request submitted successfully!');
            setAmount('');
            setTxid('');
            fetchData();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Deposit failed');
        }
    };

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            await api.post('/wallet/withdraw', { amount, currency, address });
            setMessage('Currency transferred successfully!');
            setAmount('');
            setAddress('');
            fetchData();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Withdrawal failed');
        }
    };

    return (
        <div className="space-y-8 relative">
            <WalletModal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
                onConnect={handleConnectWallet}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold">Wallet Management</h1>

                {!connectedWallet ? (
                    <button
                        onClick={() => setIsWalletModalOpen(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                        <WalletIcon className="w-5 h-5" />
                        Connect Wallet
                    </button>
                ) : (
                    <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-xl p-1 pr-4">
                        <div className="bg-slate-800 px-3 py-2 rounded-lg flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-bold text-sm text-slate-200">{connectedWallet}</span>
                        </div>
                        <span className="font-mono text-slate-400 text-sm hidden sm:block">{walletAddress}</span>
                        <button
                            onClick={handleDisconnectWallet}
                            className="text-slate-400 hover:text-red-400 transition-colors ml-2"
                            title="Disconnect Wallet"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wallets.map((wallet) => (
                    <div key={wallet.id} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg">{wallet.currency}</h3>
                            {wallet.currency === 'USDT' ? <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Stablecoin</span> : null}
                        </div>
                        <p className="text-2xl font-bold mb-2">{wallet.balance.toFixed(8)}</p>
                        {wallet.address && (
                            <div className="bg-slate-800/50 p-2 rounded-lg text-xs text-slate-400 break-all select-all cursor-copy">
                                <span className="block text-slate-500 mb-1">Deposit Address:</span>
                                {wallet.address}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Actions Area */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <div className="flex space-x-4 border-b border-slate-800 mb-6">
                    <button
                        onClick={() => setActiveTab('deposit')}
                        className={`pb-4 px-2 ${activeTab === 'deposit' ? 'text-blue-500 border-b-2 border-blue-500 font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                        Receive
                    </button>
                    <button
                        onClick={() => setActiveTab('withdraw')}
                        className={`pb-4 px-2 ${activeTab === 'withdraw' ? 'text-blue-500 border-b-2 border-blue-500 font-bold' : 'text-slate-400 hover:text-white'}`}
                    >
                        Send
                    </button>
                </div>

                {message && <div className={`p-4 rounded mb-4 ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{message}</div>}

                {activeTab === 'deposit' ? (
                    <form onSubmit={handleDeposit} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-slate-400 mb-1">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                            >
                                <option value="USDT">USDT</option>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="TRX">TRX</option>
                                <option value="BNB">BNB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-1">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-1">Transaction ID (TXID)</label>
                            <input
                                type="text"
                                value={txid}
                                onChange={(e) => setTxid(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                placeholder="Paste the blockchain TXID here"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
                            Submit Receive
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleWithdraw} className="space-y-4 max-w-lg">
                        <div>
                            <label className="block text-slate-400 mb-1">Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                            >
                                <option value="USDT">USDT</option>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="TRX">TRX</option>
                                <option value="BNB">BNB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-1">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-1">Destination Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:border-blue-500 outline-none"
                                placeholder="Enter your wallet address"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
                            Send Funds
                        </button>
                    </form>
                )}
            </div>

            {/* Transaction History */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                    <button onClick={fetchData} className="text-slate-400 hover:text-white"><RefreshCw className="w-5 h-5" /></button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">Type</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Reference</th>
                            <th className="p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${tx.amount > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                        {tx.amount > 0 ? <ArrowDownLeft className="w-3 h-3 mr-1" /> : <ArrowUpRight className="w-3 h-3 mr-1" />}
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="p-4 font-bold">{Math.abs(tx.amount).toFixed(8)} {tx.currency}</td>
                                <td className="p-4 text-slate-500 font-mono text-sm">{tx.reference_id?.substring(0, 8)}...</td>
                                <td className="p-4 text-slate-400" suppressHydrationWarning>{new Date(tx.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-slate-500">No transactions yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

