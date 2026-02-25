'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import api from '@/services/api';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('--- Form Submission Started ---');
        console.log('Payload:', formData);

        setStatus('loading');
        setErrorMessage('');

        try {
            console.log('Sending API request to /contact...');
            // Adding a timeout config to automatically abort if the request hangs
            const response = await api.post('/contact', formData, { timeout: 15000 });
            console.log('API Response received:', response.data);

            setStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: 'General Inquiry',
                message: ''
            });

            // Automatically reset status after 5 seconds to clear the success message
            setTimeout(() => {
                setStatus('idle');
            }, 5000);

        } catch (err: any) {
            console.error('Contact Form Error Caught:', err);
            setStatus('error');

            if (err.code === 'ECONNABORTED') {
                setErrorMessage('The request timed out. Please check your internet connection and backend server.');
            } else {
                setErrorMessage(err.response?.data?.message || err.message || 'Failed to send message. Please try again later.');
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold mb-6"
                        >
                            Get in <span className="text-blue-500">Touch</span>
                        </motion.h1>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                            Have questions or need assistance? Our team is here to help you 24/7.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-900/50 p-8 rounded-3xl border border-white/10"
                        >
                            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                                            placeholder="John"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                                            placeholder="Doe"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white"
                                        placeholder="How can we help you?"
                                        required
                                    ></textarea>
                                </div>

                                {status === 'success' && (
                                    <div className="bg-green-500/10 text-green-500 font-medium px-4 py-3 rounded-lg border border-green-500/20">
                                        Your message has been sent successfully! Our team will reach out shortly.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="bg-red-500/10 text-red-500 font-medium px-4 py-3 rounded-lg border border-red-500/20">
                                        {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-600/20"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:bg-slate-800/50 transition">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Email Support</h3>
                                <p className="text-slate-400 mb-4">For general inquiries and support requests.</p>
                                <a href="mailto:support@minexcoins.com" className="text-blue-500 hover:text-blue-400 font-medium">support@minexcoins.com</a>
                            </div>

                            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:bg-slate-800/50 transition">
                                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                                <p className="text-slate-400 mb-4">Chat with our support team in real-time.</p>
                                <a href="https://wa.me/447735377848" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 font-medium">Start Chat on WhatsApp →</a>
                            </div>

                            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:bg-slate-800/50 transition">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                                <p className="text-slate-400 mb-4">Available for institutional clients.</p>
                                <span className="text-slate-300 font-mono">+44 7735 377848</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
