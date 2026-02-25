"use client";

import { normalize } from 'path';
import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Check, User, DollarSign, Trash2 } from 'lucide-react';
import LiveTicker from '@/components/LiveTicker';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, pendingDeposits: 0, pendingKyc: 0 });
    const [deposits, setDeposits] = useState<any[]>([]);
    const [kycRequests, setKycRequests] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const fetchData = async () => {
        try {
            const [usersRes, depositsRes, kycRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/deposits'),
                api.get('/admin/kyc')
            ]);

            setUsers(usersRes.data.data);
            setDeposits(depositsRes.data.data);
            setKycRequests(kycRes.data.data || []);
            setStats({
                users: usersRes.data.data.length,
                pendingDeposits: depositsRes.data.data.length,
                pendingKyc: (kycRes.data.data || []).length
            });

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApproveDeposit = async (id: string) => {
        try {
            await api.put(`/admin/deposit/${id}/approve`);
            setMessage('Deposit approved successfully');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Approval failed');
        }
    };

    const handleDeleteDeposit = async (id: string) => {
        if (!confirm('Are you sure you want to reject/delete this deposit?')) return;

        try {
            await api.delete(`/admin/deposit/${id}`);
            setMessage('Deposit deleted successfully');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Delete failed');
        }
    };

    const handleApproveKyc = async (id: string) => {
        try {
            await api.put(`/admin/kyc/${id}/approve`);
            setMessage('KYC approved successfully');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'KYC Approval failed');
        }
    };

    const handleRejectKyc = async (id: string) => {
        const reason = prompt('Reason for rejection (optional):');
        if (reason === null) return; // User cancelled prompt

        try {
            await api.put(`/admin/kyc/${id}/reject`, { admin_note: reason });
            setMessage('KYC rejected successfully');
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'KYC Rejection failed');
        }
    };

    const handleUpdateUserStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
        const action = currentStatus === 'ACTIVE' ? 'suspend' : 'activate';

        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            await api.put(`/admin/users/${id}/status`, { status: newStatus });
            setMessage(`User successfully ${newStatus.toLowerCase()}`);
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error: any) {
            setMessage(error.response?.data?.message || `Failed to ${action} user`);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-red-500">Admin Panel</h1>

            {/* Live Prices Ticker */}
            <LiveTicker />

            {message && <div className={`p-4 rounded mb-4 ${message.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{message}</div>}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center">
                    <div className="p-3 bg-blue-500/10 rounded-full mr-4"><User className="text-blue-500" /></div>
                    <div>
                        <p className="text-slate-400">Total Users</p>
                        <p className="text-2xl font-bold">{stats.users}</p>
                    </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center">
                    <div className="p-3 bg-yellow-500/10 rounded-full mr-4"><DollarSign className="text-yellow-500" /></div>
                    <div>
                        <p className="text-slate-400">Pending Deposits</p>
                        <p className="text-2xl font-bold">{stats.pendingDeposits}</p>
                    </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center">
                    <div className="p-3 bg-purple-500/10 rounded-full mr-4"><Check className="text-purple-500" /></div>
                    <div>
                        <p className="text-slate-400">Pending KYC</p>
                        <p className="text-2xl font-bold">{stats.pendingKyc}</p>
                    </div>
                </div>
            </div>

            {/* Pending KYC Requests Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Pending KYC Requests</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Document Type</th>
                            <th className="p-4">Document</th>
                            <th className="p-4">Submitted</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {kycRequests.map((kyc) => (
                            <tr key={kyc.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                <td className="p-4">
                                    <div className="font-bold">{kyc.user.name}</div>
                                    <div className="text-sm text-slate-500">{kyc.user.email}</div>
                                </td>
                                <td className="p-4 font-bold">{kyc.document_type.replace('_', ' ')}</td>
                                <td className="p-4">
                                    <a
                                        href={`http://localhost:5000${kyc.document_url}`} // Assuming backend serves on 5000 locally, change to dynamic URL based on your env
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-400 text-sm underline"
                                    >
                                        View Document
                                    </a>
                                </td>
                                <td className="p-4 text-sm text-slate-500">
                                    {new Date(kyc.submitted_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleApproveKyc(kyc.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center text-sm"
                                    >
                                        <Check className="w-4 h-4 mr-1" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleRejectKyc(kyc.id)}
                                        className="bg-red-600/20 hover:bg-red-600/30 text-red-500 px-3 py-1 rounded flex items-center text-sm"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {kycRequests.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-slate-500">No pending KYC requests</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pending Deposits Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Pending Deposits</h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">TXID</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits.map((deposit) => (
                            <tr key={deposit.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                <td className="p-4">
                                    <div className="font-bold">{deposit.user.name}</div>
                                    <div className="text-sm text-slate-500">{deposit.user.email}</div>
                                </td>
                                <td className="p-4 font-bold">{deposit.amount} {deposit.currency}</td>
                                <td className="p-4 font-mono text-sm text-slate-500">{deposit.txid}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        onClick={() => handleApproveDeposit(deposit.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center text-sm"
                                    >
                                        <Check className="w-4 h-4 mr-1" /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleDeleteDeposit(deposit.id)}
                                        className="bg-red-600/20 hover:bg-red-600/30 text-red-500 px-3 py-1 rounded flex items-center text-sm"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" /> Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {deposits.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-slate-500">No pending deposits</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900 rounded-xl border border-slate-800">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">All Users</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800 text-slate-400">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Wallets</th>
                                <th className="p-4">Joined</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50">
                                    <td className="p-4 font-bold">{u.name}</td>
                                    <td className="p-4">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded ${u.role === 'ADMIN' ? 'bg-red-500/20 text-red-500 ps-1' : 'bg-blue-500/20 text-blue-500'}`}>{u.role}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`text-xs px-2 py-1 rounded ${u.status === 'ACTIVE' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{u.status}</span>
                                    </td>
                                    <td className="p-4 text-xs">
                                        {u.wallet?.map((w: any) => (
                                            <div key={w.id} className="mb-1 text-slate-300">
                                                <span className="font-bold">{w.currency}:</span> <br />
                                                <span className="text-[10px] text-slate-500 font-mono select-all break-all">{w.address || 'N/A'}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="p-4 text-slate-500 text-sm" suppressHydrationWarning>{new Date(u.created_at).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        {u.role !== 'ADMIN' && (
                                            <button
                                                onClick={() => handleUpdateUserStatus(u.id, u.status)}
                                                className={`px-3 py-1 rounded text-sm text-white ${u.status === 'ACTIVE' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                            >
                                                {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
