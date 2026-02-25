"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coins, Database, Zap, Globe, Lock, Cpu, Server, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-black pt-20">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "linear-gradient(rgba(130, 71, 229, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(130, 71, 229, 0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    perspective: "1000px",
                    transform: "rotateX(60deg) scale(2) translateY(-20%)",
                    transformOrigin: "top"
                }}
            />

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
                        <span className="block text-white glitch-text" data-text="UPCOMING">UPCOMING</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 animate-hologram">
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

                    {/* Holographic Rings */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[10%] border border-dashed border-purple-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[20%] border border-dotted border-cyan-500/20 rounded-full"
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
        <section className="py-24 bg-bg-dark relative overflow-hidden">
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
        <section className="py-32 bg-bg-black relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
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

function Tokenomics() {
    return (
        <section className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden">
            {/* Background Radial Gradient */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { label: "Total Supply", value: "1,000,000", suffix: "M" },
                        { label: "Network", value: "Polygon", suffix: " POS" },
                        { label: "Type", value: "ERC-20", suffix: "" },
                        { label: "Launch Date", value: "Q3 2026", suffix: "" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-purple-500/30 transition-colors"
                        >
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
                            <div className="text-2xl md:text-3xl font-bold text-white font-mono break-words">
                                {stat.value}<span className="text-purple-500 text-lg ml-1">{stat.suffix}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Chart / Distribution */}
                <div className="relative">
                    <SectionHeader title="PLANNED DISTRIBUTION" subtitle="Projected Allocation" />

                    {/* Animated Rings Background for Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 opacity-20 pointer-events-none">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full border border-dashed border-purple-500 rounded-full"
                        />
                    </div>

                    <p className="text-gray-400 mb-8 leading-relaxed">
                        Our distribution model is designed for long-term sustainability.
                        The majority of tokens will be reserved for community rewards and ecosystem development upon TGE.
                    </p>

                    <div className="space-y-6">
                        {[
                            { label: "Community Rewards", width: "40%", color: "bg-purple-500" },
                            { label: "Development Fund", width: "20%", color: "bg-cyan-500" },
                            { label: "Liquidity Pool", width: "10%", color: "bg-blue-500" },
                            { label: "Team & Advisors (Vested)", width: "15%", color: "bg-pink-500" },
                            { label: "Marketing", width: "15%", color: "bg-yellow-500" },
                        ].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white font-medium">{item.label}</span>
                                    <span className="text-gray-400">{item.width}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: item.width }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                        className={`h-full ${item.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
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
            <Tokenomics />

            {/* Simple Footer for now */}
            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Web3 Ecosystem. All rights reserved.</p>
            </footer>
        </main>
    );
}
