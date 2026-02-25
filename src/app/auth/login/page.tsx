"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const res = await api.post('/auth/login', { email, password });
            login(res.data.data.token, res.data.data);
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login Error:', err);
            if (!err.response) {
                setError('Network error: Unable to reach the server. Please check if the backend is running.');
            } else {
                setError(err.response?.data?.message || 'Login failed due to unexpected server response.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative">
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                        Welcome to Minexcoins
                    </h1>
                    <p className="text-slate-400">
                        Please sign in to continue
                    </p>
                </div>
                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-center text-slate-400 text-sm">
                    Don't have an account? <Link href="/auth/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
                <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <p className="text-slate-500 text-sm">
                        Need help? Contact <a href="mailto:support@minexcoins.com" className="text-blue-400 hover:underline">support@minexcoins.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
