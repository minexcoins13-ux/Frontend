'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { User, Shield, Key, History, Mail, AlertCircle, CheckCircle } from 'lucide-react';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    referral_code: string;
    created_at: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setProfile(res.data.data);
            } catch (err: any) {
                setError('Failed to load profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <div className="text-white p-6">Loading profile...</div>;
    if (error) return <div className="text-red-500 p-6">{error}</div>;
    if (!profile) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>

            {/* Profile Header Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
                    {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-2">
                        <Mail className="w-4 h-4" />
                        <span>{profile.email}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">
                            ID: {profile.id}
                        </span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {profile.status}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                            {profile.role}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Account Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" /> Account Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400">Referral Code</span>
                            <span className="text-white font-mono font-bold">{profile.referral_code}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400">Member Since</span>
                            <span className="text-white">{new Date(profile.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                            <span className="text-slate-400">KYC Status</span>
                            <span className="text-yellow-500 font-medium flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" /> Pending
                            </span>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-700 rounded-lg">
                                    <Key className="w-5 h-5 text-slate-300" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">Password</div>
                                    <div className="text-xs text-slate-400">Last changed 30 days ago</div>
                                </div>
                            </div>
                            <button className="px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition">Change</button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-700 rounded-lg">
                                    <Shield className="w-5 h-5 text-slate-300" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">Two-Factor Auth</div>
                                    <div className="text-xs text-slate-400">Secure your account with 2FA</div>
                                </div>
                            </div>
                            <button className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">Enable</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity (Mock) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-500" /> Recent Activity
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-400">
                        <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                            <tr>
                                <th className="px-6 py-3 rounded-l-lg">Action</th>
                                <th className="px-6 py-3">Device</th>
                                <th className="px-6 py-3">Location</th>
                                <th className="px-6 py-3 rounded-r-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-800/50">
                                <td className="px-6 py-4 text-white">Login Successful</td>
                                <td className="px-6 py-4">Chrome / Windows</td>
                                <td className="px-6 py-4">New York, USA</td>
                                <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
                            </tr>
                            <tr className="border-b border-slate-800/50">
                                <td className="px-6 py-4 text-white">Password Changed</td>
                                <td className="px-6 py-4">Chrome / Windows</td>
                                <td className="px-6 py-4">New York, USA</td>
                                <td className="px-6 py-4">{new Date(Date.now() - 86400000 * 30).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
