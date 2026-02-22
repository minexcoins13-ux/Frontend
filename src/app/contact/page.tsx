'use client';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ContactPage() {
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
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">First Name</label>
                                        <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 text-sm mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Subject</label>
                                    <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Partnership</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Message</label>
                                    <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition text-white" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-blue-600/20">
                                    Send Message
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
                                <button className="text-green-500 hover:text-green-400 font-medium">Start Chat →</button>
                            </div>

                            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/10 hover:bg-slate-800/50 transition">
                                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Phone Support</h3>
                                <p className="text-slate-400 mb-4">Available for institutional clients.</p>
                                <span className="text-slate-300 font-mono">+1 (555) 123-4567</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
