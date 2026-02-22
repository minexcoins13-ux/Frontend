'use client';
import { Smartphone, Shield, Zap, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Shield className="w-6 h-6 text-green-400" />,
        title: "Bank-Grade Security",
        description: "Your assets are protected with 256-bit encryption and cold storage solutions."
    },
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: "Lightning Fast",
        description: "Execute trades in milliseconds with our high-performance matching engine."
    },
    {
        icon: <RefreshCw className="w-6 h-6 text-blue-400" />,
        title: "Instant Recurring Buys",
        description: "Automate your investment strategy with scheduled recurring purchases."
    }
];

export default function Features() {
    return (
        <section className="py-24 relative bg-slate-950/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
                        >
                            You Deserve Easy Access to <span className="text-white">Cryptocurrencies</span>
                        </motion.h2>
                        <p className="text-slate-400 text-lg mb-10">
                            We make it simple to start your crypto journey. No complex jargon, just a smooth and secure experience.
                        </p>

                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                                        <p className="text-slate-400">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] -z-10"></div>
                        {/* Abstract Phone Mockup using CSS/Divs if no image, or a placeholder */}
                        <div className="relative mx-auto w-[300px] h-[600px] bg-black border-8 border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                            {/* Screen Content */}
                            <div className="w-full h-full bg-slate-900 p-4 pt-12">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                                    <div className="w-20 h-4 rounded-full bg-slate-700"></div>
                                </div>
                                <div className="w-full h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 p-4 text-white">
                                    <div className="text-sm opacity-80">Total Balance</div>
                                    <div className="text-2xl font-bold">$12,450.00</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-16 w-full bg-slate-800/50 rounded-xl"></div>
                                    <div className="h-16 w-full bg-slate-800/50 rounded-xl"></div>
                                    <div className="h-16 w-full bg-slate-800/50 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
