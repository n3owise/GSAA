"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Play, Headphones, Gamepad2, ShoppingBag, Plane,
    Building2, Bus, FileCheck, Globe, Wallet,
    Trophy, Star, Shirt, Coffee, Book, Laptop,
    ArrowRight, ArrowDown, CheckCircle2, Sparkles,
    Eye, Music, Zap, MapPin, Gift, Coins
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── HERO SECTION ─────────────────── */

/* ─────────────────── HERO SECTION ─────────────────── */

function EarningsHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Magnetic particle mock-up (interactive field)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePos({
            x: (clientX / innerWidth - 0.5) * 20,
            y: (clientY / innerHeight - 0.5) * 20,
        });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-dark"
        >
            {/* Background Field */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111111_0%,#000000_100%)] z-0" />

            {/* Interactive Grid */}
            <motion.div
                className="absolute inset-0 opacity-[0.1]"
                animate={{ x: mousePos.x * -2, y: mousePos.y * -2 }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
                {/* Magnetic Badge */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
                >
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/90 flex items-center gap-2">
                        <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                        Five Ways to Earn
                        <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                    </span>
                </motion.div>

                {/* Staggered "Magnetic" Title */}
                <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold font-heading leading-tight tracking-tight flex flex-wrap justify-center gap-x-4">
                    {"EARNINGS & REWARDS".split(" ").map((word, i) => (
                        <div key={i} className="flex overflow-hidden">
                            {word.split("").map((char, j) => (
                                <motion.span
                                    key={j}
                                    initial={{ y: 100, rotate: 10 }}
                                    animate={{ y: 0, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 12,
                                        delay: 0.1 * i + 0.03 * j,
                                    }}
                                    className="inline-block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent transform hover:scale-110 hover:-translate-y-2 transition-transform duration-200 cursor-default"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    ))}
                </h1>

                {/* Pop-in Subtitle */}
                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                    className="mt-8 text-lg md:text-2xl text-text-gray tracking-wide max-w-2xl leading-relaxed"
                >
                    Transform moments into value. <span className="text-white font-medium">Gamified. Instant. Rewarding.</span>
                </motion.p>
            </div>

            {/* Elastic Scroll Indicator */}
            <motion.div
                ref={scrollRef}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => document.getElementById("overview-grid")?.scrollIntoView({ behavior: "smooth" })}
            >
                <div className="w-[28px] h-[44px] border-2 border-white/40 rounded-full flex justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 24, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}

/* ─────────────────── OVERVIEW GRID ─────────────────── */

const categories = [
    { icon: Eye, label: "Watch", desc: "Cinema Focus", delay: 0, sectionId: "watch-to-earn", color: "from-purple-500/20 to-blue-500/20" },
    { icon: Music, label: "Listen", desc: "Sonic Ripple", delay: 0.1, sectionId: "listen-to-earn", color: "from-pink-500/20 to-rose-500/20" },
    { icon: Gamepad2, label: "Play", desc: "Arcade Glitch", delay: 0.2, sectionId: "play-to-earn", color: "from-green-500/20 to-emerald-500/20" },
    { icon: ShoppingBag, label: "Shop", desc: "Receipt Stack", delay: 0.3, sectionId: "shop-to-earn", color: "from-orange-500/20 to-red-500/20" },
    { icon: Plane, label: "Travel", desc: "Path Tracing", delay: 0.4, sectionId: "travel-rewards", color: "from-blue-500/20 to-cyan-500/20" },
];

function OverviewGrid() {
    return (
        <section id="overview-grid" className="relative py-32 px-6 bg-bg-dark overflow-hidden">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <motion.h2
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-4xl md:text-6xl font-bold font-heading text-white mb-6"
                >
                    Choose Your Path
                </motion.h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 perspectives-1000">
                {categories.map((cat, i) => (
                    <motion.div
                        key={cat.label}
                        initial={{ opacity: 0, y: 100, rotateX: 45 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 12,
                            delay: i * 0.1
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: Math.random() * 4 - 2,
                            zIndex: 10
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const el = document.getElementById(cat.sectionId);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`relative glass-panel rounded-2xl p-6 flex flex-col items-center text-center gap-4 cursor-pointer overflow-hidden group border border-white/5`}
                    >
                        {/* Hover Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        <div className="relative z-10 w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <cat.icon size={28} className="text-white" />
                        </div>
                        <h3 className="relative z-10 text-white font-bold text-xl tracking-tight">{cat.label}</h3>
                        <p className="relative z-10 text-white/60 text-xs font-mono uppercase tracking-widest">{cat.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────── SECTION CONTENT (inline) ─────────────────── */

interface SectionTextProps {
    badge: string;
    title: string;
    description: string;
    benefits: string[];
    ctaText: string;
}

function SectionText({ badge, title, description, benefits, ctaText }: SectionTextProps) {
    return (
        <div className="max-w-xl">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
            >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/90">{badge}</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold font-heading text-text-white leading-[1.1] mb-6 tracking-tight"
            >
                {title}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-text-gray leading-relaxed mb-10 font-light"
            >
                {description}
            </motion.p>

            <ul className="space-y-5 mb-12">
                {benefits.map((benefit, i) => (
                    <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/20 border border-white/30">
                            <CheckCircle2 size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-white/80 font-medium group-hover:text-white transition-colors">
                            {benefit}
                        </span>
                    </motion.li>
                ))}
            </ul>

            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-all hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
            >
                {ctaText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
        </div>
    );
}

/* ─────────────────── WATCH TO EARN ─────────────────── */

/* ─────────────────── WATCH TO EARN ─────────────────── */

function WatchToEarnSection() {
    return (
        <section id="watch-to-earn" className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy transition-colors duration-1000">
            {/* Cinema Mode Background Dimmer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ margin: "-20%" }}
                className="absolute inset-0 bg-black z-0 pointer-events-none"
            />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Visual Side: Cinema Scale + Burst */}
                <div className="relative perspective-1000">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                        whileInView={{ scale: 1.1, opacity: 1, rotateX: 0 }}
                        viewport={{ margin: "-20%" }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        className="relative aspect-video w-full glass-panel rounded-3xl shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden group border border-white/10"
                    >
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-500" />

                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/90 z-0" />
                        <div className="relative z-10 h-full flex flex-col justify-between p-6">
                            {/* Play Button - Pulse */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center cursor-pointer relative"
                                >
                                    <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />
                                    <Play size={32} fill="black" className="text-black ml-1 relative z-10" />
                                </motion.div>
                            </div>

                            {/* UI Elements */}
                            <div className="flex justify-between items-end">
                                <div className="space-y-2 w-full">
                                    <div className="flex gap-1 h-1 w-full">
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ scaleY: 0 }}
                                                whileInView={{ scaleY: Math.random() > 0.5 ? 1 : 0.4 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="flex-1 bg-white/30 rounded-full origin-bottom"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bursting Coins */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-200 shadow-lg flex items-center justify-center text-black font-bold z-20"
                                initial={{ scale: 0, x: 0, y: 0 }}
                                whileInView={{
                                    scale: [0, 1, 0],
                                    x: (Math.random() - 0.5) * 400,
                                    y: (Math.random() - 0.5) * 400,
                                    rotate: Math.random() * 720
                                }}
                                viewport={{ margin: "-20%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 2,
                                    ease: "circOut"
                                }}
                            >
                                <Coins size={14} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Content Side */}
                <div>
                    <SectionText
                        badge="WATCH TO EARN"
                        title="Cinematic Rewards"
                        description="Experience content like never before. Our platform transforms your viewing time into tangible value with a cinema-grade reward system."
                        benefits={[
                            "Earn coins for every video watched",
                            "Bonus rewards for completing series",
                            "Redeem rewards for premium content",
                            "Unlock exclusive entertainment access",
                        ]}
                        ctaText="Start Watching"
                    />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── LISTEN TO EARN ─────────────────── */

/* ─────────────────── LISTEN TO EARN ─────────────────── */

function ListenToEarnSection() {
    return (
        <section id="listen-to-earn" className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Content Side (Left) */}
                <div className="order-2 lg:order-1">
                    <SectionText
                        badge="LISTEN TO EARN"
                        title="Sonic Rewards"
                        description="Your music listening becomes profitable. Stream songs, discover new artists, and earn rewards with every track. Feel the rhythm of earning."
                        benefits={[
                            "Earn with every song streamed",
                            "Discover exclusive music content",
                            "Build playlists, build rewards",
                            "Bonus for discovering new artists",
                        ]}
                        ctaText="Start Listening"
                    />
                </div>

                {/* Visual Side: Sonic Ripple */}
                <div className="order-1 lg:order-2 relative flex justify-center items-center">

                    {/* Ripple Mesh */}
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute border border-white/10 rounded-full animate-ripple"
                            style={{
                                width: `${(i + 1) * 100}px`,
                                height: `${(i + 1) * 100}px`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: "3s",
                            }}
                        />
                    ))}

                    {/* Main Visual */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative z-10 w-80 h-80 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-2xl overflow-hidden"
                    >
                        <Headphones size={100} className="text-white relative z-20" />

                        {/* Organic Frequency Bars */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-50">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-gradient-to-t from-transparent via-white to-transparent"
                                    animate={{ height: [20, Math.random() * 200 + 50, 20] }}
                                    transition={{
                                        duration: 0.5 + Math.random(),
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── PLAY TO EARN ─────────────────── */

/* ─────────────────── PLAY TO EARN ─────────────────── */

function PlayToEarnSection() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setScore((prev) => prev + 125);
        }, 150); // Faster slot machine feel
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="play-to-earn" className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy">
            {/* Retro Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.08]"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Visual Side: Glitch Entrance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-20%" }}
                    className="relative flex justify-center items-center perspective-1000 animate-glitch"
                >
                    <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center group">

                        {/* Controller with Border Glitch */}
                        <div className="relative w-80 h-56 bg-[#000] rounded-[3rem] border-2 border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.2)] flex items-center justify-center z-10">
                            {/* Neon Glow Buttons */}
                            <div className="absolute right-8 top-12 grid grid-cols-2 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() }}
                                        className="w-8 h-8 rounded-full bg-green-500 shadow-[0_0_10px_#00ff00]"
                                    />
                                ))}
                            </div>

                            {/* Pixel Score Display */}
                            <div className="w-40 h-24 bg-black border border-green-500/30 rounded-lg flex flex-col items-center justify-center p-2 font-mono text-green-500 tracking-widest relative overflow-hidden">
                                <span className="text-xs opacity-70">HIGH SCORE</span>
                                <span className="text-2xl font-bold">{score.toString().padStart(6, '0')}</span>
                                {/* Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />
                            </div>
                        </div>

                        {/* Glitch Shadows */}
                        <div className="absolute inset-0 bg-red-500/30 rounded-[3rem] translate-x-1 translate-y-1 -z-10 mix-blend-screen animate-pulse" />
                        <div className="absolute inset-0 bg-blue-500/30 rounded-[3rem] -translate-x-1 -translate-y-1 -z-10 mix-blend-screen animate-pulse" />

                        {/* Achievement Popups */}
                        <motion.div
                            initial={{ y: 0, opacity: 0 }}
                            whileInView={{ y: -100, opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute top-0 text-green-400 font-bold font-mono text-lg shadow-[0_0_10px_#000]"
                        >
                            +1000 XP
                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Side */}
                <div>
                    <SectionText
                        badge="PLAY TO EARN"
                        title="Level Up Your Reality"
                        description="Turn your gaming sessions into earning opportunities. Play exciting games, complete challenges, and watch your rewards grow with every level conquered."
                        benefits={[
                            "Earn rewards for every game played",
                            "Complete challenges for bonus coins",
                            "Compete in tournaments for big prizes",
                            "Unlock exclusive gaming content",
                        ]}
                        ctaText="Start Playing"
                    />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── SHOP TO EARN ─────────────────── */

function ShopToEarnSection() {
    return (
        <section id="shop-to-earn" className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-dark">

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

                {/* Content Side (Left) */}
                <div className="order-2 lg:order-1">
                    <SectionText
                        badge="SHOP TO EARN"
                        title="Cashback on Every Purchase"
                        description="Turn your shopping habits into a rewarding experience. Shop at your favorite brands and instantly receive cashback in rewards coins."
                        benefits={[
                            "Instant cashback on purchases",
                            "Exclusive deals for members",
                            "Shop at over 500+ top brands",
                            "Stack rewards with credit card points",
                        ]}
                        ctaText="Start Shopping"
                    />
                </div>

                {/* Visual Side: Receipt Stack */}
                <div className="order-1 lg:order-2 relative flex justify-center items-center h-[500px]">

                    {/* Perspective Container */}
                    <div className="relative w-80 h-96 perspective-1000">
                        {/* Swipe Cards */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 300, opacity: 0, rotate: 15 }}
                                whileInView={{
                                    x: i * 10,
                                    y: i * -10,
                                    opacity: 1,
                                    rotate: i * -5,
                                    scale: 1 - i * 0.05
                                }}
                                viewport={{ margin: "-20%" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: i * 0.2
                                }}
                                className="absolute inset-0 bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 border border-gray-100"
                                style={{ zIndex: 3 - i }}
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-100 mb-4 flex items-center justify-center">
                                    <ShoppingBag size={32} className="text-black" />
                                </div>
                                <div className="h-4 w-3/4 bg-gray-200 rounded-full mb-2" />
                                <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
                            </motion.div>
                        ))}

                        {/* Printing Receipt */}
                        <motion.div
                            initial={{ scaleY: 0, opacity: 0 }}
                            whileInView={{ scaleY: 1, opacity: 1 }}
                            viewport={{ margin: "-20%" }}
                            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-gray-50 shadow-lg p-4 origin-top z-40 transform-style-3d text-[10px] font-mono text-gray-400"
                        >
                            {/* Receipt Teeth */}
                            <div className="absolute -bottom-1 left-0 right-0 h-2 bg-transparent"
                                style={{
                                    backgroundImage: "linear-gradient(45deg, transparent 50%, #f9fafb 50%), linear-gradient(-45deg, transparent 50%, #f9fafb 50%)",
                                    backgroundSize: "10px 10px",
                                    backgroundRepeat: "repeat-x"
                                }}
                            />

                            <div className="flex justify-between mb-2">
                                <span>ITEM</span>
                                <span>PRICE</span>
                            </div>
                            <div className="border-b border-dashed border-gray-300 my-2" />
                            <div className="space-y-1">
                                <div className="flex justify-between"><span>SNEAKERS</span><span>$120</span></div>
                                <div className="flex justify-between"><span>HOODIE</span><span>$85</span></div>
                                <div className="flex justify-between text-black font-bold"><span>CASHBACK</span><span>+$30</span></div>
                            </div>
                            <div className="mt-4 text-center">
                                <span className="block w-24 h-8 bg-black mx-auto" /> {/* Barcode mockup */}
                            </div>
                        </motion.div>

                        {/* Floating Coins */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: -60, opacity: 1 }}
                            viewport={{ margin: "-20%" }}
                            transition={{ delay: 1.5, type: "spring" }}
                            className="absolute -top-10 -right-10 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2"
                        >
                            <Coins size={16} /> +$30.00
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── TRAVEL REWARDS ─────────────────── */

function TravelRewardsSection() {
    return (
        <section id="travel-rewards" className="relative min-h-screen py-24 flex items-center overflow-hidden bg-bg-navy bottom-0">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Visual Side: Path Tracing Map */}
                <div className="relative flex justify-center items-center perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, rotateX: 30 }}
                        whileInView={{ opacity: 1, rotateX: 0 }}
                        transition={{ duration: 1 }}
                        className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] bg-[#0a192f] rounded-full border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group"
                    >
                        {/* Map Dots Grid */}
                        <div className="absolute inset-0 opacity-30"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }}
                        />

                        {/* SVG Path Animation */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                            <motion.path
                                d="M 50 200 Q 150 50 200 200 T 350 200"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="600"
                                strokeDashoffset="600"
                                whileInView={{ strokeDashoffset: 0 }}
                                viewport={{ margin: "-20%" }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Moving Plane Plane */}
                        <motion.div
                            className="absolute w-12 h-12 bg-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center z-20"
                            initial={{ offsetDistance: "0%" }}
                            whileInView={{ offsetDistance: "100%" }}
                            viewport={{ margin: "-20%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            style={{ offsetPath: "path('M 50 200 Q 150 50 200 200 T 350 200')", offsetRotate: "auto" }}
                        >
                            <Plane size={24} className="text-blue-600 transform rotate-90" />
                        </motion.div>

                        {/* Location Pins */}
                        <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.1 }}
                            className="absolute left-[40px] top-[190px] w-4 h-4 bg-blue-500 rounded-full border-2 border-white z-10"
                        />
                        <motion.div
                            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.5 }}
                            className="absolute right-[40px] top-[190px] w-4 h-4 bg-green-500 rounded-full border-2 border-white z-10"
                        >
                            <div className="absolute -top-10 -left-10 w-24 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-lg">
                                Arrival: +500 PTS
                            </div>
                        </motion.div>

                    </motion.div>
                </div>

                {/* Content Side */}
                <div>
                    <SectionText
                        badge="TRAVEL REWARDS"
                        title="Journey to Rewards"
                        description="Turn your journey into a rewarding experience. Book flights, hotels, buses, and visas through GSAA and watch your miles stack up with every trip."
                        benefits={[
                            "Miles for every km traveled",
                            "Bonus points for hotel bookings",
                            "Lounge access perks",
                            "Exclusive travel insurance deals",
                        ]}
                        ctaText="Start Traveling"
                    />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── FINAL CTA ─────────────────── */

function EarningsCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const featureIcons = [
        { icon: Play, label: "Watch" },
        { icon: Headphones, label: "Listen" },
        { icon: Gamepad2, label: "Play" },
        { icon: ShoppingBag, label: "Shop" },
        { icon: Plane, label: "Travel" },
    ];

    const [particles, setParticles] = useState<{ top: number; left: number; width: number; height: number; opacity: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        setParticles([...Array(30)].map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * 5,
        })));
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 flex flex-col items-center justify-center overflow-hidden bg-bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-bg-navy to-bg-black" />

            {/* Particles */}
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white/20 animate-float-particle"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        width: `${p.width}px`,
                        height: `${p.height}px`,
                        opacity: p.opacity,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}

            <motion.div style={{ scale, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8"
                >
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/90 flex items-center gap-2">
                        <Coins size={14} className="opacity-60" />
                        Start Your Journey
                    </span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                    Ready to Start <span className="text-white">Earning?</span>
                </h2>

                <p className="text-xl text-text-gray mb-16 max-w-2xl mx-auto">
                    Five ways to earn. One platform. Unlimited rewards.
                    Join GSAA Global today and transform every moment into value.
                </p>

                {/* Feature Icons */}
                <div className="flex justify-center gap-4 md:gap-8 mb-20 flex-wrap">
                    {featureIcons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.2, rotate: 10, filter: "brightness(1.5)" }}
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur border border-white/10 flex items-center justify-center">
                                <item.icon size={28} className="text-white group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />
                            </div>
                            <span className="text-white/50 text-xs uppercase tracking-wider font-medium group-hover:text-white/80 transition-colors">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="relative inline-block group">
                    <button className="relative z-20 px-12 py-6 rounded-full bg-white text-black font-bold text-xl tracking-wide hover:scale-105 hover:bg-gray-100 transition-all duration-300 flex items-center gap-4">
                        Join GSAA Global
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>

                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute inset-0 animate-spin-slow"
                                style={{ animationDuration: `${15 + i * 5}s`, animationDirection: i % 2 === 0 ? "normal" : "reverse" }}
                            >
                                <div
                                    className="absolute bg-white/50 w-2 h-2 rounded-full"
                                    style={{
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) translateX(${140 + i * 20}px)`,
                                    }}
                                />
                            </div>
                        ))}
                        <div className="absolute inset-0 rounded-full border border-white/5 scale-150" />
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-white/40 text-sm"
                >
                    No credit card required • Join thousands of earners
                </motion.p>
            </motion.div>
        </section>
    );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function EarningsPage() {
    return (
        <main className="min-h-screen bg-bg-dark selection:bg-primary-purple/30">
            <EarningsHero />
            <OverviewGrid />
            <WatchToEarnSection />
            <ListenToEarnSection />
            <PlayToEarnSection />
            <ShopToEarnSection />
            <TravelRewardsSection />
            <EarningsCTA />
        </main>
    );
}
