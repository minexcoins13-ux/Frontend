"use client";

import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            {/* Mobile Header */}
            <div className="md:hidden fixed w-full top-0 left-0 bg-slate-900 border-b border-slate-800 p-4 z-30 flex items-center justify-between">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MINEXCOINS
                </h1>
                <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed inset-0 z-40 md:static transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'}`}>
                {/* Backdrop for mobile */}
                <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0">
                {children}
            </main>
        </div>
    );
}
