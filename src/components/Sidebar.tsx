"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, TrendingUp, User, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
    { name: 'Trade', href: '/dashboard/trade', icon: TrendingUp },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    // Mobile stylesheet classes
    const mobileClasses = `transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 fixed z-40 h-full w-64 bg-slate-900 border-r border-slate-800 flex flex-col`;

    return (
        <aside className={mobileClasses}>
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MINEXCOINS
                </h1>
                <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`flex items-center px-4 py-3 rounded-lg transition ${isActive
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}

                {user?.role === 'ADMIN' && (
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className={`flex items-center px-4 py-3 rounded-lg transition ${pathname.startsWith('/admin')
                            ? 'bg-red-600/10 text-red-400 border border-red-500/20'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <Settings className="w-5 h-5 mr-3" />
                        Admin Panel
                    </Link>
                )}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
