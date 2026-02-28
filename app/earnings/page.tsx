"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Play, Gamepad2, ShoppingBag, Plane,
    ArrowRight, Eye, Music, Coins, Star
} from "lucide-react";

/* ─────────────────── SHARED STYLES ─────────────────── */
// Theme: Emerald-green fintech / terminal dashboard
// Palette: bg-[#020f0a] dark, #00ff87 neon-green accent, #00c468 mid green, #0a2a1a panels

/* ─────────────────── COUNTER HOOK ─────────────────── */
function useCounter(end: number, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started) {
                setStarted(true);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [started, end, duration]);

    return { count, ref };
}

/* ─────────────────── HERO ─────────────────── */
function EarningsHero() {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
            style={{ background: "linear-gradient(160deg, #010c06 0%, #021a0d 50%, #010c06 100%)" }}
        >
            {/* Diagonal scan lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, #00ff87, #00ff87 1px, transparent 1px, transparent 40px)",
                }}
            />

            {/* Digital Wealth Cascade Animation */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 3.8, ease: "easeInOut" }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#010a04] pointer-events-none overflow-hidden"
            >
                {/* Falling Digital Rupees Background */}
                <div className="absolute inset-0 opacity-40">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -100, opacity: 0, scale: Math.random() * 0.8 + 0.4 }}
                            animate={{ y: "120vh", opacity: [0, 1, 0], rotateX: 360, rotateY: 180 }}
                            transition={{
                                duration: Math.random() * 2.5 + 2,
                                delay: Math.random() * 1.5,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            className="absolute text-[#00ff87] font-bold font-mono text-3xl md:text-5xl drop-shadow-[0_0_15px_#00ff87]"
                            style={{ left: `${Math.random() * 100}%` }}
                        >
                            ₹
                        </motion.div>
                    ))}
                </div>

                {/* Central Earnings Box */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center bg-[#021a0d]/80 backdrop-blur-md p-10 rounded-2xl border border-[#00ff87]/30 shadow-[0_0_50px_rgba(0,255,135,0.1)]"
                >
                    {/* Status Text Sequence */}
                    <div className="text-[#00ff87] font-mono text-xs md:text-sm tracking-widest mb-6 h-4 overflow-hidden uppercase font-semibold">
                        <motion.div initial={{ y: 0 }} animate={{ y: -64 }} transition={{ duration: 2.5, delay: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}>
                            <div className="h-4 flex items-center justify-center">SECURING CONNECTION...</div>
                            <div className="h-4 flex items-center justify-center">AUTHENTICATING WALLET...</div>
                            <div className="h-4 flex items-center justify-center">SYNCING SMART CONTRACTS...</div>
                            <div className="h-4 flex items-center justify-center">RECEIVING FUNDS...</div>
                            <div className="h-4 flex items-center justify-center text-white drop-shadow-[0_0_8px_#fff]">DEPOSIT CONFIRMED</div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="text-gray-400 font-mono text-sm tracking-widest mb-2 uppercase"
                    >
                        Total Value Locked
                    </motion.div>

                    {/* The Ticker */}
                    <div className="flex items-center text-6xl md:text-8xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00ff87] drop-shadow-[0_0_30px_rgba(0,255,135,0.4)] relative">
                        <span className="text-[#00ff87] mr-2">₹</span>
                        <motion.div
                            initial={{ opacity: 1 }}
                            className="tabular-nums relative"
                        >
                            {/* Fast scrolling numbers */}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.05, repeat: 50 }}
                            >
                                0.00
                            </motion.span>
                            {/* Final Amount */}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5 }}
                                className="absolute inset-0 bg-[#021a0d]"
                            >
                                2,50,000.00
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Laser Scan Confirm */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, opacity: [1, 0] }}
                        transition={{ duration: 0.6, delay: 3.2, ease: "easeOut" }}
                        className="absolute bottom-0 left-0 w-full h-1 bg-[#00ff87] shadow-[0_0_30px_2px_#00ff87] rounded-b-2xl"
                    />
                </motion.div>

                {/* Screen Flash Reveal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6, delay: 3.7 }}
                    className="absolute inset-0 bg-[#00ff87] mix-blend-overlay z-50 pointer-events-none"
                />
            </motion.div>

            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,255,135,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.4) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Top-right glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,196,104,0.12) 0%, transparent 70%)" }}
            />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 mb-8 w-fit"
                >
                    <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
                    <span className="text-[#00ff87] text-xs font-mono tracking-[0.3em] uppercase">Live Earnings Platform</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-8xl font-bold font-heading leading-[0.95] tracking-tighter mb-6"
                    style={{ color: "#ffffff" }}
                >
                    TURN YOUR
                    <br />
                    <span style={{
                        background: "linear-gradient(90deg, #00ff87, #00c468, #00ff87)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        backgroundSize: "200% 100%",
                    }}>
                        LIFESTYLE
                    </span>
                    <br />
                    INTO INCOME.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-400 text-lg md:text-xl mb-14 max-w-xl leading-relaxed border-l-2 border-[#00ff87]/40 pl-5"
                >
                    Five earning streams. One platform. Every moment you spend — watching, listening, playing, shopping, or travelling — converts into real rewards.
                </motion.p>



                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4 mt-10"
                >
                    <button
                        onClick={() => document.getElementById("earn-methods")?.scrollIntoView({ behavior: "smooth" })}
                        className="px-8 py-4 font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-all hover:gap-5"
                        style={{ background: "#00ff87", color: "#010c06", borderRadius: "2px" }}
                    >
                        Explore Earnings <ArrowRight size={18} />
                    </button>

                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-px h-12 bg-gradient-to-b from-[#00ff87]/60 to-transparent" />
                <span className="text-[#00ff87]/40 text-xs font-mono tracking-widest uppercase">scroll</span>
            </motion.div>
        </section>
    );
}

/* ─────────────────── EARN METHODS GRID ─────────────────── */
const earnMethods = [
    {
        icon: Eye,
        label: "Watch to Earn",
        shortDesc: "Cinema Focus",
        color: "#6366f1",
        id: "watch-section",
        rate: "₹10–50 / hr",
        detail: "Watch videos, shows, and originals — earn coins every minute.",
    },
    {
        icon: Music,
        label: "Listen to Earn",
        shortDesc: "Sonic Ripple",
        color: "#ec4899",
        id: "listen-section",
        rate: "₹5–25 / hr",
        detail: "Stream music and podcasts while your wallet grows.",
    },
    {
        icon: Gamepad2,
        label: "Play to Earn",
        shortDesc: "Arcade Glitch",
        color: "#22c55e",
        id: "play-section",
        rate: "₹15–100 / hr",
        detail: "Play games, tap, and compete for massive rewards.",
    },
    {
        icon: ShoppingBag,
        label: "Shop to Earn",
        shortDesc: "Receipt Stack",
        color: "#f59e0b",
        id: "shop-section",
        rate: "3–12% cashback",
        detail: "Every purchase earns you instant cashback coins.",
    },
    {
        icon: Plane,
        label: "Travel to Earn",
        shortDesc: "Path Tracing",
        color: "#06b6d4",
        id: "travel-section",
        rate: "₹1 / km",
        detail: "Book flights, hotels, and buses — earn miles every trip.",
    },
];

function EarnMethodsGrid() {
    return (
        <section id="earn-methods" className="py-28 px-6 relative overflow-hidden" style={{ background: "#010c06" }}>
            {/* Top border accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00ff87, transparent)" }} />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <p className="text-[#00ff87] text-xs font-mono tracking-[0.3em] uppercase mb-3">Portfolio Overview</p>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-white leading-tight">
                            Five Earning<br />Streams
                        </h2>
                    </div>
                    <p className="text-gray-500 max-w-xs text-sm leading-relaxed">
                        Each stream is designed to reward a different part of your daily digital lifestyle.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: "rgba(0,255,135,0.08)" }}>
                    {earnMethods.map((method, i) => (
                        <motion.div
                            key={method.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            onClick={() => document.getElementById(method.id)?.scrollIntoView({ behavior: "smooth" })}
                            className="group flex flex-col gap-6 p-6 cursor-pointer transition-all duration-300 relative overflow-hidden"
                            style={{ background: "#010c06" }}
                        >
                            {/* Top hover line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: method.color }}
                            />

                            {/* Icon */}
                            <div className="w-12 h-12 flex items-center justify-center rounded-sm transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${method.color}18`, border: `1px solid ${method.color}30` }}
                            >
                                <method.icon size={22} style={{ color: method.color }} />
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#00ff87] transition-colors">{method.label}</h3>
                                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{method.detail}</p>
                            </div>



                            {/* Arrow */}
                            <ArrowRight size={14} className="text-gray-700 group-hover:text-[#00ff87] group-hover:translate-x-1 transition-all" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── EARN SECTION ROW ─────────────────── */

interface EarnSectionProps {
    id: string;
    badge: string;
    badgeColor: string;
    title: string;
    description: string;
    benefits: { label: string; value: string }[];
    visual: React.ReactNode;
    flip?: boolean;
    bg?: string;
}

function EarnSection({ id, badge, badgeColor, title, description, benefits, visual, flip, bg }: EarnSectionProps) {
    return (
        <section id={id} className="relative py-24 overflow-hidden" style={{ background: bg || "#011008" }}>
            <div className="absolute top-0 left-0 right-0 h-px opacity-30"
                style={{ background: `linear-gradient(90deg, transparent, ${badgeColor}, transparent)` }}
            />

            <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Visual */}
                <div className={`${flip ? "order-1 lg:order-2" : "order-1"} flex justify-center`}>
                    {visual}
                </div>

                {/* Content */}
                <div className={`${flip ? "order-2 lg:order-1" : "order-2"} max-w-lg`}>
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-sm"
                        style={{ background: `${badgeColor}12`, color: badgeColor, border: `1px solid ${badgeColor}30` }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: badgeColor }} />
                        {badge}
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight mb-5">{title}</h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">{description}</p>

                    {/* Benefits as data rows */}
                    <div className="space-y-3 mb-10">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between py-3 border-b border-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: badgeColor }} />
                                    <span className="text-gray-300 text-sm">{b.label}</span>
                                </div>
                                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm"
                                    style={{ background: `${badgeColor}15`, color: badgeColor }}
                                >{b.value}</span>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    );
}

