"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { FileCheck, Wallet, Loader2, Sparkles, CheckCircle2, IndianRupee } from "lucide-react";

type MintState = 'RAW' | 'FORGING' | 'MINTED';

export default function Minting() {
    const [mintState, setMintState] = useState<MintState>('RAW');
    const [progress, setProgress] = useState(0);
    const [walletAmount, setWalletAmount] = useState(450);
    const [particles, setParticles] = useState<{ x: number, y: number, scale: number, delay: number }[]>([]);

    useEffect(() => {
        setParticles([...Array(6)].map(() => ({
            x: (Math.random() - 0.5) * 600,
            y: (Math.random() - 0.5) * 600,
            scale: Math.random() * 1.5,
            delay: Math.random() * 0.5
        })));
    }, []);

    const handleMintClick = () => {
        if (mintState === 'FORGING') return;

        setMintState('FORGING');
        setProgress(0);

        // Simulate Minting Progress
        const duration = 2500; // 2.5 seconds to mint
        const intervalTime = 50;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);

            if (currentStep >= steps) {
                clearInterval(interval);
                setMintState('MINTED');

                // Add wallet money slightly after minted state appears
                setTimeout(() => {
                    setWalletAmount(prev => prev + 5);
                }, 800);

                // Don't auto-reset - keep the minted state
            }
        }, intervalTime);
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-[#050505]">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Hexagon Grid Pattern - Subtle White */}
            <div className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.4' fill='%23ffffff' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Content Side (Left) */}
                <div className="order-2 lg:order-1">
                    <SectionContent
                        badge="MINTING"
                        title="Forge Digital Assets into Value"
                        description="Transform raw digital potential into verified, owned assets on the blockchain. Hit Mint to watch the forge create a pristine NFT and instantly inject value into your wallet."
                        benefits={[
                            "Mint exclusive premium NFTs",
                            "Full blockchain verification",
                            "Earn immediate wallet rewards per mint",
                        ]}
                        ctaText="Explore Marketplace"
                        ctaLink="/gkt"
                        align="left"
                    />
                </div>

                {/* Visual Side (Right) - The Forger */}
                <div className="order-1 lg:order-2 relative flex justify-center items-center perspective-1000">

                    {/* Main Interface Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                    >
                        {/* Top Bar - Wallet */}
                        <div className="flex justify-between items-center w-full mb-6">
                            <div className="flex items-center gap-2">
                                <FileCheck size={16} className="text-emerald-500" />
                                <span className="text-emerald-500/80 text-xs font-semibold tracking-wider">THE FORGE</span>
                            </div>

                            <motion.div
                                key={walletAmount}
                                initial={{ scale: 1.2, backgroundColor: "rgba(250, 204, 21, 0.4)" }}
                                animate={{ scale: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex items-center justify-center gap-2 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/20 shadow-lg min-w-[70px]"
                            >
                                <Wallet size={14} className="text-emerald-400 shrink-0" />
                                <span className="text-emerald-400 font-bold font-mono text-sm tracking-widest leading-none mt-0.5 w-[3ch] text-right">
                                    {walletAmount}
                                </span>
                            </motion.div>
                        </div>

                        {/* Central Chamber/Display */}
                        <div className="relative aspect-square w-full bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] mb-6">

                            {/* Scanning Floor Grid */}
                            <div className="absolute bottom-0 w-[200%] h-1/2 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px] transform perspective-[500px] rotateX-[60deg] opacity-40 translate-y-10" />

                            <AnimatePresence mode="wait">
                                {/* State 1: RAW ASSET */}
                                {(mintState === 'RAW' || mintState === 'FORGING') && (
                                    <motion.div
                                        key="raw"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{
                                            opacity: 1,
                                            scale: mintState === 'FORGING' ? [1, 1.1, 0.9, 1.2] : 1,
                                            y: mintState === 'FORGING' ? [0, -10, 0] : [-5, 5, -5],
                                            rotateY: mintState === 'FORGING' ? 360 : 0
                                        }}
                                        exit={{ opacity: 0, scale: 2, filter: "brightness(2) blur(10px)" }}
                                        transition={{
                                            duration: mintState === 'FORGING' ? 2 : 4,
                                            repeat: mintState === 'FORGING' ? 0 : Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="relative z-10 w-32 h-32"
                                    >
                                        {/* 3D-ish Raw Cube Component */}
                                        <div className="absolute inset-0 bg-gray-800 rounded-xl rotate-45 skew-x-12 shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-gray-600 overflow-hidden flex items-center justify-center">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-800 to-gray-700 opacity-80" />
                                            <span className="text-gray-500 font-mono text-xs font-bold -rotate-45 z-10 tracking-widest opacity-50">RAW_DATA</span>
                                        </div>
                                    </motion.div>
                                )}

                                {/* State 2: MINTED NFT */}
                                {mintState === 'MINTED' && (
                                    <motion.div
                                        key="minted"
                                        initial={{ opacity: 0, scale: 0.5, y: 50, rotateY: -90 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                                        className="relative z-10 w-48 h-64 bg-gradient-to-br from-emerald-500/20 to-teal-900/40 rounded-xl border-2 border-emerald-400 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col"
                                    >
                                        {/* Shiny overlay */}
                                        <motion.div
                                            animate={{ x: ["-100%", "200%"] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                                        />

                                        <div className="h-3/4 bg-black/60 m-2 rounded-lg flex items-center justify-center border border-emerald-500/30 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
                                            {/* GKT Logo */}
                                            <img
                                                src="/gkt-logo.png"
                                                alt="GKT Logo"
                                                className="w-64 h-64 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(16,185,129,1)]"
                                            />
                                        </div>
                                        <div className="px-4 py-2 flex justify-between items-center">
                                            <div className="text-emerald-100 font-mono text-xs font-bold font-mono">GKT_01</div>
                                            <div className="text-emerald-400 text-[10px] font-mono border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-900/30">#1/100</div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Active Forging Laser FX */}
                            {mintState === 'FORGING' && (
                                <>
                                    <motion.div
                                        initial={{ top: "-10%", opacity: 0 }}
                                        animate={{ top: "110%", opacity: [0, 1, 1, 0] }}
                                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_5px_rgba(16,185,129,0.6)] z-30"
                                    />
                                    {/* Particles flying in */}
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={`p-${i}`}
                                            initial={{
                                                x: (Math.random() - 0.5) * 300,
                                                y: (Math.random() - 0.5) * 300,
                                                opacity: 0,
                                                scale: 0
                                            }}
                                            animate={{
                                                x: 0,
                                                y: 0,
                                                opacity: [0, 1, 0],
                                                scale: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                repeat: Infinity,
                                                delay: Math.random() * 0.5
                                            }}
                                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full blur-[1px] z-20"
                                        />
                                    ))}
                                </>
                            )}

                            {/* Coin Floating Up Animation (Triggers right after Minting) */}
                            <AnimatePresence>
                                {mintState === 'MINTED' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                                        animate={{ opacity: [0, 1, 1, 0], y: -250, scale: [0.5, 1.2, 1, 0.8], rotate: 360 }}
                                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                        className="absolute z-50 w-12 h-12 rounded-full bg-yellow-400 border-2 border-yellow-200 flex items-center justify-center text-black shadow-[0_0_30px_rgba(250,204,21,1)]"
                                    >
                                        <IndianRupee size={24} strokeWidth={3} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Interactive UI Actions */}
                        <div className="space-y-4">
                            {/* Progress Bar (Visible during forging) */}
                            <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5 relative">
                                <motion.div
                                    className={`absolute top-0 bottom-0 left-0 ${mintState === 'MINTED' ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>

                            {/* The Button */}
                            <button
                                onClick={handleMintClick}
                                disabled={mintState === 'FORGING'}
                                className={`w-full py-4 rounded-xl font-bold font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${mintState === 'RAW'
                                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-pointer active:scale-[0.98]'
                                    : mintState === 'FORGING'
                                        ? 'bg-gray-800 text-emerald-500 cursor-not-allowed border border-emerald-900'
                                        : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] cursor-pointer active:scale-[0.98]'
                                    }`}
                            >
                                {mintState === 'RAW' && (
                                    <>
                                        <Sparkles size={18} />
                                        MINT ASSET
                                    </>
                                )}
                                {mintState === 'FORGING' && (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        FORGING...
                                    </>
                                )}
                                {mintState === 'MINTED' && (
                                    <>
                                        <Sparkles size={18} />
                                        MINT AGAIN
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Ambient particles – lightweight, once-only */}

                </div>

            </div>
        </section>
    );
}
