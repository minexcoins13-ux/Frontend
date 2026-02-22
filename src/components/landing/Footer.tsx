import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
            <div className="container mx-auto px-6">
                {/* Top Section: CTA */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Start building your crypto portfolio</h2>
                        <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join millions of users worldwide and trade the top cryptocurrencies with the lowest fees.</p>
                        <Link href="/auth/register" className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition">
                            Get Started Now
                        </Link>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16 border-b border-slate-900 pb-12">
                    <div className="col-span-2 lg:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-white block mb-6">
                            MINEXCOINS
                        </Link>
                        <div className="flex flex-col space-y-4">
                            <p className="text-slate-500 text-sm">
                                The most trusted crypto platform for everyone.
                            </p>
                            <div className="flex space-x-4">
                                <Link href="#" className="text-slate-400 hover:text-white transition"><Twitter className="w-5 h-5" /></Link>
                                <Link href="#" className="text-slate-400 hover:text-white transition"><Instagram className="w-5 h-5" /></Link>
                                <Link href="#" className="text-slate-400 hover:text-white transition"><Linkedin className="w-5 h-5" /></Link>
                                <Link href="#" className="text-slate-400 hover:text-white transition"><Facebook className="w-5 h-5" /></Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Market</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition">Browse Crypto</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Buy Bitcoin</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Buy Ethereum</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Market Data</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Learn</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition">Blog</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Academy</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Glossary</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-blue-400 transition">About Us</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-bold text-white mb-6">Have any questions?</h4>
                        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                            <p className="text-slate-400 text-sm mb-4">Our support team is here to help you 24/7.</p>
                            <Link href="/contact" className="text-blue-500 font-semibold hover:text-blue-400 text-sm flex items-center">
                                Contact Support →
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center text-slate-600 text-sm">
                    © {new Date().getFullYear()} MINEXCOINS. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