/* ─────────────────── SECTION VISUALS ─────────────────── */

function WatchVisual() {
    const [bars] = useState(() => Array.from({ length: 12 }, (_, i) => ({
        h: Math.random() * 60 + 20,
        delay: i * 0.15,
    })));
    return (
        <div className="w-full max-w-md">
            <div className="rounded-sm overflow-hidden border border-[#6366f1]/20 shadow-[0_0_40px_rgba(99,102,241,0.1)]"
                style={{ background: "#06030f" }}
            >
                {/* Fake video player top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-gray-500 text-[10px] font-mono">GSAA PLAYER v2.1</span>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
                        <span className="text-[#6366f1] text-[10px] font-mono">LIVE</span>
                    </div>
                </div>

                {/* Screen area */}
                <div className="aspect-video flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #0f0a2a 0%, #1a1040 100%)" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
                        {bars.map((b, i) => (
                            <motion.div
                                key={i}
                                className="w-2 rounded-full"
                                style={{ background: "#6366f1" }}
                                animate={{ height: [b.h * 0.4, b.h, b.h * 0.4] }}
                                transition={{ duration: 0.8 + Math.random(), repeat: Infinity, delay: b.delay }}
                            />
                        ))}
                    </div>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                        style={{ background: "rgba(99,102,241,0.9)", boxShadow: "0 0 40px rgba(99,102,241,0.6)" }}
                    >
                        <Play size={28} fill="white" className="text-white ml-1" />
                    </div>
                </div>

                {/* Wallet earn row */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                    <span className="text-gray-500 text-xs font-mono">Watching: 4m 32s</span>
                    <div className="flex items-center gap-2 text-[#6366f1] text-xs font-mono font-bold">
                        <Coins size={12} />
                        <span>+₹3.20 earned</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ListenVisual() {
    return (
        <div className="w-full max-w-sm">
            <div className="rounded-sm border border-[#ec4899]/20 p-6 shadow-[0_0_40px_rgba(236,72,153,0.08)]"
                style={{ background: "#0d0510" }}
            >
                {/* Album art placeholder */}
                <div className="w-full aspect-square rounded-sm mb-5 flex items-center justify-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #1a0a14 0%, #2d1a2a 100%)", border: "1px solid rgba(236,72,153,0.15)" }}
                >
                    {/* Vinyl grooves */}
                    {[0, 1, 2, 3].map(r => (
                        <div key={r} className="absolute rounded-full border border-[#ec4899]/10"
                            style={{ inset: `${r * 18}px` }}
                        />
                    ))}
                    <div className="w-24 h-24 rounded-full flex items-center justify-center relative z-10"
                        style={{ background: "linear-gradient(135deg, #ec4899, #be185d)", boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}
                    >
                        <Music size={36} className="text-white" />
                    </div>
                </div>

                <p className="text-[#ec4899] text-[10px] font-mono tracking-widest uppercase mb-1">Now Playing</p>
                <h3 className="text-white font-bold text-lg mb-1">Aaj Phir De Zara Sharab</h3>
                <p className="text-gray-500 text-sm mb-5">GSAA Music</p>

                {/* Progress bar */}
                <div className="h-1 bg-white/10 rounded-full mb-1.5 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: "#ec4899" }}
                        initial={{ width: "0%" }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                </div>
                <div className="flex justify-between text-gray-600 text-[10px] font-mono mb-5">
                    <span>2:14</span><span>3:45</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">Earning this session</span>
                    <span className="text-[#ec4899] font-mono font-bold text-sm">₹8.40</span>
                </div>
            </div>
        </div>
    );
}

function PlayVisual() {
    const [score, setScore] = useState(12480);
    useEffect(() => {
        const t = setInterval(() => setScore(s => s + Math.floor(Math.random() * 50 + 10)), 600);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="w-full max-w-sm">
            <div className="rounded-sm border border-[#22c55e]/20 p-5 shadow-[0_0_40px_rgba(34,197,94,0.08)]"
                style={{ background: "#03100a" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Gamepad2 size={16} className="text-[#22c55e]" />
                        <span className="text-[#22c55e] font-mono text-xs tracking-widest uppercase">GSAA ARCADE</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded-sm">LVL 24</span>
                </div>

                {/* Score */}
                <div className="text-center py-8 border border-[#22c55e]/10 rounded-sm mb-5 relative overflow-hidden"
                    style={{ background: "#010c06" }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                    <p className="text-[#22c55e] text-xs font-mono mb-2 tracking-widest">HIGH SCORE</p>
                    <p className="text-[#22c55e] text-4xl font-bold font-mono">{score.toString().padStart(8, "0")}</p>
                </div>

                {/* XP bar */}
                <p className="text-gray-500 text-[10px] font-mono uppercase mb-2">XP to next level</p>
                <div className="h-2 bg-white/5 rounded-sm overflow-hidden mb-4">
                    <motion.div
                        className="h-full"
                        style={{ background: "linear-gradient(90deg, #22c55e, #4ade80)" }}
                        animate={{ width: ["60%", "75%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500">Session earnings</span>
                    <span className="text-[#22c55e] font-bold">+₹42.80</span>
                </div>
            </div>
        </div>
    );
}

function ShopVisual() {
    const items = [
        { name: "Nike Air Max", category: "Footwear", badge: "Cashback" },
        { name: "Campus Hoodie", category: "Apparel", badge: "Cashback" },
        { name: "OnePlus Buds", category: "Electronics", badge: "Cashback" },
    ];
    return (
        <div className="w-full max-w-sm space-y-3">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-4 px-4 py-4 rounded-sm border border-white/5 hover:border-[#f59e0b]/20 transition-all group"
                    style={{ background: "#0c0800" }}
                >
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center"
                        style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
                    >
                        <ShoppingBag size={18} className="text-[#f59e0b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-gray-500 text-xs font-mono">{item.category}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[#f59e0b] text-xs font-mono font-bold px-2 py-0.5 rounded-sm"
                            style={{ background: "rgba(245,158,11,0.1)" }}
                        >✓ {item.badge}</p>
                    </div>
                </motion.div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 mt-2">
                <span className="text-gray-400 text-sm">Cashback on every order</span>
                <span className="text-[#f59e0b] font-bold text-sm">Active</span>
            </div>
        </div>
    );
}

function TravelVisual() {
    return (
        <div className="w-full max-w-md">
            <div className="rounded-sm border border-[#06b6d4]/20 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.08)]"
                style={{ background: "#010d10" }}
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Plane size={14} className="text-[#06b6d4]" />
                        <span className="text-[#06b6d4] text-xs font-mono tracking-widest uppercase">GSAA TRAVEL</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">Feb 27, 2026</span>
                </div>

                {/* Route */}
                <div className="px-5 py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div>
                            <p className="text-3xl font-bold text-white font-heading">BOM</p>
                            <p className="text-gray-500 text-xs">Mumbai</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="relative w-full">
                                <div className="h-px w-full" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.5), rgba(6,182,212,0.2))" }} />
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2"
                                    animate={{ left: ["5%", "90%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                >
                                    <Plane size={16} className="text-[#06b6d4] -mt-2" />
                                </motion.div>
                            </div>
                            <p className="text-gray-600 text-[10px] font-mono mt-2">2h 05m · 1,438 km</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-white font-heading">DEL</p>
                            <p className="text-gray-500 text-xs">New Delhi</p>
                        </div>
                    </div>

                    {/* Miles earned */}
                    <div className="rounded-sm px-4 py-3 flex items-center justify-between"
                        style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
                    >
                        <div className="flex items-center gap-2">
                            <Star size={14} className="text-[#06b6d4]" />
                            <span className="text-gray-400 text-sm">Miles Earned</span>
                        </div>
                        <span className="text-[#06b6d4] font-bold font-mono text-lg">+1,438 pts</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ─────────────────── FINAL CTA ─────────────────── */
function EarningsCTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden" style={{ background: "#020f0a" }}>
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(0,255,135,0.06) 0%, transparent 65%)"
                }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #00ff87, transparent)" }} />

            <div className="max-w-3xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-[#00ff87] text-xs font-mono tracking-[0.3em] uppercase mb-5 flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
                        Platform Ready
                    </p>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading text-white leading-tight mb-6 tracking-tight">
                        Start Earning<br />
                        <span style={{
                            background: "linear-gradient(90deg, #00ff87, #00c468)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}>
                            Today.
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                        Join thousands of members already converting their daily digital life into real income. No complicated setup. No credit card required.
                    </p>

                    {/* Earn stream pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {earnMethods.map(m => (
                            <span key={m.label} className="flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-sm uppercase tracking-wider"
                                style={{ background: `${m.color}12`, color: m.color, border: `1px solid ${m.color}25` }}
                            >
                                <m.icon size={12} />
                                {m.label.split(" ")[0]}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            className="px-10 py-4 font-bold text-base tracking-widest uppercase flex items-center gap-3 transition-all hover:gap-5 rounded-sm"
                            style={{ background: "#00ff87", color: "#010c06" }}
                        >
                            Join GSAA Global <ArrowRight size={18} />
                        </button>

                    </div>

                    <p className="text-gray-600 text-xs mt-8 font-mono">No credit card required • Cancel anytime • Instant setup</p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────── MAIN PAGE ─────────────────── */
export default function EarningsPage() {
    return (
        <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#010c06" }}>
            <EarningsHero />

            <EarnMethodsGrid />

            <EarnSection
                id="watch-section"
                badge="Watch to Earn"
                badgeColor="#6366f1"
                title="Get Paid to Watch"
                description="Every minute you spend watching content on GSAA earns you coins. From music videos to full-length features — the more you watch, the more you earn."
                benefits={[
                    { label: "Coins per video watched", value: "✓ Active" },
                    { label: "Bonus for series completion", value: "Available" },
                    { label: "Daily watch streak bonus", value: "Included" },
                    { label: "Exclusive content unlock", value: "Included" },
                ]}
                visual={<WatchVisual />}
                bg="#0a0815"
                flip={false}
            />

            <EarnSection
                id="listen-section"
                badge="Listen to Earn"
                badgeColor="#ec4899"
                title="Stream Music, Earn Real Rewards"
                description="Your playlist shouldn't just be good for your soul — it should be good for your wallet too. Every track streamed on GSAA adds coins to your account."
                benefits={[
                    { label: "Earnings per hour streamed", value: "✓ Active" },
                    { label: "New artist discovery bonus", value: "Available" },
                    { label: "Playlist creation reward", value: "Available" },
                    { label: "Ad-free premium listening", value: "Included" },
                ]}
                visual={<ListenVisual />}
                bg="#0a0510"
                flip={true}
            />

            <EarnSection
                id="play-section"
                badge="Play to Earn"
                badgeColor="#22c55e"
                title="Level Up, Cash Out"
                description="GSAA's gaming ecosystem lets you earn while you compete. Tap, play, and complete in-game challenges to stack coins — the higher you climb, the more you earn."
                benefits={[
                    { label: "Passive earn (idle)", value: "✓ Active" },
                    { label: "Challenge completion reward", value: "Available" },
                    { label: "Tournament prizes", value: "Coming Soon" },
                    { label: "Referral gaming bonus", value: "Available" },
                ]}
                visual={<PlayVisual />}
                bg="#030f06"
                flip={false}
            />

            <EarnSection
                id="shop-section"
                badge="Shop to Earn"
                badgeColor="#f59e0b"
                title="Every Purchase Pays You Back"
                description="Stop leaving money on the table. Shop at 500+ partner brands through GSAA and get instant cashback in your rewards wallet every single time."
                benefits={[
                    { label: "Instant cashback on purchases", value: "✓ Active" },
                    { label: "Partner brands", value: "Growing" },
                    { label: "Max cashback per order", value: "Available" },
                    { label: "Stack with credit card rewards", value: "Supported" },
                ]}
                visual={<ShopVisual />}
                bg="#0c0800"
                flip={true}
            />

            <EarnSection
                id="travel-section"
                badge="Travel to Earn"
                badgeColor="#06b6d4"
                title="Every Journey, A Reward"
                description="Book flights, hotels, buses, and visa services through GSAA and earn miles with every kilometre. The world becomes your earning playground."
                benefits={[
                    { label: "Miles per km flown", value: "✓ Active" },
                    { label: "Hotel booking bonus", value: "Available" },
                    { label: "Lounge access rewards", value: "Coming Soon" },
                    { label: "Travel insurance benefit", value: "Included" },
                ]}
                visual={<TravelVisual />}
                bg="#010d10"
                flip={false}
            />


            <EarningsCTA />
        </main>
    );
}
