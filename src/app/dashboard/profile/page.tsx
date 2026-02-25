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
    kyc?: {
        status: string;
        document_type: string;
        document_url: string;
        admin_note: string;
    };
    bank_name?: string;
    account_name?: string;
    account_number?: string;
    ifsc_code?: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // KYC Upload State
    const [file, setFile] = useState<File | null>(null);
    const [documentType, setDocumentType] = useState('PASSPORT');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');

    // Bank Details State
    const [bankDetails, setBankDetails] = useState({
        bank_name: '',
        account_name: '',
        account_number: '',
        ifsc_code: ''
    });
    const [bankLoading, setBankLoading] = useState(false);
    const [bankError, setBankError] = useState('');
    const [bankSuccess, setBankSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                const data = res.data.data;
                setProfile(data);
                setBankDetails({
                    bank_name: data.bank_name || '',
                    account_name: data.account_name || '',
                    account_number: data.account_number || '',
                    ifsc_code: data.ifsc_code || ''
                });
            } catch (err: any) {
                setError('Failed to load profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setUploadError('Please select a file to upload');
            return;
        }

        setUploadLoading(true);
        setUploadError('');
        setUploadSuccess('');

        const formData = new FormData();
        formData.append('document', file);
        formData.append('document_type', documentType);

        try {
            const res = await api.post('/kyc/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.data.success) {
                setUploadSuccess('KYC document uploaded successfully! Status is now PENDING.');
                // Optimistically update profile kyc status
                setProfile(prev => prev ? {
                    ...prev,
                    kyc: res.data.data
                } : null);
                setFile(null);
            }
        } catch (err: any) {
            console.error('KYC Upload Error:', err);
            setUploadError(err.response?.data?.message || 'Failed to upload document');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleBankSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBankLoading(true);
        setBankError('');
        setBankSuccess('');

        try {
            const res = await api.put('/auth/bank', bankDetails);
            if (res.data.success) {
                setBankSuccess('Bank details updated successfully!');
                setProfile(prev => prev ? { ...prev, ...res.data.data } : null);
            }
        } catch (err: any) {
            console.error('Bank Update Error:', err);
            setBankError(err.response?.data?.message || 'Failed to update bank details');
        } finally {
            setBankLoading(false);
        }
    };

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
                            {profile.kyc ? (
                                <span className={`font-medium flex items-center gap-1 ${profile.kyc.status === 'APPROVED' ? 'text-green-500' :
                                    profile.kyc.status === 'REJECTED' ? 'text-red-500' :
                                        'text-yellow-500'
                                    }`}>
                                    {profile.kyc.status === 'APPROVED' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                    {profile.kyc.status}
                                </span>
                            ) : (
                                <span className="text-yellow-500 font-medium flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" /> Unsubmitted
                                </span>
                            )}
                        </div>
                    </div>

                    {/* KYC Upload Form */}
                    {(!profile.kyc || profile.kyc.status === 'REJECTED') && (
                        <div className="mt-6 pt-6 border-t border-slate-700/50">
                            <h4 className="text-lg font-medium text-white mb-4">Complete Your KYC</h4>
                            <p className="text-sm text-slate-400 mb-4">
                                Please upload a valid identity document to verify your account.
                            </p>

                            <form onSubmit={handleFileUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Document Type
                                    </label>
                                    <select
                                        value={documentType}
                                        onChange={(e) => setDocumentType(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="PASSPORT">Passport</option>
                                        <option value="ID_CARD">National ID Card</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">
                                        Upload Document (Image or PDF)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
                                    />
                                </div>

                                {uploadError && <div className="text-red-500 text-sm">{uploadError}</div>}
                                {uploadSuccess && <div className="text-green-500 text-sm">{uploadSuccess}</div>}

                                <button
                                    type="submit"
                                    disabled={uploadLoading || !file}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition"
                                >
                                    {uploadLoading ? 'Uploading...' : 'Submit Document'}
                                </button>
                            </form>
                        </div>
                    )}
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

                {/* Bank Details */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-500" /> Bank Account Details
                    </h3>
                    <form onSubmit={handleBankSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Bank Name</label>
                                <input
                                    type="text"
                                    value={bankDetails.bank_name}
                                    onChange={(e) => setBankDetails({ ...bankDetails, bank_name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. Chase Bank"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Account Holder Name</label>
                                <input
                                    type="text"
                                    value={bankDetails.account_name}
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_name: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Account Number</label>
                                <input
                                    type="text"
                                    value={bankDetails.account_number}
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_number: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1234567890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">IFSC / Routing Code</label>
                                <input
                                    type="text"
                                    value={bankDetails.ifsc_code}
                                    onChange={(e) => setBankDetails({ ...bankDetails, ifsc_code: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="ABCD0123456"
                                />
                            </div>
                        </div>

                        {bankError && <div className="text-red-500 text-sm mt-2">{bankError}</div>}
                        {bankSuccess && <div className="text-green-500 text-sm mt-2">{bankSuccess}</div>}

                        <button
                            type="submit"
                            disabled={bankLoading}
                            className="w-full md:w-auto mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
                        >
                            {bankLoading ? 'Saving...' : 'Save Bank Details'}
                        </button>
                    </form>
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
