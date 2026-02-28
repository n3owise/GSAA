"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Film, Disc, Mic2, Star, Youtube, Music, ArrowRight, Ticket } from "lucide-react";
import Image from "next/image";

/* ─────────────────── SHARED COMPONENTS ─────────────────── */

function SectionHeader({ title, subtitle, align = "center" }: { title: string; subtitle: string; align?: "center" | "left" }) {
    return (
        <div className={`mb-16 relative z-10 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.h2
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold mb-4 font-heading bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: align === "center" ? 100 : 200 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`h-1 bg-amber-500 mb-4 ${align === "center" ? "mx-auto" : ""}`}
            />
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 max-w-2xl font-light tracking-widest uppercase text-sm"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}

/* ─────────────────── HERO SECTION (SPOTLIGHT) ─────────────────── */

function EntertainmentHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        setMousePosition({ x: moveX, y: moveY });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050500] pt-20"
        >
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Dynamic Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(circle 600px at ${50 + mousePosition.x * 0.05}% ${50 + mousePosition.y * 0.05}%, rgba(255, 255, 255, 0.15), transparent)`,
                }}
            />

            {/* Curtain / Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30 pointer-events-none mix-blend-overlay" />

            {/* Movie Clapperboard Reveal Animation */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] pointer-events-none"
            >
                {/* 3D Clapperboard Container */}
                <div className="relative w-72 md:w-96 perspective-1000">

                    {/* Clapperboard Top Stick (The Flapper) */}
                    <motion.div
                        initial={{ rotateZ: -35 }}
                        animate={{ rotateZ: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.85, 0, 0.15, 1], // Snappy ease-in
                            delay: 1.2
                        }}
                        className="absolute top-0 left-0 w-full h-12 bg-white origin-bottom-left z-20 overflow-hidden shadow-lg border-b-[2px] border-gray-300"
                        style={{ transformOrigin: '0% 100%' }}
                    >
                        {/* Diagonal Stripes on Top Stick */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,black,black_20px,white_20px,white_40px)]" />

                        {/* Hinge Joint Circle */}
                        <div className="absolute left-2 bottom-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-gray-600 shadow-inner z-30" />
                    </motion.div>

                    {/* Clapperboard Bottom Stick (Fixed) */}
                    <div className="relative w-full h-12 bg-white mt-12 z-10 overflow-hidden shadow-md border-t-[2px] border-gray-400">
                        {/* Diagonal Stripes on Bottom Stick (Opposite direction for classic look) */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,black,black_20px,white_20px,white_40px)]" />
                    </div>

                    {/* Clapperboard Main Body */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full bg-black mt-1 p-4 rounded-b-lg border-x-4 border-b-4 border-white shadow-2xl relative"
                    >
                        {/* Slate Details */}
                        <div className="grid grid-cols-3 gap-2 text-white font-mono text-xs md:text-sm mb-4 border-b border-white/20 pb-2">
                            <div className="col-span-1 border-r border-white/20">
                                <span className="text-gray-400 block text-[10px]">PROD.</span>
                                GSAA ORIGINALS
                            </div>
                            <div className="col-span-1 border-r border-white/20 pl-2">
                                <span className="text-gray-400 block text-[10px]">ROLL</span>
                                A-01
                            </div>
                            <div className="col-span-1 pl-2">
                                <span className="text-gray-400 block text-[10px]">SCENE</span>
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                                    className="text-red-500 font-bold"
                                >
                                    99
                                </motion.span>

                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-white font-mono text-xs md:text-sm mb-4 border-b border-white/20 pb-2">
                            <div className="border-r border-white/20">
                                <span className="text-gray-400 block text-[10px]">DIRECTOR</span>
                                USER
                            </div>
                            <div className="pl-2">
                                <span className="text-gray-400 block text-[10px]">CAMERA</span>
                                RED KOMODO X
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <div className="text-white font-mono font-bold text-2xl md:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                ACTION
                            </div>
                            <div className="text-gray-500 font-mono text-[10px]">
                                SYNC
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Clapper SNAP Flash */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.4, delay: 1.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-screen"
                />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-3 border border-amber-500/30 bg-amber-500/5 px-6 py-2 rounded-full mb-8 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-amber-200 text-xs font-mono tracking-[0.2em] uppercase">Premier Entertainment</span>
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>

                    <h1 className="text-7xl md:text-9xl font-bold font-heading mb-6 leading-tight text-white tracking-tighter">
                        <span className="block drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">STUDIO</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-amber-700">ORIGINALS</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
                        Immersive storytelling and sonic mastery.
                        Experience the next generation of GSAA entertainment.
                    </p>

                    <div className="flex justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-black font-bold rounded-sm hover:bg-amber-400 transition-colors flex items-center gap-2"
                        >
                            <Play className="w-5 h-5 fill-black" />
                            LATEST PREMIERE
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-white/20 text-white font-bold rounded-sm hover:bg-white/10 transition-colors backdrop-blur-md"
                        >
                            BROWSE ARCHIVE
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Floating Dust Particles (simulated with CSS for performance) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float-particle" />
                <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-amber-500/10 rounded-full animate-float-particle" style={{ animationDelay: "2s" }} />
            </div>
        </section>
    );
}

/* ─────────────────── MOVIES SECTION (FILM STRIP) ─────────────────── */

function MoviesSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const xRef = useRef(0);
    const rafRef = useRef<number>(0);

    React.useEffect(() => {
        const speed = 0.6; // px per frame — adjust for faster/slower
        const tick = () => {
            const el = trackRef.current;
            if (el) {
                xRef.current += speed;
                const half = el.scrollWidth / 2;
                if (xRef.current >= half) xRef.current = 0; // seamless reset
                el.style.transform = `translateX(-${xRef.current}px)`;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);
    const movies = [
        { title: "Dahej Ka Chakravyuh", genre: "Drama", duration: "Coming Soon", image: "/dahej ka chakravyuh.png" },
        { title: "Talaak Ab Nahi", genre: "Social Drama", duration: "Coming Soon", image: "/talaak ab nahi.png" },
        { title: "UP80", genre: "Action", duration: "Coming Soon", image: "/up80.png" },
    ];

    return (
        <section className="py-24 bg-[#0a0800] relative overflow-hidden">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 relative z-10">
                <SectionHeader title="CINEMA" subtitle="Feature Films & Originals" align="left" />
            </div>

            {/* Scrolling Film Strip Container */}
            <div className="relative w-full overflow-hidden">
                <div ref={trackRef} className="flex gap-8 will-change-transform pl-6" style={{ width: 'max-content' }}>
                    {/* Duplicate list for seamless loop */}
                    {[...movies, ...movies].map((movie, i) => (
                        <div key={i} className="relative group flex-shrink-0 w-[300px] md:w-[400px] aspect-[2/3] bg-gray-900 rounded-sm overflow-hidden border-x-8 border-black shadow-2xl">
                            {/* Film Sprocket Holes (Visual Only) */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black flex flex-col justify-between py-2 z-20">
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} className="w-2 h-3 bg-white/10 rounded-sm mx-auto" />
                                ))}
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black flex flex-col justify-between py-2 z-20">
                                {Array.from({ length: 10 }).map((_, j) => (
                                    <div key={j} className="w-2 h-3 bg-white/10 rounded-sm mx-auto" />
                                ))}
                            </div>

                            {/* Movie Poster — real image */}
                            <Image
                                src={movie.image}
                                alt={movie.title}
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 300px, 400px"
                            />

                            {/* Cinema Mode Content — no button */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                                <span className="text-xs font-mono text-gray-400 mb-1">{movie.genre} // {movie.duration}</span>
                                <h3 className="text-2xl font-bold text-white leading-tight">{movie.title.toUpperCase()}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── MUSIC SECTION (VINYL) ─────────────────── */

function MusicSection() {
    const albums = [
        { title: "Aaj Phir De Zara Sharaab", artist: "GSAA Music", image: "/aaj phir de zara sharaab.png" },
        { title: "Mohabbat Nazar Hamko Aane Lagi Hai", artist: "GSAA Music", image: "/Mohobbat Nazar Hamko Aane Lagi Hai.jpg" },
        { title: "Peene De Sharab", artist: "GSAA Music", image: "/peene de sharab.jpg" },
    ];

    return (
        <section className="py-32 bg-[#050400] relative overflow-hidden">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader title="STUDIO SESSIONS" subtitle="Original Soundtracks & Albums" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
                    {albums.map((album, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group flex flex-col items-center"
                        >
                            {/* Album Art */}
                            <div className="relative w-64 h-64 mb-6 shadow-2xl">
                                {/* Slight tilt behind (sleeve effect) */}
                                <div className="absolute inset-0 bg-white/5 rounded-sm transform rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-6 group-hover:translate-x-3" />
                                {/* Main cover */}
                                <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 transition-transform duration-500 group-hover:scale-[1.03]">
                                    <Image
                                        src={album.image}
                                        alt={album.title}
                                        fill
                                        className="object-cover"
                                        sizes="256px"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                                            <Play className="w-6 h-6 fill-black text-black ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white mb-1 leading-snug">{album.title}</h3>
                                <p className="text-gray-500 text-sm">{album.artist}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── UPCOMING SECTION (BLUR REVEAL) ─────────────────── */

function UpcomingSection() {
    return (
        <section className="py-32 bg-[#0a0500] relative overflow-hidden">
            {/* Background Pixel/Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            {/* Background spotlight */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="text-left">
                        <h2 className="text-5xl font-bold text-white mb-2 font-heading">COMING SOON</h2>
                        <p className="text-gray-500 tracking-widest uppercase">Production Pipeline 2026</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {[
                        { title: "LOOTERI DULHAN", type: "Feature Film", date: "Coming Fall 2026", image: "bg-purple-900" },
                        { title: "TBA", type: "Album Drop", date: "Late 2026", image: "bg-indigo-900" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ filter: "blur(20px)", opacity: 0 }}
                            whileInView={{ filter: "blur(0px)", opacity: 1 }}
                            viewport={{ margin: "-100px" }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className="relative aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer"
                        >
                            {/* Placeholder Image */}
                            <div className={`absolute inset-0 ${item.image} opacity-50 transition-transform duration-700 group-hover:scale-110`} />

                            {/* Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 group-hover:bg-black/60 transition-colors backdrop-blur-[2px] group-hover:backdrop-blur-none">
                                <span className="px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-sm mb-4">
                                    {item.type.toUpperCase()}
                                </span>
                                <h3 className="text-4xl font-bold text-white mb-2 tracking-tighter">{item.title}</h3>
                                <p className="text-gray-300 font-mono text-sm">{item.date}</p>
                            </div>

                            {/* Ticket Icon on Hover */}
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Ticket size={20} />
                                    <span className="text-sm font-bold"></span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────── MAIN PAGE COMPONENT ─────────────────── */

export default function EntertainmentPage() {
    return (
        <main className="bg-black min-h-screen text-white overflow-x-hidden selection:bg-amber-500/30">
            <EntertainmentHero />
            <MoviesSection />
            <MusicSection />
            <UpcomingSection />

            {/* Simple Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>&copy; 2026 GSAA Studios. All rights reserved.</p>
            </footer>
        </main>
    );
}
