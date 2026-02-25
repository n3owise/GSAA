"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
];

const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
];

const featureLinks = [
    { name: "Watch to Earn", href: "#watch" },
    { name: "Listen to Earn", href: "#listen" },
    { name: "Play to Earn", href: "#play" },
    { name: "Minting", href: "#mint" },
    { name: "Shop to Earn", href: "#shop" },
];

export default function Footer() {
    return (
        <footer className="bg-bg-black pt-16 pb-10 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                {/* Column 1: Brand */}
                <div className="space-y-6">
                    <Link href="/" className="inline-block">
                        <span className="text-3xl font-bold font-heading tracking-tighter text-white">
                            GSAA<span className="text-primary-purple">GLOBAL</span>
                        </span>
                    </Link>
                    <p className="text-text-gray text-sm leading-relaxed max-w-[280px]">
                        GSAA Global - Where Entertainment Meets Rewards. Earn while you watch, listen, play, mint, and shop.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                    <ul className="space-y-3">
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-text-gray text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                                >
                                    <span className="relative">
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary-purple transition-all duration-300 group-hover:w-full" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Features */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Features</h4>
                    <ul className="space-y-3">
                        {featureLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-text-gray text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block group"
                                >
                                    <span className="relative">
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary-purple transition-all duration-300 group-hover:w-full" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 4: Social & Newsletter */}
                <div className="space-y-8">
                    <div>
                        <h4 className="text-white font-semibold mb-6">Stay Connected</h4>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-gradient-to-br hover:from-primary-purple hover:to-primary-blue hover:text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(107,70,193,0.4)] transition-all duration-300 group"
                                >
                                    <social.icon size={18} className="group-hover:rotate-6 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <form className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary-purple/50 focus:shadow-[0_0_15px_rgba(107,70,193,0.3)] transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 px-4 bg-gradient-to-r from-watch-start to-watch-end rounded-md text-white hover:brightness-110 transition-all"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-[1400px] mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                <p>© 2024 GSAA Global Pvt Ltd. All rights reserved.</p>
                <p className="flex items-center gap-1">
                    Made with <span className="text-red-500">❤️</span> for the Future
                </p>
            </div>
        </footer>
    );
}
