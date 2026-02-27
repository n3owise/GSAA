"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionContent from "@/components/ui/SectionContent";
import { Gamepad2, Wallet, IndianRupee } from "lucide-react";

interface ClickCoin {
    id: number;
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
}

interface ActionButton {
    name: string;
    color: string;
    bgGradient: string;
    shadowColor: string;
    borderColor: string;
    colorFrom: string;
    colorTo: string;
    size: string; // e.g., "28px", "32px", "40px"
    borderWidth: string; // e.g., "2px"
    position: {
        up?: string;      // Move up: "2rem", "48px", "3rem"
        down?: string;    // Move down: "2rem", "48px", "3rem"
        left?: string;    // Move left: "2rem", "48px", "3rem"
        right?: string;   // Move right: "2rem", "48px", "3rem"
    };
}

const ACTION_BUTTONS: ActionButton[] = [
    {
        name: "blue",
        color: "Blue (Y)",
        bgGradient: "from-blue-400 to-blue-600",
        shadowColor: "rgba(59,130,246,1)",
        borderColor: "border-blue-300",
        colorFrom: "rgb(96, 165, 250)",
        colorTo: "rgb(37, 99, 235)",
        size: "20px",
        borderWidth: "2px",
        position: {
            up: "3rem",
            down: "1rem",
            left: "1rem",
            right: "0rem",
        },
    },
    {
        name: "green",
        color: "Green (A)",
        bgGradient: "from-green-400 to-green-600",
        shadowColor: "rgba(34,197,94,1)",
        borderColor: "border-green-300",
        colorFrom: "rgb(74, 222, 128)",
        colorTo: "rgb(22, 163, 74)",
        size: "20px",
        borderWidth: "2px",
        position: {
            up: "3rem",
            down: "3rem",
            left: "1rem",
            right: "0rem",
        },
    },
    {
        name: "purple",
        color: "Purple (X)",
        bgGradient: "from-purple-400 to-purple-600",
        shadowColor: "rgba(168,85,247,1)",
        borderColor: "border-purple-300",
        colorFrom: "rgb(192, 132, 250)",
        colorTo: "rgb(126, 34, 206)",
        size: "20px",
        borderWidth: "2px",
        position: {
            up: "1rem",
            down: "0rem",
            left: "3rem",
            right: "1rem",
        },
    },
    {
        name: "red",
        color: "Red (B)",
        bgGradient: "from-red-400 to-red-600",
        shadowColor: "rgba(239,68,68,1)",
        borderColor: "border-red-300",
        colorFrom: "rgb(248, 113, 113)",
        colorTo: "rgb(220, 38, 38)",
        size: "20px",
        borderWidth: "2px",
        position: {
            up: "1rem",
            down: "0rem",
            left: "3rem",
            right: "3rem",
        },
    },
];

