'use client';
import { motion } from 'framer-motion';
import { Users, Globe, Trophy } from 'lucide-react';
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5M+", label: "Verified Users" },
    { icon: <Globe className="w-6 h-6" />, value: "180+", label: "Countries Supported" },
    { icon: <Trophy className="w-6 h-6" />, value: "$10B+", label: "Quarterly Volume" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-bold mb-6"
                        >
                            Building the Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Finance</span>
                        </motion.h1>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                            At MINEXCOINS, we believe that everyone deserves access to open, secure, and decentralized financial services. We are building the bridge between traditional finance and the crypto economy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 text-center"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 mb-4">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-slate-500 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                We are on a mission to accelerate the world's transition to cryptocurrency. We provide a platform that is not only powerful enough for professional traders but also intuitive enough for first-time users.
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                By focusing on security, liquidity, and customer support, we maintain the trust of millions of users worldwide who rely on MINEXCOINS to manage their digital assets.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                            <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold mb-4">Core Values</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                                        <p className="text-slate-300"><strong className="text-white">User First:</strong> Every decision we make starts with our users' needs and safety.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5"></div>
                                        <p className="text-slate-300"><strong className="text-white">Security:</strong> We employ state-of-the-art security measures to protect funds.</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5"></div>
                                        <p className="text-slate-300"><strong className="text-white">Innovation:</strong> We constantly push the boundaries of what's possible in DeFi.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
