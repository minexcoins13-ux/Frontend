"use client";

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (walletName: string) => void;
}

const wallets = [
    {
        name: 'MetaMask',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png',
        color: 'from-orange-500/20 to-orange-600/10',
        borderColor: 'border-orange-500/30'
    },
    {
        name: 'Trust Wallet',
        icon: 'https://trustwallet.com/assets/images/media/assets/TWT.png',
        color: 'from-blue-500/20 to-blue-600/10',
        borderColor: 'border-blue-500/30'
    },
    {
        name: 'Exodus',
        icon: 'https://www.exodus.com/brand/img/logo.svg',
        color: 'from-purple-500/20 to-purple-600/10',
        borderColor: 'border-purple-500/30',
        invert: true
    },
    {
        name: 'SafePal',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/200x200/7279.png',
        color: 'from-slate-500/20 to-slate-600/10',
        borderColor: 'border-slate-500/30'
    }
];

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Connect Wallet
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-3">
                        {wallets.map((wallet) => (
                            <button
                                key={wallet.name}
                                onClick={() => onConnect(wallet.name)}
                                className={`w-full group flex items-center p-4 rounded-xl border ${wallet.borderColor} bg-gradient-to-r ${wallet.color} hover:bg-opacity-80 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 p-2 ${wallet.invert ? 'bg-white' : ''}`}>
                                    <img
                                        src={wallet.icon}
                                        alt={wallet.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                                        {wallet.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">Connect using {wallet.name}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-slate-950/50 text-center text-xs text-slate-500">
                        By connecting a wallet, you agree to MinexCoins Terms of Service
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