export default function PlayToEarn() {
    const [walletAmount, setWalletAmount] = useState(150);
    const [clickCoins, setClickCoins] = useState<ClickCoin[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const walletRef = useRef<HTMLDivElement>(null);

    // Passive Earning: 1 Rupee every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setWalletAmount((prev) => prev + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Tapping Mechanic
    const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        // Defaults if wallet ref isn't bounding
        let targetX = 300;
        let targetY = -80;

        if (walletRef.current) {
            const walletRect = walletRef.current.getBoundingClientRect();
            // Calculate relative offset from click container to the wallet center
            targetX = walletRect.left - rect.left + (walletRect.width / 2);
            targetY = walletRect.top - rect.top + (walletRect.height / 2);
        }

        const newClickId = clickCount + 1;
        setClickCount(newClickId);

        // Spawn a coin exactly where clicked
        setClickCoins(prev => [...prev, { id: newClickId, startX, startY, targetX, targetY }]);

        // Remove the coin DOM element after its animation completes (0.8s)
        setTimeout(() => {
            setClickCoins(prev => prev.filter(c => c.id !== newClickId));
            // Add money right as the coin hits the wallet
            setWalletAmount((prev) => prev + 1);
        }, 800);
    };

    return (
        <section className="relative min-h-screen py-24 flex items-center overflow-hidden bg-[#0a0a0f]">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Content Side (Right) */}
                <div className="order-2 lg:order-2">
                    <SectionContent
                        badge="PLAY TO EARN"
                        title="Level Up Your Earnings"
                        description="Turn your gaming sessions into earning opportunities. Tap the controller or let it run passively to watch your rewards grow."
                        benefits={[
                            "Passive income flows while you explore",
                            "Tap to earn bonuses actively",
                            "Unlock massive rewards by playing",
                        ]}
                        ctaText="Start Playing"
                        ctaLink="/earnings#play-section"
                        align="left"
                    />
                </div>

                {/* Visual Side (Left) - Premium Controller UI */}
                <div className="relative order-1 lg:order-1 flex justify-center perspective-1000">
                    <motion.div
                        className="relative w-full max-w-sm glass-panel rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 flex flex-col gap-6 border border-white/10 bg-black/60 backdrop-blur-3xl"
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Top Bar - Wallet */}
                        <div className="flex justify-between items-center w-full relative z-30 pointer-events-none">
                            <div className="flex items-center gap-2">
                                <Gamepad2 size={16} className="text-white/50" />
                                <span className="text-white/50 text-xs font-semibold tracking-wider">TAP GAME</span>
                            </div>

                            <motion.div
                                ref={walletRef}
                                key={walletAmount}
                                initial={{ scale: 1.2, backgroundColor: "rgba(250, 204, 21, 0.4)" }}
                                animate={{ scale: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="flex items-center justify-center gap-2 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg min-w-[70px]"
                            >
                                <Wallet size={14} className="text-yellow-400 shrink-0" />
                                <span className="text-yellow-400 font-bold font-mono text-sm tracking-widest leading-none mt-0.5 w-[3ch] text-right">
                                    {walletAmount}
                                </span>
                            </motion.div>
                        </div>

                        {/* Tap to Play Instruction */}
                        <motion.div
                            className="text-center mb-2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <p className="text-white/60 text-sm font-semibold tracking-wide">
                                👆 <span className="text-cyan-400">TAP</span> · <span className="text-blue-400">PLAY</span> · <span className="text-emerald-400">EARN</span>
                            </p>
                            <p className="text-white/40 text-xs mt-1">Click the controller to earn rewards</p>
                        </motion.div>

                        {/* Interactive Premium Controller Display (The Game itself) */}
                        <motion.div
                            className="relative aspect-square w-full rounded-2xl mt-4 group cursor-pointer active:scale-[0.98] transition-transform duration-75"
                            onClick={handleTap}
                            whileHover={{ scale: 1.02 }}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black border border-white/5 rounded-2xl pointer-events-none overflow-hidden" />

                            {/* Controller Base */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                animate={{ y: [-3, 3, -3] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* SVG Controller - High Fidelity */}
                                <div className="relative w-72 h-44 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[3.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.08)] border border-white/10 flex items-center justify-center pointer-events-none z-10">

                                    {/* D-Pad */}
                                    <div className="absolute left-10 top-16 -translate-y-1/2 pointer-events-none z-10">
                                        {/* D-Pad Backing Ring */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-full border-2 border-gray-700 shadow-[inset_0_4px_8px_rgba(0,0,0,0.8),0_8px_16px_rgba(0,0,0,0.6)]" />
                                        {/* Cross Button - Vertical */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-10 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-md border border-gray-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.8)]" />
                                        {/* Cross Button - Horizontal */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3 bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] rounded-md border border-gray-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.8)]" />
                                        {/* Center Nub */}
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full z-20" />
                                    </div>

                                    {/* Right Action Buttons - ABXY */}
                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                                        {ACTION_BUTTONS.map((btn) => {
                                            return (
                                                <div
                                                    key={btn.name}
                                                    style={{
                                                        position: "absolute",
                                                        width: btn.size,
                                                        height: btn.size,
                                                        borderRadius: "50%",
                                                        left: `calc(50% + (${btn.position.right && btn.position.right !== "0rem" ? btn.position.right : "0rem"}) - (${btn.position.left && btn.position.left !== "0rem" ? btn.position.left : "0rem"}))`,
                                                        top: `calc(50% + (${btn.position.down && btn.position.down !== "0rem" ? btn.position.down : "0rem"}) - (${btn.position.up && btn.position.up !== "0rem" ? btn.position.up : "0rem"}))`,
                                                        transform: "translate(-50%, -50%)",
                                                        background: `linear-gradient(to bottom right, ${btn.colorFrom}, ${btn.colorTo})`,
                                                        boxShadow: `0 0 35px ${btn.shadowColor}, inset -2px -2px 6px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,255,255,0.4)`,
                                                        border: `${btn.borderWidth} solid rgba(255,255,255,0.5)`,
                                                        pointerEvents: "none",
                                                    }}
                                                    title={btn.color}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Center Touchpad / Glowing Core */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-black/80 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.9)] pointer-events-none z-10">
                                        <motion.div
                                            className="w-full h-full bg-gradient-to-r from-cyan-500/20 via-blue-500/0 to-cyan-500/20 pointer-events-none"
                                            animate={{ opacity: [0.3, 0.8, 0.3], x: ["-100%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                        <span className="absolute text-[11px] font-extrabold tracking-wide pointer-events-none whitespace-nowrap bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}>
                                            GSAA GAMES
                                        </span>
                                    </div>

                                    {/* Thumbsticks (Animated as if playing) */}
                                    <motion.div
                                        className="absolute bottom-8 left-1/4 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-[inset_0_3px_6px_rgba(255,255,255,0.15),0_12px_15px_rgba(0,0,0,0.6)] border border-gray-700 z-10 pointer-events-none"
                                        animate={{ x: [0, 5, -8, 2, 0], y: [0, -6, 4, -2, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "anticipate" }}
                                    >
                                        <div className="absolute inset-2 rounded-full border border-gray-900 pointer-events-none" />
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-8 right-1/4 translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-[inset_0_3px_6px_rgba(255,255,255,0.15),0_12px_15px_rgba(0,0,0,0.6)] border border-gray-700 z-10 pointer-events-none"
                                        animate={{ x: [0, -5, 8, -2, 0], y: [0, 6, -4, 2, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "anticipate" }}
                                    >
                                        <div className="absolute inset-2 rounded-full border border-gray-900 pointer-events-none" />
                                    </motion.div>

                                    {/* Hand grips */}
                                    <div className="absolute -bottom-8 left-3 w-16 h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-[2.5rem] -z-10 rotate-[18deg] pointer-events-none" />
                                    <div className="absolute -bottom-8 right-3 w-16 h-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-[2.5rem] -z-10 -rotate-[18deg] pointer-events-none" />

                                </div>
                            </motion.div>

                            {/* Spawning Coins Animation Overlay (Coins spawned on tap) */}
                            <AnimatePresence>
                                {clickCoins.map(coin => (
                                    <motion.div
                                        key={coin.id}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.5,
                                            x: coin.startX - 20, /* center the 40px width */
                                            y: coin.startY - 20
                                        }}
                                        animate={{
                                            opacity: [0, 1, 1, 0],
                                            scale: [0.5, 1.2, 0.8, 0.5],
                                            x: [coin.startX - 20, coin.startX - 20 + (Math.random() - 0.5) * 50, coin.targetX - 20],
                                            y: [coin.startY - 20, coin.startY - 60, coin.targetY - 20]
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="absolute w-10 h-10 rounded-full bg-yellow-400 border border-yellow-200 flex flex-col items-center justify-center text-black shadow-[0_0_30px_rgba(250,204,21,0.8)] z-50 pointer-events-none"
                                        style={{ left: 0, top: 0 }}
                                    >
                                        <IndianRupee size={20} strokeWidth={3} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
}
