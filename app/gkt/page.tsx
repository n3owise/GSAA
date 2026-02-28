"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins, Database, Zap, Globe, Lock, Server, Activity } from "lucide-react";

/* ─────────────────── SHARED COMPONENTS ─────────────────── */

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <div className="text-center mb-16 relative z-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            >
                {title}
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide uppercase text-sm"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}

/* ─────────────────── HERO SECTION ─────────────────── */

function GKTHero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Crypto Mining Terminal Boot Animation */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 2.5 }}
                className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-none"
            >
                {/* CRT Screen Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 pointer-events-none opacity-50" />

                <div className="relative z-20 w-full max-w-3xl flex flex-col items-center font-mono text-cyan-400">
                    {/* Animated Mining Rig Graphic */}
                    <div className="relative w-32 h-32 mb-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-[4px] border-dashed border-cyan-500/50 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-[2px] border-purple-500/50 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-8 h-8 bg-purple-500 rounded-sm shadow-[0_0_20px_#a855f7] transform rotate-45"
                            />
                        </div>
                    </div>

                    {/* Terminal Text Sequences */}
                    <div className="text-left w-full max-w-md h-32 overflow-hidden flex flex-col justify-end text-sm md:text-base text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>&gt; INITIALIZING GSAA MINING PROTOCOL...</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>&gt; CONNECTING TO POLYGON MAINNET [OK]</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>&gt; SYNCING LEDGER... 100%</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>&gt; HASH RATE: 45.2 TH/s</motion.p>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 1] }} transition={{ delay: 1.8 }}
                            className="text-purple-400 font-bold mt-2 text-lg"
                        >&gt; BLOCK FOUND! EXTRACTING GKT...</motion.p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md h-2 bg-gray-900 mt-6 rounded overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_10px_#a855f7]"
                        />
                    </div>
                </div>
            </motion.div>
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 px-4 py-2 rounded-full"
                    >
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-purple-400 text-xs font-mono tracking-widest">SYSTEM INITIALIZING // Q3 2026</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 leading-tight">
                        <span className="block text-white" data-text="UPCOMING">UPCOMING</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500">
                            TOKEN LAUNCH
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed border-l-2 border-cyan-500 pl-6">
                        The GSAA Kombat Token (GKT) will power our entire ecosystem.
                        Built on the <strong>Polygon</strong> network for speed, security, and near-zero gas fees.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-sm clip-path-polygon transition-all hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                            JOIN WAITLIST
                        </button>
                        <button className="px-8 py-4 border border-purple-500/50 text-purple-400 font-bold rounded-sm hover:bg-purple-950/30 transition-all hover:border-purple-400">
                            READ WHITEPAPER
                        </button>
                    </div>
                </div>

                {/* 3D Coin Visualization */}
                <div className="relative h-[500px] flex items-center justify-center perspective-1000">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 animate-spin-slow-3d preserve-3d">
                        {/* Front Face */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center backface-hidden shadow-[0_0_50px_rgba(147,51,234,0.4)] border-4 border-white/20">
                            <Coins size={80} className="text-white drop-shadow-lg" />
                            <div className="absolute inset-2 border border-white/30 rounded-full" />
                        </div>
                        {/* Back Face */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center backface-hidden transform rotate-y-180 border-4 border-white/20">
                            <span className="text-4xl font-bold font-heading text-white">POLYGON</span>
                            <div className="absolute inset-2 border border-white/30 rounded-full" />
                        </div>
                        {/* Edge/Thickness (Simulated with layers or pseudo-elements - keeping simple for now) */}
                    </div>

                    {/* Holographic Rings — CSS only for perf */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute inset-[10%] border border-dashed border-purple-500/20 rounded-full"
                            style={{ willChange: "transform", animation: "spin 20s linear infinite" }}
                        />
                        <div
                            className="absolute inset-[20%] border border-dotted border-cyan-500/20 rounded-full"
                            style={{ willChange: "transform", animation: "spin 15s linear infinite reverse" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── ABOUT GKT (DECODING DATA) ─────────────────── */

function AboutGKT() {
    return (
        <section className="py-24 bg-[#0a050f] relative overflow-hidden">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <SectionHeader title="THE PROTOCOL" subtitle="Launching on Polygon Network" />

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Lock, title: "SECURE FOUNDATION", desc: "Leveraging Polygon's PoS security to ensure asset protection from day one." },
                    { icon: Zap, title: "SCALABLE SPEED", desc: "Engineered for high-frequency trading and gaming transactions with minimal latency." },
                    { icon: Globe, title: "FUTURE UTILITY", desc: "Will be integrated across the entire GSAA partner ecosystem upon launch." }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="group relative bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300 overflow-hidden"
                    >
                        {/* Scan Line Effect */}
                        <div className="absolute inset-x-0 h-[2px] bg-cyan-400/50 opacity-0 group-hover:opacity-100 animate-scan-line top-0 pointer-events-none" />

                        <item.icon size={40} className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-bold text-white mb-3 font-heading">{item.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────── MINTING PROCESS (FACTORY PIPELINE) ─────────────────── */

function MintingProcess() {
    return (
        <section className="py-32 bg-[#050510] relative overflow-hidden">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
            <SectionHeader title="FUTURE MINTING" subtitle="How It Will Work" />

            <div className="container mx-auto px-6 relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {[
                        { step: "01", title: "Connect Wallet", icon: Database },
                        { step: "02", title: "Whitelist Check", icon: Server },
                        { step: "03", title: "Approve Polygon", icon: Activity },
                        { step: "04", title: "Mint GKT", icon: Coins },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.3 }}
                            className="bg-bg-navy border border-gray-700 p-6 flex flex-col items-center text-center relative group hover:border-purple-500 transition-colors shadow-lg"
                        >
                            <div className="w-16 h-16 bg-bg-black rounded-full flex items-center justify-center border border-gray-600 mb-6 relative z-10 group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all">
                                <step.icon size={28} className="text-gray-300 group-hover:text-purple-400 transition-colors" />
                            </div>
                            <span className="text-xs font-mono text-purple-500 mb-2">STEP {step.step}</span>
                            <h4 className="text-lg font-bold text-white uppercase">{step.title}</h4>

                            {/* Animated Pulse on Line */}
                            {i < 3 && (
                                <motion.div
                                    className="hidden md:block absolute top-[3.5rem] -right-1/2 w-full h-[2px] bg-purple-500 z-0 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: i * 0.3 + 0.5, duration: 0.5 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── TOKENOMICS (DASHBOARD) ─────────────────── */

function ComingSoon() {
    const pillars = [
        { icon: Globe, label: "Ecosystem Utility", desc: "Powering the entire GSAA platform" },
        { icon: Zap, label: "Instant Transactions", desc: "Built for speed on Polygon" },
        { icon: Lock, label: "Secure by Design", desc: "Audited smart contract infrastructure" },
    ];
    return (
        <section className="py-32 bg-bg-dark border-t border-white/5 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 border border-purple-500/30 bg-purple-500/10 px-5 py-2 rounded-full mb-10"
                >
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span className="text-purple-300 text-xs font-mono tracking-widest uppercase">Tokenomics — Coming Soon</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
                >
                    Details Dropping Soon
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg leading-relaxed mb-16"
                >
                    The full GKT tokenomics — supply model, distribution plan, and utility roadmap — will be revealed closer to the token launch. Stay tuned.
                </motion.p>

                {/* Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="bg-white/4 border border-white/8 rounded-xl p-6 hover:border-purple-500/30 transition-colors text-left"
                        >
                            <p.icon size={28} className="text-purple-400 mb-4" />
                            <h4 className="text-white font-semibold mb-1">{p.label}</h4>
                            <p className="text-gray-500 text-sm">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


/* ─────────────────── MAIN PAGE COMPONENT ─────────────────── */

export default function GKTPage() {
    return (
        <main className="bg-bg-black min-h-screen text-white overflow-x-hidden selection:bg-cyan-500/30">
            <GKTHero />
            <AboutGKT />
            <MintingProcess />
            <ComingSoon />

            {/* Simple Footer for now */}
            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Web3 Ecosystem. All rights reserved.</p>
            </footer>
        </main>
    );
}
