'use client';
import { motion } from 'framer-motion';

export default function AppDownload() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        The only crypto app you'll <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">ever need.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                        Stay on top of the market with our robust mobile app. Trade on the go with full functionality and real-time alerts.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl mb-6 flex items-center justify-center text-blue-400">
                            {/* Icon placeholder */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Advanced Charts</h3>
                        <p className="text-slate-400">Pro-level charting tools right in your pocket. Analyze trends anytime, anywhere.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl mb-6 flex items-center justify-center text-purple-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Smart Wallets</h3>
                        <p className="text-slate-400">Securely store and manage multiple assets with our unified wallet system.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl mb-6 flex items-center justify-center text-green-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-white">Instant Alerts</h3>
                        <p className="text-slate-400">Never miss a price movement. Set custom alerts for your favorite coins.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
