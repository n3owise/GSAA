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
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
        >
            {/* Dynamic Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(circle 600px at ${50 + mousePosition.x * 0.05}% ${50 + mousePosition.y * 0.05}%, rgba(255, 255, 255, 0.15), transparent)`,
                }}
            />

            {/* Curtain / Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30 pointer-events-none mix-blend-overlay" />

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
        <section className="py-24 bg-[#050505] relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
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
        <section className="py-32 bg-black relative">
            <div className="container mx-auto px-6">
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
        <section className="py-32 bg-zinc-950 relative overflow-hidden">
            {/* Background spotlight */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
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
